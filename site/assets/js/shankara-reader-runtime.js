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
  var chapterTitle = document.getElementById("chapter-title");
  var contentNode = document.getElementById("chapter-content");
  var jumpForm = document.getElementById("reader-jump-form");
  var jumpInput = document.getElementById("reader-jump-input");
  var jumpLabel = document.getElementById("reader-jump-label");
  var jumpRange = document.getElementById("reader-jump-range");
  var jumpFeedback = document.getElementById("reader-jump-feedback");
  var jumpUnits = [];
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
    if (isFullText) return "";
    if (item.type === "complete") return metadata.iast;
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

  function sourceReferencesFor(unit) {
    if (!Array.isArray(unit.sourceNumbers) || !unit.sourceNumbers.length) return "";
    var values = unit.sourceNumbers.map(function (value) { return String(value).trim(); }).filter(Boolean);
    if (!values.length || (unit.number !== undefined && values.length === 1 && values[0] === String(unit.number).trim())) return "";
    var range = String(unit.number || "").match(/^\s*(\d+)\s*[–-]\s*(\d+)\s*$/);
    if (range && values.length > 1 && values.every(function (value, index) { return /^\d+$/.test(value) && Number(value) === Number(range[1]) + index; }) && Number(values[values.length - 1]) === Number(range[2])) return "";
    return values.join(" · ");
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
    reference.dataset.readerNumber = referenceFor(unit, index);
    reference.className = "reader-reference";

    var sanskrit = document.createElement("div");
    sanskrit.className = "gita-sanskrit sa-text";
    sanskrit.lang = "sa-Deva";
    var devanagariText = document.createElement("span");
    devanagariText.className = "reader-devanagari-text";
    devanagariText.textContent = String(unit.deva || "");
    sanskrit.append(devanagariText);

    var transliterationButton = document.createElement("button");
    transliterationButton.className = "reader-transliteration-toggle";
    transliterationButton.type = "button";
    transliterationButton.textContent = "Show transliteration";
    transliterationButton.setAttribute("aria-expanded", "false");

    var iast = document.createElement("p");
    iast.className = "reader-inline-iast";
    iast.lang = "sa-Latn";
    iast.id = card.id + "-transliteration";
    iast.hidden = true;
    iast.textContent = String(unit.iast || "");
    transliterationButton.setAttribute("aria-controls", iast.id);
    transliterationButton.addEventListener("click", function () {
      var expanded = transliterationButton.getAttribute("aria-expanded") !== "true";
      transliterationButton.setAttribute("aria-expanded", String(expanded));
      transliterationButton.textContent = expanded ? "Hide transliteration" : "Show transliteration";
      iast.hidden = !expanded;
    });

    var translation = document.createElement("p");
    translation.className = "gita-translation";
    translation.textContent = String(unit.translation || "");

    card.append(reference, sanskrit, transliterationButton, iast, translation);

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

  function configureJumpControl(units, metadata) {
    jumpUnits = units;
    if (!jumpForm || !jumpInput || !jumpLabel || !jumpRange) return;
    var maximum = Math.max(1, units.length);
    var unitType = metadata.prose ? "section" : "verse";
    jumpLabel.textContent = "Go to " + unitType + ":";
    jumpInput.min = "1";
    jumpInput.max = String(maximum);
    jumpInput.placeholder = "1–" + maximum;
    jumpInput.setAttribute("aria-label", "Go to " + unitType + " from 1 to " + maximum);
    jumpInput.disabled = false;
    var submitButton = jumpForm.querySelector("button[type=submit]");
    if (submitButton) submitButton.disabled = false;
    jumpRange.textContent = "1–" + maximum;
    if (jumpFeedback) jumpFeedback.textContent = "";
  }

  if (jumpForm) jumpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var index = Number(jumpInput && jumpInput.value) - 1;
    if (!Number.isInteger(index) || index < 0 || index >= jumpUnits.length) {
      if (jumpFeedback) jumpFeedback.textContent = "Enter a number within the range shown.";
      return;
    }
    var target = document.getElementById(String(jumpUnits[index].id));
    if (!target || !contentNode.contains(target)) return;
    var hash = "#" + encodeURIComponent(target.id);
    global.history.replaceState(null, "", global.location.pathname + global.location.search + hash);
    target.scrollIntoView({ block: "start", behavior: "smooth" });
    if (jumpFeedback) jumpFeedback.textContent = "";
  });

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
    var right = document.createElement(next ? "a" : "span");
    if (next) {
      right.rel = "next";
      right.href = chapterUrl(next.id);
      right.textContent = next.label + " →";
    }
    pager.append(left, right);
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
    contentsLink.textContent = "← Contents";
    fullTextLink.href = navigation.readerUrl(work, true);
    fullTextLink.textContent = "Full text";
    root.dataset.work = work;
    root.classList.add("page");
    root.querySelector(".shankara-reading-grid").classList.add("reader-grid");
    root.querySelector(".gita-hero").classList.add("article-head");
    contentNode.classList.add("article", "document-content");

    var dataUrl = new URL("/advaita/assets/data/shankara/" + encodeURIComponent(work) + ".json", global.location.origin);
    dataUrl.searchParams.set("v", "reader-gloss-20261027b");
    fetch(dataUrl.href, { credentials: "same-origin", cache: "no-cache" }).then(function (response) {
      if (!response.ok) throw new Error("Text data is unavailable.");
      return response.json();
    }).then(function (data) {
      var units = Array.isArray(data && data.units) ? data.units : [];
      if (!units.length || (data.expectedUnits && units.length !== data.expectedUnits)) throw new Error("The complete text data is incomplete.");
      if (units.some(function (unit) { return !unit || !unit.id || !unit.deva || !unit.iast || !unit.translation; })) throw new Error("A Sanskrit, IAST, or translation field is missing.");
      var isShortText = units.length <= 50;
      if (isShortText) isFullText = true;
      var items = navigation.itemsForReader(work, data);
      if (!items.length) throw new Error("No readable text units were found.");
      var contentsItems = navigation.itemsForContents(work, data);
      var pageActions = root.querySelector(".reader-page-actions");
      var canBrowseContents = !isShortText && contentsItems.length > 0;
      contentsLink.hidden = !canBrowseContents;
      fullTextLink.hidden = !canBrowseContents || isFullText;
      if (pageActions) pageActions.hidden = !canBrowseContents;
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
      chapterTitle.hidden = !chapterTitle.textContent;
      document.title = selectedTitle + " — " + metadata.iast + " — Viveka Dṛṣṭi";
      contentNode.replaceChildren();

      selectedUnits.forEach(function (unit, index) {
        contentNode.append(renderUnit(unit, isFullText ? index : selectedStart + index, metadata));
      });
      configureJumpControl(selectedUnits, metadata);
      var pager = renderPager(items, selectedIndex, isFullText);
      if (pager) contentNode.append(pager);
      if (isFullText && (requestedUnitIndex >= 0 || legacyTargetIndex >= 0)) {
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
