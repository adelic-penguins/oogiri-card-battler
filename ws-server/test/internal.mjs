import WebSocket from 'ws';

// /internalエンドポイントに接続
const ws = new WebSocket('ws://localhost:3010/internal');

ws.on('open', () => {
    console.log('内部通信用エンドポイントに接続しました');

    // respondent宛にメッセージ送信
    ws.send(JSON.stringify({
        to: 'respondent',
        payload: 'こんにちは respondent!'
    }));

    // game_master宛にメッセージ送信
    ws.send(JSON.stringify({
        to: 'game_master',
        payload: 'こんにちは game_master!'
    }));
});

ws.on('message', (data) => {
    console.log('受信したmessage:', data.toString());
});