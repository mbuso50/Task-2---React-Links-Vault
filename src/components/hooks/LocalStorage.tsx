import { useState, useEffect } from 'react';

export function useLocalStorage<T>(storageKey: string, defaultValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(storageKey);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(storageKey, JSON.stringify(storedValue));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }, [storageKey, storedValue]);

    return [storedValue, setStoredValue] as const;
}