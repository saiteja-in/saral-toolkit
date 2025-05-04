/**
 * Utility for browser storage operations
 */
export class StorageUtil {
    private readonly prefix: string;
  
    constructor(prefix = 'saral') {
      this.prefix = prefix;
    }
  
    /**
     * Generate a prefixed key
     * @param key The original key
     * @returns The prefixed key
     */
    private getKey(key: string): string {
      return `${this.prefix}:${key}`;
    }
  
    /**
     * Store data in localStorage
     * @param key The storage key
     * @param data The data to store
     */
    setItem<T>(key: string, data: T): void {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(this.getKey(key), JSON.stringify(data));
        }
      } catch (error) {
        console.error(`Error storing data for key ${key}:`, error);
      }
    }
  
    /**
     * Retrieve data from localStorage
     * @param key The storage key
     * @returns The stored data or null if not found
     */
    getItem<T>(key: string, defaultValue: T | null = null): T | null {
      try {
        if (typeof localStorage !== 'undefined') {
          const item = localStorage.getItem(this.getKey(key));
          return item ? JSON.parse(item) : defaultValue;
        }
        return defaultValue;
      } catch (error) {
        console.error(`Error retrieving data for key ${key}:`, error);
        return defaultValue;
      }
    }
  
    /**
     * Remove data from localStorage
     * @param key The storage key
     */
    removeItem(key: string): void {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(this.getKey(key));
        }
      } catch (error) {
        console.error(`Error removing data for key ${key}:`, error);
      }
    }
  
    /**
     * Clear all data with the current prefix
     */
    clear(): void {
      try {
        if (typeof localStorage !== 'undefined') {
          Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
              localStorage.removeItem(key);
            }
          });
        }
      } catch (error) {
        console.error('Error clearing storage:', error);
      }
    }
  }
  
  // Create a default instance
  export const storage = new StorageUtil();