javascript:(() => {
  const anchors = [...document.querySelectorAll('a[href*="queue=encore"][href*="page="]')];
  let max = 1;

  anchors.forEach(anchor => {
    const match = anchor.href.match(/page=(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (!isNaN(num) && num > max) {
        max = num;
      }
    }
  });

  // Fall back to stored max page count if current page has no page links
  if (max === 1) {
    const storedMax = parseInt(sessionStorage.getItem('vineMaxPage'));
    if (!isNaN(storedMax)) {
      max = storedMax;
    }
  }

  // Store max page count in session storage
  sessionStorage.setItem('vineMaxPage', max);

  // Get visited pages from session storage
  const visitedPagesJson = sessionStorage.getItem('vineVisitedPages');
  const visitedPages = visitedPagesJson ? new Set(JSON.parse(visitedPagesJson)) : new Set();

  let randomPage;
  let attempts = 0;
  const maxAttempts = max * 2; // Prevent infinite loop

  do {
    randomPage = Math.floor(Math.random() * max) + 1;
    attempts++;
  } while (visitedPages.has(randomPage) && attempts < maxAttempts);

  // Add current page to visited pages
  visitedPages.add(randomPage);
  sessionStorage.setItem('vineVisitedPages', JSON.stringify([...visitedPages]));

  window.location.href = `https://www.amazon.com/vine/vine-items?queue=encore&page=${randomPage}`;
})();