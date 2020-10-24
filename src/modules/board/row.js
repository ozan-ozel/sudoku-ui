import React from 'react'

import GameCell from './cell'

import styles from '../../styles/index.scss'

const GameRow = (props) => {
  const {i, row, cellClicked} = props

  return (
    <tr key={i} className={styles["game-row"]}>
      {row.map((cell, j) => (
        <GameCell i={i} j={j} cellClicked={cellClicked} />
      ))}
    </tr>
  )
}

export default GameRow
