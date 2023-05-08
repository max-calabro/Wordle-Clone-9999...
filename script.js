import { WORDS } from './words.js'

//  Globals //
let CURRENT_ROW = 0
let CURRENT_BOX = 0
let CURRENT_GUESS = ''
let SOLUTION = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(SOLUTION)

// Functions //

const initGameBoard = () => {
  //make "game-board-and-keyboard" flex
  let gameBoardAndKeyboardDiv = document.createElement('div')
  gameBoardAndKeyboardDiv.className = 'game-board-and-keyboard'
  document.body.prepend(gameBoardAndKeyboardDiv)
  //make "game-board-Container" flex
  let gameBoardContainerDiv = document.createElement('div')
  gameBoardContainerDiv.className = 'game-board-container'
  gameBoardAndKeyboardDiv.appendChild(gameBoardContainerDiv)
  //make "game-board" grid
  let gameBoardDiv = document.createElement('div')
  gameBoardDiv.className = 'game-board'
  gameBoardContainerDiv.appendChild(gameBoardDiv)

  for (let i = 0; i < 6; i++) {
    //make a new row (grid)
    let row = document.createElement('div')
    row.className = `row-${i}`
    for (let j = 0; j < 5; j++) {
      let letterBox = document.createElement('div')
      //make 5 containers in the row (flex)
      letterBox.className = `letter-box-${j}`
      row.appendChild(letterBox)
    }
    gameBoardDiv.append(row)
  }
  let h1 = document.createElement('h1')
  document.body.prepend(h1)
  h1.innerText = 'Wordle Clone'
}
initGameBoard()

const letterPressed = (key) => {
  let row = document.getElementsByClassName(`row-${CURRENT_ROW}`)
  let box = row[0].childNodes[CURRENT_BOX]
  let boxText = box.innerText

  if (boxText === '') {
    box.innerHTML = key.toUpperCase()
    CURRENT_GUESS += key
    box.style.border = '2px solid var(--dark-grey)'
    console.log('guess: ' + CURRENT_GUESS)

    //increment to next box
    CURRENT_BOX++
    if (CURRENT_BOX > 4) {
      CURRENT_BOX = 4
    }
  }
}

const backspacePressed = () => {
  let row = document.getElementsByClassName(`row-${CURRENT_ROW}`)
  let box = row[0].childNodes[CURRENT_BOX]
  let boxText = box.innerText
  if (CURRENT_BOX >= 1 && CURRENT_BOX <= 4 && boxText === '') {
    CURRENT_BOX--
    box = row[0].childNodes[CURRENT_BOX]
    box.innerHTML = ''
    box.style.border = '2px solid var(--light-grey)'
    CURRENT_GUESS = CURRENT_GUESS.slice(0, -1)
    console.log('guess: ' + CURRENT_GUESS)
  } else if (CURRENT_BOX === 4 && boxText != '') {
    box.innerHTML = ''
    box.style.border = '2px solid var(--light-grey)'
    CURRENT_GUESS = CURRENT_GUESS.slice(0, -1)
    console.log('guess: ' + CURRENT_GUESS)
  }
}

const doesSolutionShareLettersWithGuess = (row) => {
  //set current-box to zero and then increment with very loop
  for (let i = 0; i < 5; i++) {
    console.log(CURRENT_GUESS[i])
    //make text white
    let box = row[0].childNodes[i]
    box.style.color = 'white'
    if (SOLUTION.includes(CURRENT_GUESS[i])) {
      console.log('contained')
      //make background yellow
      box.style.backgroundColor = 'var(--yellow)'
      box.style.border = '2px solid var(--yellow)'
    } else {
      //make background grey
      box.style.backgroundColor = 'var(--dark-grey)'
      box.style.border = '2px solid var(--dark-grey)'
    }
  }
}

const enterPressed = () => {
  let row = document.getElementsByClassName(`row-${CURRENT_ROW}`)
  let box = row[0].childNodes[CURRENT_BOX]
  let boxText = box.innerText

  if (CURRENT_BOX === 4 && boxText != '') {
    if (CURRENT_GUESS === SOLUTION) {
      console.log('pog')
      //write win function
    } else {
      console.log('wrong')
      doesSolutionShareLettersWithGuess(row)
      //if current row is the last -> game over
      //else move to next row down
      //empty current guess and current box
      if (CURRENT_ROW != 5) {
        CURRENT_ROW++
        CURRENT_BOX = 0
        CURRENT_GUESS = ''
      } else {
        //game over, cause used all rows
        console.log('game over')
      }
    }
  } else {
    console.log('needs more letters')
  }
}

const keyboardPressed = (e) => {
  let key = e.key
  let code = e.keyCode
  console.log(key, code)

  if (code >= 65 && code <= 122) {
    letterPressed(key)
  } else if (code === 8) {
    backspacePressed()
  } else if (code === 13) {
    enterPressed()
  }
}

// Listeners //
document.addEventListener(
  'keydown',
  (event) => {
    keyboardPressed(event)
  },
  false
)
