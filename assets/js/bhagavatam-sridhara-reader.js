(() => {
  const root = document.querySelector('[data-bhagavatam-reader]');
  if (!root) return;

  const canto = Number(root.dataset.canto);
  const status = root.querySelector('[data-bhagavatam-status]');
  const chapterNav = root.querySelector('[data-bhagavatam-chapters]');
  const host = root.querySelector('[data-bhagavatam-host]');
  const titleNode = root.querySelector('[data-bhagavatam-chapter-title]');
  const heroTitle = root.querySelector('.gita-hero h1');
  const textCache = new Map();
  const jsonCache = new Map();
  const devanagariDigits = new Map(Object.entries({
    '०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'
  }));
  const independentVowels = new Map(Object.entries({
    'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ',
    'ए':'e','ऐ':'ai','ओ':'o','औ':'au'
  }));
  const vowelMarks = new Map(Object.entries({
    'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ',
    'े':'e','ै':'ai','ो':'o','ौ':'au'
  }));
  const consonants = new Map(Object.entries({
    'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ',
    'ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n',
    'प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v',
    'श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ'
  }));

  // Fill only verse-script fields left blank in the pinned English mirror.
  const devanagariOverrides = {"1.16.25":"इदं ममाचक्ष्व तवाधि-मूलं\nवसुन्धरे येन विकर्शितासि ।\nकालेन वा ते बलिनां बलीयसा\nसुरार्चितं किं हृतम् अम्ब सौभगम् ॥","2.8.8":"आसीद् यद्-उदरात् पद्मं लोक-संस्थान-लक्षणम् ।\nयावान् अयं वै पुरुष इयत्तावयवैः पृथक् ।\nतावान् असाव् इति प्रोक्तः संस्थावयववान् इव ॥","3.30.27":"कृन्तनं चावयवशो गजादिभ्यो भिदापनम् ।\nपातनं गिरिशृङ्गेभ्यो रोधनं चाम्बुगर्तयोः ॥","10.42.22":"तयोस् तद् अद्भुतं वीर्यं निशाम्य पुर-वासिनः ।\nतेजः प्रागल्भ्यं रूपं च मेनिरे विबुधोत्तमौ ॥","11.7.1":"यद् आत्थ मां महा-भाग तच् चिकीर्षितम् एव मे ।\nब्रह्मा भवो लोक-पालाः स्वर्-वासं मेऽभिकाङ्क्षिणः ॥"};

  function setStatus(message, error) {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle('sb-status-error', Boolean(error));
  }

  function pad(number) {
    return String(number).padStart(2, '0');
  }

  function toAsciiDigits(value) {
    return Array.from(String(value || '')).map((ch) => devanagariDigits.get(ch) || ch).join('');
  }

  function rawUrl(path, rootPath, commit) {
    return 'https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/' +
      commit + '/' + rootPath + '/' + path;
  }

  async function fetchText(url) {
    if (!textCache.has(url)) {
      const request = fetch(url, { mode: 'cors', cache: 'force-cache' })
        .then((response) => {
          if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
          return response.text();
        })
        .catch((error) => {
          textCache.delete(url);
          throw error;
        });
      textCache.set(url, request);
    }
    return textCache.get(url);
  }

  async function fetchJson(url) {
    if (!jsonCache.has(url)) {
      const request = fetch(url, { mode: 'cors', cache: 'force-cache' })
        .then((response) => {
          if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
          return response.json();
        })
        .catch((error) => {
          jsonCache.delete(url);
          throw error;
        });
      jsonCache.set(url, request);
    }
    return jsonCache.get(url);
  }

  function devanagariToIast(input) {
    const chars = Array.from(String(input || '').normalize('NFC'));
    let output = '';
    for (let index = 0; index < chars.length; index += 1) {
      const ch = chars[index];
      const next = chars[index + 1];
      if (consonants.has(ch)) {
        output += consonants.get(ch);
        if (next === '्') index += 1;
        else if (vowelMarks.has(next)) {
          output += vowelMarks.get(next);
          index += 1;
        } else output += 'a';
        continue;
      }
      if (independentVowels.has(ch)) { output += independentVowels.get(ch); continue; }
      if (vowelMarks.has(ch)) { output += vowelMarks.get(ch); continue; }
      if (devanagariDigits.has(ch)) { output += devanagariDigits.get(ch); continue; }
      if (ch === 'ं') { output += 'ṃ'; continue; }
      if (ch === 'ः') { output += 'ḥ'; continue; }
      if (ch === 'ँ') { output += 'm̐'; continue; }
      if (ch === 'ऽ') { output += '’'; continue; }
      if (ch === '।') { output += '|'; continue; }
      if (ch === '॥') { output += '||'; continue; }
      if (ch === '़' || ch === '्') continue;
      output += ch;
    }
    return output
      .replace(/\s+\|\|/g, ' ||')
      .replace(/\s+\|/g, ' |')
      .replace(/[ \t]+\n/g, '\n')
      .trim();
  }

  function stripInlineMarkdown(text) {
    return String(text || '')
      .replace(/\[\^[^\]]+\]/g, '')
      .replace(/\\([\\*_{}\[\]()#+\-.!])/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/\*([^*\n]+)\*/g, '$1')
      .replace(/_([^_\n]+)_/g, '$1')
      .replace(/<[^>]+>/g, '')
      .replace(/^\s*>\s?/gm, '')
      .replace(/>/g, '')
      .replace(/\\/g, '')
      .replace(/\*/g, '')
      .trim();
  }

  function cleanBlock(text) {
    return stripInlineMarkdown(text)
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function cleanLines(text) {
    return String(text || '')
      .split(/\n/)
      .map((line) => stripInlineMarkdown(line.replace(/[ \t]+$/g, '').trim()))
      .filter(Boolean);
  }

  function sectionBlock(body, heading) {
    const marker = '### ' + heading;
    const startMarker = body.indexOf(marker);
    if (startMarker < 0) return '';
    const contentStart = body.indexOf('\n', startMarker + marker.length) + 1;
    const nextHeading = body.indexOf('\n### ', contentStart);
    const nextText = body.indexOf('\n## ', contentStart);
    const stops = [nextHeading, nextText].filter((value) => value >= 0);
    const contentEnd = stops.length ? Math.min.apply(null, stops) : body.length;
    return body.slice(contentStart, contentEnd).trim();
  }

  function frontmatterTitle(markdown) {
    const match = String(markdown || '').match(/title\s*=\s*"([^"]+)"/i);
    return match ? match[1].replace(/^\d+\s+/, '').trim() : '';
  }

  function parseEnglish(markdown) {
    const entries = [];
    const headingPattern = /^##\s+Texts?\s+(\d+)(?:\s*[-–—]\s*(\d+))?\s*$/gmi;
    const headings = Array.from(String(markdown || '').matchAll(headingPattern));
    headings.forEach((match, index) => {
      const start = Number(match[1]);
      const end = Number(match[2] || match[1]);
      const bodyStart = match.index + match[0].length;
      const bodyEnd = index + 1 < headings.length ? headings[index + 1].index : markdown.length;
      const body = markdown.slice(bodyStart, bodyEnd);
      entries.push({
        start,
        end,
        devanagari: cleanLines(sectionBlock(body, 'Devanagari')),
        transliteration: cleanLines(sectionBlock(body, 'Verse text')),
        synonyms: cleanBlock(sectionBlock(body, 'Synonyms')),
        translation: cleanBlock(sectionBlock(body, 'Translation'))
      });
    });
    return { title: frontmatterTitle(markdown), entries };
  }

  function isCommentatorAttribution(text) {
    return /(?:Śrīdhara|Sridhara)(?:\s+Svāmī)?\s+(?:says|asks)\b|joint\s+[^.!?]{0,100}\bnote\s+says\b/i.test(String(text || ''));
  }

  function isNoCommentaryMarker(value) {
    return /^\\s*न\\s+(?:(?:कतमेन(?:ापि)?)\\s+)?व्याख्यातम्\\s*[।.]?\\s*$/.test(String(value || ''));
  }

  function readerVerseRange(targetCanto, targetChapter, startValue, endValue) {
    const start = Number(startValue);
    const end = Number(endValue);
    // In the pinned 11.23 witness, markers 35+ run one label ahead of the
    // English mirror. The second source marker 42 is already canonical 42.
    const offset = targetCanto === 11 && targetChapter === 23 && start >= 35 ? -1 : 0;
    return { start: start + offset, end: end + offset };
  }

  function parseEnglishCommentary(data, targetCanto, targetChapter) {
    return Array.isArray(data && data.entries)
      ? data.entries
        .filter((entry) => Number(entry.canto) === targetCanto && Number(entry.chapter) === targetChapter)
        .map((entry) => {
          const range = readerVerseRange(targetCanto, targetChapter, entry.start, entry.end);
          return {
            start: range.start,
            end: range.end,
            text: String(entry.text || '').trim()
          };
        })
        .filter((entry) => entry.text && !/^Śrīdhara Svāmī does not (?:explain this verse here|provide a separate explanatory block for (?:this verse|these verses) in the pinned Sanskrit file)\.?$/i.test(entry.text) && !isCommentatorAttribution(entry.text))
      : [];
  }

  function commentaryForRange(entries, start, end) {
    return entries
      .filter((entry) => entry.end >= start && entry.start <= end)
      .map((entry) => entry.text)
      .join('\n\n')
      .trim();
  }

  function parseSridhara(markdown, targetCanto, targetChapter) {
    const entries = [];
    const markerPattern = /(?:^|\n)\s*(?:\[\^[^\]]+\]\s*)?\*{0,2}॥\s*\*{0,2}([०-९]+)\s*\.\s*([०-९]+)\s*\.\s*([०-९]+)(?:\s*[-–—]\s*([०-९]+))?\s*\*{0,2}॥\s*\*{0,2}/g;
    // The corpus uses both the older “श्रीधर-स्वामी” label and the abbreviated “श्रीधरः” label.
    const labelPattern = /\*{0,2}श्रीधर(?:-स्वामी|ः)?(?:\s*,[^*\\n]+)?(?:\s*\([^*\\n]+\))?\s*[:：-]\s*\*{0,2}/;
    let sourceText = String(markdown || '');
    // A few Vasuki headings split Markdown emphasis inside the verse marker
    // (for example, “३.१२।**५”); normalize only those delimiters for parsing.
    sourceText = sourceText
      .replace(/(॥\s*[०-९]+\s*\.\s*[०-९]+)\s*।\s*\*{1,2}\s*([०-९]+)/g, '$1.$2')
      .replace(/(॥\s*[०-९]+\s*\.\s*[०-९]+)\s*\*{1,2}\s*।\s*\*{1,2}\s*([०-९]+)/g, '$1.$2')
      .replace(/(॥\s*[०-९]+\s*\.\s*[०-९]+\s*\.\s*[०-९]+(?:\s*[-–—]\s*[०-९]+)?)\s*\*{1,2}\s*॥/g, '$1 ॥')
      .replace(/॥\s*\*{1,2}([०-९]+\s*\.\s*[०-९]+\s*\.\s*[०-९]+(?:\s*[-–—]\s*[०-९]+)?)\*{1,2}\s*॥/g, '॥ $1 ॥');
    const markers = Array.from(sourceText.matchAll(markerPattern));
    let canto11Chapter23Verse42Seen = 0;

    markers.forEach((marker, index) => {
      const markerCanto = Number(toAsciiDigits(marker[1]));
      const markerChapter = Number(toAsciiDigits(marker[2]));
      const sourceStart = Number(toAsciiDigits(marker[3]));
      const sourceEnd = Number(toAsciiDigits(marker[4] || marker[3]));
      if (markerCanto !== targetCanto || markerChapter !== targetChapter) return;
      // The pinned VishvAsa file has a one-verse editorial numbering shift
      // after its 1.16.12 block: its markers 13+ match Vedabase 12+.
      // Canto 11, chapter 22 keeps its independently checked 36–38 correction.
      // In chapter 23, source markers 35+ are one ahead of the mirror; the
      // repeated source marker 42 is split by source order across mirror 41–42.
      let sourceOffset = markerCanto === 1 && markerChapter === 16 && sourceStart >= 13 ? -1
        : markerCanto === 11 && markerChapter === 22 && sourceStart >= 36 && sourceStart <= 38 ? 1
        : 0;
      if (markerCanto === 11 && markerChapter === 23 && sourceStart >= 35) {
        sourceOffset = -1;
        if (sourceStart === 42 && sourceEnd === 42) {
          sourceOffset = canto11Chapter23Verse42Seen === 0 ? -1 : 0;
          canto11Chapter23Verse42Seen += 1;
        }
      }
      const start = sourceStart + sourceOffset;
      const end = sourceEnd + sourceOffset;

      const segmentStart = marker.index + marker[0].length;
      const segmentEnd = index + 1 < markers.length ? markers[index + 1].index : sourceText.length;
      const segment = sourceText.slice(segmentStart, segmentEnd);
      const labelMatch = segment.match(labelPattern);
      if (!labelMatch) return;

      let commentary = segment.slice((labelMatch.index || 0) + labelMatch[0].length);
      // Some source files place an underscore divider between the label and the
      // actual Bhāvārtha-dīpikā text. Remove only that leading divider so the
      // first Śrīdhara block is not mistaken for an empty commentary segment.
      commentary = commentary.replace(/^\s*_{4,}\s*/, '');
      const stops = [
        commentary.search(/\n_{4,}/),
        commentary.search(/\n[-—]{12,}/),
        commentary.search(/(?:^|\n|॥)\s*\*{0,2}(?:श्रीधर(?:-स्वामी|ः)?|दिग्दर्शिनी|वंशीधर|वशिधर|श्रीनाथ|सनातन|जीव-?गोस्वामी|विश्वनाथ|बलदेव|मध्वाचार्य)/
        )
      ].filter((value) => value >= 0);
      if (stops.length) commentary = commentary.slice(0, Math.min.apply(null, stops));
      const text = cleanBlock(commentary);
      // A combined author line can end with “न व्याख्यातम्।”;
      // that is an explicit absence of Śrīdhara commentary, not source text.
      if (/^न\s+(?:कतमेनापि\s+)?व्याख्यातम्/.test(text)) return;
      if (text && text.replace(/[+\s]/g, '') !== '') entries.push({ start, end, text, sourceAvailable: true });
    });
    return entries;
  }

  function parseLocalSridhara(data, targetCanto, targetChapter) {
    return Object.values(data && data.entries ? data.entries : {})
      .filter((entry) => entry && entry.source_available && String(entry.sanskrit || '').trim() && !isNoCommentaryMarker(String(entry.sanskrit || '')))
      .map((entry) => {
        const range = readerVerseRange(targetCanto, targetChapter, entry.start, entry.end);
        return {
          start: range.start,
          end: range.end,
          text: String(entry.sanskrit).trim(),
          sourceAvailable: true,
          wordForWord: Array.isArray(entry.word_for_word) ? entry.word_for_word : [],
          transliteration: Array.isArray(entry.transliteration)
            ? entry.transliteration.join('\\n')
            : devanagariToIast(entry.sanskrit)
        };
      });
  }

  function parseLocalCommentary(data, targetCanto, targetChapter) {
    const sourceEntries = Array.isArray(data && data.entries)
      ? data.entries
      : Object.values(data && data.entries ? data.entries : {});
    return sourceEntries
      .filter((entry) => entry &&
        Number(entry.canto) === targetCanto &&
        Number(entry.chapter) === targetChapter)
      .map((entry) => {
        const sanskrit = String(entry.sanskrit || '').trim();
        const literal = String(entry.literal_english || '').trim();
        const range = readerVerseRange(targetCanto, targetChapter, entry.start, entry.end);
        const generatedPlaceholder = /^(?:contextual literal sense of|generic filler|translation pending|to be translated|placeholder(?:\s+(?:commentary|translation|gloss))?)/i.test(literal);
        const commentatorAttribution = isCommentatorAttribution(literal);
        const noCommentary = (entry.source_available === false && entry.source_gap !== true) ||
          isNoCommentaryMarker(sanskrit) ||
          /^no commentary[.]?$/i.test(literal);
        const sourceGap = entry.source_gap === true ||
          (entry.source_available === false && !noCommentary);
        return {
          start: range.start,
          end: range.end,
          text: noCommentary || sourceGap || generatedPlaceholder || commentatorAttribution ? '' : literal,
          noCommentary,
          sourceGap
        };
      })
      .filter((entry) => Number.isFinite(entry.start) && Number.isFinite(entry.end) &&
        (entry.text || entry.noCommentary || entry.sourceGap));
  }

  function commentaryStatusForRange(entries, start, end) {
    const matching = entries.filter((entry) => entry.end >= start && entry.start <= end);
    if (matching.some((entry) => entry.noCommentary)) return 'no-commentary';
    if (matching.some((entry) => entry.sourceGap)) return 'source-gap';
    return 'english-rendering-unavailable';
  }

  function parseLocalWordForWord(data, targetCanto, targetChapter) {
    const sourceEntries = Array.isArray(data && data.entries)
      ? data.entries
      : Object.values(data && data.entries ? data.entries : {});
    return sourceEntries
      .filter((entry) => entry &&
        (entry.canto == null || Number(entry.canto) === targetCanto) &&
        (entry.chapter == null || Number(entry.chapter) === targetChapter) &&
        (Array.isArray(entry.word_for_word) || Array.isArray(entry.pairs)))
      .map((entry) => {
        const sourcePairs = Array.isArray(entry.word_for_word) ? entry.word_for_word : entry.pairs;
        const range = readerVerseRange(targetCanto, targetChapter, entry.start, entry.end);
        return {
          start: range.start,
          end: range.end,
          pairs: sourcePairs
            .filter((pair) => Array.isArray(pair) && pair.length >= 2 && pair[0] && pair[1] && !/contextual literal sense of|generic filler|translation pending|to be translated|placeholder(?:\s+(?:gloss|translation|commentary))?|^no commentary\.?$/i.test(String(pair[1])) && !isNoCommentaryMarker(String(pair[1])))
            .map((pair) => [String(pair[0]), String(pair[1])])
        };
      });
  }

  function wordForWordForRange(entries, start, end) {
    const pairs = [];
    entries
      .filter((entry) => entry.end >= start && entry.start <= end)
      .sort((a, b) => a.start - b.start || a.end - b.end)
      .forEach((entry) => entry.pairs.forEach((pair) => pairs.push(pair)));
    return pairs;
  }

  function appendLines(target, text, italic) {
    const lines = String(text || '').split(/\n/).map((line) => line.trim()).filter(Boolean);
    lines.forEach((line, index) => {
      if (index) target.appendChild(document.createElement('br'));
      const node = italic ? document.createElement('em') : document.createElement('span');
      node.textContent = line;
      target.appendChild(node);
    });
  }

  function appendSynonyms(target, text) {
    const items = String(text || '')
      .split(/\s*;\s*/)
      .map((item) => item.trim())
      .filter(Boolean);
    items.forEach((item, index) => {
      if (index) target.appendChild(document.createTextNode('; '));
      const separator = item.search(/\s+[—–-]\s+/);
      if (separator < 1) {
        target.appendChild(document.createTextNode(item));
        return;
      }
      const key = document.createElement('strong');
      key.textContent = item.slice(0, separator).trim();
      const gloss = item.slice(separator).trim();
      target.append(key, document.createTextNode(' ' + gloss));
    });
  }

  function appendWordForWordPairs(target, pairs) {
    pairs.forEach((pair, index) => {
      if (index) target.appendChild(document.createTextNode('; '));
      const key = document.createElement('strong');
      key.textContent = pair[0];
      target.append(key, document.createTextNode(' — ' + pair[1]));
    });
  }

  function makeWordForWordParagraph(pairs) {
    const paragraph = document.createElement('p');
    paragraph.className = 'gita-wfw-list';
    appendWordForWordPairs(paragraph, pairs);
    return paragraph;
  }

  function makeDualSection(label, className, body) {
    const section = document.createElement('div');
    section.className = 'gita-dual-section ' + className;
    const heading = document.createElement('div');
    heading.className = 'gita-dual-label';
    heading.textContent = label;
    section.append(heading, body);
    return section;
  }

  function makeParagraph(text, options) {
    const settings = options || {};
    const paragraph = document.createElement('p');
    if (settings.className) paragraph.className = settings.className;
    if (settings.lang) paragraph.lang = settings.lang;
    if (settings.italic) {
      const emphasis = document.createElement('em');
      appendLines(emphasis, text, false);
      paragraph.appendChild(emphasis);
    } else {
      appendLines(paragraph, text, false);
    }
    return paragraph;
  }

  function makeEmptyParagraph(text) {
    const paragraph = document.createElement('p');
    paragraph.className = 'gita-dual-empty';
    paragraph.textContent = text;
    return paragraph;
  }

  function makeDetails(label, sections) {
    const details = document.createElement('details');
    details.className = 'gita-details';
    const summary = document.createElement('summary');
    summary.textContent = label;
    const reveal = document.createElement('div');
    reveal.className = 'gita-reveal';
    (sections || []).forEach((section) => reveal.appendChild(section));
    details.append(summary, reveal);
    return details;
  }

  function sridharaForRange(entries, start, end, chapter) {
    return entries
      .filter((entry) => entry.end >= start && entry.start <= end)
      .map((entry) => {
        const label = entry.start === entry.end
          ? String(canto) + '.' + chapter + '.' + entry.start
          : String(canto) + '.' + chapter + '.' + entry.start + '–' + entry.end;
        return label + '\n' + entry.text;
      })
      .join('\n\n')
      .trim();
  }

  function verseId(chapter, entry) {
    return 'sb-' + canto + '-' + chapter + '-' + entry.start +
      (entry.end !== entry.start ? '-' + entry.end : '');
  }

  function populateContents(list, entries, chapter) {
    if (!list) return;
    list.replaceChildren();
    entries.forEach((entry) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      const range = entry.start === entry.end
        ? String(entry.start)
        : entry.start + '–' + entry.end;
      link.href = '#' + verseId(chapter, entry);
      link.textContent = entry.start === entry.end
        ? 'Verse ' + range
        : 'Verses ' + range;
      li.appendChild(link);
      list.appendChild(li);
    });
  }

  function renderVerse(chapter, entry, sridharaEntries, commentaryEntries, wordForWordEntries, localCommentaryEntries) {
    const section = document.createElement('article');
    section.className = 'gita-verse sb-verse-section';
    const range = entry.start === entry.end ? String(entry.start) : entry.start + '–' + entry.end;
    const id = verseId(chapter, entry);
    section.id = id;
    section.setAttribute('aria-labelledby', id + '-heading');

    const heading = document.createElement('h2');
    heading.id = id + '-heading';
    const prefix = document.createElement('span');
    prefix.textContent = 'ŚB';
    heading.append(prefix, document.createTextNode(' ' + canto + '.' + chapter + '.' + range));

    const rule = document.createElement('hr');
    rule.className = 'gita-verse-rule';

    const devanagari = document.createElement('div');
    devanagari.className = 'gita-sanskrit';
    devanagari.lang = 'sa-Deva';
    appendLines(devanagari, entry.devanagari.join('\n') || devanagariOverrides[canto + '.' + chapter + '.' + entry.start] || '', false);

    const translation = document.createElement('p');
    translation.className = 'gita-translation';
    translation.textContent = entry.translation || 'Translation not present in the source record.';

    const verseTransliteration = entry.transliteration.join('\n');
    const sridharaSanskrit = sridharaForRange(sridharaEntries, entry.start, entry.end, chapter);

    const controls = document.createElement('div');
    controls.className = 'gita-controls';

    const wordSections = [];
    if (entry.synonyms) {
      const synonyms = document.createElement('p');
      synonyms.className = 'gita-wfw-list';
      appendSynonyms(synonyms, entry.synonyms);
      wordSections.push(makeDualSection('Bhāgavatam', 'gita-dual-gita', synonyms));
    } else {
      wordSections.push(makeDualSection('Bhāgavatam', 'gita-dual-gita',
        makeEmptyParagraph('No source text')));
    }
    const sridharaPairs = wordForWordForRange(wordForWordEntries, entry.start, entry.end);
    if (sridharaPairs.length) {
      wordSections.push(makeDualSection('Śrīdhara', 'gita-dual-sridhara',
        makeWordForWordParagraph(sridharaPairs)));
    }
    controls.appendChild(makeDetails('Word-for-word translation', wordSections));

    const transliterationSections = [];
    if (verseTransliteration) {
      transliterationSections.push(makeDualSection('Bhāgavatam', 'gita-dual-gita',
        makeParagraph(verseTransliteration, { italic: true, lang: 'sa-Latn' })));
    } else {
      transliterationSections.push(makeDualSection('Bhāgavatam', 'gita-dual-gita',
        makeEmptyParagraph('No source text')));
    }
    if (sridharaSanskrit) {
      transliterationSections.push(makeDualSection('Śrīdhara', 'gita-dual-sridhara',
        makeParagraph(devanagariToIast(sridharaSanskrit), { italic: true, lang: 'sa-Latn' })));
    }
    controls.appendChild(makeDetails('Transliteration', transliterationSections));

    const commentaryStatus = commentaryStatusForRange(localCommentaryEntries, entry.start, entry.end);
    const sridharaSanskritDetails = makeDetails('Śrīdhara Sanskrit', [
      sridharaSanskrit
        ? makeParagraph(sridharaSanskrit, { lang: 'sa-Deva' })
        : makeParagraph(commentaryStatus === 'source-gap' ? 'Source gap.' : 'No commentary.', { className: 'gita-no-source' })
    ]);
    if (sridharaSanskrit) {
      const previewLine = sridharaSanskrit.split(/\r?\n/).map((line) => line.trim()).filter(Boolean)[0] || '';
      const preview = document.createElement('span');
      preview.className = 'gita-sridhara-preview';
      preview.lang = 'sa-Deva';
      const glyphs = Array.from(previewLine);
      preview.textContent = glyphs.length > 84 ? glyphs.slice(0, 84).join('') + '…' : previewLine;
      preview.style.cssText = "display:block;max-width:min(840px,80vw);margin-top:5px;font-family:'Noto Serif Devanagari',serif;font-size:12px;font-weight:400;line-height:1.4;color:#3c362e;overflow-wrap:anywhere";
      const summary = sridharaSanskritDetails.querySelector('summary');
      if (summary) summary.appendChild(preview);
    }
    controls.appendChild(sridharaSanskritDetails);

    section.append(heading, rule, devanagari, translation, controls);

    const commentaryText = commentaryForRange(commentaryEntries, entry.start, entry.end) ||
      commentaryForRange(localCommentaryEntries, entry.start, entry.end);
    if (commentaryText) {
      const commentary = document.createElement('section');
      commentary.className = 'gita-commentary';
      const commentaryHeading = document.createElement('h3');
      commentaryHeading.textContent = 'Śrīdhara’s Commentary';
      commentary.append(commentaryHeading, makeParagraph(commentaryText));
      section.appendChild(commentary);
    } else if (commentaryStatus === 'english-rendering-unavailable' && sridharaSanskrit) {
      section.appendChild(makeParagraph('No English rendering.', { className: 'gita-commentary-note' }));
    }

    return section;
  }

  function selectedChapter(config) {
    const match = String(location.hash || '').match(/^#chapter-(\d{1,3})$/i);
    const requested = match ? Number(match[1]) : 1;
    return requested >= 1 && requested <= config.chapter_count ? requested : 1;
  }

  function buildChapterNav(config) {
    if (!chapterNav) return;
    chapterNav.className = 'gita-chapter-nav bhagavatam-chapter-nav';
    chapterNav.replaceChildren();
    const add = (label, href) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      chapterNav.appendChild(link);
    };
    add('All chapters', '/advaita/pages/bhagavatam-with-sridhara-bhasya/');
    if (selectedChapter(config) > 1) add('Previous', '#chapter-' + (selectedChapter(config) - 1));
    if (selectedChapter(config) < config.chapter_count) add('Next', '#chapter-' + (selectedChapter(config) + 1));
  }

  function renderCantoContents(config) {
    const titles = config.chapter_titles || {};
    const section = document.createElement('section');
    section.className = 'gita-chapter-index';
    const heading = document.createElement('h2');
    heading.textContent = 'Contents';
    const intro = document.createElement('p');
    intro.className = 'gita-index-intro';
    intro.textContent = 'Canto ' + canto + ' — ' + config.chapter_count + ' chapters';
    const grid = document.createElement('div');
    grid.className = 'gita-chapter-grid';
    for (let chapter = 1; chapter <= config.chapter_count; chapter += 1) {
      const link = document.createElement('a');
      link.className = 'gita-chapter-card';
      link.href = '#chapter-' + chapter;
      const number = document.createElement('span');
      number.className = 'gita-chapter-number';
      number.textContent = 'Chapter ' + chapter;
      const name = document.createElement('span');
      name.className = 'gita-chapter-name';
      name.textContent = titles[String(chapter)] || '';
      link.append(number, name);
      grid.appendChild(link);
    }
    section.append(heading, intro, grid);
    host.replaceChildren(section);
    if (heroTitle) heroTitle.textContent = 'Canto ' + canto;
    if (titleNode) titleNode.textContent = 'Contents';
    setStatus('Canto ' + canto + ' contents');
    buildChapterNav(config);
  }

  function chapterEnglishPath(config, chapter) {
    return config.english_path_template
      .replace('{chapter2}', pad(chapter))
      .replace('{chapter}', String(chapter));
  }

  function chapterSridharaUrl(manifest, config, chapter) {
    if (config.sridhara_mode === 'local-cached') {
      const path = config.sridhara_path_template.replace('{chapter2}', pad(chapter));
      return path.charAt(0) === '/' ? path : '/advaita/' + path;
    }
    const relativePath = config.sridhara_paths[String(chapter)];
    if (!relativePath) return '';
    return rawUrl(relativePath, manifest.primary_sanskrit.path_root, manifest.primary_sanskrit.commit);
  }

  function chapterEnglishUrl(manifest, config, chapter) {
    const localPath = config.english_path_overrides && config.english_path_overrides[String(chapter)];
    if (localPath) return localPath.charAt(0) === '/' ? localPath : '/advaita/' + localPath;
    return rawUrl(
      chapterEnglishPath(config, chapter),
      manifest.english_source.mirror_path_root,
      manifest.english_source.mirror_commit
    );
  }

  function commentaryUrl(manifest) {
    const path = (manifest.english_commentary && manifest.english_commentary.path) ||
      'assets/data/bhagavatam-sridhara-english-checkpoints.json';
    const versionedPath = path + (path.includes('?') ? '&' : '?') + 'v=live-' + Date.now();
    return versionedPath.charAt(0) === '/' ? versionedPath : '/advaita/' + versionedPath;
  }

  async function loadChapter(manifest, config, chapter) {
    const shell = document.createElement('section');
    shell.className = 'sb-chapter-shell';
    shell.id = 'chapter-' + chapter;
    shell.dataset.chapter = String(chapter);
    const contents = document.createElement('div');
    contents.className = 'gita-contents sb-contents';
    const contentsHeading = document.createElement('h2');
    contentsHeading.textContent = 'Contents';
    const contentsList = document.createElement('ol');
    contents.append(contentsHeading, contentsList);
    const loading = document.createElement('p');
    loading.className = 'gita-loading';
    loading.textContent = 'Loading Canto ' + canto + ', Chapter ' + chapter + '…';
    shell.append(contents, loading);
    host.replaceChildren(shell);
    if (heroTitle) heroTitle.textContent = 'Canto ' + canto + ', Chapter ' + chapter;
    if (titleNode) titleNode.textContent = 'Chapter ' + chapter;
    setStatus('Loading Canto ' + canto + ', Chapter ' + chapter + '…');

    try {
      const englishUrl = chapterEnglishUrl(manifest, config, chapter);
      const sridharaUrl = chapterSridharaUrl(manifest, config, chapter);
      const commentaryUrlValue = commentaryUrl(manifest);
      const checkpointUrl = '/advaita/assets/data/bhagavatam-sridhara-checkpoints.json?v=20261003-direct-translation-2';
      const requests = [fetchText(englishUrl)];
      if (sridharaUrl) {
        requests.push(config.sridhara_mode === 'local-cached' ? fetchJson(sridharaUrl) : fetchText(sridharaUrl));
      }
      if (commentaryUrlValue) requests.push(fetchJson(commentaryUrlValue));
      requests.push(fetchJson(checkpointUrl));
      const results = await Promise.all(requests);
      const english = parseEnglish(results[0]);
      const overlayPath = config.english_path_overlays && config.english_path_overlays[String(chapter)];
      if (overlayPath) {
        const overlayUrl = overlayPath.charAt(0) === '/' ? overlayPath : '/advaita/' + overlayPath;
        const overlay = parseEnglish(await fetchText(overlayUrl));
        if (!overlay.entries.length) throw new Error('No verse records found in the local English overlay.');
        english.entries = english.entries
          .filter((entry) => !overlay.entries.some((replacement) =>
            replacement.end >= entry.start && replacement.start <= entry.end))
          .concat(overlay.entries)
          .sort((a, b) => a.start - b.start || a.end - b.end);
      }
      const sridharaResult = sridharaUrl ? results[1] : null;
      const commentaryResult = commentaryUrlValue ? results[sridharaUrl ? 2 : 1] : null;
      const checkpointResult = results[sridharaUrl ? (commentaryUrlValue ? 3 : 2) : (commentaryUrlValue ? 2 : 1)];
      const checkpoint = (checkpointResult && Array.isArray(checkpointResult.checkpoints))
        ? checkpointResult.checkpoints.find((item) =>
          item.id === 'canto-' + canto + '-chapter-' + chapter + '-release')
        : null;
      const wfwPaths = checkpoint && Array.isArray(checkpoint.reader_data_files)
        ? checkpoint.reader_data_files
        : [];
      const wfwResults = await Promise.all(wfwPaths.map((path) =>
        fetchJson(path.charAt(0) === '/' ? path : '/advaita/' + path)
      ));
      const wordForWordEntries = wfwResults.flatMap((data) => parseLocalWordForWord(data, canto, chapter));
      const localCommentaryEntries = wfwResults.flatMap((data) => parseLocalCommentary(data, canto, chapter));
      const sridharaEntries = sridharaUrl
        ? (config.sridhara_mode === 'local-cached'
          ? parseLocalSridhara(sridharaResult, canto, chapter)
          : parseSridhara(sridharaResult, canto, chapter))
        : [];
      const commentaryEntries = commentaryResult
        ? parseEnglishCommentary(commentaryResult, canto, chapter)
        : [];
      if (!english.entries.length) throw new Error('No verse records found in the English source file.');

      loading.remove();
      contentsHeading.textContent = 'Contents';
      populateContents(contentsList, english.entries, chapter);
      if (heroTitle) heroTitle.textContent = 'Canto ' + canto + ', Chapter ' + chapter;
       if (titleNode) titleNode.textContent = english.title || 'Chapter ' + chapter;
      english.entries.forEach((entry) => shell.appendChild(renderVerse(chapter, entry, sridharaEntries, commentaryEntries, wordForWordEntries, localCommentaryEntries)));
      const annotated = english.entries.filter((entry) => sridharaForRange(sridharaEntries, entry.start, entry.end, chapter)).length;
      const sourceMessage = annotated + ' of ' + english.entries.length + ' displayed verse records have Śrīdhara text.';
      setStatus('Canto ' + canto + ', Chapter ' + chapter + ' loaded · ' + sourceMessage);
      requestAnimationFrame(() => shell.scrollIntoView({ block: 'start' }));
    } catch (error) {
      loading.replaceChildren(document.createTextNode('This chapter could not load: ' + error.message + ' '));
      const fallback = document.createElement('a');
      fallback.href = 'https://vedabase.io/en/library/sb/' + canto + '/' + chapter + '/advanced-view/';
      fallback.target = '_blank';
      fallback.rel = 'noopener noreferrer';
      fallback.textContent = 'Open this chapter in Vedabase.';
      loading.appendChild(fallback);
      loading.classList.add('sb-load-error');
      setStatus('Canto ' + canto + ', Chapter ' + chapter + ' could not be loaded.', true);
    }
  }

  async function start() {
    try {
      const response = await fetch(root.dataset.manifest || '/advaita/assets/data/bhagavatam-sridhara-reader-manifest.json', { cache: 'force-cache' });
      if (!response.ok) throw new Error(response.status + ' ' + response.statusText);
      const manifest = await response.json();
      const config = manifest.cantos[String(canto)];
      if (!config) throw new Error('No canto configuration found.');
      buildChapterNav(config);
      if (config.landing_contents && !location.hash) {
        renderCantoContents(config);
      } else {
        await loadChapter(manifest, config, selectedChapter(config));
      }
      window.addEventListener('hashchange', () => {
        if (config.landing_contents && !location.hash) {
          renderCantoContents(config);
          return;
        }
        const chapter = selectedChapter(config);
        if (host.querySelector('.sb-chapter-shell[data-chapter="' + chapter + '"]')) return;
        buildChapterNav(config);
        loadChapter(manifest, config, chapter);
      });
    } catch (error) {
      setStatus('The reader could not start: ' + error.message, true);
    }
  }

  start();
})();