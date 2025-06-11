import { NextRequest, NextResponse } from 'next/server';
import wsRepository from '../repositories/WsRepository';

export async function GET(request: NextRequest) {
  // クエリパラメータからthemeを取得
  const searchParams = request.nextUrl.searchParams;
  const q = searchParams.get('theme');
    const clientId = request.headers.get('X-Client-Id');
  (await wsRepository).sendMessage({
    to: 'respondent',
    clientId: clientId ?? 'Client is not set.',
    payload: {
      type: 'theme_setted',
      message: q || 'テーマが設定されていません。'
    }
  });

  return NextResponse.json({ message: 'ok' });
}
