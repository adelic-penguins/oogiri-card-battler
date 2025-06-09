export type SelectedCardState = {
	[key: string]: boolean;
};
export enum phase {
	// カード使用フェーズ
	cardUsagePhase,
	// 能力発動フェーズ
	abilityPhase,
	// お題入力フェーズ
	themeInputPhase,
	// 回答フェーズ
	answerPhase,
	// 評価フェーズ
	evaluationPhase,
	// 評価後の結果フェーズ
	evaluationResultPhase,
	// ゲーム終了フェーズ
	gameEndPhase,
}
