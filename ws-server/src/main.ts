/**
 * WebSocketサーバーの実装
 * ブラウザ通知用
 */
import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { ClientType, type InternalMessage } from './types.ts';

const app = express();
const server = createServer(app);

// wsサーバーをnoServerモードで作成
const wss = new WebSocketServer({ noServer: true });

const wsClientList: Map<ClientType, WebSocket> = new Map();

// HTTPアップグレード時にエンドポイントを判別
server.on('upgrade', (request, socket, head) => {
    const { url } = request;
    if (url === '/client') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            handleClient(ws);
        });
    } else if (url === '/internal') {
        wss.handleUpgrade(request, socket, head, (ws) => {
            handleInternal(ws);
        });
    } else {
        socket.destroy();
    }
});

// エンドポイントごとの処理
function handleClient(ws: WebSocket) {
    ws.on("open", () => {
        console.log('Client connection opened');
    });
    ws.on('message', (data) => {
        const jsonData = JSON.parse(data.toString());
        console.log('Received from client:', jsonData);
        if (jsonData.action === 'register') {
            const clientType = jsonData.clientType as ClientType;
            if (wsClientList.has(clientType)) {
                console.log(`Client of type ${clientType} is already connected.`);
                return;
            }
            wsClientList.set(clientType, ws);
            console.log(`Client registered: ${clientType}`);
        }
    });
}

function handleInternal(ws: WebSocket) {
    ws.on("open", () => {
        console.log('Internal connection opened');
        ws.send("Internal connection established");
    });
    ws.on('message', (data) => {
        const jsonData = JSON.parse(data.toString()) as InternalMessage;
        console.log('Received from internal:', jsonData);
        // どっちの分岐に入るか確認
        if (jsonData.to == ClientType.RESPONDENT) {
            console.log(`Sending to: ${jsonData.to}`);
            const respondentClient = wsClientList.get(ClientType.RESPONDENT);
            if (respondentClient) {
                respondentClient.send(JSON.stringify(jsonData.payload));
            }
        } else {
            console.log(`Sending to: ${jsonData.to}`);
            const gameMasterClient = wsClientList.get(ClientType.GAME_MASTER);
            if (gameMasterClient) {
                gameMasterClient.send(JSON.stringify(jsonData.payload));
            }
        }
    });
}

server.listen(3010, () => {
    console.log('Server is running on port 3010');
});
