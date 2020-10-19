import {
  SELECT_CELL,
  CLEAR_CELLS,
  INSERT_CELL_VALUE,
  DELETE_CELL_VALUE,
  UNDO_MOVE,
  TOGGLE_NOTES,
  CHANGE_NOTES,
  INITIATE_GAME,
  CHANGE_DIFFICULTY,
  STORE_GAME
} from '../actionTypes'

import {PRESENTATIONS, STATUSES, TYPES, OPERATIONS, PAST_MOVES_MAX, DIFFICULTIES} from '../constants'

const initialState = {
  status: STATUSES.INITIAL,
  difficulty: DIFFICULTIES.Easy,
  board: null,
  solution: [123123123],
  selectedCell: {},
  pastMoves: [],
  notesOn: false,
  wrongCells: {},
  highlightedCells: []
}

// data
// d: "" or a number 

// type
// t : "e" => empty,
// t : "g" => generated

// notes (hints)
// h : []

// presentation
// p : null => initial
// p : "s" => selected
// p : "c" => corresponding
// p : "h" => highlighted
// p : "c-w" => corresponding-wrong

const clearCells = (board) => {
  for(let i = 0; i < board.length; i ++) {
    for(let j = 0; j < board[i].length; j++) {
      board[i][j].p = null
    }
  }
}

const setHighlightedCells = (board, i, j) => {

  let highlightedCells = []

  for(let x = 0; x < 9; x++) {
    const m = 3 * Math.floor(i / 3) + Math.floor(x / 3)
    const n = 3 * Math.floor(j / 3) + x % 3

    if(x !== j) {
      highlightedCells.push({i: i, j: x})

      board[i][x].p = PRESENTATIONS.highlighted
    }

    if(x !== i) {
      highlightedCells.push({i: x, j: j})

      board[x][j].p = PRESENTATIONS.highlighted
    }

    if(m !== i) {
      highlightedCells.push({i: m, j: n})

      board[m][n].p = PRESENTATIONS.highlighted
    } 
  }

  return {board, highlightedCells }
}

const setCorrespondingCells = (board, i, j, highlightedCells, wrongCells) => {
   
  const {highlighted, corresponding_wrong, corresponding}  = PRESENTATIONS

  wrongCells[i + "" + j] = []

  for(let k = 0; k < board.length; k++) {

    for(let l = 0; l < board[k].length; l++) {
      
      if(i === k && j === l)
        continue

      if(board[k][l].p === corresponding) {
        board[k][l].p = null
      }

      if(board[i][j].d !== "" && board[i][j].d === board[k][l].d) {
        
        if(highlightedCells.find((el) => el.i === k && el.j === l)) {

          wrongCells[i + "" + j].push({i: k, j: l})

        } else {
          board[k][l].p = corresponding
        }
      }
    }
  }

  return {board, wrongCells}
}

const setWrongCells = (board, wrongCells) => {
  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {

      if(wrongCells[i + "" + j]) {
        wrongCells[i + "" + j].filter((cell) => {
          if(board[i][j].d === board[cell.i][cell.j].d) {
            board[cell.i][cell.j].p = PRESENTATIONS.corresponding_wrong
            return true
          }
          else {
            return false
          }
        })
      }
    }
  }

  return {board, wrongCells}
}

const pushPastMoves = (pastMoves, op, i, j, prev) => {
  // if max past moves size reached, shift one left
  if(pastMoves.length === PAST_MOVES_MAX) {
    pastMoves = pastMoves.slice(1)
  }

  pastMoves.push({op, i, j, prev })
}

const renewCells = (board, i, j , highlightedCells, wrongCells) => {

  let resultHighlight = setHighlightedCells(board, i, j)

  highlightedCells = resultHighlight.highlightedCells

  board = resultHighlight.board

  let resultCorresponding = setCorrespondingCells(board, i, j, highlightedCells, wrongCells)
  
  board = resultCorresponding.board

  wrongCells = resultCorresponding.wrongCells

  let resultWrong = setWrongCells(board, wrongCells)

  board = resultWrong.board

  wrongCells = resultWrong.wrongCells
}

const checkGameEnd = (board) => {
  
  for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
      if( board[i][j].d === "" ||
        (board[i][j].d !== "" && board[i][j].p === PRESENTATIONS.corresponding_wrong)) {
        return false
      }
    }
  }

  return true
}

