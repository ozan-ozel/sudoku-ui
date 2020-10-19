import React from 'react'

import styles from '../styles/index.scss'

export default function Header() {
  return (
    <header className={styles["site-header"]}>
      <div className={styles["content-wrapper"]}>
        <div className={styles["logo"]}>
          RealSudoku.com
        </div>
      </div>
    </header>
  )
}
