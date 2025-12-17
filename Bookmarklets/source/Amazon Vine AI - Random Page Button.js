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

  const randomPage = Math.floor(Math.random() * max) + 1;
  window.location.href = `https://www.amazon.com/vine/vine-items?queue=encore&page=${randomPage}`;
})();