// Device tabs for the screenshot galleries, and a full-screen viewer for screenshots.
document.documentElement.classList.add("js");

const tabList = document.querySelector(".device-tabs");

function tabs() {
  return [...tabList.querySelectorAll("button")];
}

function showDevice(device) {
  for (const tab of tabs()) {
    const isSelected = tab.dataset.device === device;
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  }
  for (const gallery of document.querySelectorAll(".gallery")) {
    gallery.hidden = gallery.dataset.device !== device;
  }
}

if (tabList) {
  tabList.addEventListener("click", (event) => {
    const tab = event.target.closest("button");
    if (tab) {
      showDevice(tab.dataset.device);
    }
  });
  tabList.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }
    const all = tabs();
    const step = event.key === "ArrowRight" ? 1 : -1;
    const next =
      all[(all.indexOf(event.target) + step + all.length) % all.length];
    showDevice(next.dataset.device);
    next.focus();
  });
  tabList.hidden = false;
  showDevice(tabs()[0].dataset.device);

  // Removes a device whose screenshots haven't been added yet.
  for (const gallery of document.querySelectorAll(".gallery")) {
    const probe = new Image();
    probe.addEventListener("error", () => {
      const device = gallery.dataset.device;
      const wasSelected = !gallery.hidden;
      document.getElementById(`${device}-tab`)?.remove();
      document.getElementById(`${device}-heading`)?.remove();
      gallery.remove();
      if (wasSelected && tabs().length > 0) {
        showDevice(tabs()[0].dataset.device);
      }
    });
    probe.src = gallery.querySelector("img").getAttribute("src");
  }
}

const viewer = document.querySelector(".viewer");

if (viewer) {
  const viewerImage = viewer.querySelector("img");
  const viewerCaption = viewer.querySelector("p");

  for (const image of document.querySelectorAll(".gallery img")) {
    image.tabIndex = 0;
    const open = () => {
      // currentSrc is the light or dark variant the browser chose.
      viewerImage.src = image.currentSrc || image.src;
      viewerImage.alt = image.alt;
      viewerCaption.textContent = image
        .closest("figure")
        .querySelector("figcaption").textContent;
      viewer.showModal();
    };
    image.addEventListener("click", open);
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  }

  viewer
    .querySelector("button")
    .addEventListener("click", () => viewer.close());
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) {
      viewer.close();
    }
  });
}
