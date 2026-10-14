(() => {
  'use strict';

  const sectionName = {
    I: 'Brāhma-parvan',
    'II.1': 'Madhyama · first bhāga',
    'II.2': 'Madhyama · second bhāga',
    'II.3': 'Madhyama · third bhāga',
    'III.1': 'Pratisarga · first khaṇḍa',
    'III.2': 'Pratisarga · second khaṇḍa',
    'III.3': 'Pratisarga · third khaṇḍa',
    'III.4': 'Pratisarga · fourth khaṇḍa',
    IV: 'Uttara-parvan'
  };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  let data;
  let byChapter;

  function key(section, chapter) {
    return section + '.' + chapter;
  }

  function numericSection(section) {
    const roman = { I: '1', II: '2', III: '3', IV: '4' };
    return String(section).split('.').map(part => roman[part] || part).join('.');
  }

  function numericTextReferences(text) {
    const roman = { IV: '4', III: '3', II: '2', I: '1' };
    return String(text ?? '').replace(/\b(IV|III|II|I)(?=\.(?:\d+))/g, value => roman[value]);
  }

  function bhaviṣyaReference(section, chapter, passage) {
    const base = numericSection(section) + '.' + chapter;
    return passage && passage !== 'unspecified' ? base + '.' + normalizeVerseMarkers(passage) : base;
  }

  function normalizeVerseMarkers(text) {
    return numericTextReferences(text)
      .replace(/\bvv\.\s*/gi, 'verses ')
      .replace(/\bv\.\s*/gi, 'verse ');
  }

  function verseInterval(token) {
    const match = String(token).trim().match(/^(\d+)([ab])?(?:\s*[–-]\s*(\d+|end)([ab])?)?$/i);
    if (!match) return null;
    const startNumber = Number(match[1]);
    const startHalf = (match[2] || 'a').toLowerCase();
    const endNumber = match[3] && match[3].toLowerCase() !== 'end' ? Number(match[3]) : startNumber;
    const endHalf = (match[4] || 'b').toLowerCase();
    const start = startNumber * 2 + (startHalf === 'b' ? 1 : 0);
    const end = match[3] && match[3].toLowerCase() === 'end'
      ? Infinity : endNumber * 2 + (endHalf === 'b' ? 1 : 0);
    return { start, end };
  }

  function verseRangeText(interval) {
    const endpoint = (point, isEnd) => {
      if (point === Infinity) return 'end';
      const number = Math.floor(point / 2);
      const half = point % 2 ? 'b' : 'a';
      return String(number) + (isEnd ? (half === 'a' ? 'a' : '') : (half === 'b' ? 'b' : ''));
    };
    const first = endpoint(interval.start, false);
    const last = endpoint(interval.end, true);
    if (interval.start === interval.end) {
      const verse = Math.floor(interval.start / 2);
      return String(verse) + (interval.start % 2 ? 'b' : 'a');
    }
    if (Math.floor(interval.start / 2) === Math.floor(interval.end / 2) &&
        interval.start % 2 === 0 && interval.end % 2 === 1) {
      return String(Math.floor(interval.start / 2));
    }
    return first + '–' + last;
  }

  function compactVerseList(passages) {
    const ranges = [];
    const other = [];
    passages.forEach(passage => String(passage).split(/\s*,\s*/).forEach(token => {
      if (token.toLowerCase() === 'unspecified') { other.push(token); return; }
      const range = verseInterval(token);
      if (range) ranges.push(range);
      else if (token && !other.includes(token)) other.push(token);
    }));
    ranges.sort((a, b) => a.start - b.start || a.end - b.end);
    const merged = [];
    ranges.forEach(range => {
      const last = merged[merged.length - 1];
      if (last && range.start <= last.end + 1) last.end = Math.max(last.end, range.end);
      else merged.push({ ...range });
    });
    return [...merged.map(verseRangeText), ...other];
  }

  function compactEvidence(found) {
    const groups = new Map();
    found.forEach(item => {
      const groupKey = JSON.stringify([
        item.kind, item.work, item.author || '',
        item.kind === 'quotation' ? '' : item.source_locus || '',
        item.label || ''
      ]);
      let group = groups.get(groupKey);
      if (!group) {
        group = { ...item, passages: [], notes: [], missing: false };
        groups.set(groupKey, group);
      }
      if (!group.passages.includes(item.passage)) group.passages.push(item.passage);
      if (item.note && !group.notes.includes(item.note)) group.notes.push(item.note);
      group.missing = group.missing || item.missing === true;
    });
    return [...groups.values()].map(group => ({
      ...group,
      passage: group.passages.filter(passage => passage !== 'unspecified').join('; '),
      hasUnspecified: group.passages.includes('unspecified'),
      note: group.notes.join(' ')
    })).sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === 'quotation' ? -1 : 1;
      return a.work.localeCompare(b.work);
    });
  }

  function cleanNote(item) {
    let note = item.note || '';
    if (!note) return '';
    if (!item.passage && item.hasUnspecified && item.kind === 'parallel') return '';
    const placementUnresolved = /^In this cited group \(the unmatched lines cannot be assigned to this chapter\):/i.test(note);
    note = note.replace(/^In this cited group \(the unmatched lines cannot be assigned to this chapter\):\s*/i, '');
    note = note.replace(/^Shared chapter group;.*$/i, '');
    note = note.replace(/^Shared chapter;.*$/i, '');
    note = note.replace(/^Shared passages; exact ranges in chs\. 82 and 93 are not specified in the comparison\.?$/i, 'Only the chapter is identified; verse ranges are not given.');
    note = note.replace(/^Shared passages, with no exact verse limits in this entry\.?$/i, 'Verse range is not specified.');
    note = note.replace(/^Quoted there under (?:the title )?Bhaviṣyottara;?\s*/i, '');
    note = note.replace(/A line beginning (.+?) is absent from the received text\./i, 'Unmatched line: “$1”.');
    note = note.replace(/Four lines beginning (.+?) are absent from the received text\./i, 'Four unmatched lines beginning “$1”.');
    note = note.replace(/A further quoted verse has no match; the verse numbers in the I\.100 line of this entry are indistinct\./i, 'One verse unmatched; the I.100 verse number is unclear.');
    note = note.replace(/An additional quoted verse has no match\./i, 'One additional verse unmatched.');
    note = note.replace(/An additional verse in the citation is absent from the received chapter\./i, 'One additional verse absent from the received chapter.');
    note = note.replace(/An additional quoted verse is absent\./i, 'One additional verse absent from the received text.');
    note = note.replace(/Some intermediate verse numbers in the printed alignment are indistinct\./i, 'Some verse numbers are illegible.');
    note = note.replace(/Three further lines have no match\./i, 'Three further lines unmatched.');
    note = note.replace(/Three further quoted lines have no match\./i, 'Three further lines unmatched.');
    note = note.replace(/Two further lines have no match\./i, 'Two further lines unmatched.');
    note = note.replace(/A further line in the citation has no match\./i, 'One further line unmatched.');
    note = note.replace(/A further line has no match\./i, 'One further line unmatched.');
    note = note.replace(/An additional line has no match\./i, 'One additional line unmatched.');
    note = note.replace(/A line has no match\./i, 'One line unmatched.');
    note = note.replace(/A few lines have no match\./i, 'Some quoted lines lack a match; their verse numbers are not specified.');
    note = note.replace(/The matching order of verses differs from the received chapter\./i, 'Verse order differs from the received chapter.');
    note = note.replace(/The same verse occurs at both places in this Purāṇa\./i, 'Same verse also occurs at the other listed location.');
    note = note.replace(/The shared verses are rearranged across the chapters; no single continuous verse sequence is implied\./i, 'Shared verses are distributed across the chapter.');
    note = note.replace(/Multiple shared verses; a complete verse by verse alignment is not given\./i, 'Several shared verses; no complete verse-by-verse alignment.');
    note = note.replace(/An extensive, variant correspondence; individual verse limits for chs\. 55–57 are not specified\./i, 'Verse limits not specified for chapters 55–57.');
    note = note.replace(/Correspondence noted for both chapters; I\.212 is not aligned verse by verse\./i, 'Verse-by-verse alignment not given for I.212.');
    note = note.replace(/;\s*the verse numbers in the I\.100 line of this entry are indistinct\.?/i, '; I.100 verse number unclear.');
    note = numericTextReferences(note).trim();
    if (placementUnresolved && note) note += ' Chapter assignment unresolved.';
    return note;
  }

  function sourceLocus(item) {
    const locus = item.source_locus || '';
    let match = locus.match(/^ch\.\s*(\d+),\s*vv\.\s*(.+)$/i);
    if (match) return { text: match[1] + '.' + normalizeVerseMarkers(match[2].trim()), qualifier: '' };
    match = locus.match(/^ch\.\s*(\d+),\s*(?:v\.|verse\s+)(.+)$/i);
    if (match) return { text: match[1] + '.' + normalizeVerseMarkers(match[2].trim()), qualifier: '' };
    match = locus.match(/^ch\.\s*(\d+),\s*except\s+(.+)$/i);
    if (match) return {
      text: 'chapter ' + match[1] + ' (excluding verses ' + normalizeVerseMarkers(match[2]).replace(/\bverses\s*/gi, '') + ')',
      qualifier: 'paired verse numbers are not given'
    };
    match = locus.match(/^ch\.\s*(\d+)$/i);
    if (match) return { text: 'chapter ' + match[1], qualifier: 'verse range not given' };
    match = locus.match(/^chs\.\s*(.+)$/i);
    if (match) return { text: 'chapters ' + normalizeVerseMarkers(match[1]), qualifier: 'verse ranges not given' };
    return { text: normalizeVerseMarkers(locus), qualifier: '' };
  }

  function evidenceRow(item, section, chapter) {
    const work = '<em>' + esc(item.work) + '</em>';
    const witness = item.author ? esc(item.author) + ', ' + work : work;
    const label = item.label
      ? ' <span class="citation-as">(cited as ' + esc(item.label.replace(/^as /, '')) + ')</span>'
      : '';
    const passages = item.passages.filter(passage => passage !== 'unspecified');
    const uncertain = passages.length === 0;
    const reference = passages.length
      ? passages.map(passage => bhaviṣyaReference(section, chapter, compactVerseList([passage]).join(', '))).join('; ')
      : numericSection(section) + '.' + chapter;
    const noteText = cleanNote(item);
    const warning = item.missing || /no match|absent|not found|not located|do not|unmatched/i.test(noteText);
    const note = noteText ? '<div class="note' + (warning ? ' warning' : '') + '">' + esc(noteText) + '</div>' : '';
    const location = item.kind === 'parallel' ? sourceLocus(item) : null;
    let body;
    const referenceText = '<strong class="citation-ref">Bhaviṣya Purāṇa ' + esc(reference) + '</strong>';
    if (item.kind === 'quotation') {
      body = referenceText +
        ' <span class="relation">·</span> <span class="kind-label quoted">QUOTED IN</span> ' +
        '<span class="target">' + witness + label + '</span>' +
        (uncertain ? ' <span class="citation-as">(verse range not specified)</span>' : '') +
        (item.hasUnspecified && !uncertain ? ' <span class="citation-as">(additional verse range not specified)</span>' : '');
    } else {
      body = referenceText +
        ' <span class="relation">·</span> <span class="kind-label parallel-kind">PARALLEL IN</span> ' +
        '<span class="target">' + esc(item.work) +
        (location?.text ? ' ' + esc(location.text) : '') + '</span>' +
        (location?.qualifier ? ' <span class="citation-as">(' + esc(location.qualifier) + ')</span>' : '') +
        (uncertain ? ' <span class="citation-as">(Bhaviṣya verse range not specified)</span>' : '') +
        (item.hasUnspecified && !uncertain ? ' <span class="citation-as">(additional Bhaviṣya range not specified)</span>' : '') +
        label;
    }
    return '<li class="evidence-entry"><div class="citation">' + body + '</div>' + note + '</li>';
  }

  function evidenceGroup(title, items, section, chapter) {
    if (!items.length) return '';
    const rows = compactEvidence(items).map(item => evidenceRow(item, section, chapter)).join('');
    return '<section class="evidence-group"><h4>' + title + '</h4><ul class="evidence-list">' +
      rows + '</ul></section>';
  }

  function detail(section, chapter) {
    const found = byChapter.get(key(section, chapter)) || [];
    const name = sectionName[section] || section;
    const quotations = found.filter(item => item.kind === 'quotation');
    const parallels = found.filter(item => item.kind === 'parallel');
    const content = evidenceGroup('Quotations', quotations, section, chapter) +
      evidenceGroup('Parallels in other Purāṇas', parallels, section, chapter);
    const empty = found.length ? '' : '<p class="no-entry">No located citation or parallel.</p>';
    return '<div class="detail-head"><h3>Bhaviṣya Purāṇa ' + esc(numericSection(section)) + '.' + chapter +
      '</h3><span>' + esc(name) + '</span></div>' + (content || empty);
  }

  function chapterRow(section, first, last, firstInSection) {
    let tiles = '';
    for (let chapter = first; chapter <= last; chapter++) {
      const evidence = byChapter.get(key(section.id, chapter)) || [];
      const hasQuote = evidence.some(item => item.kind === 'quotation');
      const hasParallel = evidence.some(item => item.kind === 'parallel');
      const gap = evidence.some(item => item.missing === true ||
        /no match|absent|not found|not located|do not|unmatched/i.test(item.note || ''));
      const status = hasQuote && hasParallel ? 'both' : hasQuote ? 'quoted' : hasParallel ? 'parallel' : 'empty';
      const statusText = hasQuote && hasParallel ? 'quoted and parallel' : hasQuote ? 'quoted in another work' :
        hasParallel ? 'parallel in another Purāṇa' : 'no located reference';
      const label = statusText + (gap ? '; some cited lines are unmatched' : '') + '; click for verse references';
      const tileId = 'tile-' + section.id.replaceAll('.', '-') + '-' + chapter;
      tiles += '<button class="tile ' + status + (gap ? ' gap' : '') +
        '" id="' + tileId + '" type="button" data-section="' + esc(section.id) +
        '" data-chapter="' + chapter + '" aria-expanded="false" aria-label="' +
        esc(section.name) + ', chapter ' + chapter + ': ' + label + '">' + chapter + '</button>';
    }
    const label = firstInSection
      ? '<div class="row-section"><strong>' + esc(section.id) + '</strong><span>' +
        esc(sectionName[section.id] || section.name) + '</span></div>'
      : '<div class="row-section continuation" aria-hidden="true"></div>';
    return '<div class="chapter-row">' + label + '<div class="row-content"><div class="cells">' + tiles +
      '</div></div><div class="detail" hidden></div></div>';
  }

  function renderSection(section, columns) {
    let rows = '';
    for (let first = 1; first <= section.chapters; first += columns) {
      rows += chapterRow(section, first, Math.min(section.chapters, first + columns - 1), first === 1);
    }
    return '<section class="heat-section" aria-label="' + esc(section.name) + '">' + rows + '</section>';
  }

  function unplaced() {
    if (!data.unplaced?.length) return '';
    const items = data.unplaced.map(item =>
      '<li><em>' + esc(item.work) + '</em> · ' + esc(numericTextReferences(item.detail)) + '</li>'
    ).join('');
    return '<details class="unplaced"><summary>Passages without a chapter match · ' +
      data.unplaced.length + '</summary><ul class="unplaced-list">' + items + '</ul></details>';
  }

  function render() {
    const quoteCount = data.chapters.filter(chapter => chapter.evidence.some(item => item.kind === 'quotation')).length;
    const parallelCount = data.chapters.filter(chapter => chapter.evidence.some(item => item.kind === 'parallel')).length;
    document.getElementById('stat').textContent =
      quoteCount + ' chapters with quotations · ' + parallelCount + ' with Purāṇa parallels';
    const columns = window.matchMedia('(max-width: 360px)').matches ? 10
      : window.matchMedia('(max-width: 720px)').matches ? 12 : 24;
    document.getElementById('map').innerHTML =
      data.sections.map(section => renderSection(section, columns)).join('') + unplaced();
  }

  function openTile(tile, scroll = false) {
    const row = tile.closest('.chapter-row');
    const panel = row.querySelector('.detail');
    const wasOpen = tile.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.chapter-row .detail').forEach(detailPanel => {
      detailPanel.hidden = true;
      detailPanel.innerHTML = '';
    });
    document.querySelectorAll('.tile[aria-expanded="true"]').forEach(open => {
      open.setAttribute('aria-expanded', 'false');
    });
    if (wasOpen && !scroll) return;
    tile.setAttribute('aria-expanded', 'true');
    panel.innerHTML = detail(tile.dataset.section, Number(tile.dataset.chapter));
    panel.hidden = false;
    if (scroll) tile.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  document.getElementById('map').addEventListener('click', event => {
    const tile = event.target.closest('.tile');
    if (!tile) return;
    openTile(tile);
    history.replaceState(null, '', '#' + tile.dataset.section + '.' + tile.dataset.chapter);
  });

  fetch('./bhavisya-evidence.json', { cache: 'no-store' }).then(response => {
    if (!response.ok) throw new Error('Chapter data could not load');
    return response.json();
  }).then(json => {
    data = json;
    byChapter = new Map(json.chapters.map(item =>
      [key(item.section, item.chapter), item.evidence]
    ));
    render();
    const match = location.hash.match(/^#(I|II\.[123]|III\.[1234]|IV)\.(\d+)$/);
    if (match) {
      const tileId = 'tile-' + match[1].replaceAll('.', '-') + '-' + match[2];
      const tile = document.getElementById(tileId);
      if (tile) openTile(tile, true);
    }
  }).catch(() => {
    document.getElementById('map').innerHTML = '<p>Chapter data could not load. Reload this page.</p>';
  });
})();
