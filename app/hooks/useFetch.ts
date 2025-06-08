const useFetch = () => {
	/**
	 * ゲームマスターが回答を評価するためのエンドポイント
	 * @param evaluate 得点数
	 */
	const fetchEvaluate = async (evaluate: string) => {
		try {
			await fetch(`/api/evaluate?evaluate=${evaluate}`);
		} catch (error) {
			console.error("Fetch failed", error);
		}
	};
	/**
	 * ゲームの開始をサーバーに伝えるためのエンドポイント
	 */
	const fetchGameStart = async () => {
		try {
			await fetch("/api/game-start");
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
			await fetch(`/api/input-theme?theme=${theme}`);
		} catch (error) {
			console.error("Fetch failed", error);
		}
	};

	/**
	 * ゲームマスターとして参加したことを通知するエンドポイント
	 */
	const fetchJoinAsGameMaster = async () => {
		try {
			await fetch("/api/join-as-game-master");
		} catch (error) {
			console.error("Fetch failed", error);
		}
	};

	/**
	 * 回答者として参加したことを通知するエンドポイント
	 */
	const fetchJoinAsResponder = async () => {
		try {
			await fetch("/api/join-as-responder");
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
			await fetch(`/api/respond-theme?answer=${answer}`);
		} catch (error) {
			console.error("Fetch failed", error);
		}
	};
	/**
	 * 回答者のカードの選択が終了したことを通知するエンドポイント
	 */
	const fetchSelectCard = async () => {
		try {
			await fetch("/api/select-card");
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

export default useFetch;
