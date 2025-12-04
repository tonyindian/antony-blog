/**
 * Tests for Service Worker (sw.js)
 * Comprehensive test suite for Network-First with Cache Fallback strategy
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  setupServiceWorkerGlobals,
  cleanupServiceWorkerGlobals,
  MockExtendableEvent,
  MockFetchEvent,
  MockMessageEvent,
  MockCacheStorage,
  MockClients,
} from '../../test/sw-setup';

describe('Service Worker', () => {
  let mockCacheStorage: MockCacheStorage;
  let mockClients: MockClients;
  let self: any;

  /**
   * Helper function to create the Service Worker module for testing
   * This replicates the sw.js code in a testable format
   */
  function createServiceWorker() {
    const CACHE_VERSION = '2.0.0';
    const CACHE_NAME = `antony-ch-pwa-v${CACHE_VERSION}`;
    const CACHE_PREFIX = 'antony-ch-pwa-';

    const OFFLINE_URLS = [
      '/',
      '/css/style.css',
      '/assets/js/sw-register.js'
    ];

    // Install event handler
    const handleInstall = async (event: MockExtendableEvent) => {
      try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(OFFLINE_URLS);
        await self.skipWaiting();
      } catch (error) {
        console.error('Service Worker install failed:', error);
      }
    };

    // Activate event handler
    const handleActivate = async (event: MockExtendableEvent) => {
      try {
        const keys = await caches.keys();
        const deletePromises = keys
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
          .map(key => {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          });

        await Promise.all(deletePromises);
        await self.clients.claim();
      } catch (error) {
        console.error('Service Worker activation failed:', error);
      }
    };

    // Fetch event handler
    const handleFetch = async (event: MockFetchEvent): Promise<Response | null> => {
      const { request } = event;

      // Only handle GET requests
      if (request.method !== 'GET') return null;

      const url = new URL(request.url);

      // Only handle same-origin requests
      if (url.origin !== self.location.origin) return null;

      // Skip caching for demo files
      if (url.pathname.startsWith('/demos/')) {
        return null;
      }

      try {
        const networkResponse = await fetch(request);

        // Cache successful responses in background
        if (
          networkResponse &&
          networkResponse.ok &&
          networkResponse.type === 'basic'
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseToCache);
          });
        }

        return networkResponse;
      } catch (error) {
        // Network failed, try cache
        const cachedResponse = await caches.match(request);

        if (cachedResponse) {
          return cachedResponse;
        }

        // Fallback for HTML documents
        if (request.destination === 'document') {
          return (await caches.match('/')) || new Response('Not found', { status: 404 });
        }

        // Return offline response
        return new Response('Offline - content not available', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      }
    };

    // Message event handler
    const handleMessage = async (event: MockMessageEvent) => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        await self.skipWaiting();
      }

      if (event.data && event.data.type === 'CLEAR_CACHE') {
        await caches.delete(CACHE_NAME);
        const clients = await self.clients.matchAll();
        clients.forEach((client: any) => {
          client.postMessage({ type: 'CACHE_CLEARED' });
        });
      }
    };

    return {
      CACHE_NAME,
      CACHE_PREFIX,
      OFFLINE_URLS,
      handleInstall,
      handleActivate,
      handleFetch,
      handleMessage,
    };
  }

  beforeEach(() => {
    const globals = setupServiceWorkerGlobals();
    mockCacheStorage = globals.mockCacheStorage;
    mockClients = globals.mockClients;
    self = globals.self;

    // Spy on console methods
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanupServiceWorkerGlobals();
    vi.restoreAllMocks();
  });

  describe('Install Event', () => {
    it('should cache critical assets on install', async () => {
      const { handleInstall, CACHE_NAME, OFFLINE_URLS } = createServiceWorker();
      const event = new MockExtendableEvent('install');

      event.waitUntil(handleInstall(event));
      await event.waitForPromises();

      const cache = await caches.open(CACHE_NAME);
      const keys = await cache.keys();

      expect(keys.length).toBe(OFFLINE_URLS.length);

      // Keys may include full URLs, so check if each offline URL is cached
      for (const url of OFFLINE_URLS) {
        const cached = await cache.match(url);
        expect(cached).toBeDefined();
      }
    });

    it('should call skipWaiting after caching', async () => {
      const { handleInstall } = createServiceWorker();
      const event = new MockExtendableEvent('install');

      event.waitUntil(handleInstall(event));
      await event.waitForPromises();

      expect(self.skipWaiting).toHaveBeenCalled();
    });

    it('should handle cache errors gracefully', async () => {
      const { handleInstall, CACHE_NAME } = createServiceWorker();
      const event = new MockExtendableEvent('install');

      // Mock cache.addAll to throw error
      const mockCache = await caches.open(CACHE_NAME);
      vi.spyOn(mockCache, 'addAll').mockRejectedValue(new Error('Cache error'));

      event.waitUntil(handleInstall(event));
      await event.waitForPromises();

      expect(console.error).toHaveBeenCalledWith(
        'Service Worker install failed:',
        expect.any(Error)
      );
    });

    it('should wait for install to complete', async () => {
      const { handleInstall } = createServiceWorker();
      const event = new MockExtendableEvent('install');

      const installPromise = handleInstall(event);
      event.waitUntil(installPromise);

      await expect(event.waitForPromises()).resolves.toBeUndefined();
    });
  });

  describe('Activate Event', () => {
    it('should delete old caches with different versions', async () => {
      const { handleActivate, CACHE_PREFIX } = createServiceWorker();
      const event = new MockExtendableEvent('activate');

      // Create old caches
      await caches.open(`${CACHE_PREFIX}v1.0.0`);
      await caches.open(`${CACHE_PREFIX}v1.5.0`);
      await caches.open(`${CACHE_PREFIX}v2.0.0`); // Current version

      event.waitUntil(handleActivate(event));
      await event.waitForPromises();

      const keys = await caches.keys();
      expect(keys).toEqual([`${CACHE_PREFIX}v2.0.0`]);
      expect(console.log).toHaveBeenCalledWith('Deleting old cache:', `${CACHE_PREFIX}v1.0.0`);
      expect(console.log).toHaveBeenCalledWith('Deleting old cache:', `${CACHE_PREFIX}v1.5.0`);
    });

    it('should keep current cache version', async () => {
      const { handleActivate, CACHE_NAME } = createServiceWorker();
      const event = new MockExtendableEvent('activate');

      // Create current cache
      const cache = await caches.open(CACHE_NAME);
      await cache.put('/', new Response('home'));

      event.waitUntil(handleActivate(event));
      await event.waitForPromises();

      const stillExists = await caches.has(CACHE_NAME);
      expect(stillExists).toBe(true);
    });

    it('should call clients.claim() after cleanup', async () => {
      const { handleActivate } = createServiceWorker();
      const event = new MockExtendableEvent('activate');

      event.waitUntil(handleActivate(event));
      await event.waitForPromises();

      expect(self.clients.claim).toHaveBeenCalled();
    });

    it('should handle activation errors gracefully', async () => {
      const { handleActivate } = createServiceWorker();
      const event = new MockExtendableEvent('activate');

      // Mock caches.keys to throw error
      vi.spyOn(mockCacheStorage, 'keys').mockRejectedValue(new Error('Activation error'));

      event.waitUntil(handleActivate(event));
      await event.waitForPromises();

      expect(console.error).toHaveBeenCalledWith(
        'Service Worker activation failed:',
        expect.any(Error)
      );
    });

    it('should not delete caches with different prefixes', async () => {
      const { handleActivate, CACHE_PREFIX } = createServiceWorker();
      const event = new MockExtendableEvent('activate');

      // Create caches with different prefixes
      await caches.open('other-app-cache-v1');
      await caches.open(`${CACHE_PREFIX}v2.0.0`);

      event.waitUntil(handleActivate(event));
      await event.waitForPromises();

      const keys = await caches.keys();
      expect(keys).toContain('other-app-cache-v1');
    });
  });

  describe('Fetch Event', () => {
    it('should ignore non-GET requests', async () => {
      const { handleFetch } = createServiceWorker();
      const request = new Request('http://localhost:3000/', { method: 'POST' });
      const event = new MockFetchEvent(request);

      const result = await handleFetch(event);

      expect(result).toBeNull();
    });

    it('should ignore cross-origin requests', async () => {
      const { handleFetch } = createServiceWorker();
      const request = new Request('https://example.com/api');
      const event = new MockFetchEvent(request);

      const result = await handleFetch(event);

      expect(result).toBeNull();
    });

    it('should skip /demos/ paths', async () => {
      const { handleFetch } = createServiceWorker();
      const request = new Request('http://localhost:3000/demos/video.mp4');
      const event = new MockFetchEvent(request);

      const result = await handleFetch(event);

      expect(result).toBeNull();
    });

    it('should fetch from network and cache successful response', async () => {
      const { handleFetch, CACHE_NAME } = createServiceWorker();
      const request = new Request('http://localhost:3000/page.html');
      const event = new MockFetchEvent(request);

      const mockResponse = new Response('content', {
        status: 200,
        headers: { 'Content-Type': 'text/html' }
      });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      Object.defineProperty(mockResponse, 'type', { value: 'basic' });

      (global.fetch as any).mockResolvedValue(mockResponse);

      const result = await handleFetch(event);

      expect(result).toBe(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(request);

      // Wait for background caching
      await new Promise(resolve => setTimeout(resolve, 10));

      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      expect(cached).toBeDefined();
    });

    it('should return network response even if ok is false', async () => {
      const { handleFetch } = createServiceWorker();
      const request = new Request('http://localhost:3000/not-found');
      const event = new MockFetchEvent(request);

      const mockResponse = new Response('Not found', { status: 404 });
      Object.defineProperty(mockResponse, 'ok', { value: false });

      (global.fetch as any).mockResolvedValue(mockResponse);

      const result = await handleFetch(event);

      expect(result).toBe(mockResponse);
    });

    it('should return network response even if type is not basic', async () => {
      const { handleFetch } = createServiceWorker();
      const request = new Request('http://localhost:3000/page.html');
      const event = new MockFetchEvent(request);

      const mockResponse = new Response('content', { status: 200 });
      Object.defineProperty(mockResponse, 'ok', { value: true });
      Object.defineProperty(mockResponse, 'type', { value: 'cors' });

      (global.fetch as any).mockResolvedValue(mockResponse);

      const result = await handleFetch(event);

      expect(result).toBe(mockResponse);
    });

    it('should fallback to cache on network failure', async () => {
      const { handleFetch, CACHE_NAME } = createServiceWorker();
      const request = new Request('http://localhost:3000/cached-page.html');
      const event = new MockFetchEvent(request);

      // Pre-cache the resource
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = new Response('cached content');
      await cache.put(request, cachedResponse);

      // Mock fetch to fail
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      const result = await handleFetch(event);

      expect(result).toBeDefined();
      const text = await result!.text();
      expect(text).toBe('cached content');
    });

    it('should return / for failed document requests', async () => {
      const { handleFetch, CACHE_NAME } = createServiceWorker();
      const request = new Request('http://localhost:3000/some-page.html');
      Object.defineProperty(request, 'destination', { value: 'document' });
      const event = new MockFetchEvent(request);

      // Pre-cache the homepage
      const cache = await caches.open(CACHE_NAME);
      const homeResponse = new Response('home page');
      await cache.put('/', homeResponse);

      // Mock fetch to fail
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      const result = await handleFetch(event);

      expect(result).toBeDefined();
      const text = await result!.text();
      expect(text).toBe('home page');
    });

    it('should return 503 for failed non-document requests', async () => {
      const { handleFetch } = createServiceWorker();
      const request = new Request('http://localhost:3000/api/data.json');
      Object.defineProperty(request, 'destination', { value: '' });
      const event = new MockFetchEvent(request);

      // Mock fetch to fail
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      const result = await handleFetch(event);

      expect(result).toBeDefined();
      expect(result!.status).toBe(503);
      expect(result!.statusText).toBe('Service Unavailable');
      const text = await result!.text();
      expect(text).toBe('Offline - content not available');
    });

    it('should clone response before caching', async () => {
      const { handleFetch } = createServiceWorker();
      const request = new Request('http://localhost:3000/page.html');
      const event = new MockFetchEvent(request);

      const mockResponse = new Response('content');
      Object.defineProperty(mockResponse, 'ok', { value: true });
      Object.defineProperty(mockResponse, 'type', { value: 'basic' });

      const cloneSpy = vi.spyOn(mockResponse, 'clone');

      (global.fetch as any).mockResolvedValue(mockResponse);

      await handleFetch(event);

      expect(cloneSpy).toHaveBeenCalled();
    });

    it('should handle cache.match returning undefined', async () => {
      const { handleFetch, CACHE_NAME } = createServiceWorker();
      const request = new Request('http://localhost:3000/uncached.html');
      Object.defineProperty(request, 'destination', { value: 'document' });
      const event = new MockFetchEvent(request);

      // Mock fetch to fail
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      // Ensure cache is empty
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match('/');
      expect(cached).toBeUndefined();

      const result = await handleFetch(event);

      // Should still return a response (fallback 404)
      expect(result).toBeDefined();
    });
  });

  describe('Message Event', () => {
    it('should handle SKIP_WAITING message', async () => {
      const { handleMessage } = createServiceWorker();
      const event = new MockMessageEvent({ type: 'SKIP_WAITING' });

      event.waitUntil(handleMessage(event));
      await event.waitForPromises();

      expect(self.skipWaiting).toHaveBeenCalled();
    });

    it('should handle CLEAR_CACHE message', async () => {
      const { handleMessage, CACHE_NAME } = createServiceWorker();
      const event = new MockMessageEvent({ type: 'CLEAR_CACHE' });

      // Create cache with some content
      const cache = await caches.open(CACHE_NAME);
      await cache.put('/', new Response('home'));

      event.waitUntil(handleMessage(event));
      await event.waitForPromises();

      const stillExists = await caches.has(CACHE_NAME);
      expect(stillExists).toBe(false);
    });

    it('should notify clients when cache cleared', async () => {
      const { handleMessage, CACHE_NAME } = createServiceWorker();
      const event = new MockMessageEvent({ type: 'CLEAR_CACHE' });

      // Create cache
      await caches.open(CACHE_NAME);

      // Add a client
      const mockClient = mockClients.getClients()[0];
      const postMessageSpy = vi.spyOn(mockClient, 'postMessage');

      event.waitUntil(handleMessage(event));
      await event.waitForPromises();

      expect(postMessageSpy).toHaveBeenCalledWith({ type: 'CACHE_CLEARED' });
    });

    it('should ignore unknown message types', async () => {
      const { handleMessage } = createServiceWorker();
      const event = new MockMessageEvent({ type: 'UNKNOWN' });

      await handleMessage(event);

      // Should not throw and skipWaiting should not be called
      expect(self.skipWaiting).not.toHaveBeenCalled();
    });

    it('should handle message with no data', async () => {
      const { handleMessage } = createServiceWorker();
      const event = new MockMessageEvent(null);

      await handleMessage(event);

      // Should not throw
      expect(self.skipWaiting).not.toHaveBeenCalled();
    });
  });
});
