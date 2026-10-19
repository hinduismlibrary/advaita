(() => {
  const root = document.querySelector('[data-gita-chapter]');
  if (!root) return;

  const chapter = Number(root.dataset.gitaChapter);
  if (!Number.isInteger(chapter) || chapter < 1 || chapter > 18) return;

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const capitalizeLeadingLatin = (value) => String(value ?? '').replace(/^(\s*[““‘"'(\[]*)([A-Za-zÀ-ÖØ-öø-ÿĀ-ž])/u, (_, prefix, first) => prefix + first.toUpperCase());
  const normalizeEnglishSentences = (value) => {
    let text = String(value ?? '')
      .replace(/\r\n?/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .replace(/“([^”]*)”/g, '$1')
      .replace(/‘([^’]*)’/g, '$1')
      .replace(/["“”]/g, '')
      .replace(/[‘’]/g, "'")
      .replace(/(^|[\s(\[{])'([^'\n]+)'(?=$|[\s.,!?;:)\]}])/g, '$1$2')
      .replace(/(\d)\s*[–—]\s*(\d)/g, '$1-$2')
      .replace(/\s*[—–]\s*/g, ', ')
      .replace(/\s*;\s*/g, '. ')
      .replace(/\s*:\s*/g, '. ')
      .replace(/[()[\]]/g, '')
      .replace(/[ \t]*([,.!?])/g, '$1')
      .replace(/([,.!?])(?=[A-Za-z])/g, '$1 ')
      .replace(/\.{2,}/g, '.')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();
    text = text.replace(/(^|[.!?]\s+|\n+)([a-z])/gu, (_, boundary, first) => boundary + first.toUpperCase());
    if (text && !/[.!?]$/u.test(text)) text += '.';
    return text;
  };

  const directCommentaryEnglish = (value) => {
    let text = String(value ?? '')
      .replace(/^the\s+commentary\s+(?:says|states|explains|notes|remarks)(?:\s+that)?\s*[:,—-]?\s*/i, '')
      .replace(/^according\s+to\s+(?:the\s+)?commentary\s*[:,—-]?\s*/i, '')
      .replace(/^(?:śrīdhara(?:\s+svāmī)?|the\s+commentator|he)\s+(?:says|states|explains)(?:\s+that)?\s*[:,—-]?\s*/i, '');
    return normalizeEnglishSentences(text);
  };

  const independent = {'अ':'a','आ':'ā','इ':'i','ई':'ī','उ':'u','ऊ':'ū','ऋ':'ṛ','ॠ':'ṝ','ऌ':'ḷ','ॡ':'ḹ','ए':'e','ऐ':'ai','ओ':'o','औ':'au','ॐ':'oṃ'};
  const consonants = {'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ṅ','च':'c','छ':'ch','ज':'j','झ':'jh','ञ':'ñ','ट':'ṭ','ठ':'ṭh','ड':'ḍ','ढ':'ḍh','ण':'ṇ','त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'ś','ष':'ṣ','स':'s','ह':'h','ळ':'ḷ'};
  const matras = {'ा':'ā','ि':'i','ी':'ī','ु':'u','ू':'ū','ृ':'ṛ','ॄ':'ṝ','ॢ':'ḷ','ॣ':'ḹ','े':'e','ै':'ai','ो':'o','ौ':'au'};
  const marks = {'ं':'ṃ','ः':'ḥ','ँ':'m̐','ऽ':'’','।':' |','॥':' ||','०':'0','१':'1','२':'2','३':'3','४':'4','५':'5','६':'6','७':'7','८':'8','९':'9'};

  const devaToIast = (input) => {
    const s = String(input || '');
    let out = '';
    for (let i = 0; i < s.length; i += 1) {
      const ch = s[i];
      if (independent[ch]) { out += independent[ch]; continue; }
      if (consonants[ch]) {
        out += consonants[ch];
        const next = s[i + 1];
        if (next === '्') { i += 1; continue; }
        if (matras[next]) { out += matras[next]; i += 1; continue; }
        out += 'a';
        continue;
      }
      if (matras[ch]) { out += matras[ch]; continue; }
      if (ch === '्' || ch === '़') continue;
      out += marks[ch] ?? ch;
    }
    return out.replace(/\s+([|])/g, ' $1').replace(/\s{2,}/g, ' ').trim();
  };

  const iastToDeva = (value) => {
    const vowels = {'a':'अ','ā':'आ','i':'इ','ī':'ई','u':'उ','ū':'ऊ','ṛ':'ऋ','ṝ':'ॠ','ḷ':'ऌ','ḹ':'ॡ','e':'ए','ai':'ऐ','o':'ओ','au':'औ'};
    const consonants = {'kh':'ख','gh':'घ','ṅ':'ङ','ch':'छ','jh':'झ','ñ':'ञ','ṭh':'ठ','ṭ':'ट','ḍh':'ढ','ḍ':'ड','ṇ':'ण','th':'थ','dh':'ध','ph':'फ','bh':'भ','ś':'श','ṣ':'ष','k':'क','g':'ग','c':'च','j':'ज','t':'त','d':'द','n':'न','p':'प','b':'ब','m':'म','y':'य','r':'र','l':'ल','v':'व','s':'स','h':'ह'};
    const vowelMarks = {'a':'','ā':'ा','i':'ि','ī':'ी','u':'ु','ū':'ू','ṛ':'ृ','ṝ':'ॄ','ḷ':'ॢ','ḹ':'ॣ','e':'े','ai':'ै','o':'ो','au':'ौ'};
    const marks = {'ṃ':'ं','ḥ':'ः','m̐':'ँ','’':'ऽ'};
    const convertWord = (word) => {
      let out = '';
      let i = 0;
      let afterConsonant = false;
      while (i < word.length) {
        const two = word.slice(i, i + 2);
        const one = word[i];
        if (marks[two]) { out += marks[two]; i += 2; continue; }
        if (marks[one]) { out += marks[one]; i += 1; continue; }
        const consonant = consonants[two] ? two : (consonants[one] ? one : '');
        if (consonant) {
          if (afterConsonant) out += '्';
          out += consonants[consonant];
          i += consonant.length;
          afterConsonant = true;
          if (word.slice(i, i + 1) === '̇') i += 1;
          continue;
        }
        const vowel = vowels[two] ? two : (vowels[one] ? one : '');
        if (vowel) {
          if (afterConsonant) out += vowelMarks[vowel];
          else out += vowels[vowel];
          i += vowel.length;
          afterConsonant = false;
          continue;
        }
        if (one === '्') { out += '्'; i += 1; afterConsonant = false; continue; }
        out += one;
        i += 1;
        afterConsonant = false;
      }
      return out;
    };
    return String(value || '').split(/(\s+|[-–—/|.,;:!?()[\]“”‘’'"])/u).map((part) => {
      if (!part || /^\s+$/.test(part) || /^[\-–—/|.,;:!?()[\]“”‘’'"]$/u.test(part)) return part;
      return convertWord(part);
    }).join('');
  };

  const cleanSrid = (text) => String(text || '').replace(/^\s*[।॥]+\s*\d+(?:\.\d+)?\s*[।॥]*\s*/, '').trim();

  const cleanGloss = (value) => String(value ?? '')
    .replace(/“([^”]*)”/g, '$1')
    .replace(/‘([^’]*)’/g, '$1')
    .replace(/["“”]/g, '')
    .replace(/[‘’]/g, "'")
    .replace(/(^|[\s(\[{])'([^'\n]+)'(?=$|[\s.,!?;:)\]}])/g, '$1$2')
    .replace(/\s*[—–]\s*/g, ' ')
    .replace(/[;:]/g, '')
    .replace(/[()[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const renderPairs = (pairs, emptyText) => {
    if (!Array.isArray(pairs) || !pairs.length) {
      return '<p class="gita-dual-empty">' + esc(emptyText || 'No separate Śrīdhara word-for-word source is mapped for this verse.') + '</p>';
    }
    return '<div class="gita-word-list">' + pairs.map((pair) => {
      const term = Array.isArray(pair) ? String(pair[0] || '').trim() : '';
      const gloss = Array.isArray(pair) ? String(pair[1] || '').trim() : '';
      const termIsDevanagari = /[\u0900-\u097F]/u.test(term);
      const devanagari = termIsDevanagari ? term : iastToDeva(term);
      const iast = termIsDevanagari ? devaToIast(term) : term;
      return '<div class="gita-word-row">' +
        '<span class="gita-word-dev" lang="sa-Deva">' + esc(devanagari) + '</span> ' +
        '<span class="gita-word-iast"><em>' + esc(iast) + '</em></span> ' +
        '<span class="gita-word-gloss">' + esc(cleanGloss(capitalizeLeadingLatin(gloss))) + '</span>' +
      '</div>';
    }).join('') + '</div>';
  };

  const joinedGloss = (pairs) => (Array.isArray(pairs) ? pairs : [])
    .map((pair) => Array.isArray(pair) ? String(pair[1] || '').trim() : '')
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  const dualBlock = (gitaHtml, sridHtml) =>
    '<div class="gita-dual-section gita-dual-gita"><div class="gita-dual-label">Bhagavad Gītā</div>' + gitaHtml + '</div>' +
    '<div class="gita-dual-section gita-dual-sridhara"><div class="gita-dual-label">Śrīdhara</div>' + sridHtml + '</div>';

  let chapterData = null;
  const isFallback = (text) => /source repository supplies Śrīdhara Svāmī’s commentary in Sanskrit; no English translation field is supplied there\.?/i.test(String(text || '').trim());

  const hideFallbacks = () => {
    root.querySelectorAll('.gita-commentary').forEach((section) => {
      const paragraph = section.querySelector('p');
      if (paragraph && isFallback(paragraph.textContent)) section.hidden = true;
    });
  };

  const enhanceVerse = (article) => {
    if (!chapterData || !article || article.dataset.sridharaToolsAll === '1') return;
    const match = article.id && article.id.match(new RegExp('^gita-' + chapter + '-(\\d+)$'));
    if (!match) return;
    const verse = Number(match[1]);
    const verseData = chapterData.verses && chapterData.verses[String(verse)];

    const details = article.querySelectorAll('.gita-details');
    if (details.length < 2) return;
    const wfwReveal = details[0].querySelector('.gita-reveal');
    const transReveal = details[1].querySelector('.gita-reveal');
    const sridTextNode = details[2] ? details[2].querySelector('.gita-reveal p') : null;
    const englishNode = article.querySelector('.gita-commentary p');
    if (!wfwReveal || !transReveal) return;

    const gitaWfw = wfwReveal.dataset.gitaBaseHtml || wfwReveal.innerHTML;
    wfwReveal.dataset.gitaBaseHtml = gitaWfw;
    const sridPairs = verseData && verseData.reviewed === true ? verseData.word_for_word : [];
    wfwReveal.innerHTML = dualBlock(
      gitaWfw,
      renderPairs(sridPairs)
    );
    transReveal.innerHTML = transReveal.dataset.gitaBaseHtml || transReveal.innerHTML;
    transReveal.dataset.gitaBaseHtml = transReveal.innerHTML;

    const existingCommentary = englishNode ? (englishNode.innerText || englishNode.textContent || '') : '';
    const sridRaw = sridTextNode ? cleanSrid(sridTextNode.textContent) : '';
    const noCommentary = !sridRaw || /^no commentary\.?$/i.test(sridRaw);
    if (englishNode) {
      const commentarySection = englishNode.closest('.gita-commentary');
      if (noCommentary) {
        englishNode.textContent = 'No commentary.';
        englishNode.classList.add('gita-no-source');
        if (commentarySection) commentarySection.hidden = false;
      } else {
        const reviewedTranslation = String(verseData && verseData.translation || '').trim();
        const existingIsFallback = isFallback(existingCommentary);
        if (reviewedTranslation) {
          englishNode.textContent = directCommentaryEnglish(reviewedTranslation);
          englishNode.classList.remove('gita-no-source');
          if (commentarySection) commentarySection.hidden = false;
        } else if (existingIsFallback) {
          if (commentarySection) commentarySection.hidden = true;
        } else if (existingCommentary.trim()) {
          englishNode.textContent = directCommentaryEnglish(existingCommentary);
          englishNode.classList.remove('gita-no-source');
          if (commentarySection) commentarySection.hidden = false;
        }
      }
    }
    article.dataset.sridharaToolsAll = '1';
  };

  const enhanceAll = () => root.querySelectorAll('.gita-verse').forEach(enhanceVerse);
  const refresh = () => { hideFallbacks(); enhanceAll(); };
  const observer = new MutationObserver(refresh);
  observer.observe(root, {childList:true, subtree:true});
  refresh();

  const loadJson = (url) => fetch(url).then((response) => {
    if (!response.ok) throw new Error('No reviewed Śrīdhara literal data for this chapter yet');
    return response.json();
  });

  const mergeParts = (parts) => {
    const verses = {};
    parts.forEach((part) => {
      Object.entries(part.verses || {}).forEach(([key, value]) => {
        if (!verses[key]) {
          verses[key] = {...value, word_for_word: [...(value.word_for_word || [])]};
          return;
        }
        if (value.translation) verses[key].translation = [verses[key].translation, value.translation].filter(Boolean).join(' ');
        verses[key].word_for_word = [...(verses[key].word_for_word || []), ...(value.word_for_word || [])];
        verses[key].reviewed = verses[key].reviewed === true && value.reviewed === true;
        verses[key].no_commentary = verses[key].no_commentary === true && value.no_commentary === true;
      });
    });
    return {_meta:{chapter,reviewed:true,method:'complete direct literal rendering'},verses};
  };

  const literalPartsByChapter = {
    1: ['a','b'],
    2: ['a','b','c','d','e','f','g'],
    3: ['a','b','c'],
    4: ['a','b','c'],
    5: ['a','b'],
    6: ['a','b','c','d'],
    7: ['a','b'],
    8: ['a','b'],
    9: ['a','b'],
    10: ['a','b'],
    11: ['a','b','c'],
    12: ['a'],
    13: ['a','b'],
    14: ['a','b'],
    15: ['a'],
    16: ['a','b'],
    17: ['a','b'],
    18: ['a','b','c','d','e1','e2a','e2b2','e2c','e3a','e3b']
  };
  const literalParts = literalPartsByChapter[chapter];
  const cacheKey = '20260917-vasuki';
  const reviewPromise = literalParts
    ? Promise.all(literalParts.map((part) => loadJson('/advaita/assets/data/bhagavad-gita-sridhara-reviewed/chapter-' + chapter + '-literal-' + part + '.json?v=' + cacheKey))).then(mergeParts)
    : loadJson('/advaita/assets/data/bhagavad-gita-sridhara-reviewed/chapter-' + chapter + '.json?v=' + cacheKey);

  const vasukiOverridesPromise = loadJson('/advaita/assets/data/bhagavad-gita-sridhara-vasuki-overrides.json?v=' + cacheKey)
    .catch(() => ({verses:{}}));

  const dataPromise = Promise.all([reviewPromise, vasukiOverridesPromise]).then(([data, overrides]) => {
    const verses = {...(data.verses || {})};
    Object.entries(overrides.verses || {}).forEach(([key, value]) => {
      const parts = key.split('.');
      if (Number(parts[0]) !== chapter) return;
      const verse = parts[1];
      verses[verse] = {
        ...(verses[verse] || {}),
        ...value,
        word_for_word: value.word_for_word || (verses[verse] && verses[verse].word_for_word) || []
      };
    });
    return {...data, verses};
  });

  dataPromise.then((data) => {
    chapterData = data;
    enhanceAll();
  }).catch((error) => {
    chapterData = null;
    hideFallbacks();
    console.warn('Reviewed Śrīdhara English unavailable for chapter ' + chapter + ':', error);
  });
})();