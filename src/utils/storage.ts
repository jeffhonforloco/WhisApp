import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import { cache } from './cache';
import { ErrorFactory } from './errors';

// Enhanced file handling with better error handling and caching
export interface FileOptions {
  cache?: boolean;
  ttl?: number;
  compress?: boolean;
}

export async function getFileFromUri(
  uri: string,
  options: FileOptions = {}
): Promise<File | null> {
  try {
    // Check cache first if enabled
    if (options.cache) {
      const cached = await cache.get<File>(uri, { ttl: options.ttl });
      if (cached) return cached;
    }

    if (Platform.OS === 'web') {
      const response = await fetch(uri);
      const blob = await response.blob();
      const file = new File([blob], 'audio.m4a', { type: 'audio/m4a' });

      // Cache the result if enabled
      if (options.cache) {
        await cache.set(uri, file);
      }

      return file;
    }

    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      throw ErrorFactory.create({
        message: 'File does not exist',
        code: 'FILE_NOT_FOUND',
        context: { uri },
      });
    }

    const response = await fetch(uri);
    const blob = await response.blob();
    const file = new File([blob], 'audio.m4a', { type: 'audio/m4a' });

    // Cache the result if enabled
    if (options.cache) {
      await cache.set(uri, file);
    }

    return file;
  } catch (error) {
    throw ErrorFactory.create({
      message: 'Error reading file',
      code: 'FILE_READ_ERROR',
      context: { uri },
      originalError: error,
    });
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// New utility functions for file handling
export async function compressFile(file: File): Promise<File> {
  if (Platform.OS === 'web') {
    // Web doesn't support compression
    return file;
  }

  try {
    // Implement compression logic here
    // This is a placeholder - you'd need to implement actual compression
    return file;
  } catch (error) {
    throw ErrorFactory.create({
      message: 'Error compressing file',
      code: 'FILE_COMPRESSION_ERROR',
      context: { fileName: file.name, fileSize: file.size },
      originalError: error,
    });
  }
}

export async function validateFileAccess(uri: string): Promise<boolean> {
  if (Platform.OS === 'web') {
    try {
      const response = await fetch(uri, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }

  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    return fileInfo.exists;
  } catch {
    return false;
  }
}

export async function ensureDirectoryExists(directory: string): Promise<void> {
  if (Platform.OS === 'web') return;

  try {
    const dirInfo = await FileSystem.getInfoAsync(directory);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
    }
  } catch (error) {
    throw ErrorFactory.create({
      message: 'Error creating directory',
      code: 'DIRECTORY_CREATE_ERROR',
      context: { directory },
      originalError: error,
    });
  }
}