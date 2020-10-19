import React from 'react'

import styles from '../styles/index.scss'

import useComponentVisible from '../hooks/useComponentVisible'

function Select(props) {
  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

  const { value, handleItemClick } = props

  const handleClick = () => {
    setIsComponentVisible(!isComponentVisible)
  }

  return(
    <div ref={ref} className={styles["select-container"]} onClick={() => handleClick()}>
      <span>{value}</span>
      <div className={isComponentVisible ? (styles["select-arrow-down"] + " " + styles["select-arrow-up-transform"])
        : styles["select-arrow-down"]}></div>
      <div
          className={isComponentVisible ? styles["select-menu"] + " " + styles["d-block"]
          : styles["select-menu"] + " " + styles["d-none"]}>
        <ul>
          {props.options.map((item, index) => (
            <li key={index}>
              <a onClick={() => handleItemClick(item)}>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Select
