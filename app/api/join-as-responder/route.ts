import { NextResponse } from 'next/server';
import { clientList } from '../stateStore/ClientsState';
import wsRepository from '../repositories/WsRepository';
import { ClientType } from '../types/types';

export async function GET() {
  // ゲームにゲームマスターとして参加する
  clientList.push(ClientType.RESPONDENT);

  // ゲームマスターに参加人数を通知
  (await wsRepository).sendMessage({
    to: ClientType.GAME_MASTER,
    payload: {
      type: 'client_count',
      count: clientList.length
    }
  });

  return NextResponse.json({ message: 'ok' });
}