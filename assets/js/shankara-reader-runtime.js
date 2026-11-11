(function (global) {
  "use strict";

  var navigation = global.AdvaitaReaderNavigation;
  var params = new URLSearchParams(global.location.search);
  var work = params.get("work") || "";
  var requestedUnit = params.get("unit") || decodeHash(global.location.hash.slice(1));
  var isFullText = params.get("full") === "1";
  var root = document.getElementById("chapter-reader");
  var titleNode = document.getElementById("work-title");
  // The site chrome is injected by site.js after the document stylesheets. Keep
  // the reader stylesheet last in the cascade when that late chrome arrives.
  if (root) root.style.setProperty("background-color", "#fffdfa", "important");
  if (titleNode) titleNode.style.setProperty("color", "#496b6c", "important");
  function placeReaderStylesLast() {
    var readerStyle = document.querySelector('link[href*="shankara-reader-standard.css"]');
    if (!readerStyle || !document.head) return;
    function moveAfterChrome() {
      var chromeStyle = document.querySelector('link[data-viveka-site-chrome],link[href*="site-chrome.css"]');
      if (!chromeStyle) return false;
      if (chromeStyle.nextElementSibling !== readerStyle) chromeStyle.after(readerStyle);
      return true;
    }
    var observer = new MutationObserver(moveAfterChrome);
    observer.observe(document.head, { childList: true });
    moveAfterChrome();
    document.addEventListener("DOMContentLoaded", moveAfterChrome, { once: true });
    global.addEventListener("load", moveAfterChrome, { once: true });
  }
  placeReaderStylesLast();
  var authorNode = document.getElementById("work-author");
  var chapterTitle = document.getElementById("chapter-title");
  var contentNode = document.getElementById("chapter-content");
  var listNode = document.getElementById("chapter-list");
  var coverageNode = document.getElementById("word-coverage");
  var tocProgress = document.getElementById("toc-progress");
  var contentsLink = document.getElementById("contents-link");
  var fullTextLink = document.getElementById("full-text-link");
  var rootUrl = new URL("/advaita/books/adi-shankaracharya/", global.location.origin);

  function decodeHash(value) {
    try { return decodeURIComponent(value); } catch (error) { return value; }
  }

  function chapterUrl(id) {
    var url = new URL("book-chapter.html", rootUrl);
    url.searchParams.set("work", work);
    url.searchParams.set("unit", id);
    return url.href;
  }

  function setError(message) {
    contentNode.replaceChildren();
    var paragraph = document.createElement("p");
    paragraph.className = "shankara-reader-error";
    paragraph.setAttribute("role", "alert");
    paragraph.textContent = message + " ";
    var link = document.createElement("a");
    link.href = contentsLink.href || rootUrl.href;
    link.textContent = "Return to the text contents";
    paragraph.append(link);
    contentNode.append(paragraph);
  }

  function makeGloss(words) {
    var validWords = Array.isArray(words) ? words.filter(function (word) { return word && word.sa && word.en; }) : [];
    if (!validWords.length) return null;
    var details = document.createElement("details");
    details.className = "gita-details shankara-word-gloss";
    var summary = document.createElement("summary");
    summary.textContent = "Word for Word";
    var reveal = document.createElement("div");
    reveal.className = "gita-reveal";
    var list = document.createElement("div");
    list.className = "gita-word-list";
    validWords.forEach(function (word) {
      var row = document.createElement("div");
      row.className = "gita-word-row";
      var source = document.createElement("span");
      source.className = "gita-word-source";
      var deva = document.createElement("span");
      deva.className = "gita-word-dev";
      deva.lang = "sa-Deva";
      deva.textContent = String(word.sa).trim();
      source.append(deva);
      var gloss = document.createElement("span");
      gloss.className = "gita-word-gloss";
      gloss.textContent = String(word.en).trim();
      row.append(source, gloss);
      list.append(row);
    });
    reveal.append(list);
    details.append(summary, reveal);
    return details;
  }

  function referenceFor(unit, index) {
    if (unit.number !== undefined && unit.number !== null && String(unit.number).trim()) return String(unit.number).trim();
    if (Array.isArray(unit.sourceNumbers) && unit.sourceNumbers.length) return unit.sourceNumbers.map(String).join(" · ");
    return String(index + 1);
  }

  function qualifiedReferenceFor(metadata, unit, index) {
    return metadata.iast + " " + referenceFor(unit, index);
  }

  function shortSectionTitle(label, metadata, isFullText) {
    if (isFullText) return metadata.iast;
    var title = String(label || "").trim();
    title = title.replace(/^(?:Chapter|Part|Section|Prakaraṇa)\s+[\w.-]+\s*[:—–-]\s*/i, "");
    title = title.replace(/\s*[·•]\s*(?:verses?|stanzas?|passages?)\s+.*$/i, "");
    if (!title || /^(?:Chapter|Part|Section|Prakaraṇa)\s+[\w.-]+$/i.test(title)) return metadata.iast;
    return title;
  }

  function romanNumeral(value) {
    return ["", "I", "II", "III", "IV", "V", "VI"][Number(value)] || String(value);
  }

  function sectionContext(work, metadata, item, index, isFullText) {
    if (isFullText || item.type === "complete") return metadata.iast + " · Complete text";
    if (work === "panchadasi") {
      var match = String(item.label).match(/^Chapter\s+(\d+)/i);
      var chapter = Number(item.key || (match && match[1]) || index + 1);
      var book = Math.floor((chapter - 1) / 5) + 1;
      return metadata.iast + " · Book " + romanNumeral(book) + ", Chapter " + chapter;
    }
    var label = String(item.label || "");
    var structural = label.match(/^(Chapter|Part|Section|Prakaraṇa)\s+([\w.-]+)/i);
    if (structural) return metadata.iast + " · " + structural[1] + " " + structural[2];
    var group = String(item.group || "").match(/^(Book|Part)\s+([IVX]+)/i);
    if (group) return metadata.iast + " · " + group[1] + " " + group[2] + ", Section " + (index + 1);
    if (work === "mandukya-karika") return metadata.iast + " · Prakaraṇa " + (index + 1);
    return metadata.iast + " · Section " + (index + 1);
  }

  function bylineAuthor(author) {
    return String(author || "").replace(/^Traditionally attributed to\s+/i, "").split(/[;.]/, 1)[0].trim();
  }

  function sourceReferencesFor(unit) {
    if (!Array.isArray(unit.sourceNumbers) || !unit.sourceNumbers.length) return "";
    var values = unit.sourceNumbers.map(function (value) { return String(value).trim(); }).filter(Boolean);
    if (!values.length || (unit.number !== undefined && values.length === 1 && values[0] === String(unit.number).trim())) return "";
    var range = String(unit.number || "").match(/^\s*(\d+)\s*[–-]\s*(\d+)\s*$/);
    if (range && values.length > 1 && values.every(function (value, index) { return /^\d+$/.test(value) && Number(value) === Number(range[1]) + index; }) && Number(values[values.length - 1]) === Number(range[2])) return "";
    return values.join(" · ");
  }

  function labelForKey(value) {
    return String(value).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, function (first) { return first.toUpperCase(); });
  }

  function appendCitationValue(list, label, value) {
    if (value === undefined || value === null || value === "") return;
    if (Array.isArray(value)) {
      value.forEach(function (item, index) { appendCitationValue(list, label + (value.length > 1 ? " " + (index + 1) : ""), item); });
      return;
    }
    if (typeof value === "object") {
      Object.keys(value).forEach(function (key) { appendCitationValue(list, label ? label + " · " + labelForKey(key) : labelForKey(key), value[key]); });
      return;
    }
    var row = document.createElement("div");
    row.className = "reader-citation-row";
    var term = document.createElement("dt");
    term.textContent = label;
    var description = document.createElement("dd");
    var text = String(value);
    if (/^https?:\/\//i.test(text)) {
      var link = document.createElement("a");
      link.href = text;
      link.rel = "noopener noreferrer";
      link.textContent = text;
      description.append(link);
    } else {
      description.textContent = text;
    }
    row.append(term, description);
    list.append(row);
  }

  function makeCitationDetails(data, metadata) {
    var source = data && data.source;
    var credit = data && data.translationCredit;
    var authorship = metadata && metadata.author;
    if ((!source || !Object.keys(source).length) && !credit && !authorship) return null;
    var details = document.createElement("details");
    details.className = "reader-citation-details";
    var summary = document.createElement("summary");
    summary.textContent = "Text source, authorship, and translation credit";
    var list = document.createElement("dl");
    list.className = "reader-citation-list";
    if (source) appendCitationValue(list, "Source", source);
    if (authorship) appendCitationValue(list, "Authorship", authorship);
    if (credit) appendCitationValue(list, "Translation", credit);
    details.append(summary, list);
    return details;
  }

  function renderUnit(unit, index, metadata) {
    var card = document.createElement("article");
    var proseEntry = metadata.prose || /^(?:prose|passage|text)\b/i.test(String(unit.label || ""));
    card.className = "gita-verse shankara-verse" + (proseEntry ? " shankara-prose" : "");
    if (proseEntry) card.dataset.readingFormat = "prose";
    card.id = String(unit.id);
    card.setAttribute("aria-label", qualifiedReferenceFor(metadata, unit, index));

    var reference = document.createElement("h2");
    reference.textContent = qualifiedReferenceFor(metadata, unit, index);
    reference.className = "reader-reference";

    var sanskrit = document.createElement("div");
    sanskrit.className = "gita-sanskrit sa-text";
    sanskrit.lang = "sa-Deva";
    sanskrit.textContent = String(unit.deva || "");

    var iast = document.createElement("p");
    iast.className = "reader-inline-iast";
    iast.lang = "sa-Latn";
    iast.textContent = String(unit.iast || "");

    var translation = document.createElement("p");
    translation.className = "gita-translation";
    translation.textContent = String(unit.translation || "");

    card.append(reference, sanskrit, iast, translation);

    if (unit.editionTranslation) {
      var editionTranslation = document.createElement("p");
      editionTranslation.className = "reader-edition-translation";
      var editionLabel = document.createElement("span");
      editionLabel.className = "reader-note-label";
      editionLabel.textContent = "Alternate edition translation";
      editionTranslation.append(editionLabel, document.createTextNode(String(unit.editionTranslation)));
      card.append(editionTranslation);
    }

    var sourceReferences = sourceReferencesFor(unit);
    if (sourceReferences) {
      var sourceReferenceNode = document.createElement("p");
      sourceReferenceNode.className = "reader-source-reference";
      var sourceReferenceLabel = document.createElement("span");
      sourceReferenceLabel.className = "reader-note-label";
      sourceReferenceLabel.textContent = "Source reference";
      sourceReferenceNode.append(sourceReferenceLabel, document.createTextNode(sourceReferences));
      card.append(sourceReferenceNode);
    }

    var gloss = makeGloss(unit.gloss);
    if (gloss) {
      var controls = document.createElement("div");
      controls.className = "gita-controls";
      controls.append(gloss);
      card.append(controls);
    }

    [
      ["Commentary", unit.commentary], ["Note", unit.note], ["Notes", unit.notes],
      ["Source note", unit.sourceNote], ["Editorial note", unit.editorialNote]
    ].forEach(function (entry) {
      if (!entry[1]) return;
      var noteNode = document.createElement("p");
      noteNode.className = "reader-text-note";
      var noteLabel = document.createElement("span");
      noteLabel.className = "reader-note-label";
      noteLabel.textContent = entry[0];
      noteNode.append(noteLabel, document.createTextNode(String(entry[1])));
      card.append(noteNode);
    });
    return card;
  }

  function renderVerseNavigation(units, startIndex, isFull) {
    listNode.replaceChildren();
    var shownUnits = isFull ? units : units.slice(startIndex.start, startIndex.end);
    var offset = isFull ? 0 : startIndex.start;
    shownUnits.forEach(function (unit, index) {
      var item = document.createElement("li");
      var link = document.createElement("a");
      var reference = referenceFor(unit, offset + index);
      link.className = "reader-verse-link";
      link.href = "#" + encodeURIComponent(String(unit.id));
      link.textContent = reference;
      link.dataset.verseId = String(unit.id);
      link.setAttribute("aria-label", "Jump to " + reference);
      item.append(link);
      listNode.append(item);
    });
  }

  function trackActiveVerse(units) {
    var cards = Array.from(contentNode.querySelectorAll(".shankara-verse"));
    var links = Array.from(listNode.querySelectorAll(".reader-verse-link"));
    function setActive(id) {
      links.forEach(function (link) {
        var selected = link.dataset.verseId === id;
        link.classList.toggle("is-active", selected);
        if (selected) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
      var unit = units.find(function (item) { return String(item.id) === id; });
      if (unit) tocProgress.textContent = "Reading " + referenceFor(unit, units.indexOf(unit));
    }
    if ("IntersectionObserver" in global) {
      var observer = new IntersectionObserver(function (entries) {
        var visible = entries.filter(function (entry) { return entry.isIntersecting; }).sort(function (a, b) {
          return Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top);
        });
        if (visible[0]) setActive(visible[0].target.id);
      }, { rootMargin: "-12% 0px -72% 0px", threshold: [0, 0.1, 0.3] });
      cards.forEach(function (card) { observer.observe(card); });
    } else if (cards.length) {
      setActive(cards[0].id);
    }
  }

  function addMobileDisclosure() {
    var toc = document.getElementById("reader-toc");
    var button = document.createElement("button");
    button.className = "advaita-mobile-contents-toggle";
    button.type = "button";
    button.textContent = "CONTENTS";
    button.setAttribute("aria-controls", "chapter-list");
    button.setAttribute("aria-expanded", "false");
    button.addEventListener("click", function () {
      var expanded = toc.classList.toggle("is-expanded");
      button.setAttribute("aria-expanded", String(expanded));
    });
    toc.insertBefore(button, toc.firstChild);
    listNode.addEventListener("click", function (event) {
      if (event.target.closest("a.reader-verse-link") && global.innerWidth <= 760) {
        toc.classList.remove("is-expanded");
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  function renderPager(items, selectedIndex, full) {
    if (full) return null;
    var pager = document.createElement("nav");
    pager.className = "reader-chapter-nav";
    pager.setAttribute("aria-label", "Section navigation");
    var previous = items[selectedIndex - 1];
    var next = items[selectedIndex + 1];
    var left = document.createElement(previous ? "a" : "span");
    if (previous) {
      left.rel = "prev";
      left.href = chapterUrl(previous.id);
      left.textContent = "← " + previous.label;
    }
    var contents = document.createElement("a");
    contents.href = contentsLink.href;
    contents.className = "reader-contents-return";
    contents.textContent = "All contents";
    var right = document.createElement(next ? "a" : "span");
    if (next) {
      right.rel = "next";
      right.href = chapterUrl(next.id);
      right.textContent = next.label + " →";
    }
    pager.append(left, contents, right);
    return pager;
  }

  function load() {
    if (!navigation || !navigation.allowed(work)) {
      titleNode.textContent = "Text not found";
      contentsLink.href = rootUrl.href;
      fullTextLink.href = rootUrl.href;
      setError("Choose a text from the Advaita texts page.");
      return;
    }
    var metadata = navigation.metadata(work);
    var contentsUrl = new URL("book-contents.html", rootUrl);
    contentsUrl.searchParams.set("work", work);
    contentsLink.href = contentsUrl.href;
    contentsLink.textContent = "All text contents";
    fullTextLink.href = navigation.readerUrl(work, true);
    fullTextLink.textContent = "Read full text";
    root.dataset.work = work;
    root.classList.add("page");
    root.querySelector(".shankara-reading-grid").classList.add("reader-grid");
    root.querySelector(".gita-hero").classList.add("article-head");
    document.getElementById("reader-toc").classList.add("side-toc");
    document.querySelector(".reader-toc-head h2").classList.add("side-toc-title");
    contentNode.classList.add("article", "document-content");
    addMobileDisclosure();

    var dataUrl = new URL("/advaita/assets/data/shankara/" + encodeURIComponent(work) + ".json", global.location.origin);
    dataUrl.searchParams.set("v", "reader-gloss-20261027b");
    fetch(dataUrl.href, { credentials: "same-origin", cache: "no-cache" }).then(function (response) {
      if (!response.ok) throw new Error("Text data is unavailable.");
      return response.json();
    }).then(function (data) {
      var units = Array.isArray(data && data.units) ? data.units : [];
      if (!units.length || (data.expectedUnits && units.length !== data.expectedUnits)) throw new Error("The complete text data is incomplete.");
      if (units.some(function (unit) { return !unit || !unit.id || !unit.deva || !unit.iast || !unit.translation; })) throw new Error("A Sanskrit, IAST, or translation field is missing.");

      var tocHeading = document.querySelector(".reader-toc-head h2");
      tocHeading.textContent = "CONTENTS";

      var items = navigation.itemsForReader(work, data);
      if (!items.length) throw new Error("No readable text units were found.");
      var selectedIndex = items.findIndex(function (item) { return item.id === requestedUnit; });
      var requestedUnitIndex = requestedUnit ? units.findIndex(function (unit) { return String(unit.id) === requestedUnit; }) : -1;
      if (requestedUnitIndex < 0 && requestedUnit) {
        requestedUnitIndex = units.findIndex(function (unit) {
          var values = [unit.number, unit.label];
          if (Array.isArray(unit.sourceNumbers)) values = values.concat(unit.sourceNumbers);
          return values.some(function (value) {
            var candidate = String(value === undefined || value === null ? "" : value).trim();
            return candidate === requestedUnit || candidate.replace(/^(?:Verse|Text|Passage|Prose)\s+/i, "") === requestedUnit;
          });
        });
      }
      var legacyTargetIndex = -1;
      var legacySection = requestedUnit && requestedUnit.match(new RegExp("^(?:section-" + work + "-|treatise-" + work + "-section-)(\\d+)$"));
      if (legacySection) {
        var legacySectionNumber = Number(legacySection[1]);
        if (work === "svsss" && data.sections && data.sections[legacySectionNumber - 1]) {
          var legacyStart = data.sections[legacySectionNumber - 1].startVerse;
          legacyTargetIndex = units.findIndex(function (unit) {
            var values = [unit.number];
            if (Array.isArray(unit.sourceNumbers)) values = values.concat(unit.sourceNumbers);
            return values.some(function (value) { return String(value) === String(legacyStart); });
          });
          if (legacyTargetIndex >= 0) {
            selectedIndex = items.findIndex(function (item, index) {
              var end = items[index + 1] ? items[index + 1].index : units.length;
              return legacyTargetIndex >= item.index && legacyTargetIndex < end;
            });
          }
        } else if (legacySectionNumber > 0 && legacySectionNumber <= items.length) {
          selectedIndex = legacySectionNumber - 1;
          legacyTargetIndex = items[selectedIndex].index;
        }
      }
      if (selectedIndex < 0 && requestedUnitIndex >= 0) {
        selectedIndex = items.findIndex(function (item, index) {
          var end = items[index + 1] ? items[index + 1].index : units.length;
          return requestedUnitIndex >= item.index && requestedUnitIndex < end;
        });
      }
      if (selectedIndex < 0) selectedIndex = 0;
      if (selectedIndex >= items.length) throw new Error("That section is not in this text.");

      var selectedStart = items[selectedIndex].index;
      var selectedEnd = items[selectedIndex + 1] ? items[selectedIndex + 1].index : units.length;
      var selectedUnits = isFullText ? units : units.slice(selectedStart, selectedEnd);
      if (!selectedUnits.length) throw new Error("The selected section is empty.");

      var selectedLabel = isFullText ? "Complete text" : items[selectedIndex].label;
      var selectedTitle = shortSectionTitle(selectedLabel, metadata, isFullText);
      titleNode.textContent = selectedTitle;
      titleNode.dataset.vdBilingual = "true";
      chapterTitle.textContent = sectionContext(work, metadata, items[selectedIndex], selectedIndex, isFullText);
      var unitLabel = metadata.prose ? "prose passages" : "verses";
      var fullAuthor = metadata.author || data.author || "";
      var conciseAuthor = bylineAuthor(fullAuthor);
      authorNode.textContent = selectedUnits.length + " " + unitLabel + (conciseAuthor ? " · " + conciseAuthor : "");
      authorNode.title = fullAuthor;
      authorNode.hidden = !authorNode.textContent;
      document.title = selectedTitle + " — " + metadata.iast + " — Viveka Dṛṣṭi";
      contentNode.replaceChildren();

      var selectedRange = { start: selectedStart, end: selectedEnd };
      renderVerseNavigation(units, selectedRange, isFullText);
      var glossCount = 0;
      selectedUnits.forEach(function (unit, index) {
        if (Array.isArray(unit.gloss) && unit.gloss.some(function (word) { return word && word.sa && word.en; })) glossCount += 1;
        contentNode.append(renderUnit(unit, isFullText ? index : selectedStart + index, metadata));
      });
      coverageNode.textContent = glossCount === selectedUnits.length
        ? "Word for Word glosses are available for all " + glossCount + " entries in this view."
        : "Word for Word glosses are available for " + glossCount + " of " + selectedUnits.length + " entries in this view.";
      var pager = renderPager(items, selectedIndex, isFullText);
      if (pager) contentNode.append(pager);
      var citationDetails = makeCitationDetails(data, metadata);
      if (citationDetails) contentNode.append(citationDetails);
      trackActiveVerse(selectedUnits);
      if (isFullText && global.location.hash && (requestedUnitIndex >= 0 || legacyTargetIndex >= 0)) {
        var anchorIndex = requestedUnitIndex >= 0 ? requestedUnitIndex : legacyTargetIndex;
        var anchorId = String(units[anchorIndex].id);
        if (decodeHash(global.location.hash.slice(1)) !== anchorId) {
          global.history.replaceState(null, "", global.location.pathname + global.location.search + "#" + encodeURIComponent(anchorId));
        }
        global.requestAnimationFrame(function () {
          var anchor = document.getElementById(anchorId);
          if (anchor) anchor.scrollIntoView({ block: "start" });
        });
      }
    }).catch(function (error) {
      chapterTitle.textContent = "Could not load this text";
      setError("The selected text could not be loaded. " + error.message);
      console.error(error);
    });
  }

  load();
}(window));
