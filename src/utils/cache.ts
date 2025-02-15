import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  version?: string; // Cache version for invalidation
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
  version: string;
}

const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes
const CACHE_VERSION = '1.0.0';

class Cache {
  private static instance: Cache;
  private memoryCache: Map<string, CacheItem<any>>;

  private constructor() {
    this.memoryCache = new Map();
  }

  static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  async set<T>(
    key: string,
    data: T,
    options: CacheOptions = {}
  ): Promise<void> {
    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      version: options.version || CACHE_VERSION,
    };

    // Memory cache
    this.memoryCache.set(key, cacheItem);

    // Persistent cache
    if (Platform.OS !== 'web') {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(cacheItem));
      } catch (error) {
        console.warn('Failed to persist cache:', error);
      }
    }
  }

  async get<T>(
    key: string,
    options: CacheOptions = {}
  ): Promise<T | null> {
    const ttl = options.ttl || DEFAULT_TTL;
    const version = options.version || CACHE_VERSION;

    // Check memory cache first
    const memoryItem = this.memoryCache.get(key);
    if (memoryItem && this.isValid(memoryItem, ttl, version)) {
      return memoryItem.data;
    }

    // Check persistent cache
    if (Platform.OS !== 'web') {
      try {
        const stored = await AsyncStorage.getItem(key);
        if (stored) {
          const item: CacheItem<T> = JSON.parse(stored);
          if (this.isValid(item, ttl, version)) {
            // Update memory cache
            this.memoryCache.set(key, item);
            return item.data;
          }
        }
      } catch (error) {
        console.warn('Failed to read from cache:', error);
      }
    }

    return null;
  }

  async invalidate(key: string): Promise<void> {
    this.memoryCache.delete(key);
    if (Platform.OS !== 'web') {
      try {
        await AsyncStorage.removeItem(key);
      } catch (error) {
        console.warn('Failed to invalidate cache:', error);
      }
    }
  }

  async clear(): Promise<void> {
    this.memoryCache.clear();
    if (Platform.OS !== 'web') {
      try {
        await AsyncStorage.clear();
      } catch (error) {
        console.warn('Failed to clear cache:', error);
      }
    }
  }

  private isValid(
    item: CacheItem<any>,
    ttl: number,
    version: string
  ): boolean {
    const now = Date.now();
    return (
      item.version === version && 
      now - item.timestamp < ttl
    );
  }
}

export const cache = Cache.getInstance();