type DemoId = string;

enum DemoType {
  Audio = "audio",
  Video = "video",
}

interface DemoSources {
  audio: Record<DemoId, string>;
  video: Record<DemoId, string>;
}

interface DemoCardElements {
  id: DemoId;
  button: HTMLButtonElement;
  title: string;
  type: DemoType;
  src: string;
}

const AUDIO_LABELS = {
  play: "Anhören",
  stop: "Stopp",
  unavailable: "Bald verfügbar",
} as const;

const VIDEO_LABELS = {
  close: "Schliessen",
  fallbackTitle: "Video-Demo",
} as const;

const SELECTORS = {
  audioCards: '.demo-card[data-demo-id]:not([data-demo-type="video"])',
  videoCards: '.demo-card[data-demo-type="video"][data-demo-id]',
  playButton: ".demo-play-button",
  heading: "h3",
} as const;

const demos: DemoSources = {
  audio: {
    "zeno-fitness": "/demos/zf83k9a.mp3",
    "mathis-gin": "/demos/mg37xq2.mp3",
    "mikrobiom-doku": "/demos/md29lp7.mp3",
    // "hauptmann-berger": intentionally deferred
  },
  video: {
    "frozen-sync": "/demos/fz83k9v.mp4",
  },
};

const isHTMLElement = (el: Element | null): el is HTMLElement =>
  el instanceof HTMLElement;

const isButton = (el: Element | null): el is HTMLButtonElement =>
  el instanceof HTMLButtonElement;

const text = (value: unknown): string =>
  typeof value === "string" ? value : "";

/**
 * Initialize audio demo cards (play/stop toggling).
 */
const initAudioDemos = (): void => {
  const cards = document.querySelectorAll<HTMLElement>(SELECTORS.audioCards);
  if (!cards.length) return;

  const audio = new Audio();
  let currentId: DemoId | null = null;
  let currentButton: HTMLButtonElement | null = null;

  cards.forEach((card) => {
    const id = card.getAttribute("data-demo-id") ?? "";
    const src = demos.audio[id];
    const button = card.querySelector(SELECTORS.playButton);

    if (!isButton(button)) return;

    if (!src) {
      button.disabled = true;
      button.textContent = AUDIO_LABELS.unavailable;
      return;
    }

    button.addEventListener("click", () => {
      if (currentId === id && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        button.textContent = AUDIO_LABELS.play;
        currentId = null;
        currentButton = null;
        return;
      }

      audio.src = src;
      audio
        .play()
        .then(() => {
          if (currentButton && currentButton !== button) {
            currentButton.textContent = AUDIO_LABELS.play;
          }
          button.textContent = AUDIO_LABELS.stop;
          currentId = id;
          currentButton = button;
        })
        .catch(() => {
          button.textContent = AUDIO_LABELS.play;
        });
    });
  });

  audio.addEventListener("ended", () => {
    if (currentButton) {
      currentButton.textContent = AUDIO_LABELS.play;
    }
    currentId = null;
    currentButton = null;
  });
};

const createVideoOverlay = (src: string, title: string): HTMLElement => {
  const overlay = document.createElement("div");
  overlay.className = "demo-video-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", title || VIDEO_LABELS.fallbackTitle);

  const inner = document.createElement("div");
  inner.className = "demo-video-inner";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "btn btn--ghost btn--pill demo-video-close";
  closeButton.textContent = VIDEO_LABELS.close;

  const video = document.createElement("video");
  video.className = "demo-video-player";
  video.controls = true;
  video.autoplay = true;
  video.playsInline = true;
  video.src = src;
  video.setAttribute("controlsList", "nodownload noplaybackrate noremoteplayback");
  video.setAttribute("disablePictureInPicture", "");
  video.addEventListener("contextmenu", (event: MouseEvent) => {
    event.preventDefault();
  });

  inner.appendChild(closeButton);
  inner.appendChild(video);
  overlay.appendChild(inner);

  return overlay;
};

/**
 * Initialize video demo cards (overlay open/close).
 */
const initVideoDemos = (): void => {
  const cards = document.querySelectorAll<HTMLElement>(SELECTORS.videoCards);
  if (!cards.length) return;

  let currentVideoOverlay: HTMLElement | null = null;

  const closeVideoOverlay = (): void => {
    if (!currentVideoOverlay) return;
    const video = currentVideoOverlay.querySelector("video");
    if (video instanceof HTMLVideoElement) {
      video.pause();
      video.src = "";
    }
    currentVideoOverlay.remove();
    currentVideoOverlay = null;
  };

  const openOverlay = (src: string, title: string): void => {
    closeVideoOverlay();
    currentVideoOverlay = createVideoOverlay(src, title);
    const closeBtn = currentVideoOverlay.querySelector("button");
    if (isButton(closeBtn)) {
      closeBtn.addEventListener("click", closeVideoOverlay, { once: true });
    }
    currentVideoOverlay.addEventListener("click", (event: MouseEvent) => {
      if (event.target === currentVideoOverlay) {
        closeVideoOverlay();
      }
    });
    document.body.appendChild(currentVideoOverlay);
  };

  cards.forEach((card) => {
    const id = card.getAttribute("data-demo-id") ?? "";
    const src = demos.video[id];
    const button = card.querySelector(SELECTORS.playButton);
    const titleElement = card.querySelector(SELECTORS.heading);
    const title = text(titleElement?.textContent?.trim());

    if (!isButton(button)) return;

    if (!src) {
      button.disabled = true;
      button.textContent = AUDIO_LABELS.unavailable;
      return;
    }

    button.addEventListener("click", () => {
      openOverlay(src, title || VIDEO_LABELS.fallbackTitle);
    });
  });

  document.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeVideoOverlay();
    }
  });
};

((): void => {
  try {
    initAudioDemos();
    initVideoDemos();
  } catch (error) {
    console.error("Failed to initialize demos", error);
  }
})();
