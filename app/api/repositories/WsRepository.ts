import { InternalMessage } from "../types/types";
import { io, Socket } from "socket.io-client";

class WsRepository {
    private static instance: WsRepository;
    wsEndpoint: string = 'http://localhost:3010/internal';
    socket: Socket | null = null;

    private constructor() {
        // websocket初期化
        this.socket = io("http://localhost:3010/internal");
        this.socket.on('connect', () => {
            console.log('WebSocket connected');
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
            this.socket.emit('message', data);
        }
    }
}

export default WsRepository.getInstance();