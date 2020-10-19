import React from 'react'

import styles from '../../styles/index.scss'

import Numbers from '../../images/numbers/index'

let numpadList = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export default function Numpad(props) {
  const nonSelectedColor = '#344861'
  
  const {handleClick} = props

  return(
    <div className={styles["numpad-wrapper"]}>
      <div className={styles["numpad"]}>
        {numpadList.map((item, index) => (
          <div className={styles["numpad-item"]} onClick={() => {handleClick(item)}}>
            <Numbers index={index} fill={nonSelectedColor} />
          </div>
        ))}
      </div>
    </div>
  )
}