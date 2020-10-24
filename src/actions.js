import {
  INITIATE_GAME,
  TOGGLE_GAME_FINISHED,
  SELECT_CELL,
  CLEAR_CELLS,
  INSERT_CELL_VALUE,
  DELETE_CELL_VALUE,
  GET_HINT,
  UNDO_MOVE,
  TOGGLE_NOTES,
  CHANGE_NOTES,
  SET_KEY
} from './actionTypes'

export const initiateGame = (inputState) => ({
  type: INITIATE_GAME,
  payload: {
    inputState
  }
})

export const getHint = () => ({
  type: GET_HINT,
  payload: {}
})

export const selectCell = (i , j) => ({
  type: SELECT_CELL,
  payload: {
    i, j
  }
})

export const clearCells = () => ({
  type: CLEAR_CELLS,
  payload: {}
})

export const insertCellValue = (val, i, j) => ({
  type: INSERT_CELL_VALUE,
  payload: {
    val, i, j
  }
})

export const deleteCellValue = (i, j) => ({
  type: DELETE_CELL_VALUE,
  payload: {
    i, j
  }
})

export const undoMove = () => ({
  type: UNDO_MOVE,
  payload: {}
})

export const toggleNotes = () => ({
  type: TOGGLE_NOTES,
  payload: {}
})

export const changeNotes = (val) => ({
  type: CHANGE_NOTES,
  payload: {val}
})

export const toggleGameFinished = () => ({
  type: TOGGLE_GAME_FINISHED,
  payload: {}
})

export const setKey = (val) => ({
  type: SET_KEY,
  payload: {
    val
  }
})