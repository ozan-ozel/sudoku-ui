import React from 'react'
import { connect } from "react-redux";

import {deleteCellValue, insertCellValue, undoMove, toggleNotes, changeNotes} from '../../actions'

import {CONTROL_TYPES, STATUSES} from '../../constants'

import Numpad from './numpad'
import Controls from './buttons'

import styles from '../../styles/index.scss'


const GameControl = ({
  status,
  insertCellValue, deleteCellValue,
  undoMove,
  notesOn, toggleNotes, changeNotes}) => {

  const handleNumpadClick = (val) => {
    if(status === STATUSES.SELECTED) {

      if(notesOn) {
        changeNotes(val)
      } else {
        insertCellValue(val)
      }

    }
  }

  const handleControlClick = (type) => {

    switch(type) {
      case CONTROL_TYPES.ERASE: {
        if(status === STATUSES.SELECTED)
          deleteCellValue()
        break
      }
      case CONTROL_TYPES.UNDO: {
        undoMove()
        break
      }
      case CONTROL_TYPES.HINT: {
        break
      }
      case CONTROL_TYPES.NOTES: {
        toggleNotes()
        break
      }
    }
  }

  return (
    <div className={styles["game-controls-wrapper"]}>
      <nav>
        <Numpad handleClick={handleNumpadClick} />
        <Controls handleClick={handleControlClick} notesOn={notesOn} />
      </nav>
    </div>
  )
}

const mapStateToProps = state => {
  const {game} = state

  return game
}

export default connect(mapStateToProps, 
  { insertCellValue, deleteCellValue,
    undoMove, toggleNotes, changeNotes })(GameControl);