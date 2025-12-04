import { beforeEach, vi } from 'vitest';

// Mock Audio API
class MockAudio {
  public src = '';
  public paused = true;
  public currentTime = 0;
  private eventListeners: Record<string, Function[]> = {};

  constructor() {
    // Constructor can be empty or initialize defaults
  }

  play(): Promise<void> {
    this.paused = false;
    return Promise.resolve();
  }

  pause(): void {
    this.paused = true;
  }

  addEventListener(event: string, handler: Function): void {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(handler);
  }

  removeEventListener(event: string, handler: Function): void {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(
        (h) => h !== handler
      );
    }
  }

  dispatchEvent(event: Event): boolean {
    const handlers = this.eventListeners[event.type] || [];
    handlers.forEach((handler) => handler(event));
    return true;
  }
}

// @ts-ignore - Set Audio as a global constructor
global.Audio = MockAudio as any;

// Mock HTMLMediaElement methods for video
beforeEach(() => {
  HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined);
  HTMLMediaElement.prototype.pause = vi.fn();
});
