import React from 'react'

import { connect } from "react-redux";

import {initiateGame} from '../actions'

import {getDifficulty} from '../selectors'

import styles from '../styles/index.scss'

import Select from '../components/select'

import {getBoard} from '../apiCalls'

import {DIFFICULTIES, STATUSES} from '../constants'

const Info = (props) => {
  const {difficulty, initiateGame} = props

  const handleItemClick = (value) => {
    getBoard(value).then((response) => {
      initiateGame(
        {
          status: STATUSES.INITIAL,
          board: response.board,
          solution: response.solution,
          selectedCell: {},
          highlightedCells: [],
          wrongCells: {},
          pastMoves: [],
          notesOn: false,
          difficulty: value
        })
    })
  }

  return(
    <div className={styles["game-info-wrapper"]}>
      <div className="difficulty-wrap">
        <div className={styles["difficulty-text"]}>
          Difficulty: 
        </div>
        <Select options={Object.keys(DIFFICULTIES)} value={difficulty} handleItemClick={handleItemClick} />
      </div>
    </div>)
}

const mapStateToProps = (state) => {
  return {
    difficulty: getDifficulty(state)
  }
}

export default connect(mapStateToProps, {initiateGame})(Info)
