import { WORDS } from './words.js'

//  Globals //
let CURRENT_ROW = 0
let CURRENT_BOX = 0

let solution = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(solution)

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
    row[CURRENT_ROW].getElementsByClassName('letter-box')[
      CURRENT_BOX
    ].innerHTML = name
    if (CURRENT_BOX < 4) {
      CURRENT_BOX++
    }
  } else if (code === 'Enter') {
    //console.log('enter')
    //check if the row is filled
    //true: then check if guess is correct
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
