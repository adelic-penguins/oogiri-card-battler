import { InternalMessage } from "../types/types";
import { io, Socket } from "socket.io-client";

class WsRepository {
    private static instance: WsRepository;
    private static wsEndpoint: string = 'http://localhost:3010/internal';
    socket: Socket | null = null;

    private constructor(socket: Socket) {
        // websocket初期化
        this.socket = socket;
    }

    public static async getInstance(): Promise<WsRepository> {
        const wsInit = new Promise<Socket>((resolve, reject) => {
            const socket = io(WsRepository.wsEndpoint, {
                transports: ['websocket'],
            });
            socket.on('connect', () => {
                console.log('WebSocket connected');
                resolve(socket);
            });
            // 接続エラー
            socket.on('connect_error', (err) => {
                console.error('接続エラー:', err);
                reject(err);
                // 必要に応じてリトライやUI通知
            });
        });
        const socket = await wsInit;
        if (!WsRepository.instance) {
            WsRepository.instance = new WsRepository(socket);
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