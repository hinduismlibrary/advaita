(function (global) {
  "use strict";

  var editorialNotice = "The following thematic divisions are editorial aids to navigation and do not represent original chapters of the Sanskrit text.";
  var works = {
    "advaita-makaranda": { iast: "Advaitamakaranda", devanagari: "अद्वैतमकरन्दः", english: "Nectar of Non-Duality", description: "A continuous 28-verse teaching on the witness Self and non-dual reality.", author: "Traditionally attributed to Lakṣmīdhara Kavi." },
    "advaita-pancharatnam": { iast: "Advaitapañcaratnam", devanagari: "अद्वैतपञ्चरत्नम्", english: "Five Jewels of Non-Duality", description: "A short five-verse hymn on the non-dual Self.", author: "Traditionally attributed to Ādi Śaṅkara." },
    "aparokshanubhuti": {
      iast: "Aparokṣānubhūti", devanagari: "अपरोक्षानुभूतिः", english: "Direct Knowledge of the Self", author: "Traditionally attributed to Ādi Śaṅkara.", editorial: true,
      divisions: [
        { label: "The seeker and the call to inquiry · verses 1–16", start: 1 },
        { label: "The Self, the bodies, and the appearance of the world · verses 17–67", start: 17 },
        { label: "Ignorance, knowledge, and liberation · verses 68–99", start: 68 },
        { label: "The fifteen limbs of direct realization · verses 100–126", start: 100 },
        { label: "Obstacles and the completion of inquiry · verses 127–144", start: 127 }
      ]
    },
    "atma-bodha": {
      iast: "Ātmabodha", devanagari: "आत्मबोधः", english: "Knowledge of the Self", author: "Traditionally attributed to Ādi Śaṅkara.", editorial: true,
      divisions: [
        { label: "Knowledge as the means to liberation · verses 1–5", start: 1 },
        { label: "The world, Brahman, and limiting adjuncts · verses 6–17", start: 6 },
        { label: "The Self as witness, beyond agency and enjoyment · verses 18–29", start: 18 },
        { label: "Discrimination and the knowledge ‘I am Brahman’ · verses 30–37", start: 30 },
        { label: "Contemplation and the arising of realization · verses 38–46", start: 38 },
        { label: "The liberated sage and the vision of unity · verses 47–53", start: 47 },
        { label: "Brahman as bliss, reality, and consciousness · verses 54–68", start: 54 }
      ]
    },
    "atmavidya-vilasa": {
      iast: "Ātmavidyāvilāsa", devanagari: "आत्मविद्याविलासः", english: "The Play of Self-Knowledge", author: "Sadāśivendra Sarasvatī (named in the colophon).", editorial: true,
      divisions: [
        { label: "The teacher’s grace and the ascetic’s absorption · verses 1–20", index: 0 },
        { label: "The realized renunciant’s life and freedom · verses 21–40", start: 21 },
        { label: "Detachment, Self-knowledge, and non-dual bliss · verses 41–65", start: 41 }
      ]
    },
    "upadesha-panchakam": { iast: "Upadeśapañcakam (Sādhanapañcakam)", devanagari: "उपदेशपञ्चकम् (साधनपञ्चकम्)", english: "Five Instructions (Five Practices)", description: "Five stanzas presenting forty concise instructions for spiritual practice.", author: "Traditionally attributed to Ādi Śaṅkara." },
    "upadesha-sahasri": { iast: "Upadeśasāhasrī", devanagari: "उपदेशसाहस्री", english: "A Thousand Teachings", author: "Ādi Śaṅkara", traditional: true, partGroups: true },
    "ekashloki": { iast: "Ekaślokī", devanagari: "एकश्लोकी", english: "One Verse", description: "A compact one-verse inquiry into the Self.", author: "Traditionally attributed to Ādi Śaṅkara." },
    "tattvabodha": { iast: "Tattvabodha", devanagari: "तत्त्वबोधः", english: "Knowledge of Reality", description: "A concise prose introduction to Advaita Vedānta and its principal terms.", author: "Traditionally attributed to Ādi Śaṅkara; some manuscript colophons name Vāsudevendra.", editorial: true, prose: true },
    "dashashloki": { iast: "Daśaślokī", devanagari: "दशश्लोकी", english: "Ten Verses", description: "A continuous ten-verse inquiry into the nature of the Self.", author: "Traditionally attributed to Ādi Śaṅkara." },
    "drg-drsya-viveka": { iast: "Dṛg-dṛśya-viveka", devanagari: "दृग्दृश्यविवेकः", english: "Discrimination of Seer and Seen", description: "A continuous short inquiry distinguishing awareness from what is perceived.", author: "Authorship is disputed; attributed to Ādi Śaṅkara, Bhāratī Tīrtha, or Vidyāraṇya. Swami Nikhilānanda favors Bhāratī Tīrtha." },
    "naishkarmya-siddhi": { iast: "Naiṣkarmyasiddhi", devanagari: "नैष्कर्म्यसिद्धिः", english: "Mastery of Actionlessness", author: "Sureśvara", traditional: true },
    "panchadasi": { iast: "Pañcadaśī", devanagari: "पञ्चदशी", english: "Fifteen Chapters", author: "Traditionally attributed to Vidyāraṇya; some sources credit Bhāratī Tīrtha with part or all of the text.", traditional: true },
    "panchikarana-prakarana": { iast: "Pañcīkaraṇa-prakaraṇa", devanagari: "पञ्चीकरणप्रकरणम्", english: "The Treatise on Fivefold Combination", description: "A short prose text on the states of experience, the Self, and the fivefold combination of elements.", prose: true },
    "brahmajnanavali-mala": { iast: "Brahmajñānāvalīmālā", devanagari: "ब्रह्मज्ञानावलीमाला", english: "Garland of Knowledge of Brahman", description: "A short continuous garland of verses on the imperishable Self and non-duality.", author: "Traditionally attributed to Ādi Śaṅkara." },
    "brahma-siddhi": { iast: "Brahmasiddhi", devanagari: "ब्रह्मसिद्धिः", english: "Knowledge of Brahman", author: "Maṇḍana Miśra", traditional: true, sectionGroups: true, structureNote: "The source edition numbers the Siddhi section 3.1–3.12; its colophon identifies it as the fourth kāṇḍa." },
    "mandukya-karika": { iast: "Māṇḍūkyakārikā", devanagari: "माण्डूक्यकारिका", english: "Verses on the Māṇḍūkya Upaniṣad", author: "Gauḍapāda", traditional: true, sectionGroups: true },
    "vedantasara": { iast: "Vedāntasāra", devanagari: "वेदान्तसारः", english: "Essence of Vedānta", author: "Sadānanda Yogīndra", traditional: true, sectionGroups: true },
    "vivekachudamani": {
      iast: "Vivekacūḍāmaṇi", devanagari: "विवेकचूडामणिः", english: "Crest-Jewel of Discernment", author: "Traditionally attributed to Ādi Śaṅkara; authorship is disputed.", editorial: true,
      divisions: [
        { label: "The qualified seeker and the body–mind · verses 1–100", start: 1 },
        { label: "Ignorance, the Witness, and direct knowledge · verses 101–222", start: 101 },
        { label: "Realization, practice, and steady non-dual knowledge · verses 223–402", start: 223 },
        { label: "Liberation, the liberated sage, and the disciple’s awakening · verses 403–482", start: 403 },
        { label: "The Self beyond the states and the final teaching · verses 483–580", start: 483 }
      ]
    },
    "svsss": {
      iast: "Sarvavedāntasiddhāntasārasaṅgraha", devanagari: "सर्ववेदान्तसिद्धान्तसारसङ्ग्रहः", english: "Summary of Vedānta Conclusions", author: "Traditionally attributed to Ādi Śaṅkara.", editorial: true,
      divisions: [
        { label: "The qualified seeker and the means of inquiry · verses 1–296", start: 1 },
        { label: "Superimposition, Īśvara, and the created order · verses 297–456", start: 297 },
        { label: "The nature of the Self and non-duality · verses 457–702", start: 457 },
        { label: "The meaning of ‘That thou art’ · verses 703–794", start: 703 },
        { label: "Contemplation, samādhi, and yoga · verses 795–977", start: 795 },
        { label: "Videhamukti · verses 978–1006", start: 978 }
      ]
    },
    "bhaja-govindam": { iast: "Bhajagovindam (Mohamudgara)", devanagari: "भजगोविन्दम् (मोह-मुद्गरः)", english: "Worship Govinda", description: "The hymn’s opening, Dvādaśamañjarikā, Caturdaśamañjarikā, and closing verses are kept in their existing order.", author: "Traditionally attributed to Ādi Śaṅkara", traditional: true, sectionGroups: true },
    "dakshinamurti-ashtakam": { iast: "Śrī Dakṣiṇāmūrtyaṣṭakam", devanagari: "श्रीदक्षिणामूर्त्यष्टकम्", english: "Hymn to Dakṣiṇāmūrti", description: "A short continuous hymn with its opening and closing text.", author: "Traditionally attributed to Ādi Śaṅkara." },
    "hastamalaka-stotram": { iast: "Hastāmalaka-stotram", devanagari: "हस्तामलकस्तोत्रम्", english: "Hastāmalaka Hymn", description: "A short continuous philosophical hymn.", author: "Traditionally associated with Ādi Śaṅkara and the Hastāmalakīya tradition." },
    "kashi-panchakam": { iast: "Kāśīpañcakam", devanagari: "काशीपञ्चकम्", english: "Five Verses on Kāśī", description: "A short five-verse hymn.", author: "Traditionally attributed to Ādi Śaṅkara." },
    "manisha-panchakam": { iast: "Manīṣāpañcakam", devanagari: "मनीषापञ्चकम्", english: "Five Verses of Conviction", description: "A short continuous five-verse hymn.", author: "Traditionally attributed to Ādi Śaṅkara." },
    "maya-panchakam": { iast: "Māyāpañcakam", devanagari: "मायापञ्चकम्", english: "Five Verses on Māyā", description: "A short continuous five-verse hymn.", author: "Traditionally attributed to Ādi Śaṅkara." },
    "nirvana-shatkam": { iast: "Nirvāṇaṣaṭkam", devanagari: "निर्वाणषट्कम्", english: "Six Verses on Liberation", description: "A short continuous hymn on the nature of the Self.", author: "Traditionally attributed to Ādi Śaṅkara." },
    "shatpadi-stotram": { iast: "Viṣṇu Ṣaṭpadī Stotram", devanagari: "विष्णुषट्पदीस्तोत्रम्", english: "The Six-Footed Hymn to Viṣṇu", description: "A short continuous devotional hymn.", author: "Traditionally attributed to Ādi Śaṅkara." },
    "yati-panchakam": { iast: "Yatipañcakam", devanagari: "यतिपञ्चकम्", english: "Five Verses on the Renunciant", description: "A short continuous hymn on the renunciant.", author: "Traditionally attributed to Ādi Śaṅkara." }
  };

  var panchadasiTitles = ["", "Tattva-viveka", "Pañca-mahā-bhūta-viveka", "Pañca-kośa-viveka", "Dvaita-viveka", "Mahā-vākya", "Citra-dīpa", "Tṛpti-dīpa", "Kūṭastha-dīpa", "Dhyāna-dīpa", "Nāṭa-dīpa", "Brahmānanda", "Ātmānanda", "Advaitānanda", "Vidyānanda", "Viṣayānanda"];
  var mandukyaTitles = ["", "Āgama-prakaraṇa", "Vaitathya-prakaraṇa", "Advaita-prakaraṇa", "Alāta-śānti-prakaraṇa"];
  var svsssTitles = ["", "The Topic of this Study and the Successful Student", "Identifying Only with Ultimate Reality", "Otherwise Mis-identifying with Untruth", "You are Only that Ultimate Reality", "Assimilating this Knowledge"];
  var vedantasaraTitles = ["", "Chapter I — Preliminaries and qualifications · verses 1–31", "Chapter II — Superimposition and creation · verses 32–121", "Chapter III — The jīva and the nature of the Self · verses 122–136", "Chapter IV — De-superimposition and non-dual knowledge · verses 137–180", "Chapter V — The means to realization · verses 181–215", "Chapter VI — The liberated sage · verses 216–227"];

  function chapterNumber(unit, work) {
    if (unit && unit.chapter !== undefined && unit.chapter !== null && String(unit.chapter).trim() !== "") return String(unit.chapter);
    var id = String(unit && unit.id || "");
    var match = id.match(/^(?:panchadasi|svsss|mandukya-karika)-(\d+)-/);
    return match ? match[1] : "";
  }

  function numberFor(unit) {
    var value = unit && unit.number;
    if (value === undefined || value === null || value === "") {
      var source = unit && unit.sourceNumbers;
      value = Array.isArray(source) ? source[0] : source;
    }
    var text = String(value || "");
    var match = text.match(/(\d+)(?:\.(\d+))?(?:\.(\d+))?\s*$/);
    if (!match) return NaN;
    return Number(match[1]);
  }

  function indexAt(units, start) {
    if (start === 0) return 0;
    for (var i = 0; i < units.length; i += 1) {
      var values = [units[i].number];
      if (Array.isArray(units[i].sourceNumbers)) values = values.concat(units[i].sourceNumbers);
      if (values.some(function (value) {
        var text = String(value || "");
        return text === String(start) || numberFor({ number: value }) === Number(start);
      })) return i;
    }
    return -1;
  }

  function rangeItems(work, data) {
    var units = Array.isArray(data && data.units) ? data.units : [];
    var config = works[work] || {};
    return (config.divisions || []).map(function (division) {
      var index = division.index !== undefined ? division.index : indexAt(units, division.start);
      if (index < 0 || index >= units.length) return null;
      return { label: division.label, id: String(units[index].id), index: index, type: config.editorial ? "editorial" : "original", group: division.group || "" };
    }).filter(Boolean);
  }

  function sectionItems(work, data) {
    var units = Array.isArray(data && data.units) ? data.units : [];
    var sections = Array.isArray(data && data.sections) ? data.sections : [];
    var config = works[work] || {};
    if (!sections.length) return [];
    return sections.map(function (section) {
      var index = units.findIndex(function (unit) { return unit.sectionTitle && unit.sectionTitle === section.title; });
      if (index < 0 && section.id !== undefined) index = units.findIndex(function (unit) { return chapterNumber(unit, work) === String(section.id); });
      if (index < 0 && section.startVerse !== undefined) index = indexAt(units, section.startVerse);
      if (work === "atmavidya-vilasa" && Number(section.startVerse) === 1) index = 0;
      if (index < 0 || index >= units.length) return null;
      return { label: section.title, id: String(units[index].id), index: index, type: config.editorial ? "editorial" : "original", group: "" };
    }).filter(Boolean);
  }

  function groupedBy(work, data, field) {
    var units = Array.isArray(data && data.units) ? data.units : [];
    var groups = [];
    units.forEach(function (unit, index) {
      var key = field === "chapter" ? chapterNumber(unit, work) : String(unit[field] || "");
      if (!key) return;
      var previous = groups[groups.length - 1];
      if (!previous || previous.key !== key) {
        var label = field === "chapter" ? (unit.sectionTitle || "Chapter " + key) : key;
        if (work === "panchadasi") label = "Chapter " + key + (panchadasiTitles[Number(key)] ? ": " + panchadasiTitles[Number(key)] : "");
        if (work === "mandukya-karika") label = unit.sectionTitle || "Prakaraṇa " + key;
        if (work === "svsss") label = "Part " + key + (svsssTitles[Number(key)] ? ": " + svsssTitles[Number(key)] : "");
        if (work === "vedantasara") label = vedantasaraTitles[Number(key)] || "Chapter " + key;
        var group = "";
        if (work === "panchadasi") {
          var book = Math.floor((Number(key) - 1) / 5) + 1;
          group = ["", "Book I — Discrimination (Viveka)", "Book II — Light (Dīpa)", "Book III — Bliss (Ānanda)"][book];
        }
        if (work === "upadesha-sahasri") group = Number(key) <= 19 ? "Part I — Padyabhāga (Metrical section)" : "Part II — Gadyabhāga (Prose section)";
        if (work === "brahma-siddhi") label = unit.sectionTitle || label;
        groups.push({ key: key, label: label, id: String(unit.id), index: index, type: "original", group: group });
      }
    });
    return groups;
  }

  function pageItems(work, data) {
    if (work === "panchadasi" || work === "mandukya-karika" || work === "upadesha-sahasri") return groupedBy(work, data, "chapter");
    if (work === "vedantasara") return groupedBy(work, data, "chapter");
    if (["naishkarmya-siddhi", "brahma-siddhi", "bhaja-govindam"].indexOf(work) >= 0) return sectionItems(work, data).map(function (item) {
      if (work === "bhaja-govindam") {
        var canonical = item.label;
        if (/Dvādaśamañjarikā/.test(canonical)) item.label = "Dvādaśamañjarikā · verses 2–13";
        else if (/Caturdaśamañjarikā/.test(canonical)) item.label = "Caturdaśamañjarikā · verses 14–27";
        else if (/Opening Verse/.test(canonical)) item.label = "Opening verse · 1";
        else if (/Closing Verses/.test(canonical)) item.label = "Closing verses · 28–31";
        item.group = "Parts of the hymn";
      }
      return item;
    });
    if (works[work] && works[work].divisions) return rangeItems(work, data);
    if (work === "svsss") return rangeItems(work, data);
    if (work === "tattvabodha") return sectionItems(work, data);
    return [];
  }

  function readerItems(work, data) {
    var items = pageItems(work, data);
    if (items.length) return items;
    var units = Array.isArray(data && data.units) ? data.units : [];
    return units.length ? [{ label: "Complete text", id: String(units[0].id), index: 0, type: "complete", group: "" }] : [];
  }

  function readerUrl(work, full) {
    var url = new URL("book-chapter.html", global.location.href);
    url.searchParams.set("work", work);
    if (full) url.searchParams.set("full", "1");
    return url.href;
  }

  function metadata(work) { return works[work] || null; }
  function allowed(work) { return Object.prototype.hasOwnProperty.call(works, work); }
  function note(work) { var config = works[work] || {}; return config.editorial ? editorialNotice : (config.structureNote || ""); }

  global.AdvaitaReaderNavigation = {
    works: works,
    workIds: Object.keys(works),
    allowed: allowed,
    metadata: metadata,
    itemsForContents: pageItems,
    itemsForReader: readerItems,
    readerUrl: readerUrl,
    note: note,
    chapterNumber: chapterNumber
  };
}(window));
