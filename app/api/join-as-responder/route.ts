import { NextResponse } from 'next/server';
import { clientList } from '../stateStore/ClientsState';
import wsRepository from '../repositories/WsRepository';

export async function GET() {
  // ゲームにゲームマスターとして参加する
  clientList.push('respondent');

  // ゲームマスターに参加人数を通知
  wsRepository.sendMessage({
    to: 'game_master',
    payload: {
      type: 'client_count',
      count: clientList.length
    }
  });

  return NextResponse.json({ message: 'ok' });
}
