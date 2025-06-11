export type CardType = {
	cardName: string;
	src: string;
	selected: boolean;
};
export type CardListType = Array<CardType>;
export enum Phase {
	/**
	 * カード使用フェーズ
	 */
	cardUsagePhase,
	/**
	 * 能力発動フェーズ
	 */
	abilityPhase,
	/**
	 * お題入力フェーズ
	 */
	themeInputPhase,
	/**
	 * 回答フェーズ
	 */
	answerPhase,
	/**
	 * 評価フェーズ
	 */
	evaluationPhase,
	/**
	 * 評価後の結果フェーズ
	 */
	evaluationResultPhase,
	/**
	 * ゲーム終了フェーズ
	 */
	gameEndPhase,
}
