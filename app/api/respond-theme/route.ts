import { NextRequest, NextResponse } from 'next/server';
import wsRepository from '../repositories/WsRepository';
import { EvaluateState, currentEvaluateState } from '../stateStore/EvaluateState';

export async function GET(request: NextRequest) {
  // クエリパラメータから回答を取得
  console.log(currentEvaluateState.value);
  if (currentEvaluateState.value !== EvaluateState.IDLE) {
    return NextResponse.json({ message: '現在評価中です。' }, { status: 400 });
  } else {
    currentEvaluateState.value = EvaluateState.EVALUATING;
    console.log('評価状態をEVALUATINGに変更しました。');
  }

  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('answer');
  const answer = q || '回答がありません。';
  (await wsRepository).sendMessage({
    to: 'game_master',
    payload: {
      type: 'answer_setted',
      message: answer
    }
  });
  currentEvaluateState.value = EvaluateState.EVALUATING;
  return NextResponse.json({ message: 'ok' });
}
