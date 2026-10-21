(() => {
  document
    .querySelectorAll('input[name="server-interface"]')
    .forEach((input) => {
      input.addEventListener("change", () => {
        document.querySelectorAll("[data-server-panel]").forEach((panel) => {
          panel.hidden = panel.dataset.serverPanel !== input.value;
        });
      });
    });
  const viewer = document.querySelector("#image-viewer");
  if (!viewer || typeof viewer.showModal !== "function") return;
  document.querySelectorAll("[data-lightbox]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const img = link.querySelector("img");
      viewer.querySelector("img").src = link.href;
      viewer.querySelector("img").alt = img.alt;
      viewer.querySelector("p").textContent = img.alt;
      viewer.showModal();
    });
  });
  viewer
    .querySelector("button")
    .addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close();
  });
})();
