import { beforeEach, vi } from 'vitest';

/**
 * Service Worker Test Setup
 *
 * Mocks the Service Worker global scope and APIs including:
 * - Cache API (caches, cache.addAll, cache.put, cache.match, cache.delete)
 * - Fetch API
 * - Service Worker events (install, activate, fetch, message)
 * - Clients API
 */

// Mock Cache API
export class MockCache {
  private store: Map<string, Response> = new Map();

  async addAll(urls: string[]): Promise<void> {
    for (const url of urls) {
      this.store.set(url, new Response('cached', { status: 200 }));
    }
  }

  async put(request: Request | string, response: Response): Promise<void> {
    const key = typeof request === 'string' ? request : request.url;
    this.store.set(key, response);
  }

  async match(request: Request | string): Promise<Response | undefined> {
    const key = typeof request === 'string' ? request : request.url;
    return this.store.get(key);
  }

  async delete(request: Request | string): Promise<boolean> {
    const key = typeof request === 'string' ? request : request.url;
    return this.store.delete(key);
  }

  async keys(): Promise<Request[]> {
    return Array.from(this.store.keys()).map(url => new Request(url));
  }

  getStore() {
    return this.store;
  }
}

export class MockCacheStorage {
  private caches: Map<string, MockCache> = new Map();

  async open(cacheName: string): Promise<MockCache> {
    if (!this.caches.has(cacheName)) {
      this.caches.set(cacheName, new MockCache());
    }
    return this.caches.get(cacheName)!;
  }

  async has(cacheName: string): Promise<boolean> {
    return this.caches.has(cacheName);
  }

  async delete(cacheName: string): Promise<boolean> {
    return this.caches.delete(cacheName);
  }

  async keys(): Promise<string[]> {
    return Array.from(this.caches.keys());
  }

  async match(request: Request | string): Promise<Response | undefined> {
    for (const cache of this.caches.values()) {
      const response = await cache.match(request);
      if (response) return response;
    }
    return undefined;
  }

  getCaches() {
    return this.caches;
  }
}

// Mock Service Worker Event
export class MockExtendableEvent extends Event {
  private promises: Promise<any>[] = [];

  waitUntil(promise: Promise<any>): void {
    this.promises.push(promise);
  }

  async waitForPromises(): Promise<void> {
    await Promise.all(this.promises);
  }
}

// Mock Fetch Event
export class MockFetchEvent extends MockExtendableEvent {
  request: Request;
  private responsePromise: Promise<Response> | null = null;

  constructor(request: Request) {
    super('fetch');
    this.request = request;
  }

  respondWith(response: Promise<Response>): void {
    this.responsePromise = response;
  }

  async getResponse(): Promise<Response | null> {
    return this.responsePromise;
  }
}

// Mock Message Event
export class MockMessageEvent extends MockExtendableEvent {
  data: any;

  constructor(data: any) {
    super('message');
    this.data = data;
  }
}

// Mock Client
export class MockClient {
  id: string;
  url: string;
  private messageHandlers: Function[] = [];

  constructor(id: string = 'client-1', url: string = 'http://localhost:3000/') {
    this.id = id;
    this.url = url;
  }

  postMessage(message: any): void {
    this.messageHandlers.forEach(handler => handler(message));
  }

  onMessage(handler: Function): void {
    this.messageHandlers.push(handler);
  }
}

// Mock Clients API
export class MockClients {
  private clients: MockClient[] = [new MockClient()];
  claim = vi.fn().mockResolvedValue(undefined);

  async matchAll(): Promise<MockClient[]> {
    return this.clients;
  }

  addClient(client: MockClient): void {
    this.clients.push(client);
  }

  getClients(): MockClient[] {
    return this.clients;
  }
}

// Setup global Service Worker scope
export function setupServiceWorkerGlobals() {
  const mockCacheStorage = new MockCacheStorage();
  const mockClients = new MockClients();

  // Mock global caches
  (global as any).caches = mockCacheStorage;

  // Mock self (Service Worker global scope)
  (global as any).self = {
    addEventListener: vi.fn(),
    skipWaiting: vi.fn().mockResolvedValue(undefined),
    clients: mockClients,
    location: { origin: 'http://localhost:3000' },
  };

  // Mock fetch
  (global as any).fetch = vi.fn();

  return {
    mockCacheStorage,
    mockClients,
    self: (global as any).self,
  };
}

// Clean up Service Worker globals
export function cleanupServiceWorkerGlobals() {
  delete (global as any).caches;
  delete (global as any).self;
  delete (global as any).fetch;
}
