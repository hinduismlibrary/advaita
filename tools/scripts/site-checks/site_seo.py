#!/usr/bin/env python3
"""Add crawlable page metadata and rebuild the sitemap before GitHub Pages deploys."""
from __future__ import annotations

from collections import Counter
from html import escape, unescape
from pathlib import Path
from urllib.parse import quote
import json
import re

HTML_OPEN = re.compile(r"<html\b[^>]*>", re.IGNORECASE)
HEAD_OPEN = re.compile(r"<head\b[^>]*>", re.IGNORECASE)
HEAD_CLOSE = re.compile(r"</head\s*>", re.IGNORECASE)
BODY = re.compile(r"<body\b[^>]*>([\s\S]*?)</body\s*>", re.IGNORECASE)
TITLE = re.compile(r"<title\b[^>]*>([\s\S]*?)</title\s*>", re.IGNORECASE)
META_TAG = re.compile(r"<meta\b[^>]*>", re.IGNORECASE)
LINK_TAG = re.compile(r"<link\b[^>]*>", re.IGNORECASE)
ATTR = re.compile(r"""([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))""")
JSON_LD = re.compile(
    r"""<script\b(?=[^>]*\bid=["']viveka-seo-jsonld["'])[^>]*>[\s\S]*?</script\s*>""",
    re.IGNORECASE,
)
H1 = re.compile(r"<h1\b[^>]*>([\s\S]*?)</h1\s*>", re.IGNORECASE)
PARAGRAPH = re.compile(r"<p\b[^>]*>([\s\S]*?)</p\s*>", re.IGNORECASE)
ROBOTS_NO_INDEX = re.compile(r"(?:^|[\s,])noindex(?:$|[\s,])", re.IGNORECASE)
GENERIC_HEADING = re.compile(
    r"^(?:chapter|book|part|canto|verse|text)\s+(?:\d+|[ivxlcdm]+)$",
    re.IGNORECASE,
)
SITE_NAME = "विवेकदृष्टिः | Viveka Dṛṣṭi"
HOME_TITLE = "विवेकदृष्टिः — Hindu Scripture & Philosophy | Viveka Dṛṣṭi"
HOME_DESCRIPTION = (
    "Read Sanskrit Hindu scriptures, Advaita Vedānta texts, Purāṇas, English translations, "
    "verse-by-verse word meanings, philosophy, and Indology at Viveka Dṛṣṭi."
)


def attributes(tag: str) -> dict[str, str]:
    return {
        match.group(1).casefold(): unescape(next(value for value in match.groups()[1:] if value is not None))
        for match in ATTR.finditer(tag)
    }


def plain_text(markup: str) -> str:
    markup = re.sub(
        r"(?is)<(script|style|noscript|svg|nav|button|template)\b[^>]*>[\s\S]*?</\1\s*>",
        " ",
        markup,
    )
    markup = re.sub(r"(?s)<[^>]+>", " ", markup)
    return re.sub(r"\s+", " ", unescape(markup)).strip()


def page_text(content: str) -> tuple[str, str]:
    body = BODY.search(content)
    body_markup = body.group(1) if body else content
    headings = [plain_text(match.group(1)) for match in H1.finditer(body_markup)]
    heading = next((item for item in headings if item), "")
    body_without_chrome = re.sub(
        r"(?is)<(nav|footer|script|style|noscript|svg|template)\b[^>]*>[\s\S]*?</\1\s*>",
        " ",
        body_markup,
    )
    paragraphs = [
        plain_text(match.group(1))
        for match in PARAGRAPH.finditer(body_without_chrome)
    ]
    excerpt = next((item for item in paragraphs if len(item) >= 45), "")
    return heading, excerpt


def get_meta(content: str, key_type: str, key: str) -> str:
    for match in META_TAG.finditer(content):
        attrs = attributes(match.group(0))
        if attrs.get(key_type, "").casefold() == key.casefold():
            return attrs.get("content", "").strip()
    return ""


def insert_in_head(content: str, tag: str) -> str:
    close = HEAD_CLOSE.search(content)
    if close:
        return content[:close.start()] + "  " + tag + "\n" + content[close.start():]
    opening = HEAD_OPEN.search(content)
    if opening:
        return content[:opening.end()] + "\n  " + tag + content[opening.end():]
    html_open = HTML_OPEN.search(content)
    if html_open:
        return content[:html_open.end()] + "\n<head>\n  " + tag + "\n</head>\n" + content[html_open.end():]
    return content


def set_title(content: str, value: str) -> str:
    tag = "<title>" + escape(value, quote=False) + "</title>"
    found = False

    def replace(match: re.Match[str]) -> str:
        nonlocal found
        if found:
            return ""
        found = True
        return tag

    updated = TITLE.sub(replace, content)
    return updated if found else insert_in_head(updated, tag)


def set_meta(content: str, key_type: str, key: str, value: str) -> str:
    tag = f'<meta {key_type}="{escape(key, quote=True)}" content="{escape(value, quote=True)}">'
    found = False

    def replace(match: re.Match[str]) -> str:
        nonlocal found
        if attributes(match.group(0)).get(key_type, "").casefold() != key.casefold():
            return match.group(0)
        if found:
            return ""
        found = True
        return tag

    updated = META_TAG.sub(replace, content)
    return updated if found else insert_in_head(updated, tag)


