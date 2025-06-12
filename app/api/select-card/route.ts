import {NextRequest, NextResponse} from 'next/server';
import wsRepository from '../repositories/WsRepository';

export async function GET(req: NextRequest) {
	const clientId = req.headers.get('X-Client-Id');
	// GMにクライアントのカード選択を通知
	(await wsRepository).sendMessage({
		to: 'game_master',
		clientId: clientId ?? 'Client is not set.',
		payload: {
			type: 'card_selected',
			message: 'カードが選択されました。'
		}
	});
	return NextResponse.json({ message: 'hello' });
}
