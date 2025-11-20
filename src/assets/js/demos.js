(() => {
  const demoSources = {
    "zeno-fitness": "/demos/zf83k9a.mp3",
    "mathis-gin": "/demos/mg37xq2.mp3",
    "mikrobiom-doku": "/demos/md29lp7.mp3"
    // "hauptmann-berger" wird bewusst erst verdrahtet, wenn die Demo bereit ist
  };

  const cards = document.querySelectorAll(
    '.demo-card[data-demo-id]:not([data-demo-type="video"])'
  );
  if (!cards.length) return;

  const audio = new Audio();
  let currentId = null;
  let currentButton = null;

  cards.forEach((card) => {
    const id = card.getAttribute("data-demo-id");
    const src = demoSources[id];
    const button = card.querySelector(".demo-play-button");

    if (!button) return;

    if (!src) {
      button.disabled = true;
      button.textContent = "Bald verfügbar";
      return;
    }

    button.addEventListener("click", () => {
      if (currentId === id && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        button.textContent = "Anhören";
        currentId = null;
        currentButton = null;
        return;
      }

      audio.src = src;
      audio
        .play()
        .then(() => {
          if (currentButton && currentButton !== button) {
            currentButton.textContent = "Anhören";
          }
          button.textContent = "Stopp";
          currentId = id;
          currentButton = button;
        })
        .catch(() => {
          button.textContent = "Anhören";
        });
    });
  });

  audio.addEventListener("ended", () => {
    if (currentButton) {
      currentButton.textContent = "Anhören";
    }
    currentId = null;
    currentButton = null;
  });

  const videoSources = {
    "frozen-sync": "/demos/fz83k9v.mp4"
  };

  const videoCards = document.querySelectorAll('.demo-card[data-demo-type="video"][data-demo-id]');
  if (!videoCards.length) return;

  let currentVideoOverlay = null;

  const closeVideoOverlay = () => {
    if (!currentVideoOverlay) return;
    const video = currentVideoOverlay.querySelector("video");
    if (video) {
      video.pause();
      video.src = "";
    }
    currentVideoOverlay.remove();
    currentVideoOverlay = null;
  };

  const createVideoOverlay = (src, title) => {
    const overlay = document.createElement("div");
    overlay.className = "demo-video-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", title || "Video-Demo");

    const inner = document.createElement("div");
    inner.className = "demo-video-inner";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "demo-video-close";
    closeButton.textContent = "Schliessen";
    closeButton.addEventListener("click", closeVideoOverlay);

    const video = document.createElement("video");
    video.className = "demo-video-player";
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.src = src;
    video.setAttribute(
      "controlsList",
      "nodownload noplaybackrate noremoteplayback"
    );
    video.setAttribute("disablePictureInPicture", "");
    video.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });

    inner.appendChild(closeButton);
    inner.appendChild(video);
    overlay.appendChild(inner);

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closeVideoOverlay();
      }
    });

    document.body.appendChild(overlay);
    return overlay;
  };

  videoCards.forEach((card) => {
    const id = card.getAttribute("data-demo-id");
    const src = videoSources[id];
    const button = card.querySelector(".demo-play-button");
    const titleElement = card.querySelector("h3");
    const title = titleElement ? titleElement.textContent.trim() : "";

    if (!button) return;

    if (!src) {
      button.disabled = true;
      button.textContent = "Bald verfügbar";
      return;
    }

    button.addEventListener("click", () => {
      if (currentVideoOverlay) {
        closeVideoOverlay();
      }

      currentVideoOverlay = createVideoOverlay(src, title);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeVideoOverlay();
    }
  });
})();
