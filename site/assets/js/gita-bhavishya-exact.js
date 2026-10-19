(() => {
  const root = document.querySelector('.gita-content') || document.querySelector('.article-body');
  if (!root) return;

  document.body.classList.add('gita-page');
  root.classList.add('gita-content');

  const normalizePuranaMarkup = () => {
    const candidates = [
      ...root.querySelectorAll('.bp-verse'),
      ...root.querySelectorAll('section')
    ];
    candidates.forEach((verse) => {
      if (!verse || verse.closest('details')) return;
      const children = Array.from(verse.children);
      const heading = children.find((child) => child.tagName === 'H2' || child.tagName === 'H3');
      const sanskrit = children.find((child) => (
        child.classList.contains('bp-sa') ||
        child.classList.contains('gita-sanskrit') ||
        String(child.getAttribute('lang') || '').toLowerCase().startsWith('sa')
      ));
      if (!heading || !sanskrit) return;

      verse.classList.add('gita-verse');
      heading.classList.add('gita-verse-heading');
      const rule = children.find((child) => child.tagName === 'HR');
      if (rule) rule.classList.add('gita-verse-rule');
      sanskrit.classList.add('gita-sanskrit');

      const sanskritIndex = children.indexOf(sanskrit);
      const translation = children.find((child, index) => (
        index > sanskritIndex &&
        (child.classList.contains('bp-en') ||
          child.classList.contains('gita-translation') ||
          (child.tagName === 'P' && !child.classList.contains('source-note')))
      ));
      if (translation) translation.classList.add('gita-translation');

      children.filter((child) => child.tagName === 'DETAILS').forEach((details) => {
        details.classList.add('gita-details');
        Array.from(details.children)
          .filter((child) => child.tagName !== 'SUMMARY')
          .forEach((reveal) => reveal.classList.add('gita-reveal'));
      });
    });

    root.querySelectorAll('div').forEach((box) => {
      const label = Array.from(box.children).find((child) => (
        (child.tagName === 'H2' || child.tagName === 'P') &&
        child.textContent.trim().toLowerCase() === 'contents'
      ));
      if (label && box.querySelector('ol,ul')) box.classList.add('gita-contents');
    });
  };

  normalizePuranaMarkup();

  const imp = (element, property, value) => {
    if (element) element.style.setProperty(property, value, 'important');
  };

  const styleAll = () => {
    const narrow = window.matchMedia && window.matchMedia('(max-width: 700px)').matches;
    const chapterNav = root.querySelector('.gita-chapter-nav');
    if (chapterNav) {
      imp(chapterNav, 'display', 'flex');
      imp(chapterNav, 'flex-wrap', 'wrap');
      imp(chapterNav, 'justify-content', 'center');
      imp(chapterNav, 'align-items', 'center');
      imp(chapterNav, 'gap', narrow ? '8px' : '10px');
      imp(chapterNav, 'margin', narrow ? '0 auto 24px' : '0 auto 28px');
      imp(chapterNav, 'padding', '0');
      chapterNav.querySelectorAll('a').forEach((link) => {
        const filled = link.classList.contains('gita-nav-next') || link.classList.contains('gita-nav-prev');
        imp(link, 'display', 'inline-flex');
        imp(link, 'align-items', 'center');
        imp(link, 'justify-content', 'center');
        imp(link, 'min-height', narrow ? '31px' : '32px');
        imp(link, 'padding', narrow ? '6px 13px' : '6px 15px');
        imp(link, 'border', '1px solid ' + (filled ? '#2f7f82' : '#9bc5c7'));
        imp(link, 'border-radius', '999px');
        imp(link, 'background', filled ? '#2f7f82' : '#fffdfb');
        imp(link, 'color', filled ? '#ffffff' : '#2f7f82');
        imp(link, 'font-family', 'Vollkorn, Georgia, serif');
        imp(link, 'font-size', narrow ? '12px' : '12.5px');
        imp(link, 'line-height', '1.15');
        imp(link, 'font-weight', '500');
        imp(link, 'letter-spacing', '.01em');
        imp(link, 'text-decoration', 'none');
        imp(link, 'box-shadow', '0 1px 2px rgba(60,54,46,.08)');
      });
    }
    root.querySelectorAll('.gita-verse').forEach((verse) => {
      imp(verse, 'margin', '0 0 22px');
      imp(verse, 'padding', '0');
      imp(verse, 'border', '0');
      imp(verse, 'background', 'transparent');
      imp(verse, 'box-shadow', 'none');

      const heading = verse.querySelector('h2, h3, .gita-verse-heading');
      if (heading) {
        imp(heading, 'margin', '0');
        imp(heading, 'text-align', 'center');
        imp(heading, 'color', '#2f7f82');
        imp(heading, 'font-family', 'Vollkorn, Georgia, serif');
        imp(heading, 'font-size', narrow ? '21px' : '23px');
        imp(heading, 'line-height', '1.1');
        imp(heading, 'font-weight', '600');
        imp(heading, 'letter-spacing', '.01em');
      }

      const rule = verse.querySelector('.gita-verse-rule');
      if (rule) {
        imp(rule, 'border', '0');
        imp(rule, 'border-top', '1px solid #dedbd6');
        imp(rule, 'width', '56%');
        imp(rule, 'max-width', '520px');
        imp(rule, 'margin', '10px auto 12px');
      }

      const sanskrit = verse.querySelector('.gita-sanskrit');
      if (sanskrit) {
        imp(sanskrit, 'max-width', '840px');
        imp(sanskrit, 'margin', '0 auto 12px');
        imp(sanskrit, 'text-align', 'center');
        imp(sanskrit, 'color', '#3c362e');
        imp(sanskrit, 'font-family', '"Noto Serif Devanagari", "Noto Serif", serif');
        imp(sanskrit, 'font-size', narrow ? '16.5px' : '18px');
        imp(sanskrit, 'line-height', '1.45');
        imp(sanskrit, 'font-weight', '400');
      }

      const translation = verse.querySelector('.gita-translation');
      if (translation) {
        const text = translation.textContent || '';
        const cleaned = text.replace(/^\s*\d+\.\d+\s*/, '');
        if (cleaned !== text) translation.textContent = cleaned;
        imp(translation, 'max-width', '840px');
        imp(translation, 'margin', '0 auto 12px');
        imp(translation, 'padding', '0');
        imp(translation, 'border', '0');
        imp(translation, 'background', 'transparent');
        imp(translation, 'box-shadow', 'none');
        imp(translation, 'text-align', 'center');
        imp(translation, 'color', '#3c362e');
        imp(translation, 'font-family', 'Noto Serif, Georgia, serif');
        imp(translation, 'font-size', '14px');
        imp(translation, 'line-height', '1.45');
        imp(translation, 'font-weight', '400');
      }

      const controls = verse.querySelector('.gita-controls');
      if (controls) {
        imp(controls, 'display', 'block');
        imp(controls, 'max-width', '840px');
        imp(controls, 'margin', '0 auto');
        imp(controls, 'padding', '0');
      }

      [...verse.querySelectorAll('.gita-details')].forEach((details) => {
        imp(details, 'display', 'block');
        imp(details, 'max-width', '840px');
        imp(details, 'margin', '0 auto 6px');
        imp(details, 'padding', '0');
        imp(details, 'border', '0');
        imp(details, 'background', 'transparent');
        imp(details, 'box-shadow', 'none');

        const summary = details.querySelector('summary');
        if (summary) {
          imp(summary, 'display', 'block');
          imp(summary, 'width', 'max-content');
          imp(summary, 'max-width', '100%');
          imp(summary, 'cursor', 'pointer');
          imp(summary, 'border', '1px solid #c8c1ba');
          imp(summary, 'border-radius', '6px');
          imp(summary, 'padding', narrow ? '5px 10px' : '6px 12px');
          imp(summary, 'color', '#5a514a');
          imp(summary, 'background', 'transparent');
          imp(summary, 'font-size', narrow ? '11.5px' : '12.5px');
          imp(summary, 'line-height', '1.2');
          imp(summary, 'font-weight', '600');
          imp(summary, 'box-shadow', 'none');
          imp(summary, 'text-decoration', 'none');
        }

        const reveal = details.querySelector('.gita-reveal');
        if (!reveal) return;
        imp(reveal, 'margin', '6px 0 9px');
        imp(reveal, 'padding', '0');
        imp(reveal, 'border', '0');
        imp(reveal, 'background', 'transparent');
        imp(reveal, 'box-shadow', 'none');
        imp(reveal, 'color', '#3c362e');
        imp(reveal, 'font-size', '11.5px');
        imp(reveal, 'line-height', '1.42');

        reveal.querySelectorAll('p').forEach((paragraph) => {
          const isSanskrit = paragraph.matches('[lang^="sa"]');
          imp(paragraph, 'margin', '0');
          imp(paragraph, 'font-size', isSanskrit ? '15px' : '11.5px');
          imp(paragraph, 'line-height', isSanskrit ? '1.55' : '1.42');
        });
        reveal.querySelectorAll('.gita-dual-label').forEach((label) => {
          imp(label, 'margin', '0 0 7px');
          imp(label, 'font-size', narrow ? '17px' : '19px');
          imp(label, 'line-height', '1.2');
        });
        reveal.querySelectorAll('.gita-wfw-list').forEach((list) => {
          imp(list, 'font-size', narrow ? '13.5px' : '15.5px');
          imp(list, 'line-height', narrow ? '1.48' : '1.55');
        });
      });

      const commentary = verse.querySelector('.gita-commentary');
      if (commentary) {
        imp(commentary, 'max-width', '840px');
        imp(commentary, 'margin', '12px auto 20px');
        imp(commentary, 'padding', '0');
        imp(commentary, 'border', '0');
        imp(commentary, 'border-left', '0');
        imp(commentary, 'background', 'transparent');
        imp(commentary, 'box-shadow', 'none');
        imp(commentary, 'color', '#3c362e');
        imp(commentary, 'font-size', narrow ? '15px' : '16px');
        imp(commentary, 'line-height', narrow ? '1.52' : '1.58');
        imp(commentary, 'text-align', 'left');
        const commentaryHeading = commentary.querySelector('h3');
        if (commentaryHeading) {
          imp(commentaryHeading, 'margin', '0 0 4px');
          imp(commentaryHeading, 'font-family', 'Vollkorn, Georgia, serif');
          imp(commentaryHeading, 'font-size', narrow ? '17px' : '18px');
          imp(commentaryHeading, 'line-height', '1.25');
        }
      }
    });
  };

  styleAll();
  new MutationObserver(styleAll).observe(root, {childList: true, subtree: true});
})();