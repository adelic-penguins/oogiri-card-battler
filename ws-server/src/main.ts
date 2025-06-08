/**
 * WebSocketサーバーの実装
 * ブラウザ通知用
 */
import { createServer } from "http";
import { Server, Socket, type DefaultEventsMap } from "socket.io";
import { ClientType, type InternalMessage } from "./types";

// HTTPサーバーを作成
const httpServer = createServer();

// Socket.IOサーバーを作成
const io = new Server(httpServer, {
    cors: {
        origin: "*", // 必要に応じて許可するオリジンを指定
    },
});

// クライアント接続を管理するリスト
const wsClientList: Map<ClientType, Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>> = new Map();

// クライアント通知用エンドポイント
const client = io.of('/client');
client.on('connection', (socket) => {
    console.log('client connected');
    // クライアントの種類を識別するためのイベントを受信
    socket.on('register', (clientType: ClientType) => {
        if (wsClientList.has(clientType)) {
            console.log(`Client of type ${clientType} is already connected.`);
            return;
        }
        wsClientList.set(clientType, socket);
        console.log(`Client registered: ${clientType}`);
    });
});

// 内部通信用エンドポイント
const notify = io.of('/internal');
notify.on('connection', (socket) => {
    console.log('internal connected');
    socket.on('message', (msg: InternalMessage) => {
        if (msg.to == ClientType.RESPONDENT) {
            const respondentClient = wsClientList.get(ClientType.RESPONDENT);
            if (respondentClient) {
                respondentClient.emit('message', msg);
            }
        } else {
            const gameMasterClient = wsClientList.get(ClientType.GAME_MASTER);
            if (gameMasterClient) {
                gameMasterClient.emit('message', msg);
            }
        }
        console.log('message received:', msg);
    });
});

// サーバー起動
const PORT = 3010;
httpServer.listen(PORT, () => {
    console.log(`WebSocketサーバー起動: http://localhost:${PORT}`);
});