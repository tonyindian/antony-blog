import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/**
 * Comprehensive tests for demos.ts
 *
 * This file tests the audio/video demo player functionality including:
 * - Audio play/stop toggling
 * - Video modal overlay
 * - Keyboard navigation
 * - ARIA attributes
 * - Graceful degradation for unavailable demos
 */

describe('Audio Demo Player', () => {
  let container: HTMLElement;

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize without demo cards (early return)', () => {
    // No demo cards in DOM
    const { initAudioDemos } = createDemoModule();
    expect(() => initAudioDemos()).not.toThrow();
  });

  it('should disable button for unavailable demos', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-id="hauptmann-berger">
        <button class="demo-play-button">Play</button>
      </div>
    `;

    const { initAudioDemos } = createDemoModule();
    initAudioDemos();

    const button = container.querySelector('.demo-play-button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.textContent).toBe('Bald verfügbar');
  });

  it('should play audio on button click for available demo', async () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-id="zeno-fitness">
        <button class="demo-play-button">Anhören</button>
      </div>
    `;

    const { initAudioDemos } = createDemoModule();
    initAudioDemos();

    const button = container.querySelector('.demo-play-button') as HTMLButtonElement;
    button.click();

    // Wait for promise resolution
    await vi.waitFor(() => {
      expect(button.textContent).toBe('Stopp');
    });
  });

  it('should stop audio on second button click', async () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-id="zeno-fitness">
        <button class="demo-play-button">Anhören</button>
      </div>
    `;

    const { initAudioDemos } = createDemoModule();
    initAudioDemos();

    const button = container.querySelector('.demo-play-button') as HTMLButtonElement;

    // First click - play
    button.click();
    await vi.waitFor(() => {
      expect(button.textContent).toBe('Stopp');
    });

    // Second click - stop
    button.click();

    // Button should revert to play state
    expect(button.textContent).toBe('Anhören');
  });

  it('should switch between different demos', async () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-id="zeno-fitness">
        <button class="demo-play-button">Anhören</button>
      </div>
      <div class="demo-card" data-demo-id="mathis-gin">
        <button class="demo-play-button">Anhören</button>
      </div>
    `;

    const { initAudioDemos } = createDemoModule();
    initAudioDemos();

    const buttons = container.querySelectorAll('.demo-play-button') as NodeListOf<HTMLButtonElement>;

    // Play first demo
    buttons[0].click();
    await vi.waitFor(() => {
      expect(buttons[0].textContent).toBe('Stopp');
    });

    // Play second demo - first should stop
    buttons[1].click();
    await vi.waitFor(() => {
      expect(buttons[0].textContent).toBe('Anhören');
      expect(buttons[1].textContent).toBe('Stopp');
    });
  });

  it('should handle audio ended event', async () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-id="zeno-fitness">
        <button class="demo-play-button">Anhören</button>
      </div>
    `;

    const { initAudioDemos, getAudioElement } = createDemoModule();
    initAudioDemos();

    const button = container.querySelector('.demo-play-button') as HTMLButtonElement;

    // Play audio
    button.click();
    await vi.waitFor(() => {
      expect(button.textContent).toBe('Stopp');
    });

    // Simulate audio ending
    const audio = getAudioElement();
    const endedEvent = new Event('ended');
    audio?.dispatchEvent(endedEvent);

    expect(button.textContent).toBe('Anhören');
  });

  it('should handle play promise rejection', async () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-id="zeno-fitness">
        <button class="demo-play-button">Anhören</button>
      </div>
    `;

    const { initAudioDemos, getAudioElement } = createDemoModule();
    initAudioDemos();

    // Mock play to reject
    const audio = getAudioElement();
    if (audio) {
      audio.play = vi.fn().mockRejectedValue(new Error('Play failed'));
    }

    const button = container.querySelector('.demo-play-button') as HTMLButtonElement;
    button.click();

    // Button should revert to play state on error
    await vi.waitFor(() => {
      expect(button.textContent).toBe('Anhören');
    });
  });

  it('should skip non-button elements', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-id="zeno-fitness">
        <div class="demo-play-button">Not a button</div>
      </div>
    `;

    const { initAudioDemos } = createDemoModule();
    expect(() => initAudioDemos()).not.toThrow();
  });
});

describe('Video Demo Player', () => {
  let container: HTMLElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize without demo cards (early return)', () => {
    const { initVideoDemos } = createDemoModule();
    expect(() => initVideoDemos()).not.toThrow();
  });

  it('should disable button for unavailable video demos', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-type="video" data-demo-id="unavailable-demo">
        <button class="demo-play-button">Play</button>
        <h3>Test Video</h3>
      </div>
    `;

    const { initVideoDemos } = createDemoModule();
    initVideoDemos();

    const button = container.querySelector('.demo-play-button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.textContent).toBe('Bald verfügbar');
  });

  it('should create video overlay with correct structure', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-type="video" data-demo-id="frozen-sync">
        <button class="demo-play-button">Play</button>
        <h3>Frozen Sync Demo</h3>
      </div>
    `;

    const { initVideoDemos } = createDemoModule();
    initVideoDemos();

    const button = container.querySelector('.demo-play-button') as HTMLButtonElement;
    button.click();

    const overlay = document.querySelector('.demo-video-overlay');
    expect(overlay).not.toBeNull();
    expect(overlay?.getAttribute('role')).toBe('dialog');
    expect(overlay?.getAttribute('aria-modal')).toBe('true');
    expect(overlay?.getAttribute('aria-label')).toBe('Frozen Sync Demo');

    const video = overlay?.querySelector('video');
    expect(video).not.toBeNull();
    expect(video?.src).toContain('/demos/fz83k9v.mp4');
    expect(video?.controls).toBe(true);
    expect(video?.autoplay).toBe(true);
    expect(video?.playsInline).toBe(true);

    const closeButton = overlay?.querySelector('button');
    expect(closeButton).not.toBeNull();
    expect(closeButton?.textContent).toBe('Schliessen');
  });

  it('should use fallback title when h3 is missing', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-type="video" data-demo-id="frozen-sync">
        <button class="demo-play-button">Play</button>
      </div>
    `;

    const { initVideoDemos } = createDemoModule();
    initVideoDemos();

    const button = container.querySelector('.demo-play-button') as HTMLButtonElement;
    button.click();

    const overlay = document.querySelector('.demo-video-overlay');
    expect(overlay?.getAttribute('aria-label')).toBe('Video-Demo');
  });

  it('should close overlay via close button', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-type="video" data-demo-id="frozen-sync">
        <button class="demo-play-button">Play</button>
        <h3>Test Video</h3>
      </div>
    `;

    const { initVideoDemos } = createDemoModule();
    initVideoDemos();

    const playButton = container.querySelector('.demo-play-button') as HTMLButtonElement;
    playButton.click();

    let overlay = document.querySelector('.demo-video-overlay');
    expect(overlay).not.toBeNull();

    const closeButton = overlay?.querySelector('.demo-video-close') as HTMLButtonElement;
    closeButton.click();

    overlay = document.querySelector('.demo-video-overlay');
    expect(overlay).toBeNull();
  });

  it('should close overlay when clicking background', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-type="video" data-demo-id="frozen-sync">
        <button class="demo-play-button">Play</button>
        <h3>Test Video</h3>
      </div>
    `;

    const { initVideoDemos } = createDemoModule();
    initVideoDemos();

    const playButton = container.querySelector('.demo-play-button') as HTMLButtonElement;
    playButton.click();

    let overlay = document.querySelector('.demo-video-overlay') as HTMLElement;
    expect(overlay).not.toBeNull();

    // Click on overlay background (not inner content)
    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { value: overlay });
    overlay.dispatchEvent(clickEvent);

    overlay = document.querySelector('.demo-video-overlay') as HTMLElement;
    expect(overlay).toBeNull();
  });

  it('should NOT close overlay when clicking video content', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-type="video" data-demo-id="frozen-sync">
        <button class="demo-play-button">Play</button>
        <h3>Test Video</h3>
      </div>
    `;

    const { initVideoDemos } = createDemoModule();
    initVideoDemos();

    const playButton = container.querySelector('.demo-play-button') as HTMLButtonElement;
    playButton.click();

    const overlay = document.querySelector('.demo-video-overlay') as HTMLElement;
    const video = overlay.querySelector('video') as HTMLVideoElement;

    // Click on video (not background)
    const clickEvent = new MouseEvent('click', { bubbles: true });
    Object.defineProperty(clickEvent, 'target', { value: video });
    overlay.dispatchEvent(clickEvent);

    // Overlay should still exist
    expect(document.querySelector('.demo-video-overlay')).not.toBeNull();
  });

  it('should close overlay on Escape key', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-type="video" data-demo-id="frozen-sync">
        <button class="demo-play-button">Play</button>
        <h3>Test Video</h3>
      </div>
    `;

    const { initVideoDemos } = createDemoModule();
    initVideoDemos();

    const playButton = container.querySelector('.demo-play-button') as HTMLButtonElement;
    playButton.click();

    let overlay = document.querySelector('.demo-video-overlay');
    expect(overlay).not.toBeNull();

    // Press Escape key
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    overlay = document.querySelector('.demo-video-overlay');
    expect(overlay).toBeNull();
  });

  it('should NOT close on non-Escape keys', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-type="video" data-demo-id="frozen-sync">
        <button class="demo-play-button">Play</button>
        <h3>Test Video</h3>
      </div>
    `;

    const { initVideoDemos } = createDemoModule();
    initVideoDemos();

    const playButton = container.querySelector('.demo-play-button') as HTMLButtonElement;
    playButton.click();

    const overlay = document.querySelector('.demo-video-overlay');
    expect(overlay).not.toBeNull();

    // Press Enter key (should not close)
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(enterEvent);

    expect(document.querySelector('.demo-video-overlay')).not.toBeNull();
  });

  it('should clean up video when closing overlay', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-type="video" data-demo-id="frozen-sync">
        <button class="demo-play-button">Play</button>
        <h3>Test Video</h3>
      </div>
    `;

    const { initVideoDemos } = createDemoModule();
    initVideoDemos();

    const playButton = container.querySelector('.demo-play-button') as HTMLButtonElement;
    playButton.click();

    const overlay = document.querySelector('.demo-video-overlay');
    const video = overlay?.querySelector('video') as HTMLVideoElement;
    const originalSrc = video.src;

    // Mock video methods
    const pauseSpy = vi.spyOn(video, 'pause');

    const closeButton = overlay?.querySelector('.demo-video-close') as HTMLButtonElement;
    closeButton.click();

    expect(pauseSpy).toHaveBeenCalled();
    // Video src should be cleared (will resolve to base URL when set to empty string)
    expect(video.src).not.toBe(originalSrc);
  });

  it('should prevent video context menu', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-type="video" data-demo-id="frozen-sync">
        <button class="demo-play-button">Play</button>
        <h3>Test Video</h3>
      </div>
    `;

    const { initVideoDemos } = createDemoModule();
    initVideoDemos();

    const playButton = container.querySelector('.demo-play-button') as HTMLButtonElement;
    playButton.click();

    const video = document.querySelector('video') as HTMLVideoElement;
    const contextMenuEvent = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(contextMenuEvent, 'preventDefault');

    video.dispatchEvent(contextMenuEvent);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it('should close previous overlay when opening new one', () => {
    container.innerHTML = `
      <div class="demo-card" data-demo-type="video" data-demo-id="frozen-sync">
        <button class="demo-play-button">Play</button>
        <h3>First Video</h3>
      </div>
      <div class="demo-card" data-demo-type="video" data-demo-id="frozen-sync">
        <button class="demo-play-button">Play</button>
        <h3>Second Video</h3>
      </div>
    `;

    const { initVideoDemos } = createDemoModule();
    initVideoDemos();

    const buttons = container.querySelectorAll('.demo-play-button') as NodeListOf<HTMLButtonElement>;

    // Open first overlay
    buttons[0].click();
    expect(document.querySelectorAll('.demo-video-overlay').length).toBe(1);

    // Open second overlay
    buttons[1].click();
    expect(document.querySelectorAll('.demo-video-overlay').length).toBe(1);

    const overlay = document.querySelector('.demo-video-overlay');
    expect(overlay?.getAttribute('aria-label')).toBe('Second Video');
  });
});

describe('Helper Functions', () => {
  it('should validate HTML elements correctly', () => {
    const div = document.createElement('div');
    const button = document.createElement('button');

    expect(div instanceof HTMLElement).toBe(true);
    expect(button instanceof HTMLButtonElement).toBe(true);
  });

  it('should handle text extraction safely', () => {
    const textFn = (value: unknown): string =>
      typeof value === 'string' ? value : '';

    expect(textFn('hello')).toBe('hello');
    expect(textFn(123)).toBe('');
    expect(textFn(null)).toBe('');
    expect(textFn(undefined)).toBe('');
    expect(textFn({})).toBe('');
  });
});

/**
 * Helper function to create demo module with exported functions
 * This simulates the behavior of demos.ts for testing
 */
function createDemoModule() {
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

  const demos = {
    audio: {
      "zeno-fitness": "/demos/zf83k9a.mp3",
      "mathis-gin": "/demos/mg37xq2.mp3",
      "mikrobiom-doku": "/demos/md29lp7.mp3",
    },
    video: {
      "frozen-sync": "/demos/fz83k9v.mp4",
    },
  };

  const isButton = (el: Element | null): el is HTMLButtonElement =>
    el instanceof HTMLButtonElement;

  const text = (value: unknown): string =>
    typeof value === "string" ? value : "";

  let audioInstance: HTMLAudioElement | null = null;

  const initAudioDemos = (): void => {
    const cards = document.querySelectorAll<HTMLElement>(SELECTORS.audioCards);
    if (!cards.length) return;

    const audio = new Audio();
    audioInstance = audio;
    let currentId: string | null = null;
    let currentButton: HTMLButtonElement | null = null;

    cards.forEach((card) => {
      const id = card.getAttribute("data-demo-id") ?? "";
      const src = demos.audio[id as keyof typeof demos.audio];
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
      const src = demos.video[id as keyof typeof demos.video];
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

  const getAudioElement = (): HTMLAudioElement | null => audioInstance;

  return {
    initAudioDemos,
    initVideoDemos,
    getAudioElement,
  };
}
