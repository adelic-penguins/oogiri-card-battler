import {ClientType, InternalMessage} from "../types/types";
import WebSocket from "ws";
import stateRepository from "@/app/api/repositories/StateRepository";

class WsRepository {
    private static instance: WsRepository;
    socket: WebSocket | null = null;
    static wsEndpoint: string = (process.env.WS_SERVER_URL || 'http://localhost:3010') + "/internal";

    private constructor(webSocket: WebSocket) {
        this.socket = webSocket;

        this.socket.onmessage = async (event) => {
            console.debug('Received message:', event.data);
            const data = JSON.parse(event.data.toString());
            if (data.message == "client_disconnected") {
                await this.deleteClient(data.clientId);
            }
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
                    console.debug('WebSocket initialized:', this.wsEndpoint);
                    resolve(socket);
                };

                socket.onerror = (error) => {
                    console.debug('WebSocket error:', error);
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
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('WebSocket is not initialized or not open.');
        }
    }

    public async deleteClient(clientId: string) {
        await stateRepository.deleteClient(clientId);
        const clientList = new Set(await stateRepository.getClients());
        this.sendMessage({
            to: ClientType.GAME_MASTER,
            clientId: clientId,
            payload: {
                type: 'client_count',
                message: `${clientList.size}`,
            }
        });
        this.sendMessage({
            to: ClientType.GAME_MASTER,
            clientId: clientId,
            payload: {
                type: 'client_count',
                message: `${clientList.size}`,
            }
        });
    }
}

export default WsRepository.getInstance();