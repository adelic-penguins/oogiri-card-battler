import { NextResponse } from 'next/server';
import { clientList } from '../stateStore/ClientsState';
import wsRepository from '../repositories/WsRepository';

export async function GET() {
    console.log('ゲームを開始します。');

    // 回答者に通知
    wsRepository.sendMessage({
        to: 'respondent',
        payload: {
            type: 'start_game',
            message: 'ゲームを開始します。'
        }
    });

    // ゲームマスターに通知
    wsRepository.sendMessage({
        to: 'game_master',
        payload: {
            type: 'start_game',
            message: 'ゲームを開始します。'
        }
    });
    return NextResponse.json({ message: 'ok' });
}
