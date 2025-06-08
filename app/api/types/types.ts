const ClientType = {
    RESPONDENT: 'respondent',
    GAME_MASTER: 'game_master',
} as const;
type ClientType = typeof ClientType[keyof typeof ClientType];

type InternalMessage = {
    to: ClientType; // 送信先のクライアントタイプ
    payload: any;   // 送信するデータ
};

export { ClientType };
export type { InternalMessage };
