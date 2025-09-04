/**
 * Streaming JSON utilities for handling large files
 * Falls back to regular JSON.parse for browser environments
 */

export interface StreamingJsonOptions {
  chunkSize?: number;
  maxMemoryMB?: number;
  onProgress?: (processed: number, total?: number) => void;
}

export async function parseJsonSafely<T = unknown>(
  jsonContent: string,
  options: StreamingJsonOptions = {}
): Promise<T> {
  const { maxMemoryMB = 100, onProgress } = options;
  
  // Check memory constraints
  const contentSizeMB = (jsonContent.length * 2) / (1024 * 1024); // Rough estimate
  
  if (contentSizeMB > maxMemoryMB) {
    console.warn(`JSON content size (~${contentSizeMB.toFixed(1)}MB) exceeds limit (${maxMemoryMB}MB)`);
  }

  try {
    // For browser environment, we'll use regular JSON.parse with progress callback
    if (onProgress) {
      onProgress(0, 1);
    }
    
    const result = JSON.parse(jsonContent) as T;
    
    if (onProgress) {
      onProgress(1, 1);
    }
    
    return result;
  } catch (error) {
    throw new Error(`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function loadJsonFromPath<T = unknown>(
  path: string,
  options: StreamingJsonOptions = {}
): Promise<T> {
  try {
    const response = await fetch(path);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`);
    }
    
    const jsonContent = await response.text();
    return parseJsonSafely<T>(jsonContent, options);
  } catch (error) {
    throw new Error(`Failed to load JSON from ${path}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Process large arrays in chunks to avoid blocking the main thread
 */
export async function processArrayInChunks<T, R>(
  array: T[],
  processor: (item: T, index: number) => R | Promise<R>,
  chunkSize: number = 100
): Promise<R[]> {
  const results: R[] = [];
  
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    
    // Process chunk
    const chunkPromises = chunk.map((item, chunkIndex) => 
      processor(item, i + chunkIndex)
    );
    
    const chunkResults = await Promise.all(chunkPromises);
    results.push(...chunkResults);
    
    // Yield control to prevent blocking
    if (i + chunkSize < array.length) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }
  
  return results;
}
