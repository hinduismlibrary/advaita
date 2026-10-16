(() => {
  const root = document.querySelector('[data-canto10-source-root]');
  const host = root?.querySelector('[data-canto10-all-host]');
  const status = document.querySelector('[data-canto10-status]');
  if (!root || !host) return;

  const PRABHUPADA_BASE = 'https://raw.githubusercontent.com/vishvAsa/purANam_vaiShNavam/content/bhAgavatam/gauDIyo_abhaya-charaNaH/10/';
  const SRIDHARA_BASE = '/advaita/assets/data/canto10-sridhara-source/';
  const textCache = new Map();
  const chapterFile = (chapter) => String(chapter).padStart(2, '0');
  const prabhupadaUrl = (chapter) => `${PRABHUPADA_BASE}${chapterFile(chapter)}.md`;

  function selectedChapter() {
    const match = location.hash.match(/^#chapter-(\d{1,2})$/i);
    const chapter = match ? Number(match[1]) : 1;
    return chapter >= 1 && chapter <= 90 ? chapter : 1;
  }

  const sridharaUrl = (chapter) => `${SRIDHARA_BASE}${chapterFile(chapter)}.json?v=1`;

  async function fetchText(url) {
    if (!textCache.has(url)) {
      textCache.set(url, fetch(url, { mode: 'cors', cache: 'force-cache' }).then((response) => {
        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        return response.text();
      }).catch((error) => {
        textCache.delete(url);
        throw error;
      }));
    }
    return textCache.get(url);
  }

  async function fetchJson(url) {
    const response = await fetch(url, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response.json();
  }

  const devaDigits = new Map(Object.entries({'०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'}));
  const toAsciiDigits = (text) => Array.from(text || '').map((ch) => devaDigits.get(ch) || ch).join('');
  const independentVowels = new Map(Object.entries({'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ए':'e','ऐ':'ai','ओ':'o','औ':'au'}));
  const vowelMarks = new Map(Object.entries({'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','े':'e','ै':'ai','ो':'o','ौ':'au'}));
  const consonants = new Map(Object.entries({
    'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ','ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ',
    'त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ'
  }));

  function devanagariToIast(input) {
    const chars = Array.from((input || '').normalize('NFC'));
    let output = '';
    for (let i = 0; i < chars.length; i += 1) {
      const ch = chars[i];
      if (consonants.has(ch)) {
        const next = chars[i + 1];
        output += consonants.get(ch);
        if (next === '्') i += 1;
        else if (vowelMarks.has(next)) { output += vowelMarks.get(next); i += 1; }
        else output += 'a';
        continue;
      }
      if (independentVowels.has(ch)) { output += independentVowels.get(ch); continue; }
      if (vowelMarks.has(ch)) { output += vowelMarks.get(ch); continue; }
      if (devaDigits.has(ch)) { output += devaDigits.get(ch); continue; }
      if (ch === 'ं') { output += 'ṃ'; continue; }
      if (ch === 'ः') { output += 'ḥ'; continue; }
      if (ch === 'ँ') { output += 'm̐'; continue; }
      if (ch === 'ऽ') { output += '’'; continue; }
      if (ch === '।') { output += '|'; continue; }
      if (ch === '॥') { output += '||'; continue; }
      if (ch === '़' || ch === '्') continue;
      output += ch;
    }
    return output.replace(/\s+\|\|/g, ' ||').replace(/\s+\|/g, ' |').replace(/[ \t]+\n/g, '\n').trim();
  }

  const stripInlineMarkdown = (text) => (text || '')
    .replace(/\[\^[^\]]+\]/g, '')
    .replace(/\\([\\`*_{}\[\]()#+\-.!])/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/\*([^*\n]+)\*/g, '$1')
    .replace(/_([^_\n]+)_/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim();

  const cleanBlock = (block) => stripInlineMarkdown(block).replace(/[ \t]{2,}\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  const cleanVerseLines = (block) => (block || '').split(/\n/).map((line) => stripInlineMarkdown(line.replace(/[ \t]+$/g, '')).trim()).filter(Boolean);

  function sectionBlock(body, heading) {
    const pattern = new RegExp(`###\\s+${heading}\\s*\\n+([\\s\\S]*?)(?=\\n###\\s+|\\n##\\s+|$)`, 'i');
    const match = body.match(pattern);
    return match ? match[1].trim() : '';
  }

  function parsePrabhupada(markdown) {
    const entries = [];
    const headingPattern = /^##\s+Texts?\s+(\d+)(?:\s*[-–—]\s*(\d+))?\s*$/gmi;
    const headings = Array.from(markdown.matchAll(headingPattern));
    headings.forEach((match, index) => {
      const start = Number(match[1]);
      const end = Number(match[2] || match[1]);
      const bodyStart = match.index + match[0].length;
      const bodyEnd = index + 1 < headings.length ? headings[index + 1].index : markdown.length;
      const body = markdown.slice(bodyStart, bodyEnd);
      entries.push({
        start,
        end,
        devanagari: cleanVerseLines(sectionBlock(body, 'Devanagari')),
        transliteration: cleanVerseLines(sectionBlock(body, 'Verse text')),
        synonyms: cleanBlock(sectionBlock(body, 'Synonyms')),
        translation: cleanBlock(sectionBlock(body, 'Translation'))
      });
    });
    return entries;
  }

  function parseSridhara(markdown, chapter) {
    const entries = [];
    const markerPattern = /॥\s*([०-९]+)\.([०-९]+)\.([०-९]+)(?:\s*[-–—]\s*([०-९]+))?\s*॥/g;
    const markers = Array.from(markdown.matchAll(markerPattern));
    const labelPattern = /\*\*(?:श्रीधर-स्वामी\s*\(भावार्थ-दीपिका\)|श्रीधर-स्वामी|श्रीधरः)\s*:\*\*/;

    markers.forEach((marker, index) => {
      const canto = Number(toAsciiDigits(marker[1]));
      const ch = Number(toAsciiDigits(marker[2]));
      const start = Number(toAsciiDigits(marker[3]));
      const end = Number(toAsciiDigits(marker[4] || marker[3]));
      if (canto !== 10 || ch !== chapter) return;

      const segmentStart = marker.index + marker[0].length;
      const segmentEnd = index + 1 < markers.length ? markers[index + 1].index : markdown.length;
      const segment = markdown.slice(segmentStart, segmentEnd);
      const labelMatch = segment.match(labelPattern);
      if (!labelMatch) return;

      let commentary = segment.slice((labelMatch.index || 0) + labelMatch[0].length);
      const stops = [
        commentary.search(/\n_{4,}/), commentary.search(/\n\*\*वंशीधरः/), commentary.search(/\n\*\*वीरराघव/),
        commentary.search(/\n\*\*विजयध्वज/), commentary.search(/\n\*\*श्रीनाथ/), commentary.search(/\n\*\*सनातन/),
        commentary.search(/\n\*\*जीव-?गोस्वामी/), commentary.search(/\n\*\*विश्वनाथ/)
      ].filter((value) => value >= 0);
      if (stops.length) commentary = commentary.slice(0, Math.min(...stops));
      commentary = cleanBlock(commentary);
      if (commentary) entries.push({ start, end, text: commentary });
    });
    return entries;
  }

  function parseLocalSridhara(data) {
    return Object.values(data?.entries || {}).filter((entry) => (
      entry && entry.source_available && String(entry.sanskrit || '').trim()
    )).map((entry) => ({
      start: Number(entry.start),
      end: Number(entry.end),
      text: String(entry.sanskrit).trim()
    }));
  }

  function sridharaForRange(entries, start, end, chapter) {
    return entries.filter((entry) => entry.end >= start && entry.start <= end).map((entry) => {
      const label = entry.start === entry.end ? `10.${chapter}.${entry.start}` : `10.${chapter}.${entry.start}–${entry.end}`;
      return start === end && entry.start === entry.end ? entry.text : `${label}\n${entry.text}`;
    }).join('\n\n').trim();
  }

  function appendMultiline(target, text) {
    String(text || '').split(/\n/).forEach((line, index) => {
      if (index) target.appendChild(document.createElement('br'));
      target.appendChild(document.createTextNode(line));
    });
  }

  function makeDetails(label, blocks, className = '') {
    const details = document.createElement('details');
    details.className = `sb-details ${className}`.trim();
    details.open = false;
    const summary = document.createElement('summary');
    summary.textContent = label;
    details.appendChild(summary);

    blocks.filter((block) => block?.text).forEach((block) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'sb-source-block';
      const sourceLabel = document.createElement('strong');
      sourceLabel.className = 'sb-source-label';
      sourceLabel.textContent = block.label;
      wrapper.appendChild(sourceLabel);
      const content = document.createElement('div');
      content.className = 'sb-source-content';
      if (block.lang) content.lang = block.lang;
      if (block.italic) {
        const em = document.createElement('em');
        appendMultiline(em, block.text);
        content.appendChild(em);
      } else appendMultiline(content, block.text);
      wrapper.appendChild(content);
      details.appendChild(wrapper);
    });
    return details;
  }

  function renderVerse(chapter, entry, sridharaEntries) {
    const section = document.createElement('section');
    section.className = 'sb-verse-section';
    const rangeLabel = entry.start === entry.end ? `${entry.start}` : `${entry.start}–${entry.end}`;
    const id = `sb-10-${chapter}-${entry.start}${entry.end !== entry.start ? `-${entry.end}` : ''}`;
    section.setAttribute('aria-labelledby', id);

    const heading = document.createElement('h3');
    heading.id = id;
    heading.className = 'sb-verse';
    heading.textContent = `ŚB 10.${chapter}.${rangeLabel}`;
    const rule = document.createElement('hr');
    rule.className = 'sb-rule';
    const devanagari = document.createElement('div');
    devanagari.className = 'sb-devanagari';
    devanagari.lang = 'sa-Deva';
    entry.devanagari.forEach((line, index) => {
      if (index) devanagari.appendChild(document.createElement('br'));
      devanagari.appendChild(document.createTextNode(line));
    });
    const translation = document.createElement('p');
    translation.className = 'sb-translation';
    translation.textContent = entry.translation;

    const sridharaSanskrit = sridharaForRange(sridharaEntries, entry.start, entry.end, chapter);
    const sridharaTransliteration = sridharaSanskrit ? devanagariToIast(sridharaSanskrit) : '';
    const bhagavatamTransliteration = entry.transliteration.join('\n');

    section.append(heading, rule, devanagari, translation);
    if (entry.synonyms) section.append(makeDetails('Word-for-word', [{ label: 'Bhāgavatam word-for-word', text: entry.synonyms }], 'sb-word-details'));
    if (bhagavatamTransliteration || sridharaTransliteration) section.append(makeDetails('Transliteration', [
      { label: 'Bhāgavatam transliteration', text: bhagavatamTransliteration, lang: 'sa-Latn', italic: true },
      { label: 'Śrīdhara transliteration', text: sridharaTransliteration, lang: 'sa-Latn', italic: true }
    ], 'sb-transliteration-details'));
    if (sridharaSanskrit) section.append(makeDetails('Śrīdhara Sanskrit', [{ label: 'Śrīdhara Sanskrit', text: sridharaSanskrit, lang: 'sa-Deva' }], 'sb-bhasya'));
    return section;
  }

  function makeChapterShell(chapter) {
    const shell = document.createElement('section');
    shell.className = 'canto10-chapter-shell';
    shell.dataset.chapter = String(chapter);
    const heading = document.createElement('h2');
    heading.id = `chapter-${chapter}`;
    heading.className = 'sb-chapter';
    heading.textContent = `10.${chapter} — Chapter ${chapter}`;
    const loading = document.createElement('p');
    loading.className = 'canto10-chapter-loading';
    loading.textContent = `Loading Chapter ${chapter}…`;
    shell.append(heading, loading);
    host.replaceChildren(shell);
    return shell;
  }

  async function loadSelectedChapter() {
    const chapter = selectedChapter();
    const shell = makeChapterShell(chapter);
    const loading = shell.querySelector('.canto10-chapter-loading');
    if (status) status.textContent = `Loading Canto 10, Chapter ${chapter}…`;

    try {
      const [prabhupadaMarkdown, sridharaData] = await Promise.all([
        fetchText(prabhupadaUrl(chapter)),
        fetchJson(sridharaUrl(chapter))
      ]);
      const entries = parsePrabhupada(prabhupadaMarkdown);
      const sridharaEntries = parseLocalSridhara(sridharaData);
      if (!entries.length) throw new Error('No Prabhupāda verse entries found');
      loading.remove();
      entries.forEach((entry) => shell.appendChild(renderVerse(chapter, entry, sridharaEntries)));
      if (status) status.textContent = `Canto 10, Chapter ${chapter} loaded.`;
      requestAnimationFrame(() => document.getElementById(`chapter-${chapter}`)?.scrollIntoView({ block: 'start' }));
    } catch (error) {
      loading.textContent = `Chapter ${chapter} could not load: ${error.message}`;
      loading.classList.add('canto10-load-error');
      if (status) status.textContent = `Canto 10, Chapter ${chapter} could not be loaded.`;
    }
  }

  window.addEventListener('hashchange', () => {
    const chapter = selectedChapter();
    if (host.querySelector(`.canto10-chapter-shell[data-chapter="${chapter}"]`)) return;
    loadSelectedChapter();
  });

  loadSelectedChapter();
})();
