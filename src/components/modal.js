import React, {useEffect} from 'react'

import styles from '../styles/index.scss'

import useComponentVisible from '../hooks/useComponentVisible'

function Modal(props) {

  const { isOpen, handleCloseClick } = props

  const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(isOpen)

  const getModalStyle = () => {
    let className = ""

    if(isComponentVisible) {
      className = [styles["modal"], styles["d-block"]].join(" ")
    } else {
      className = [styles["modal"], styles["d-none"]].join(" ")
    }

    return className
  }

  const handleClick = () => {
    // setIsComponentVisible(!isComponentVisible)
  }

  useEffect(() => {
    setIsComponentVisible(isOpen)
  }, [isOpen])

  return (
    <div ref={ref} className={getModalStyle()} onClick={() => handleClick()}>
        <div className={styles["modal-content"]}>
          <span className={styles["modal-close"]} onClick={() => {handleCloseClick()}}>&times;</span>
          {props.children}
        </div>
    </div>
  )
}

export default Modal