export default function(state = initialState, action) {
  switch(action.type) {
    case INITIATE_GAME: {
      const {inputState} = action.payload

      return {
        ...state,
        ...inputState
      }
    }
    case CHANGE_DIFFICULTY: {
      const {difficulty} = action.payload
    }
    case SELECT_CELL: {
     
      const {i, j} = action.payload

      let board = Object.assign([], state.board)

      let wrongCells = Object.assign({}, state.wrongCells)

      let highlightedCells = []

      clearCells(board)

      renewCells(board, i, j, highlightedCells, wrongCells)

      board[i][j].p = PRESENTATIONS.selected

      return {
        ...state,
        status: STATUSES.SELECTED,
        selectedCell: {i, j},
        board,
        highlightedCells,
        wrongCells
      }
    }
    case CLEAR_CELLS: {
      let board = Object.assign([], state.board)

      let wrongCells = Object.assign({}, state.wrongCells)

      clearCells(board)

      setWrongCells(board, wrongCells)

      return {
        ...state,
        status: STATUSES.INITIAL,
        selectedCell: null,
        board,
        wrongCells
      }
    }
    case INSERT_CELL_VALUE: {

      const {val} = action.payload

      const {i, j} = state.selectedCell

      if(state.status === STATUSES.SELECTED &&
          state.board[i][j].p === PRESENTATIONS.selected && state.board[i][j].t === TYPES.empty) {

        let board = Object.assign([], state.board)
        let wrongCells = Object.assign({}, state.wrongCells)
        let pastMoves = Object.assign([], state.pastMoves)
        let highlightedCells = new Array()

        let prev = {d: board[i][j].d} 

        board[i][j].d = val

        board[i][j].h = new Array()

        renewCells(board, i, j, highlightedCells, wrongCells)

        pushPastMoves(pastMoves, OPERATIONS.ADD, i, j, prev)

        if(checkGameEnd(board)) {
          console.log("Game ENd")
        }

        return {
          ...state,
          status: STATUSES.SELECTED,
          board,
          pastMoves,
          wrongCells,
          highlightedCells
        }
      } else {
        return state
      }
    }
    case DELETE_CELL_VALUE: {
      const {i, j} = state.selectedCell

      if(state.status === STATUSES.SELECTED &&
          state.board[i][j].p === PRESENTATIONS.selected && state.board[i][j].t === TYPES.empty) {

        let board = Object.assign([], state.board)
        let wrongCells = Object.assign({}, state.wrongCells)
        let pastMoves = Object.assign([], state.pastMoves)
        let highlightedCells = new Array()

        let prev = {d: board[i][j].d}
            
        board[i][j].d = ""

        board[i][j].h = new Array()

        renewCells(board, i, j, highlightedCells, wrongCells)

        pushPastMoves(pastMoves, OPERATIONS.REMOVE, i, j, prev)

        return {
          ...state,
          board,
          highlightedCells,
          wrongCells,
          pastMoves
        }
      } else {
        return state
      }
    }
    case UNDO_MOVE: {
      let pastMoves = Object.assign([], state.pastMoves)

      if(pastMoves.length !== 0) {
        let board = Object.assign([], state.board)

        let wrongCells = Object.assign({}, state.wrongCells)

        let highlightedCells = new Array()

        let curr = pastMoves[pastMoves.length - 1]

        pastMoves = pastMoves.slice(0, pastMoves.length - 1)

        clearCells(board)

        if("d" in curr.prev) {
          board[curr.i][curr.j].d = curr.prev.d
          board[curr.i][curr.j].h = new Array()
          board[curr.i][curr.j].p = PRESENTATIONS.selected 
        } else if("h" in curr.prev) {
          board[curr.i][curr.j].d = ""
          board[curr.i][curr.j].h = curr.prev.h
          board[curr.i][curr.j].p = PRESENTATIONS.selected
        }

        renewCells(board, curr.i, curr.j, highlightedCells, wrongCells)

        return {
          ...state,
          status: STATUSES.SELECTED,
          board,
          highlightedCells,
          selectedCell: {i: curr.i, j: curr.j},
          pastMoves,
          wrongCells
        }
      } else {
        return state
      }
    }
    case TOGGLE_NOTES: {
      return {
        ...state,
        notesOn: !state.notesOn
      }
    }
    case CHANGE_NOTES: {
      const {val} = action.payload

      if(state.notesOn && state.status === STATUSES.SELECTED) {

        const {i, j} = state.selectedCell

        let board = Object.assign([], state.board)
        let pastMoves = Object.assign([], state.pastMoves)
        let wrongCells = Object.assign({}, state.wrongCells)
        let highlightedCells = new Array()

        if(board[i][j].t === TYPES.generated) {
          return state
        } else {
          let prev = {}

          if(board[i][j].h.length !== 0) {
            prev = {h: Object.assign([], board[i][j].h) }
          } else {
            prev = {d: board[i][j].d}
          }
  
          board[i][j].d = ""
  
          if(board[i][j].h.indexOf(val) === -1) {
            board[i][j].h.push(val)
          } else {
            board[i][j].h.splice(board[i][j].h.indexOf(val), 1)
          }
  
          clearCells(board)
  
          renewCells(board, i, j, highlightedCells, wrongCells)
  
          board[i][j].p = PRESENTATIONS.selected

          pushPastMoves(pastMoves, OPERATIONS.CHANGE_NOTES, i, j, prev)
  
          return {
            ...state,
            board,
            highlightedCells,
            wrongCells,
            pastMoves
          }
        }


      }
    }
    default:
      return state
      break
  }
}