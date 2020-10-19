import React from 'react'

import styles from '../styles/index.scss'

import Info from './info'
import GameWrapper from './game.wrapper'

export default function Main() {
  return (
    <div className={[styles["content-wrapper"], styles["site-content-wrapper"]].join(" ")}>
      <div className={styles["site-content"]}>
        <div className={styles["sudoku-wrapper"]}>
          <Info />
          <GameWrapper />
        </div>
      </div>
    </div>
  )
}