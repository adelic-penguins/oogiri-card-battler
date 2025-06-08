import { InternalMessage } from "../types/types";
import { io, Socket } from "socket.io-client";

class WsRepository {
    private static instance: WsRepository;
    wsEndpoint: string = 'http://localhost:3010/internal';
    socket: Socket | null = null;

    private constructor() {
        // websocket初期化
        this.socket = io("http://localhost:3010/internal", {
            transports: ['websocket'],
        });
        this.socket.on('connect', () => {
            console.log('WebSocket connected');
        });
        // 接続エラー
        this.socket.on('connect_error', (err) => {
            console.error('接続エラー:', err);
            // 必要に応じてリトライやUI通知
        });
    }

    public static getInstance(): WsRepository {
        if (!WsRepository.instance) {
            WsRepository.instance = new WsRepository();
        }
        return WsRepository.instance;
    }

    public sendMessage(data: InternalMessage) {
        if (this.socket) {
            if (this.socket.connected) {
                this.socket.emit('message', data);
                console.log('Sending message:', data);
            } else {
                console.error('WebSocket is not initialized.');
            }
        }
    }
}

export default WsRepository.getInstance();