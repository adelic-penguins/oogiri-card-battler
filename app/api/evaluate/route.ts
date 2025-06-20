import { NextRequest, NextResponse } from 'next/server';
import wsRepository from '../repositories/WsRepository';
import { currentEvaluateState, EvaluateState } from '../stateStore/EvaluateState';

export async function GET(request: NextRequest) {
    // クエリパラメータから評価を取得
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('evaluate');
    const clientId = request.headers.get('X-Client-Id');

    (await wsRepository).sendMessage({
        to: 'respondent',
        clientId: clientId ?? 'Client is not set.',
        payload: {
            type: 'evaluate_setted',
            message: q || '評価が設定されていません。',
        }
    });

    currentEvaluateState.value = EvaluateState.IDLE;
    return NextResponse.json({ message: 'ok' });
}
