import { NextRequest, NextResponse } from 'next/server';
import WsRepository from '../repositories/WsRepository';

export async function GET(request: NextRequest) {
    // クエリパラメータから評価を取得
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('evaluate');

    WsRepository.sendMessage({
        to: 'respondent',
        payload: {
            type: 'evaluate_setted',
            message: q || '評価が設定されていません。'
        }
    });

    return NextResponse.json({ message: 'ok' });
}
