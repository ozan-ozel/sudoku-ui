import React, {useEffect, useRef} from 'react'
import { connect } from "react-redux";

import { 
  initiateGame,
  selectCell, clearCells,
  deleteCellValue, insertCellValue,
  undoMove,
  changeNotes, toggleNotes} from '../../actions'

import {DIFFICULTIES} from '../../constants'

import {getBoard} from '../../apiCalls'

import styles from '../../styles/index.scss'

import GameRow from './row'

const GameBoard = ({
  board, selectedCell, notesOn,
  initiateGame,
  selectCell, clearCells,
  insertCellValue, deleteCellValue,
  undoMove,
  changeNotes, toggleNotes}) => {

  const cellClicked = (i , j) => {
    
    if(selectedCell && selectedCell.i === i && selectedCell.j === j) 
      clearCells()
    else
      selectCell(i, j)
  }

  const cellKeyPressed = (val) => {
    
    if(["Delete", "Backspace", "e", "E"].indexOf(val) !== -1) {
      deleteCellValue()
    } else if(val === "n" || val === "N") {
      toggleNotes()
    } else if(val === "u" || val === "U") {
      undoMove()
    } else {
      val = parseInt(val)

      if(val >= 1 && val <= 9) {

        if(notesOn) {
          changeNotes(val)
        } else {
          insertCellValue(val)
        }
      }
    }    
  }

  useEffect(() => {
    let localState = JSON.parse(localStorage.getItem("sudoku-state"))

    if(localState) {
      initiateGame(localState)
    } else {
      getBoard(DIFFICULTIES.Easy).then((response) => {
        initiateGame({ board: response.board, solution: response.solution, difficulty: DIFFICULTIES.Easy})
      })
    }
    function handleKeyPressed(e) {
      if(e.keyCode === 27) {
        clearCells()
      }
    }

    document.addEventListener("keydown", handleKeyPressed)

    return () => {
      document.removeEventListener("keydown", handleKeyPressed)
    }

  }, [])

  return(
    <div className={styles["game-wrapper"]}>
      <div className={styles["game"]}>
        <table className={styles["game-table"]}>
          <tbody>
            {board && board.map((row, i) => (
              <GameRow 
                row={row} i={i}
                cellClicked={cellClicked}
                cellKeyPressed={cellKeyPressed} >
              </GameRow>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

const mapStateToProps = state => {
  const {game} = state

  return game
}

export default connect(mapStateToProps,
  {
    initiateGame,
    selectCell, clearCells,
    insertCellValue, deleteCellValue,
    undoMove,
    changeNotes, toggleNotes })(GameBoard);