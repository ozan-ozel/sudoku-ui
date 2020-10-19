import React, {useState, createContext} from 'react'

import boardData from '../modules/game.seed'

export const GameContext = createContext()

const GameContextProvider = (props) => {
  const [selectedCell, setSelectedCell] = useState()

  const [board, setBoard] = useState(boardData)

  const [similarCells, setSimilarCells] = useState(new Array(9).fill(0).map(() => new Array(9).fill(0)))

  const [highlightedCells, setHighlightedCells] = useState(new Array(9).fill(0).map(() => new Array(9).fill(0)))

  const [pastMoves, setPastMoves] = useState([])

  const [notesOn, setNotesOn] = useState(false)

  const [status, setStatus] = useState('INITIAL')

  return (
    <GameContext.Provider value={
      {
        status, setStatus, notesOn, setNotesOn,
        selectedCell, setSelectedCell,
        highlightedCells, setHighlightedCells, similarCells, setSimilarCells,
        board, setBoard, pastMoves, setPastMoves
      }}>
      {props.children}
    </GameContext.Provider>
  )
}

export default GameContextProvider
