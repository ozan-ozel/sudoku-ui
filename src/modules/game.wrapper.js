import React from 'react'

import styles from '../styles/index.scss'

import GameBoard from './board/wrapper'
import GameControl from './control/wrapper'

export  default function GameWrapper() {
  return (
    <div className={styles["game-flex-wrapper"]}>
        <GameBoard />
        <GameControl />
    </div>
  )
}