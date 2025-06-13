// localstorageのカスタムフック
import { useState, useEffect } from 'react';
/**
 * LocalStorageを操作するカスタムフック
 * @param key - LocalStorageのキー
 */
export const useLocalStorage = (key: string) => {
    const [storedValue, setStoredValue] = useState<string | null>(() => {
        // デバッグのため実行環境の確認
        console.debug("[Next Server]: useLocalStorage called with key: " + key);
        try {
            const localStorage = getLocalStorage();
            if  (localStorage) {
                const item = localStorage.getItem(key);
                console.debug("[Next Server]: Stored key/value is " + `${key}/${item}`);
                return item;
            }
            return null;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return 'Client id not found';
        }
    });

    const setValue = (value: string) => {
        try {
            const localStorage = getLocalStorage();
            if (localStorage) {
                const valueToStore = value;
                setStoredValue(valueToStore);
                localStorage.setItem(key, String(valueToStore));
                console.debug("[Next Server]: Set localStorage key/value is " + `${key}/${valueToStore}`);
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key) {
                setStoredValue(event.newValue ?? 'Client id not found');
                console.debug("[Next Server]: Storage event detected for key " + key + ", new value: " + event.newValue);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key]);

    return [storedValue, setValue] as const;
}

function getLocalStorage() {
    if (typeof window === 'undefined') {
        console.debug('useLocalStorage can only be used in a browser environment');
    } else {
        return window.localStorage;
    }
}