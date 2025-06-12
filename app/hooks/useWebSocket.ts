import {useEffect, useState} from 'react';
import {ClientMessage, ClientType} from "@/app/api/types/types";

export function useWebSocket(clientType: ClientType, clientId?: string, callback?: (data: ClientMessage) => void) {
    const [messageState, setMessageState] = useState<ClientMessage>();
    const [close, setClose] = useState<() => void>(() => () => {});

    useEffect(() => {
        const wsServerUrl = process.env.WS_SERVER_URL || 'http://localhost:3010';
        const ws = new WebSocket(`${wsServerUrl}/client`);

        ws.addEventListener("message", (ev: MessageEvent<any>) => {
            const data = JSON.parse(ev.data) as ClientMessage;
            console.debug("[Browser] Message recived from WebSocket server.", data);
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
            ws.send(JSON.stringify({ action: 'register', clientType, clientId }));
            console.debug('[Browser]: WebSocket sent registration message', { action: 'register', clientType, clientId });
        });
    }, []);

    return { messageState, close };
}