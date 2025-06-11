import {NextRequest, NextResponse} from 'next/server';
import wsRepository from '../repositories/WsRepository';
import {ClientType} from '../types/types';
import stateRepository from '../repositories/StateRepository';

export async function GET(req: NextRequest) {
    const clientId = req.headers.get('X-Client-Id') ?? 'client is not set.';
    if (clientId == "client is not set.") {
        console.error('[Next Server]: WebSocket client is not set.');
    }
    // ゲームにゲームマスターとして参加する
    await stateRepository.addClient(clientId);
    console.debug('[Next Server]: Cliend id list:', await stateRepository.getClients());
    const clientList = new Set(await stateRepository.getClients());
    // ゲームマスターに参加人数を通知
    (await wsRepository).sendMessage({
        to: ClientType.GAME_MASTER,
        clientId: clientId,
        payload: {
            type: 'client_count',
            message: `${clientList.size}`,
        }
    });

    return NextResponse.json({message: 'ok'});
}