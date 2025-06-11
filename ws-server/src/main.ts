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

type WebSocketClient = {
    ws: WebSocket;
    isAlive: boolean;
    clientType?: ClientType; // クライアントのタイプを保持
    clientId?: string; // クライアントIDを保持
};

let wsClientList: Array<WebSocketClient> = [];
let internalClient: WebSocket | null = null;

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
    // 接続が開かれたときの処理
    ws.on("open", () => {
        console.debug('[WebSocket Server]: Client connection opened');
    });

    // メッセージを受信したときの処理
    ws.on('message', (data) => {
        const jsonData = JSON.parse(data.toString());
        console.debug('[WebSocket Server]: Received from client:', jsonData);
        if (jsonData.action === 'register') {
            const clientType = jsonData.clientType as ClientType;
            if (wsClientList.map(e => e.clientId).indexOf(jsonData.clientId) !== -1) {
                console.debug(`[WebSocket Server]: Client of type ${clientType} is already connected.`);
                return;
            }
            const wsClient: WebSocketClient = {
                ws: ws,
                isAlive: true,
                clientType: clientType,
                clientId: jsonData.clientId, // クライアントIDを保持
            };
            wsClientList.push(wsClient);
            console.debug(`[WebSocket Server]: Client registered: ${clientType}`);
        }
    });

    ws.on("pong", () => {
        console.debug('[WebSocket Server]: Received pong from client');
        const client = wsClientList.find(client => client.ws === ws);
        if (client) {
            client.isAlive = true; // クライアントが生きていることを確認
        } else {
            console.debug('[WebSocket Server]: Client not found in wsClientList');
        }
    });

    ws.on('close', () => {
        console.debug('[WebSocket Server]: Client connection closed');

        // クライアントの切断時にマップから削除
        deleteClient(ws);

        // クライアントの離脱をサーバーに通知
        if(internalClient) {
            const clientId = wsClientList.find(client => client.ws === ws)?.clientId;
            if (clientId) {
                const message = {
                    message: `client_disconnected`,
                    clientId: clientId,
                };
                internalClient.send(JSON.stringify(message));
                console.debug(`[WebSocket Server]: Notified game master of client disconnection: ${clientId}`);
            }
        }
    });
}

function deleteClient(ws: WebSocket) {
    const wsClient = wsClientList.find(client => client.ws === ws);
    wsClientList = wsClientList.filter(client => client.ws !== ws);
    console.debug(`[WebSocket Server]: Client of uuid ${wsClient?.clientId} deleted`);
}

const pingInterval = setInterval(() => {
    wsClientList.forEach(client => {
        setImmediate(() => {
            if (!client.isAlive) {
                client.ws.terminate();
                return;
            }
            client.isAlive = false;
            client.ws.ping(() => {
                console.debug(`[WebSocket Server]: Ping sent to client`);
            });
        });
    });
}, 3000);

function handleInternal(ws: WebSocket) {
    internalClient = ws; // 内部クライアントを保存
    ws.on("open", () => {
        console.debug('[WebSocket Server]: Internal connection opened');
        ws.send("Internal connection established");
    });
    ws.on('message', (data) => {
        const jsonData = JSON.parse(data.toString()) as InternalMessage;
        console.debug('[WebSocket Server]: Received from internal:', jsonData);
        if (jsonData.to == ClientType.RESPONDENT) {
            console.debug(`[WebSocket Server]: Sending to: ${jsonData.to}`);
            const respondentClients = wsClientList.filter(client => client.clientType === ClientType.RESPONDENT);
            for (const client of respondentClients) {
                client.ws.send(JSON.stringify(jsonData.payload));
            }
        } else {
            console.debug(`[WebSocket Server]: Sending to: ${jsonData.to}`);
            const gameMasterClients = wsClientList.filter(client => client.clientType === ClientType.GAME_MASTER);
            for (const client of gameMasterClients) {
                client.ws.send(JSON.stringify(jsonData.payload));
            }
        }
    });
}

wss.on("close", () => {
    clearInterval(pingInterval);
})

server.listen(3010, () => {
    console.debug('[WebSocket Server]: Server is running on port 3010');
});