def set_canonical(content: str, url: str) -> str:
    tag = f'<link rel="canonical" href="{escape(url, quote=True)}">'
    found = False

    def replace(match: re.Match[str]) -> str:
        nonlocal found
        rel = attributes(match.group(0)).get("rel", "").casefold().split()
        if "canonical" not in rel:
            return match.group(0)
        if found:
            return ""
        found = True
        return tag

    updated = LINK_TAG.sub(replace, content)
    return updated if found else insert_in_head(updated, tag)


def remove_canonical(content: str) -> str:
    def replace(match: re.Match[str]) -> str:
        if "canonical" in attributes(match.group(0)).get("rel", "").casefold().split():
            return ""
        return match.group(0)

    return LINK_TAG.sub(replace, content)


def ensure_language(content: str) -> str:
    match = HTML_OPEN.search(content)
    if not match or attributes(match.group(0)).get("lang"):
        return content
    tag = match.group(0)
    updated = tag[:-1] + ' lang="en">'
    return content[:match.start()] + updated + content[match.end():]


def normalize(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip().casefold()


def humanize_path(relative: str) -> str:
    route = relative
    if route.endswith("/index.html"):
        route = route[:-len("/index.html")]
    elif route == "index.html":
        route = ""
    elif route.endswith(".html"):
        route = route[:-len(".html")]
    pieces = route.split("/")
    if pieces and pieces[0] in {"articles", "books", "pages"}:
        pieces = pieces[1:]
    text = " ".join(pieces).replace("_", "-")
    text = re.sub(r"(?i)-chapter-(\d+)", r" Chapter \1", text)
    text = re.sub(r"(?i)-canto-(\d+)", r" Canto \1", text)
    text = re.sub(r"(?i)-book-(\d+)", r" Book \1", text)
    text = re.sub(r"(?i)-part-(\d+)", r" Part \1", text)
    text = text.replace("-", " ").replace("/", " ")
    return re.sub(r"\s+", " ", text).strip().title() or "Viveka Dṛṣṭi"


def with_brand(value: str) -> str:
    if "viveka dṛṣṭi" in value.casefold():
        return value
    return value + " | Viveka Dṛṣṭi"


def trim_description(value: str, limit: int = 220) -> str:
    value = re.sub(r"\s+", " ", value).strip(" \t\r\n.-")
    if len(value) <= limit:
        return value
    boundary = value.rfind(" ", 0, limit - 1)
    if boundary < limit // 2:
        boundary = limit - 1
    return value[:boundary].rstrip(" ,;:—-") + "…"


def base_url_for(repository: str) -> str:
    owner, separator, name = repository.partition("/")
    if not separator or not owner or not name:
        raise RuntimeError(f"Invalid GitHub repository: {repository!r}")
    host = owner.casefold() + ".github.io"
    if name.casefold() == host:
        return "https://" + host
    return "https://" + host + "/" + quote(name, safe="-._~")


def url_for_page(relative: str, base_url: str) -> str:
    encoded = quote(relative, safe="/-._~")
    if relative == "index.html":
        route = "/"
    elif relative.endswith("/index.html"):
        route = "/" + encoded[:-len("index.html")]
    else:
        route = "/" + encoded
    return base_url.rstrip("/") + route


def is_forced_noindex(relative: str) -> bool:
    lower = relative.casefold()
    basename = lower.rsplit("/", 1)[-1]
    private_page = re.compile(
        r"(?:^|[-_])(?:draft|preview|test|temp|tmp|rebuild)(?:$|[-_])",
        re.IGNORECASE,
    )
    return (
        lower == "404.html"
        or lower == "search/index.html"
        or lower.startswith("assets/templates/")
        or basename == "source.html"
        or basename.startswith("source-")
        or any(private_page.search(part) for part in lower.split("/"))
    )


def is_full_document(content: str) -> bool:
    return bool(HTML_OPEN.search(content) and HEAD_OPEN.search(content) and BODY.search(content))


def prepare_site_seo(site: Path, repository: str) -> tuple[int, int]:
    """Prepare every full HTML page and replace sitemap.xml with canonical public routes."""
    base_url = base_url_for(repository)
    pages: list[dict[str, object]] = []

    for path in sorted(site.rglob("*.html")):
        relative = path.relative_to(site).as_posix()
        content = path.read_text(encoding="utf-8")
        if not is_full_document(content):
            continue
        heading, excerpt = page_text(content)
        title_match = TITLE.search(content)
        title = plain_text(title_match.group(1)) if title_match else ""
        description = get_meta(content, "name", "description")
        robots = get_meta(content, "name", "robots")
        pages.append({
            "path": path,
            "relative": relative,
            "content": content,
            "heading": heading,
            "excerpt": excerpt,
            "title": title,
            "description": description,
            "robots": robots,
        })

    if not pages:
        raise RuntimeError(f"No full HTML documents found under {site}")

    title_counts = Counter(normalize(str(page["title"])) for page in pages if page["title"])
    for page in pages:
        relative = str(page["relative"])
        current = str(page["title"])
        heading = str(page["heading"])
        if relative == "index.html":
            title = HOME_TITLE
        elif (
            not current
            or title_counts[normalize(current)] > 1
            or normalize(current) in {"home", "index", "chapter", "page"}
        ):
            label = heading if heading and not GENERIC_HEADING.fullmatch(heading) else humanize_path(relative)
            title = with_brand(label)
        else:
            title = with_brand(current)
        page["title"] = title

    used_titles: set[str] = set()
    for page in pages:
        title = str(page["title"])
        if normalize(title) in used_titles:
            relative = str(page["relative"])
            title = with_brand(humanize_path(relative))
            if normalize(title) in used_titles:
                title = with_brand(humanize_path(relative) + " — " + relative)
            page["title"] = title
        used_titles.add(normalize(title))

    description_counts = Counter(
        normalize(str(page["description"]))
        for page in pages
        if page["description"]
    )
    used_descriptions: set[str] = set()
    for page in pages:
        relative = str(page["relative"])
        title = str(page["title"])
        current = str(page["description"])
        excerpt = str(page["excerpt"])
        if relative == "index.html":
            description = HOME_DESCRIPTION
        elif current and description_counts[normalize(current)] == 1:
            description = current
        elif excerpt:
            description = title + ". " + excerpt
        elif current:
            description = title + ". " + current
        else:
            description = (
                title
                + ". Explore the Sanskrit text, translation, commentary, and linked study material "
                "available on this page."
            )
        description = trim_description(description)
        if normalize(description) in used_descriptions:
            fallback = excerpt or current or "Read this page in the Viveka Dṛṣṭi library."
            description = trim_description(title + ". " + fallback)
        if normalize(description) in used_descriptions:
            description = trim_description(title + " — " + relative + ". " + (excerpt or current))
        page["description"] = description
        used_descriptions.add(normalize(description))

    changed_pages = 0
    sitemap_urls: list[str] = []

    for page in pages:
        path = page["path"]
        relative = str(page["relative"])
        content = ensure_language(str(page["content"]))
        title = str(page["title"])
        description = str(page["description"])
        page_url = url_for_page(relative, base_url)
        robots = str(page["robots"])
        forced_noindex = is_forced_noindex(relative)
        noindex = forced_noindex or bool(ROBOTS_NO_INDEX.search(robots))

        content = set_title(content, title)
        content = set_meta(content, "name", "description", description)
        content = set_meta(content, "property", "og:site_name", SITE_NAME)
        content = set_meta(content, "property", "og:type", "article" if relative.startswith("articles/") else "website")
        content = set_meta(content, "property", "og:title", title)
        content = set_meta(content, "property", "og:description", description)
        content = set_meta(content, "property", "og:url", page_url)
        content = set_meta(content, "name", "twitter:card", "summary")
        content = set_meta(content, "name", "twitter:title", title)
        content = set_meta(content, "name", "twitter:description", description)

        if noindex:
            content = set_meta(content, "name", "robots", "noindex,follow")
            content = remove_canonical(content)
        else:
            content = set_canonical(content, page_url)
            sitemap_urls.append(page_url)
            language_match = HTML_OPEN.search(content)
            language = attributes(language_match.group(0)).get("lang", "en") if language_match else "en"
            schema: dict[str, object]
            if relative == "index.html":
                schema = {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "विवेकदृष्टिः",
                    "alternateName": "Viveka Dṛṣṭi",
                    "url": base_url + "/",
                    "inLanguage": language,
                }
            else:
                schema = {
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "@id": page_url + "#webpage",
                    "url": page_url,
                    "name": title,
                    "description": description,
                    "inLanguage": language,
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": SITE_NAME,
                        "url": base_url + "/",
                    },
                }
            json_ld = json.dumps(schema, ensure_ascii=False, separators=(",", ":")).replace("<", "\\u003c")
            script = '<script type="application/ld+json" id="viveka-seo-jsonld">' + json_ld + "</script>"
            if JSON_LD.search(content):
                content = JSON_LD.sub(script, content, count=1)
            else:
                content = insert_in_head(content, script)

        if content != str(page["content"]):
            path.write_text(content, encoding="utf-8")
            changed_pages += 1

    sitemap_urls = sorted(set(sitemap_urls))
    if not sitemap_urls:
        raise RuntimeError("SEO preparation produced an empty sitemap")
    sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    sitemap.extend("  <url><loc>" + escape(url) + "</loc></url>" for url in sitemap_urls)
    sitemap.append("</urlset>")
    sitemap_content = "\n".join(sitemap) + "\n"
    sitemap_path = site / "sitemap.xml"
    if not sitemap_path.exists() or sitemap_path.read_text(encoding="utf-8") != sitemap_content:
        sitemap_path.write_text(sitemap_content, encoding="utf-8")

    return changed_pages, len(sitemap_urls)
