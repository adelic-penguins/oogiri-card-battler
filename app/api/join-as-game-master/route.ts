import { NextResponse } from 'next/server';
import { clientList } from '../stateStore/ClientsState';
import wsRepository from '../repositories/WsRepository';

export async function GET() {
  // ゲームにゲームマスターとして参加する
  clientList.push('game_master');

  return NextResponse.json({ message: 'ok' });
}
