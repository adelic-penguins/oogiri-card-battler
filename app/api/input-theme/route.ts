import { NextRequest, NextResponse } from 'next/server';
import wsRepository from '../repositories/WsRepository';
import { ClientType } from '../types/types';

export async function GET(request: NextRequest) {
  // クエリパラメータからthemeを取得
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('theme');
    const clientId = request.headers.get('X-Client-Id');
  (await wsRepository).sendMessage({
    to: ClientType.RESPONDENT,
    clientId: clientId ?? 'Client is not set.',
    payload: {
      type: 'theme_setted',
      message: q || 'テーマが設定されていません。'
    }
  });

  // 6分タイマー開始
  // タイマーが終了したら、ゲームマスタと回答者にゲーム終了を通知
  setTimeout(async () => {
    (await wsRepository).sendMessage({
      to: ClientType.GAME_MASTER,
      clientId: clientId ?? 'Client is not set.',
      payload: {
        type: 'game_ended',
        message: 'ゲームが終了しました。'
      }
    });
    (await wsRepository).sendMessage({
      to: ClientType.RESPONDENT,
      clientId: clientId ?? 'Client is not set.',
      payload: {
        type: 'game_ended',
        message: 'ゲームが終了しました。'
      }
    });
  }, 6 * 60 * 1000);

  return NextResponse.json({ message: 'ok' });
}
