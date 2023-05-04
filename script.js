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
    row.className = `row`
    for (let j = 0; j < 5; j++) {
      let letterBox = document.createElement('div')
      //make 5 containers in the row (flex)
      letterBox.className = `letter-box`
      row.appendChild(letterBox)
    }
    gameBoardDiv.append(row)
  }
  let h1 = document.createElement('h1')
  document.body.prepend(h1)
  h1.innerText = 'Wordle Clone'
}
initGameBoard()

const keyboardPressed = (e) => {
  console.log(e)
  let name = e.key
  console.log(name.toUpperCase())
  let code = e.keyCode
  console.log(`Key pressed: ${name} \r\nKey code value: ${code}`)

  let row = document.getElementsByClassName('row')
  console.log(
    row[CURRENT_ROW].getElementsByClassName('letter-box')[CURRENT_BOX]
  )

  //if key pressed was a letter or the enter key
  if (code >= 65 && code <= 122) {
    // enter letter pressed .toUppercase
    console.log(`1 CURRENT_BOX: ${CURRENT_BOX}`)
    row[CURRENT_ROW].getElementsByClassName('letter-box')[
      CURRENT_BOX
    ].innerHTML = name
    CURRENT_BOX++
    console.log(`2 CURRENT_BOX: ${CURRENT_BOX}`)
    if (CURRENT_BOX > 4) {
      CURRENT_BOX--
    }
    console.log(`3 CURRENT_BOX: ${CURRENT_BOX}`)
    //if enter is pressed
  } else if (code === 13) {
    if (CURRENT_BOX === 4) {
      if (CURRENT_GUESS === SOLUTION) {
        alert(`Correct! The word is ${SOLUTION}`)
      }
    } else console.log('not full')
    //if backspace is pressed
  } else if (code === 8) {
    //if empty: current box--
    if (
      row[CURRENT_ROW].getElementsByClassName('letter-box')[CURRENT_BOX]
        .innerHTML === ''
    ) {
    } else {
      if (CURRENT_BOX > 0) {
        CURRENT_BOX--
      }
      row[CURRENT_ROW].getElementsByClassName('letter-box')[CURRENT_BOX]
        .innerHTML === ''
    }
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
