import { DefaultEventsMap, Socket } from "socket.io";

function action(name: string) {
    return function (
        target: any, // prototype of the class
        propertyKey: string,
        descriptor: PropertyDescriptor
    ): PropertyDescriptor | void {
        if (!target.constructor.actions) {
            target.constructor.actions = {};
        }
        target.constructor.actions[name] = { method: propertyKey, descriptor: descriptor };
        return descriptor;
    };
}

/**
 * WsController.ts
 * WebSocketのコントローラー
 * メッセージの内容から処理を振り分ける
 */
class WsController {

    static actions: { [key: string]: { method: string, descriptor: PropertyDescriptor } } = {};
    actions = WsController.actions;
    static instance: WsController | null = null;

    // WebSocketの接続を初期化する
    constructor() {
        console.log("WebSocket initialized");
    }

    static getInstance() {
        if (!WsController.instance) {
            WsController.instance = new WsController();
        }
        return WsController.instance;
    }

    // メッセージを受信したときの処理
    @action("message")
    handleMessage(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        console.log("Received message:", socket.data);
        // ここでメッセージの内容に応じた処理を行う
        // 例えば、特定のコマンドに応じて処理を振り分けることができる
    }

    invoke(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        const action = this.actions[socket.data.action as string];
        if (action) {
            (action.descriptor.value as (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => void).call(this, socket);
        }
    }
}

export default WsController;