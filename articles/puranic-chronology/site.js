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

  function compactEvidence(found) {
    const groups = new Map();
    found.forEach(item => {
      const groupKey = JSON.stringify([
        item.kind, item.work, item.author || '', item.source_locus || '', item.label || ''
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
      passage: group.passages.filter(passage => passage !== 'unspecified').join(', '),
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
    note = note.replace(/^Shared passages; exact ranges in chs\. 82 and 93 are not specified in the comparison\.?$/i, '');
    note = note.replace(/^Shared passages, with no exact verse limits in this entry\.?$/i, '');
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
    note = note.replace(/A few lines have no match\./i, 'Several lines unmatched.');
    note = note.replace(/The matching order of verses differs from the received chapter\./i, 'Verse order differs from the received chapter.');
    note = note.replace(/The text is given as an alternative placement in the received Bhaviṣya\./i, 'Alternative placement in the received text.');
    note = note.replace(/The same verse occurs at both places in this Purāṇa\./i, 'Same verse also occurs at the other listed location.');
    note = note.replace(/The shared verses are rearranged across the chapters; no single continuous verse sequence is implied\./i, 'Shared verses are distributed across the chapter.');
    note = note.replace(/Multiple shared verses; a complete verse by verse alignment is not given\./i, 'Several shared verses; no complete verse-by-verse alignment.');
    note = note.replace(/An extensive, variant correspondence; individual verse limits for chs\. 55–57 are not specified\./i, 'Verse limits not specified for chapters 55–57.');
    note = note.replace(/Correspondence noted for both chapters; I\.212 is not aligned verse by verse\./i, 'Verse-by-verse alignment not given for I.212.');
    note = note.replace(/;\s*the verse numbers in the I\.100 line of this entry are indistinct\.?/i, '; I.100 verse number unclear.');
    note = note.trim();
    if (placementUnresolved && note) note += ' Chapter assignment unresolved.';
    return note;
  }

  function sourceLocus(item) {
    const locus = item.source_locus || '';
    const exact = locus.match(/^ch\.\s*(\d+),\s*vv\.\s*(.+)$/i);
    if (exact) return 'ch. ' + exact[1] + ', vv. ' + exact[2];
    const chapter = locus.match(/^ch\.\s*(\d+),\s*except\s+(.+)$/i);
    if (chapter) return 'ch. ' + chapter[1] + ' (except ' + chapter[2] + ')';
    const chapters = locus.match(/^chs\.\s*(.+)$/i);
    if (chapters) return 'chs. ' + chapters[1];
    return locus;
  }

  function evidenceRow(item, section, chapter) {
    const source = sourceLocus(item);
    const work = '<em>' + esc(item.work) + '</em>';
    const witness = item.author ? esc(item.author) + ', ' + work : work;
    const label = item.label ? ' <span class="citation-as">(cited as ' + esc(item.label.replace(/^as /, '')) + ')</span>' : '';
    const locus = item.source_locus && item.kind === 'quotation'
      ? ' <span class="source-locus">' + esc(item.source_locus) + '</span>' : '';
    const uncertain = !item.passage;
    const passage = uncertain ? '' : 'vv. ' + esc(item.passage);
    const partialUnspecified = !uncertain && item.hasUnspecified;
    const noteText = cleanNote(item);
    const warning = item.missing || /no match|absent|not found|not located|do not occur|unmatched/i.test(noteText);
    const note = noteText ? '<div class="note' + (warning ? ' warning' : '') + '">' + esc(noteText) + '</div>' : '';
    let citation;
    if (item.kind === 'quotation') {
      citation = '<span class="kind">Quote</span><span class="citation-text">' +
        (uncertain ? 'Bhaviṣya ' + esc(section) + '.' + chapter + ' (verses unspecified)' : passage) +
        ' <span class="relation">→</span> ' + witness + locus + label + '</span>';
    } else if (uncertain) {
      citation = '<span class="kind">Chapter link</span><span class="citation-text">' + work + ' ' + esc(source) +
        ' <span class="citation-as">(corresponding verse ranges not specified)</span></span>';
    } else {
      citation = '<span class="kind">Parallel</span><span class="citation-text">' + passage +
        ' <span class="relation">↔</span> ' + work + (source ? ' ' + esc(source) : '') + label +
        (partialUnspecified ? ' <span class="citation-as">(other verse ranges unspecified)</span>' : '') + '</span>';
    }
    return '<li class="evidence-entry"><div class="citation">' + citation + '</div>' + note + '</li>';
  }

  function detail(section, chapter) {
    const found = byChapter.get(key(section, chapter)) || [];
    const name = sectionName[section] || section;
    const rows = compactEvidence(found).map(item => evidenceRow(item, section, chapter)).join('');
    const empty = found.length
      ? ''
      : '<p class="no-entry">No located quotation or parallel.</p>';
    return '<div class="detail-head"><h3>Bhaviṣya Purāṇa ' + esc(section) + '.' + chapter +
      '</h3><span>' + esc(name) + '</span></div>' +
      (found.length ? '<ul class="evidence-list">' + rows + '</ul>' : empty);
  }

  function chapterRow(section, first, last, firstInSection) {
    let tiles = '';
    for (let chapter = first; chapter <= last; chapter++) {
      const evidence = byChapter.get(key(section.id, chapter)) || [];
      const marked = evidence.length > 0;
      const gap = evidence.some(item => item.missing === true || /no match|absent|not found|not located|do not occur/i.test(item.note || ''));
      const entryCount = compactEvidence(evidence).length;
      const label = (marked ? entryCount + ' references' : 'no located entry') +
        (gap ? '; at least one cited line is unmatched' : '');
      const tileId = 'tile-' + section.id.replaceAll('.', '-') + '-' + chapter;
      tiles += '<button class="tile' + (marked ? ' marked' : '') + (gap ? ' gap' : '') +
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
      '<li><em>' + esc(item.work) + '</em> · ' + esc(item.detail) + '</li>'
    ).join('');
    return '<details class="unplaced"><summary>Passages without a chapter match · ' +
      data.unplaced.length + '</summary><ul class="unplaced-list">' + items + '</ul></details>';
  }

  function render() {
    const total = data.sections.reduce((sum, section) => sum + section.chapters, 0);
    document.getElementById('stat').textContent =
      byChapter.size + ' of ' + total + ' chapters have a located entry';
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

  fetch('./bhavisya-evidence.json').then(response => {
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
