#!/usr/bin/env python3
"""Exercise article reading, mobile contents, disclosures, and local search in CI."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json
import tempfile
import threading

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[3]
OUT = ROOT / "article-review-output"
OUT.mkdir(exist_ok=True)


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


def main():
    articles = json.loads((ROOT / "tools/article-content-audit.json").read_text())
    report = []
    with tempfile.TemporaryDirectory() as directory:
        (Path(directory) / "advaita").symlink_to(ROOT / "site", target_is_directory=True)
        server = ThreadingHTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=directory))
        threading.Thread(target=server.serve_forever, daemon=True).start()
        base = f"http://127.0.0.1:{server.server_port}/advaita/"
        try:
            with sync_playwright() as p:
                browser = p.chromium.launch()
                page = browser.new_page(viewport={"width": 1366, "height": 900})
                errors = []
                page.on("pageerror", lambda error: errors.append(str(error)))
                for article in articles:
                    slug = article["slug"]
                    response = page.goto(base + "articles/" + slug + "/", wait_until="networkidle")
                    assert response.status == 200, slug
                    assert page.locator("h1").count() == 1, slug
                    assert page.locator("#source-content").is_visible(), slug
                    assert page.locator("#source-content p").count() >= article["paragraphs"], slug
                    assert page.locator("#source-content img").count() >= article["images"], slug
                    assert page.locator("#desktop-toc a").count() > 0, slug
                    assert page.locator(".side-toc").is_visible(), slug
                    anchors = page.locator("#desktop-toc a").evaluate_all("links=>links.map(a=>a.getAttribute('href'))")
                    assert all(page.locator(f'[id="{href[1:]}"]').count() == 1 for href in anchors), slug
                    for href in [anchors[0], anchors[len(anchors) // 2], anchors[-1]]:
                        page.locator(f'#desktop-toc a[href="{href}"]').click()
                        assert page.locator(f'[id="{href[1:]}"]').is_visible(), (slug, href)
                    details = page.locator("#source-content details.sanskrit-reveal").first
                    if details.count():
                        details.locator("summary").click()
                        assert details.get_attribute("open") is not None, slug
                        assert details.locator("summary").inner_text() == "Hide Sanskrit", slug
                        details.locator("summary").click()
                        assert details.get_attribute("open") is None, slug
                    for width in (390, 760, 1366):
                        page.set_viewport_size({"width": width, "height": 900})
                        assert page.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), (slug, width)
                        if width <= 760:
                            mobile = page.locator("details.mobile-toc")
                            assert mobile.is_visible(), (slug, width)
                            mobile.locator(":scope>summary").click()
                            assert mobile.locator("a").first.is_visible(), slug
                            mobile.locator("a").first.click()
                            assert mobile.get_attribute("open") is None, slug
                    if slug in {"hinduism-on-women", "a-vaishnava-lens-on-vishnu-as-the-supreme-deity", "on-the-lack-of-steppe-ancestry-and-haplogroups-in-ancient-iranians"}:
                        page.goto(base + "articles/" + slug + "/")
                        page.screenshot(path=str(OUT / (slug + ".png")))
                    report.append({"article": slug, "desktop": "pass", "mobile": "pass", "contents": len(anchors)})
                # Core reading must survive unavailable JavaScript and failed data requests.
                no_js = browser.new_context(java_script_enabled=False, viewport={"width": 390, "height": 844})
                fallback = no_js.new_page()
                for article in articles:
                    fallback.goto(base + "articles/" + article["slug"] + "/")
                    assert fallback.locator("#source-content").is_visible(), article["slug"]
                    assert fallback.locator("#source-content p").count() >= article["paragraphs"], article["slug"]
                    assert fallback.locator("details.mobile-toc a").count() > 0, article["slug"]
                no_js.close()
                page.goto(base + "articles/a-vaishnava-lens-on-vishnu-as-the-supreme-deity/")
                page.get_by_role("searchbox", name="Search the library").fill("Vishnu")
                page.get_by_role("button", name="Search", exact=True).click()
                page.locator("#page-search-results li").first.wait_for(timeout=30000)
                assert "could not be loaded" not in page.locator("#page-search-status").inner_text()
                assert not errors, errors
                browser.close()
        finally:
            server.shutdown()
    (OUT / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2))
    print(f"Passed desktop, mobile, no-JavaScript reading, contents, and Sanskrit controls for {len(articles)} articles; local search returns results.")


if __name__ == "__main__":
    main()
