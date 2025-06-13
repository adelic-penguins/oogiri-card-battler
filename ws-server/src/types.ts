const ClientType = {
    RESPONDENT: 'respondent',
    GAME_MASTER: 'game_master',
} as const;
type ClientType = typeof ClientType[keyof typeof ClientType];

type ClientMessage = {
    type: string; // メッセージの種類
    message?: string; // 任意のメッセージ
}

type InternalMessage = {
    to: ClientType; // 送信先のクライアントタイプ
    payload: ClientMessage;   // 送信するデータ
};

export { ClientType };
export type { InternalMessage };
