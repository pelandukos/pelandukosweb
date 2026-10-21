// Display unit copied from the owner's signed-in AdSense account, 21 October 2026.
// Existing responsive unit: qrmaker_tunnelbiz (6009842053).
(() => {
  const ads = document.querySelectorAll(".adsbygoogle");
  if (!ads.length) return;
  const load = (ad) => {
    if (ad.dataset.requested) return;
    ad.dataset.requested = "true";
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (_) {
      /* Ad blockers must not interrupt the page. */
    }
  };
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            load(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "200px" },
    );
    ads.forEach((ad) => observer.observe(ad));
  } else ads.forEach(load);
})();
