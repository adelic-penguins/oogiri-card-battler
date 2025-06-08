import { NextResponse } from 'next/server';
import wsRepository from '../repositories/WsRepository';

export async function GET() {
	// GMにクライアントのカード選択を通知
	(await wsRepository).sendMessage({
		to: 'game_master',
		payload: {
			type: 'card_selected',
			message: 'カードが選択されました。'
		}
	});
	return NextResponse.json({ message: 'hello' });
}
