import {NextRequest, NextResponse} from 'next/server';
import wsRepository from '../repositories/WsRepository';
import {ClientType} from "@/app/api/types/types";
import stateRepository from "@/app/api/repositories/StateRepository";

export async function GET(req: NextRequest) {
  const clientId = req.headers.get('X-Client-Id') ?? 'client is not set.';
  // ゲームにゲームマスターとして参加する
  await stateRepository.addClient(clientId);
  const clientList = new Set(await stateRepository.getClients());

  setTimeout(async () => {
    // ゲームマスターに参加人数を通知
    (await wsRepository).sendMessage({
      to: ClientType.GAME_MASTER,
      clientId: clientId,
      payload: {
        type: 'client_count',
        message: `${clientList.size}`,
      }
    });
  }, 100);

  return NextResponse.json({ message: 'ok' });
}
