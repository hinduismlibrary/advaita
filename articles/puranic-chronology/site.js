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
      passage: group.passages.includes('unspecified')
        ? 'unspecified'
        : group.passages.join(', '),
      note: group.notes.join(' ')
    })).sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === 'quotation' ? -1 : 1;
      return a.work.localeCompare(b.work);
    });
  }

  function evidenceRow(item) {
    const kind = item.kind === 'quotation' ? 'Quoted in' : 'Parallel in';
    const author = item.author ? '<span class="author">· ' + esc(item.author) + '</span>' : '';
    const source = item.source_locus
      ? '<div class="source-locus">' + (item.kind === 'quotation' ? 'At ' : '') + esc(item.source_locus) + '</div>'
      : '';
    const label = item.label
      ? '<div class="source-locus">Cited under the title ' + esc(item.label.replace(/^as /, '')) + '</div>'
      : '';
    const note = item.note ? '<p class="note">' + esc(item.note) + '</p>' : '';
    const range = item.passage === 'unspecified'
      ? 'verse range not specified'
      : 'vv. ' + item.passage;
    return '<li class="evidence-entry">' +
      '<div class="verse"><span class="kind">' + kind + '</span>Bhaviṣya ' + esc(range) + '</div>' +
      '<div><div class="work"><em>' + esc(item.work) + '</em>' + author + '</div>' + source + label + '</div>' +
      note + '</li>';
  }

  function detail(section, chapter) {
    const found = byChapter.get(key(section, chapter)) || [];
    const name = sectionName[section] || section;
    const rows = compactEvidence(found).map(evidenceRow).join('');
    const empty = found.length
      ? ''
      : '<p class="no-entry">No quotation or parallel is recorded for this chapter.</p>';
    return '<div class="detail-head"><h3>Bhaviṣya Purāṇa ' + esc(section) + '.' + chapter +
      '</h3><span>' + esc(name) + '</span></div>' +
      (found.length ? '<ul class="evidence-list">' + rows + '</ul>' : empty);
  }

  function chapterRow(section, first, last) {
    let tiles = '';
    for (let chapter = first; chapter <= last; chapter++) {
      const evidence = byChapter.get(key(section.id, chapter)) || [];
      const marked = evidence.length > 0;
      const gap = evidence.some(item => item.missing === true);
      const entryCount = compactEvidence(evidence).length;
      const label = marked
        ? entryCount + ' grouped ' + (entryCount === 1 ? 'reference' : 'references')
        : 'no located entry';
      const tileId = 'tile-' + section.id.replaceAll('.', '-') + '-' + chapter;
      tiles += '<button class="tile' + (marked ? ' marked' : '') + (gap ? ' gap' : '') +
        '" id="' + tileId + '" type="button" data-section="' + esc(section.id) +
        '" data-chapter="' + chapter + '" aria-expanded="false" aria-label="' +
        esc(section.name) + ', chapter ' + chapter + ': ' + label + '">' + chapter + '</button>';
    }
    return '<div class="chapter-row"><div class="cells">' + tiles +
      '</div><div class="detail" hidden></div></div>';
  }

  function renderSection(section, columns) {
    let rows = '';
    for (let first = 1; first <= section.chapters; first += columns) {
      rows += chapterRow(section, first, Math.min(section.chapters, first + columns - 1));
    }
    const name = sectionName[section.id] || section.name;
    return '<section class="heat-section" aria-label="' + esc(section.name) + '">' +
      '<aside class="section-label"><strong>' + esc(section.id) + '</strong><span>' +
      esc(name) + '</span><small>1–' + section.chapters + '</small></aside>' +
      '<div class="section-body">' + rows + '</div></section>';
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
