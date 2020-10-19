import React from 'react'

import { connect } from "react-redux";

import {getCell} from '../../selectors'

import styles from '../../styles/index.scss'

import Numbers from '../../images/numbers/index'

const GameCell = (props) => {
  const defaultColor = '#344861'

  const selectedColor = '#4a90e2'

  const wrongValueColor = "#fb3d3f"

  const notesColor = "#6e7c8c"

  const {i, j, cell, cellClicked, cellKeyPressed} = props

  const getBorderStyle = () => {
    return (j === 2 || j === 5 ? " " + styles["border-right-2px"] : "")
    + (i === 2 || i === 5 ? " " + styles["border-bottom-2px"]: "")
    + (j === 8 ? " " + styles["border-right-none"] :  "")
  }

  const getCellStyle = () => {
    let className = styles["game-cell"]

    if(cell.p) {
      if(cell.p === "s") {
        className = [className, styles['cell-selected']].join(" ")
      } else if(cell.p === "c") {
        className = [className, styles['cell-corresponding']].join(" ")
      } else if(cell.p === "h") {
        className = [className, styles['cell-highlighted']].join(" ")
      } else if(cell.p === "c-w") {
        className = [className, styles['cell-corresponding-wrong']].join(" ")
      }
    }

    return className
  }

  const getFillColor = (isNotes) => {
    if(isNotes) {
      return notesColor
    } else {

      if(cell.t === "e" && cell.p === "s" || cell.d !== "" && cell.t === "e") {
        return selectedColor
      } else if(cell.p === "c-w") {
        return wrongValueColor
      } else {
        return defaultColor
      }

    }
  }

  return (
    <td className={ getCellStyle() + " " + getBorderStyle() } 
      tabIndex="0" onKeyDown={(event) => {cellKeyPressed(event.key, i, j)}} onClick={() => {cellClicked(i, j)}}>
      <div className={styles["cell-value"]}>
        { ( (cell.d && cell.t === "g") || (cell.d && cell.t === "e" && cell.h.length === 0) ) &&
          <Numbers index={cell.d - 1} fill={getFillColor()} />
        }
      </div>
      {cell.t === "e" &&
        <div className={styles["pencil-grid"]}>
          {[1,2,3,4,5,6,7,8,9].map((item, index) => (
            <div className={styles["pencil-grid-cell"]}>
              {cell.h.indexOf(item) !== -1 &&
                <Numbers index={item - 1} fill={getFillColor(true)} />
              }
            </div>
          ))}
        </div>
      }
    </td>
  )
}

const mapStateToProps = (state, ownProps) => {
  const {i, j, cellClicked, cellKeyPressed} = ownProps

  return {
    cell: getCell(state, i, j),
    i, j,
    cellClicked,
    cellKeyPressed
  }
}

export default connect(mapStateToProps)(GameCell)