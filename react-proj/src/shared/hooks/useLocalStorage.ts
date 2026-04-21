import { useState, useEffect, useCallback, useRef } from 'react';

interface LocalStorageEventDetail<T> {
  key: string;
  value: T;
}

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent<LocalStorageEventDetail<any>>;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  // Use a ref to store the latest initialValue to avoid it being a stale dependency
  const initialValueRef = useRef(initialValue);
  initialValueRef.current = initialValue;

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (!key) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Re-sync when key changes
  useEffect(() => {
    if (!key) return;
    try {
      const item = window.localStorage.getItem(key);
      setStoredValue(item ? (JSON.parse(item) as T) : initialValueRef.current);
    } catch {
      setStoredValue(initialValueRef.current);
    }
  }, [key]);

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const valueToStore = value instanceof Function ? value(prev) : value;
      try {
        if (key) {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          // Dispatch a custom event so other hooks with the same key in the same window can update
          window.dispatchEvent(new CustomEvent('local-storage', { detail: { key, value: valueToStore } }));
        }
      } catch {
        console.warn(`Failed to save to localStorage key "${key}"`);
      }
      return valueToStore;
    });
  }, [key]);

  useEffect(() => {
    if (!key) return;

    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue) as T);
        } catch {
          // ignore parse errors from external changes
        }
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<LocalStorageEventDetail<T>>;
      if (customEvent.detail && customEvent.detail.key === key) {
        setStoredValue(customEvent.detail.value);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('local-storage', handleCustomEvent);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('local-storage', handleCustomEvent);
    };
  }, [key]);

  return [storedValue, setValue];
}
