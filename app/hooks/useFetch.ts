const useFetch = () => {
	/**
	 * ゲームマスターが回答を評価するためのエンドポイント
	 * @param evaluate 得点数
	 */
	const fetchEvaluate = async (evaluate: string) => {
		try {
			await fetchBase(`/api/evaluate?evaluate=${evaluate}`);
		} catch (error) {
			console.error("Fetch failed", error);
		}
	};
	/**
	 * ゲームの開始をサーバーに伝えるためのエンドポイント
	 */
	const fetchGameStart = async () => {
		try {
			await fetchBase("/api/game-start");
		} catch (error) {
			console.error("Fetch failed", error);
		}
	};

	/**
	 * ゲームマスターがお題を決めるためのエンドポイント
	 * @param theme お題内容
	 */
	const fetchInputTheme = async (theme: string) => {
		try {
			await fetchBase(`/api/input-theme?theme=${theme}`);
		} catch (error) {
			console.error("Fetch failed", error);
		}
	};

	/**
	 * ゲームマスターとして参加したことを通知するエンドポイント
	 */
	const fetchJoinAsGameMaster = async () => {
		try {
			await fetchBase("/api/join-as-game-master");
		} catch (error) {
			console.error("Fetch failed", error);
		}
	};

	/**
	 * 回答者として参加したことを通知するエンドポイント
	 */
	const fetchJoinAsResponder = async () => {
		try {
			await fetchBase("/api/join-as-responder");
		} catch (error) {
			console.error("Fetch failed", error);
		}
	};

	/**
	 * 回答者が回答を送信するためのエンドポイント
	 * @param answer 回答内容
	 */
	const fetchRespondTheme = async (answer: string) => {
		try {
			await fetchBase(`/api/respond-theme?answer=${answer}`);
		} catch (error) {
			console.error("Fetch failed", error);
		}
	};
	/**
	 * 回答者のカードの選択が終了したことを通知するエンドポイント
	 */
	const fetchSelectCard = async () => {
		try {
			await fetchBase("/api/select-card");
		} catch (error) {
			console.error("Fetch failed", error);
		}
	};

	return {
		fetchEvaluate,
		fetchGameStart,
		fetchInputTheme,
		fetchJoinAsGameMaster,
		fetchJoinAsResponder,
		fetchRespondTheme,
		fetchSelectCard,
	};
};

function fetchBase(input: string | URL | globalThis.Request,
				   init?: RequestInit) {
	console.debug("[Browser]: Fetch request. ", input);
	const clientId = window.localStorage.getItem("clientId") ?? "Client id not found in localStorage";
	if (clientId === "Client id not found in localStorage") {
		console.error("[Browser]: Client ID is not set in localStorage.");
	} else {
		console.debug("[Browser]: Client ID found in localStorage.", clientId);
	}
	// クライアントIDをリクエストヘッダーに追加
	const newInit = init || {};
	newInit.headers = {
		...newInit.headers,
		'X-Client-Id': clientId,
	};
	console.debug("[Browser]: Client ID added to request headers.", clientId);
	console.debug("[Browser]: Fetch init.", newInit);
	return fetch(input, newInit);
}

export default useFetch;
