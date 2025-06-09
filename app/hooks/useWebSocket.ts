import {useEffect, useState} from 'react';
import {ClientMessage, ClientType} from "@/app/api/types/types";

export function useWebSocket(clientType: ClientType, callback?: (data: ClientMessage) => void) {
    const [messageState, setMessageState] = useState<ClientMessage>();
    const [close, setClose] = useState<() => void>(() => () => {});

    useEffect(() => {
        const ws = new WebSocket('http://localhost:3010/client');

        ws.addEventListener("message", (ev: MessageEvent<any>) => {
            console.log(ev.data);
            const data = JSON.parse(ev.data) as ClientMessage;
            setMessageState(data);
            if (callback) {
                callback(data);
            }
        });

        ws.addEventListener("error", (error) => {
            console.error('[Browser]: WebSocket error:', error);
            throw error;
        });

        setClose(() => ws.close);

        ws.addEventListener("open", () => {
            console.log('[Browser]: WebSocket connection established');
            ws.send(JSON.stringify({ action: 'register', clientType }));
        });
    }, []);

    return { messageState, close };
}