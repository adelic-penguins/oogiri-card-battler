// localstorageのカスタムフック
import { useState, useEffect } from 'react';
/**
 * LocalStorageを操作するカスタムフック
 * @param key - LocalStorageのキー
 * @param initialValue - 初期値
 */
export const useLocalStorage = (key: string, initialValue?: string) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            console.debug("[Next Server]: Stored key/value is " + `${key}/${item}`);
            return item ? item : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = (value: string) => {
        try {
            const valueToStore = value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, String(valueToStore));
            console.debug("[Next Server]: Set localStorage key/value is " + `${key}/${valueToStore}`);
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key) {
                setStoredValue(event.newValue ? event.newValue : initialValue);
                console.debug("[Next Server]: Storage event detected for key " + key + ", new value: " + event.newValue);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key, initialValue]);

    return [storedValue, setValue] as const;
}