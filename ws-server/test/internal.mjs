import { io } from "socket.io-client";

// /internalネームスペースに接続
const socket = io("http://localhost:3010/internal");

socket.on("connect", () => {
    console.log("内部通信用エンドポイントに接続しました");

    // respondent宛にメッセージ送信
    socket.emit("message", { payload: "こんにちは respondent!", to: "respondent" });

    // game_master宛にメッセージ送信
    socket.emit("message", { payload: "こんにちは game_master!", to: "game_master" });
});

socket.on("message", (msg) => {
    console.log("受信したmessage:", msg);
});