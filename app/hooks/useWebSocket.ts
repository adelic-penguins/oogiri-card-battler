import { useEffect } from "react";
import { ClientMessage, ClientType } from "@/app/api/types/types";
import { useAtomValue, useSetAtom } from "jotai";
import {
    answerAtom,
	currentPhaseAtom,
	evaluationResultAtom,
	themeAtom,
	wsMessageStateAtom,
	wsStateAtom,
} from "../state/jotai/atoms";
import { useLocalStorage } from "./useLocalStorage";
import { useRouter } from "next/navigation";
import { Phase } from "../types/userState/card";

/**
 * 内部用のWebSocket初期化フック
 * @param clientType - クライアントの種類
 */
export function useWebSocketCommon(clientType: ClientType) {
	const setWsMessageState = useSetAtom(wsMessageStateAtom);
	const wsState = useAtomValue(wsStateAtom);
	const [clientId] = useLocalStorage("clientId");

	useEffect(() => {
        console.debug("[Browser]: Initializing WebSocket connection...", wsState);

        const handleMessage = (ev: MessageEvent<any>) => {
            const data = JSON.parse(ev.data) as ClientMessage;
            console.debug("[Browser] Message recived from WebSocket server.", data);
            setWsMessageState(data);
        };
        const handleError = (error: Event) => {
            console.error("[Browser]: WebSocket error:", error);
            throw error;
        };
        const handleOpen = () => {
            console.log("[Browser]: WebSocket connection established");
            wsState.send(
                JSON.stringify({ action: "register", clientType, clientId }),
            );
            console.debug("[Browser]: WebSocket sent registration message", {
                action: "register",
                clientType,
                clientId,
            });
        };

        wsState.addEventListener("message", handleMessage);
        wsState.addEventListener("error", handleError);
        wsState.addEventListener("open", handleOpen);

        if (wsState.readyState === WebSocket.OPEN) {
            handleOpen();
        }

        return () => {
            console.debug("[Browser]: Closing WebSocket connection...", wsState);
            wsState.removeEventListener("message", handleMessage);
            wsState.removeEventListener("error", handleError);
            wsState.removeEventListener("open", handleOpen);
        };
    }, [clientType, clientId, setWsMessageState, wsState]);
}

// それぞれのフェーズに対応するWebSocketフック

/**
 * ゲームマスターの待機フェーズ用のWebSocketフック
 * @returns wsMessageState - WebSocketから受信したメッセージの状態
 */
export function useWebSocketForGameMasterWaiting() {
	// WebSocketの初期化
	useWebSocketCommon(ClientType.GAME_MASTER);

	const wsMessageState = useAtomValue(wsMessageStateAtom);

	return { wsMessageState };
}

/**
 * 回答者の待機フェーズ用のWebSocketフック
 * @returns void
 */
export function useWebSocketForPlayerWaiting() {
	// WebSocketの初期化
	useWebSocketCommon(ClientType.RESPONDENT);
	const wsMessageState = useAtomValue(wsMessageStateAtom);
	const router = useRouter();

	useEffect(() => {
		if (wsMessageState.type === "start_game") {
			router.push("/battle/player");
		}
	}, [wsMessageState, router]);
}

/**
 * ゲームマスターのバトルコンポーネント用のWebSocketフック
 */
export function useWebSocketForGameMasterBattleComponent(): void {
	// WebSocketの初期化
	useWebSocketCommon(ClientType.GAME_MASTER);
	const wsMessageState = useAtomValue(wsMessageStateAtom);
	const router = useRouter();

	useEffect(() => {
		if (wsMessageState.type === "game_ended") {
			router.push("/game-end-phase");
		}
	}, [wsMessageState, router]);
}

/**
 * 回答者のバトルコンポーネント用のWebSocketフック
 */
export function useWebSocketForPlayerBattleComponent(): void {
	// WebSocketの初期化
	useWebSocketCommon(ClientType.RESPONDENT);
	const wsMessageState = useAtomValue(wsMessageStateAtom);
	const router = useRouter();

	useEffect(() => {
		if (wsMessageState.type === "game_ended") {
			router.push("/game-end-phase");
		}
	}, [wsMessageState, router]);
}

/**
 * ゲームマスターのカード使用フェーズ用のWebSocketフック
 */
export function useWebSocketForGameMasterCardUsagePhase(): void {
	// WebSocketの初期化
	const wsMessageState = useAtomValue(wsMessageStateAtom);
	const setCurrentPhase = useSetAtom(currentPhaseAtom);

	useEffect(() => {
		if (wsMessageState.type === "card_selected") {
			setCurrentPhase(Phase.themeInputPhase);
		}
	}, [wsMessageState, setCurrentPhase]);
}

/**
 * 回答者のカード使用フェーズ用のWebSocketフック
 */
export function useWebSocketForPlayerCardUsagePhase(): void {
	// カード使用および能力発動をFetchで通知
}

/**
 * ゲームマスターのお題入力フェーズ用のWebSocketフック
 */
export function useWebSocketForGameMasterThemeInputPhase(): void {
	// 入力したテーマををFetchで通知
}

/**
 * 回答者のお題入力フェーズ用のWebSocketフック
 */
export function useWebSocketForPlayerThemeInputPhase(): void {
	// WebSocketの初期化
	const wsMessageState = useAtomValue(wsMessageStateAtom);
	const setCurrentPhase = useSetAtom(currentPhaseAtom);
    const setTheme = useSetAtom(themeAtom);

	useEffect(() => {
		if (wsMessageState.type === "theme_setted") {
            setTheme(wsMessageState.message ?? "何も来ていないが？");
			setCurrentPhase(Phase.answerPhase);
		}
	}, [wsMessageState, setCurrentPhase, setTheme]);
}

/**
 * ゲームマスターの回答入力フェーズ用のWebSocketフック
 */
export function useWebSocketForGameMasterAnswerInputPhase(): void {
	// WebSocketの初期化
	const wsMessageState = useAtomValue(wsMessageStateAtom);
	const setCurrentPhase = useSetAtom(currentPhaseAtom);
    const setAnswer = useSetAtom(answerAtom);

	useEffect(() => {
        console.debug("[Browser]: Answer phase");
		if (wsMessageState.type === "answer_setted") {
			setCurrentPhase(Phase.evaluationPhase);
            setAnswer(wsMessageState.message ?? "何も来ていないが？");
		}
	}, [wsMessageState, setCurrentPhase, setAnswer]);
}

/**
 * 回答者の回答入力フェーズ用のWebSocketフック
 */
export function useWebSocketForPlayerAnswerInputPhase(): void {
	// 回答内容をFetchで通知
}

/**
 * ゲームマスターの回答評価フェーズ用のWebSocketフック
 */
export function useWebSocketForGameMasterAnswerEvaluationPhase(): void {
	// 回答の評価をFetchで通知
}

/**
 * 回答者の回答評価フェーズ用のWebSocketフック
 */
export function useWebSocketForPlayerAnswerEvaluationPhase(): void {
	// WebSocketの初期化
	const wsMessageState = useAtomValue(wsMessageStateAtom);
	const setCurrentPhase = useSetAtom(currentPhaseAtom);
    const setEvaluationResult = useSetAtom(evaluationResultAtom);

	useEffect(() => {
		if (wsMessageState.type === "evaluate_setted") {
			setCurrentPhase(Phase.evaluationResultPhase);
            setEvaluationResult(wsMessageState.message ?? "何も来ていないが？");
		}
	}, [wsMessageState, setCurrentPhase, setEvaluationResult]);
}
