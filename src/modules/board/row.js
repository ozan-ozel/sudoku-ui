import React from 'react'

import GameCell from './cell'

import styles from '../../styles/index.scss'

const GameRow = (props) => {
  const {i, row, cellClicked, cellKeyPressed} = props

  return (
    <tr key={i} className={styles["game-row"]}>
      {row.map((cell, j) => (
        <GameCell i={i} j={j} cellClicked={cellClicked} cellKeyPressed={cellKeyPressed} />
      ))}
    </tr>
  )
}

export default GameRow
