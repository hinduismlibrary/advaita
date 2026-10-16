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
  const roman = { I: '1', II: '2', III: '3', IV: '4' };
  let data;
  let byChapter;

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
  }

  function numericSection(section) {
    return String(section).split('.').map(part => roman[part] || part).join('.');
  }

  function numericText(text) {
    return String(text ?? '')
      .replace(/\b(IV|III|II|I)(?=\.(?:\d+))/g, value => roman[value])
      .replace(/\bvv\.\s*/gi, 'verses ')
      .replace(/\bv\.\s*/gi, 'verse ');
  }

  function interval(token) {
    const match = String(token).trim().match(/^(\d+)([ab])?(?:\s*[–-]\s*(\d+|end)([ab])?)?$/i);
    if (!match) return null;
    const first = Number(match[1]);
    const firstHalf = (match[2] || 'a').toLowerCase();
    const hasEnd = Boolean(match[3]);
    const start = first * 2 + (firstHalf === 'b' ? 1 : 0);
    if (!hasEnd) {
      const end = match[2] ? start : first * 2 + 1;
      return { start, end };
    }
    const end = match[3].toLowerCase() === 'end'
      ? Infinity
      : Number(match[3]) * 2 + ((match[4] || 'b').toLowerCase() === 'b' ? 1 : 0);
    return { start, end };
  }

  function rangeText(range) {
    function endpoint(point, isEnd) {
      if (point === Infinity) return 'end';
      const verse = Math.floor(point / 2);
      const half = point % 2 ? 'b' : 'a';
      return String(verse) + (isEnd ? (half === 'a' ? 'a' : '') : (half === 'b' ? 'b' : ''));
    }
    if (range.start === range.end) {
      return String(Math.floor(range.start / 2)) + (range.start % 2 ? 'b' : 'a');
    }
    if (Math.floor(range.start / 2) === Math.floor(range.end / 2) &&
        range.start % 2 === 0 && range.end % 2 === 1) {
      return String(Math.floor(range.start / 2));
    }
    return endpoint(range.start, false) + '–' + endpoint(range.end, true);
  }

  function compactRanges(passages) {
    const ranges = [];
    const other = [];
    passages.forEach(passage => String(passage).split(/\s*,\s*/).forEach(token => {
      if (!token || token.toLowerCase() === 'unspecified') return;
      const parsed = interval(token);
      if (parsed) ranges.push(parsed);
      else if (!other.includes(token)) other.push(token);
    }));
    ranges.sort((a, b) => a.start - b.start || a.end - b.end);
    const merged = [];
    ranges.forEach(range => {
      const previous = merged[merged.length - 1];
      if (previous && range.start <= previous.end + 1) previous.end = Math.max(previous.end, range.end);
      else merged.push({ ...range });
    });
    return [...merged.map(rangeText), ...other];
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
      hasUnspecified: group.passages.includes('unspecified'),
      note: group.notes.join(' ')
    })).sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === 'quotation' ? -1 : 1;
      return a.work.localeCompare(b.work);
    });
  }

  function bhavReference(item, section, chapter) {
    const base = numericSection(section) + '.' + chapter;
    const known = item.passages.filter(passage => passage && passage !== 'unspecified');
    if (!known.length) return base + ' (verse range not specified)';
    const ranges = compactRanges(known);
    const numeric = [];
    const notes = [];
    ranges.forEach(part => {
      const parsed = interval(part);
      if (parsed) {
        numeric.push(base + '.' + part.replace(/–end$/i, '–end of chapter'));
      } else if (/^all except\s+/i.test(part)) {
        notes.push('all verses except ' + part.replace(/^all except\s+/i, ''));
      } else if (/^except\s+/i.test(part)) {
        notes.push(part);
      } else if (/with gaps/i.test(part)) {
        const match = part.match(/^(.+?)\s+with gaps$/i);
        if (match && interval(match[1])) numeric.push(base + '.' + rangeText(interval(match[1])) + ' (gaps in the range)');
        else notes.push(part);
      } else if (/substantial passage/i.test(part)) {
        notes.push('substantial passage; verses not specified');
      } else {
        notes.push(part);
      }
    });
    let result = numeric.join(', ');
    if (notes.length) result += (result ? ' (' + notes.join('; ') + ')' : ' (' + notes.join('; ') + ')');
    if (item.hasUnspecified) result += (result ? '; another passage has no verse range' : ' (verse range not specified)');
    return result || base + ' (verse range not specified)';
  }

  function sourceLocus(item) {
    const locus = numericText(item.source_locus || '').trim();
    let match = locus.match(/^ch\.\s*(\d+),\s*except\s+verses\s+(.+)$/i);
    if (match) return 'chapter ' + match[1] + ' (excluding its verses ' + match[2] + ')';
    match = locus.match(/^ch\.\s*(\d+),\s*verses\s+(.+)$/i);
    if (match) return 'chapter ' + match[1] + ', verses ' + match[2];
    match = locus.match(/^ch\.\s*(\d+),\s*verse\s+(.+)$/i);
    if (match) return 'chapter ' + match[1] + ', verse ' + match[2];
    match = locus.match(/^ch\.\s*(\d+)$/i);
    if (match) return 'chapter ' + match[1] + ' (verse range not specified)';
    match = locus.match(/^chs\.\s*(.+)$/i);
    if (match) return 'chapters ' + match[1] + ' (verse ranges not specified)';
    return locus;
  }

  function conciseNote(item) {
    let note = item.note || '';
    if (!note) return '';
    if (/^In this cited group \(the unmatched lines cannot be assigned to this chapter\):/i.test(note)) {
      note = note.replace(/^In this cited group \(the unmatched lines cannot be assigned to this chapter\):\s*/i, '');
    }
    if (/^(Shared chapter group|Shared chapter|Shared passages|Multiple shared verses|An extensive, variant correspondence|Correspondence noted for both chapters)/i.test(note)) return '';
    if (/^Continuous match reported/i.test(note) || /^The same verse occurs at both places/i.test(note) || /^Quoted there under/i.test(note)) return '';
    if (/^The shared verses are rearranged/i.test(note)) return 'The passages are rearranged in this source.';
    if (/^The matching order of verses differs/i.test(note)) return 'Verse order differs from the chapter.';
    if (/^A further comparison identifies I\.130\.27/i.test(note)) return '';
    const rules = [
      [/^An additional verse in the citation is absent from the received chapter\.?$/i, '1 quoted verse is not found in this chapter.'],
      [/^Three of five quoted verses correspond at these alternative locations; two do not\.?$/i, '3 of 5 quoted verses match; 2 do not.'],
      [/^An additional verse beginning (.+?) is absent\.?$/i, '1 quoted verse is not found (begins “$1”).'],
      [/^The final line beginning (.+?) has no match in this chapter\.?$/i, '1 quoted line is not found (begins “$1”).'],
      [/^A few lines have no match\.?$/i, 'Some quoted lines are not found; the count and verse numbers are not supplied.'],
      [/^Eleven further quoted lines have no match\.?$/i, '11 quoted lines are not found in this chapter.'],
      [/^Two lines and seven further verses have no match\.?$/i, '2 quoted lines and 7 verses are not found in this chapter.'],
      [/^Four lines beginning (.+?) are absent from the received text\.?$/i, '4 quoted lines are not found (begin “$1”).'],
      [/^One line and one verse in the citation have no match\.?$/i, '1 quoted line and 1 verse are not found; their verse numbers are not specified.'],
      [/^Two further lines have no match\.?$/i, '2 quoted lines are not found in this chapter.'],
      [/^The first five cited lines have no match\.?$/i, '5 opening quoted lines are not found in this chapter.'],
      [/^A line has no match\.?$/i, '1 quoted line is not found in this chapter.'],
      [/^A line in the citation has no match here\.?$/i, '1 quoted line is not found in this chapter.'],
      [/^A further line has no match\.?$/i, '1 further quoted line is not found.'],
      [/^A further line in the citation has no match\.?$/i, '1 further quoted line is not found.'],
      [/^An additional line has no match\.?$/i, '1 additional quoted line is not found.'],
      [/^A line beginning (.+?) is absent from the received text\.?$/i, '1 quoted line is not found (begins “$1”).'],
      [/^A line beginning (.+?) is absent\.?$/i, '1 quoted line is not found (begins “$1”).'],
      [/^An additional quoted verse has no match\.?$/i, '1 additional quoted verse is not found.'],
      [/^Some intermediate verse numbers in the printed alignment are indistinct\.?$/i, 'Some verse numbers in the quotation are unclear.'],
      [/^For the first of two citations, the remaining lines have no match\.?$/i, 'The first citation has additional lines not found in this chapter.'],
      [/^Three lines from (.+?) are not found\.?$/i, '3 quoted lines are not found (begin “$1”).'],
      [/^Three further lines have no match\.?$/i, '3 further quoted lines are not found.'],
      [/^Two additional lines have no match\.?$/i, '2 additional quoted lines are not found.'],
      [/^Two additional cited verses have no match\.?$/i, '2 additional quoted verses are not found.'],
      [/^Two lines of this citation do not occur in the received chapter; it names the third bhāga.?s ninth chapter, whose numbering differs\.?$/i, '2 quoted lines are absent; the cited chapter numbering differs from this text.'],
      [/^A line and one additional verse have no match\.?$/i, '1 quoted line and 1 additional verse are not found.'],
      [/^An additional verse has no match\.?$/i, '1 additional quoted verse is not found.'],
      [/^Several cited lines have no match\.?$/i, 'Several quoted lines are not found; the count is not specified.'],
      [/^Eighteen further lines and three have no match\.?$/i, '18 further quoted lines and 3 additional lines are not found.'],
      [/^Additional cited lines have no match\.?$/i, 'Additional quoted lines are not found; the count is not specified.'],
      [/^The verse beginning (.+?) has no match here\.?$/i, '1 quoted verse is not found (begins “$1”).'],
      [/^Seven lines beginning (.+?) have no match here\.?$/i, '7 quoted lines are not found (begin “$1”).'],
      [/^The citation gives (.+?)\.$/i, '$1.'],
      [/^The citation identifies this passage as equivalent to (.+?)\.$/i, '$1.']
    ];
    rules.forEach(([pattern, replacement]) => {
      if (pattern.test(note)) note = note.replace(pattern, replacement);
    });
    note = numericText(note).replace(/\s+/g, ' ').trim();
    return note;
  }

  function evidenceRow(item, section, chapter) {
    const reference = '<strong class="citation-ref">Bhaviṣya Purāṇa ' +
      escapeHtml(bhavReference(item, section, chapter)) + '</strong>';
    let target;
    if (item.kind === 'quotation') {
      target = '<em>' + escapeHtml(item.work) + '</em>' +
        (item.author ? ' (' + escapeHtml(item.author) + ')' : '');
      if (item.label) target += ' <span class="citation-as">(' +
        escapeHtml(item.label.replace(/^as /, 'cited as ')) + ')</span>';
    } else {
      const locus = sourceLocus(item);
      target = escapeHtml(item.work) + (locus ? ', ' + escapeHtml(locus) : '');
    }
    const noteText = conciseNote(item);
    const warning = item.missing === true ||
      /not found|not found in|not specified|not supplied|absent|unmatched|do not/i.test(noteText);
    const note = noteText
      ? '<div class="note' + (warning ? ' warning' : '') + '">' + escapeHtml(noteText) + '</div>'
      : '';
    return '<li class="evidence-entry"><div class="citation">' + reference +
      ' <span class="separator" aria-hidden="true">' + (item.kind === 'quotation' ? '→' : '↔') + '</span> <span class="target">' + target +
      '</span></div>' + note + '</li>';
  }

  function evidenceGroup(title, items, section, chapter) {
    if (!items.length) return '';
    const rows = items.map(item => evidenceRow(item, section, chapter)).join('');
    return '<section class="evidence-group"><h4>' + title + '</h4><ul class="evidence-list">' +
      rows + '</ul></section>';
  }

  function detail(section, chapter) {
    const found = compactEvidence(byChapter.get(section + '.' + chapter) || []);
    const quotations = found.filter(item => item.kind === 'quotation');
    const parallels = found.filter(item => item.kind === 'parallel');
    const content = evidenceGroup('Quoted in', quotations, section, chapter) +
      evidenceGroup('Parallel in', parallels, section, chapter);
    const sectionTitle = sectionName[section] || section;
    const empty = found.length ? '' : '<p class="no-entry">No entry recorded.</p>';
    return '<div class="detail-head"><h3>Bhaviṣya Purāṇa ' +
      escapeHtml(numericSection(section) + '.' + chapter) + '</h3><span>' +
      escapeHtml(sectionTitle) + '</span></div>' + (content || empty);
  }

  function chapterRow(section, first, last, firstInSection) {
    let tiles = '';
    for (let chapter = first; chapter <= last; chapter++) {
      const evidence = byChapter.get(section.id + '.' + chapter) || [];
      const hasQuote = evidence.some(item => item.kind === 'quotation');
      const hasParallel = evidence.some(item => item.kind === 'parallel');
      const gap = evidence.some(item => item.missing === true ||
        /no match|absent|not found|unmatched/i.test(item.note || ''));
      const status = hasQuote && hasParallel ? 'both' :
        hasQuote ? 'quoted' : hasParallel ? 'parallel' : 'empty';
      const statusText = hasQuote && hasParallel ? 'quoted and parallel' :
        hasQuote ? 'quoted in another work' : hasParallel ? 'parallel in another work' :
        'no reference listed';
      const tileId = 'tile-' + section.id.replaceAll('.', '-') + '-' + chapter;
      tiles += '<button class="tile ' + status + (gap ? ' gap' : '') +
        '" id="' + tileId + '" type="button" data-section="' + escapeHtml(section.id) +
        '" data-chapter="' + chapter + '" aria-expanded="false" aria-label="' +
        escapeHtml(sectionName[section.id] + ', chapter ' + chapter + ': ' + statusText) +
        '" title="' + escapeHtml(numericSection(section.id) + '.' + chapter) + '">' + chapter + '</button>';
    }
    const label = firstInSection
      ? '<div class="row-section"><strong>' + escapeHtml(numericSection(section.id)) +
        '</strong><span>' + escapeHtml(sectionName[section.id] || section.name) + '</span></div>'
      : '<div class="row-section continuation" aria-hidden="true"></div>';
    return '<div class="chapter-row">' + label + '<div class="row-content"><div class="cells">' +
      tiles + '</div></div><div class="detail" hidden></div></div>';
  }

  function renderSection(section, columns) {
    let rows = '';
    for (let first = 1; first <= section.chapters; first += columns) {
      rows += chapterRow(section, first, Math.min(section.chapters, first + columns - 1), first === 1);
    }
    return '<section class="heat-section" aria-label="' + escapeHtml(section.name) + '">' +
      rows + '</section>';
  }

  function render() {
    const columns = window.matchMedia('(max-width: 720px)').matches ? 12 : 24;
    document.getElementById('map').innerHTML =
      data.sections.map(section => renderSection(section, columns)).join('');
  }

  function sectionFromNumeric(value) {
    const match = String(value).match(/^(1|2\.[123]|3\.[1234]|4)$/);
    if (!match) return null;
    const inverse = { '1': 'I', '2': 'II', '3': 'III', '4': 'IV' };
    const pieces = value.split('.');
    return pieces.map(piece => inverse[piece] || piece).join('.');
  }

  function openTile(tile) {
    const row = tile.closest('.chapter-row');
    const panel = row.querySelector('.detail');
    const wasOpen = tile.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.chapter-row .detail').forEach(openPanel => {
      openPanel.hidden = true;
      openPanel.innerHTML = '';
    });
    document.querySelectorAll('.tile[aria-expanded="true"]').forEach(open => {
      open.setAttribute('aria-expanded', 'false');
    });
    if (wasOpen) return;
    tile.setAttribute('aria-expanded', 'true');
    panel.innerHTML = detail(tile.dataset.section, Number(tile.dataset.chapter));
    panel.hidden = false;
  }

  document.getElementById('map').addEventListener('click', event => {
    const tile = event.target.closest('.tile');
    if (!tile) return;
    openTile(tile);
    history.replaceState(null, '', '#' + numericSection(tile.dataset.section) + '.' + tile.dataset.chapter);
  });

  window.addEventListener('resize', () => {
    clearTimeout(window.__bhavisyaMapResize);
    window.__bhavisyaMapResize = setTimeout(render, 120);
  });

  fetch('./bhavisya-evidence.json?v=20261014-7', { cache: 'no-store' }).then(response => {
    if (!response.ok) throw new Error('Chapter data could not load');
    return response.json();
  }).then(json => {
    data = json;
    byChapter = new Map(json.chapters.map(item =>
      [item.section + '.' + item.chapter, item.evidence]
    ));
    render();
    const hash = location.hash.slice(1).split('.');
    if (hash.length >= 2) {
      const section = sectionFromNumeric(hash.slice(0, -1).join('.'));
      const chapter = Number(hash[hash.length - 1]);
      const tile = document.querySelector('.tile[data-section="' + section + '"][data-chapter="' + chapter + '"]');
      if (tile && section) {
        tile.setAttribute('aria-expanded', 'true');
        const panel = tile.closest('.chapter-row').querySelector('.detail');
        panel.innerHTML = detail(section, chapter);
        panel.hidden = false;
      }
    }
  }).catch(() => {
    document.getElementById('map').innerHTML = '<p class="error">Chapter data unavailable.</p>';
  });
})();
