export const getGameState = store => store.game

export const getBoard = store => getGameState(store).board

export const getCell = (store, i, j) => getBoard(store)[i][j]

export const getDifficulty = store => getGameState(store).difficulty