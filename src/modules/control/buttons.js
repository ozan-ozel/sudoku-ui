import React from 'react'

import {CONTROL_TYPES} from '../../constants'

import styles from '../../styles/index.scss'

export default function Controls(props) {

  const { handleClick, notesOn } = props

  return (
    <div className={styles["game-controls"]}>
      <div className={styles["game-controls-buttons"]}>
        <div className={styles["game-controls-item"]}
              onClick={() => { handleClick(CONTROL_TYPES.NOTES) }}>
          <div className={ notesOn ? [styles["svg-wrapper"], styles["notes-on"]].join(" ") : styles["svg-wrapper"]}>
            <img src="../../images/edit.svg" className={styles["icon-game-control"]} />
          </div>
          <div className={styles["game-controls-label"]}>Notes</div>
        </div>
        <div className={styles["game-controls-item"]} onClick={() => { handleClick(CONTROL_TYPES.HINT) }}>
          <img src="../../images/lightbulb.svg" className={styles["icon-game-control"]} />
          <div className={styles["game-controls-label"]}>Hint</div>
        </div>
        <div className={styles["game-controls-item"]} onClick={() => { handleClick(CONTROL_TYPES.UNDO) }}>
          <img src="../../images/undo.svg" className={styles["icon-game-control"]} />
          <div className={styles["game-controls-label"]}>Undo</div>
        </div>
        <div className={styles["game-controls-item"]} onClick={() => { handleClick(CONTROL_TYPES.ERASE) }}>
          <img src="../../images/eraser.svg" className={styles["icon-game-control"]} />
          <div className={styles["game-controls-label"]}>Erase</div>
        </div>
      </div>
    </div>
  )
}