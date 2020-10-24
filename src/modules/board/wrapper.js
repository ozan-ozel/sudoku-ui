import React, {useEffect, Fragment} from 'react'
import { connect } from "react-redux";

import { 
  initiateGame,
  selectCell, clearCells,
  deleteCellValue, insertCellValue,
  undoMove,
  toggleGameFinished,
  changeNotes, toggleNotes,
  setKey
} from '../../actions'

import {DIFFICULTIES, STATUSES} from '../../constants'

import {getBoard} from '../../apiCalls'

import styles from '../../styles/index.scss'

import GameRow from './row'

import Modal from '../../components/modal'

const GameBoard = ({
  board, selectedCell, notesOn, status,
  difficulty,
  isGameFinished,
  keyboardInput,
  initiateGame,
  selectCell, clearCells,
  insertCellValue, deleteCellValue,
  toggleGameFinished,
  changeNotes, setKey}) => {

  const cellClicked = (i , j) => {
    
    if(selectedCell && selectedCell.i === i && selectedCell.j === j) 
      clearCells()
    else
      selectCell(i, j)
  }

  const handleGameFinished = () => {
    getBoard(difficulty)
    .then((response) => {
      initiateGame({
        status: STATUSES.INITIAL,
        difficulty: difficulty,
        board: response.board,
        solution: response.solution,
        selectedCell: {},
        pastMoves: [],
        notesOn: false,
        wrongCells: {},
        highlightedCells: [],
        isGameFinished: false
      })
    })
  }

  useEffect(() => {
    let localState = JSON.parse(localStorage.getItem("sudoku-state"))

    if(localState) {
      if(!board)
        initiateGame(localState)
    } else {
      getBoard(DIFFICULTIES.Easy).then((response) => {
        initiateGame({ board: response.board, solution: response.solution, difficulty: DIFFICULTIES.Easy})
      })
    }
    const handleKeyPressed = (e) => {
      setKey(e.key)
    }

    document.addEventListener("keydown", handleKeyPressed)

    return () => {
      document.removeEventListener("keydown", handleKeyPressed)
    }

  }, [])

  useEffect(() => {

    if(keyboardInput) {
      
      // TODO: remove after tests are implemented
      // used for testing only
      if(keyboardInput === "x") {
        toggleGameFinished()
        setKey(null)
      }

      if(status === STATUSES.SELECTED) {

        if(keyboardInput === "Escape") {
          console.log("escape")
          clearCells()
        } else if(["Delete", "Backspace"].indexOf(keyboardInput) !== -1) {
          deleteCellValue()
        } else {
          let val = parseInt(keyboardInput)
  
          if(val && val >= 1 && val <= 9) {
  
            if(notesOn) {
              changeNotes(val)
            } else {
              insertCellValue(val)
            }
          }
        }

        setKey(null)
      }
    }
  }, [keyboardInput])

  return(
    <Fragment>
      <div className={styles["game-wrapper"]}>
        <div className={styles["game"]}>
          <table className={styles["game-table"]}>
            <tbody>
              {board && board.map((row, i) => (
                <GameRow 
                  row={row} i={i}
                  cellClicked={cellClicked}>
                </GameRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isGameFinished} handleCloseClick={handleGameFinished} >
        <div style={{paddingRight: '40px', marginTop: '20px'}}>
          <h1>Congratulations</h1>
          <p>You have completed the sudoku in {difficulty} mode.</p>
          <p>A new board will be generated when you close...</p>
          <a className={styles["btn"]} onClick={handleGameFinished}>Close</a>
        </div>
      </Modal>
    </Fragment>

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
    toggleGameFinished,
    undoMove,
    changeNotes, toggleNotes, setKey })(GameBoard);