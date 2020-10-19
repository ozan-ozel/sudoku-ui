import axios from 'axios'

import {BASE_URL} from './config'

const RESPONSE_STATUS =  {
  success: "Success",
  unexpected_err: "Unexpected Error",
  parameter_missing: "Parameter Missing",
  parameter_wrong: "Parameter Wrong"
}

const DIFFICULTY_MAPPING = {
  "Easy": "EASY",
  "Medium": "MEDIUM",
  "Hard": "HARD"
}

export const getBoard = (difficulty) => {

  return new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: BASE_URL + "sudoku/initiate",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "crossorigin":true
      },
      data: {
        difficulty: DIFFICULTY_MAPPING[difficulty]
      }
    })
    .then((response) => {
      const {status, result} = response.data

      if(status === RESPONSE_STATUS.success) {
        resolve(result)
      } else {
        reject(result)
      }
    })
    .catch((err) => {
      reject(err)
    })

  })
}
