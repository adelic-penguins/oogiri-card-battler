enum GamePhase {
    LOBBY = 'lobby',
    PLAYING = 'playing',
    ENDED = 'ended',
}

let currentPhase: GamePhase = GamePhase.LOBBY;

export { GamePhase, currentPhase };