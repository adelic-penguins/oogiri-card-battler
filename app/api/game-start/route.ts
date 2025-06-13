import {NextRequest, NextResponse} from 'next/server';
import wsRepository from '../repositories/WsRepository';

export async function GET(req: NextRequest) {
    console.log('ゲームを開始します。');
    const clientId = req.headers.get('X-Client-Id');

    // 回答者に通知
    (await wsRepository).sendMessage({
        to: 'respondent',
        clientId: clientId ?? 'Client is not set.',
        payload: {
            type: 'start_game',
            message: 'ゲームを開始します。'
        }
    });

    // ゲームマスターに通知
    (await wsRepository).sendMessage({
        to: 'game_master',
        clientId: clientId ?? 'Client is not set.',
        payload: {
            type: 'start_game',
            message: 'ゲームを開始します。'
        }
    });
    return NextResponse.json({ message: 'ok' });
}
