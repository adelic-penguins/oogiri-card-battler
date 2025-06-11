import { InternalMessage } from "../types/types";
import WebSocket from "ws";

class WsRepository {
    private static instance: WsRepository;
    socket: WebSocket | null = null;
    static wsEndpoint: string = 'ws://localhost:3010/internal';

    private constructor(webSocket: WebSocket) {
        this.socket = webSocket;

        this.socket.onmessage = (event) => {
            console.log('Received message:', event.data);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    public static async getInstance(): Promise<WsRepository> {
        if (!WsRepository.instance) {
            // websocket初期化
            const wsInit = new Promise<WebSocket>((resolve, reject) => {
                const socket = new WebSocket(this.wsEndpoint);

                socket.onopen = () => {
                    console.log('WebSocket initialized:', this.wsEndpoint);
                    resolve(socket);
                };

                socket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    reject(error);
                };
            });
            const socket = await wsInit;
            WsRepository.instance = new WsRepository(socket);
        }
        return WsRepository.instance;
    }

    public sendMessage(data: InternalMessage) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            console.log('Sending message:', data);
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not initialized or not open.');
        }
    }
}

export default WsRepository.getInstance();