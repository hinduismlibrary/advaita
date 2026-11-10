(() => {
  const mobile = window.matchMedia('(max-width: 780px)');

  function detailsNodes() {
    return Array.from(document.querySelectorAll('.bhagavatam-rebuild-page .sb-details'));
  }

  function closeAll(except = null) {
    if (!mobile.matches) return;
    detailsNodes().forEach((details) => {
      if (details !== except) details.open = false;
    });
  }

  function normalize() {
    if (!mobile.matches) return;
    closeAll();
  }

  document.addEventListener('toggle', (event) => {
    const details = event.target;
    if (!mobile.matches || !(details instanceof HTMLDetailsElement) || !details.matches('.sb-details')) return;
    if (details.open) closeAll(details);
  }, true);

  const observer = new MutationObserver((mutations) => {
    if (!mobile.matches) return;
    const opened = mutations
      .filter((mutation) => mutation.type === 'attributes' && mutation.attributeName === 'open')
      .map((mutation) => mutation.target)
      .filter((node) => node instanceof HTMLDetailsElement && node.matches('.sb-details') && node.open);

    if (opened.length > 1) closeAll(opened[opened.length - 1]);
  });

  observer.observe(document.documentElement, {
    subtree: true,
    attributes: true,
    attributeFilter: ['open']
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', normalize, { once: true });
  } else {
    normalize();
  }

  // site.js enhances Bhagavatam cards asynchronously, so close them again after those passes.
  setTimeout(normalize, 50);
  setTimeout(normalize, 500);
  setTimeout(normalize, 1500);

  mobile.addEventListener?.('change', normalize);
})();