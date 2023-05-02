import { WORDS } from './words.js'

//  Globals //
let CURRENT_ROW = 0

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
  var name = e.key
  var code = e.code
  console.log(`Key pressed: ${name} \r\nKey code value: ${code}`)

  let row = document.getElementsByClassName('row')
  console.log(row[CURRENT_ROW])
}

// Listeners //
document.addEventListener(
  'keydown',
  (event) => {
    keyboardPressed(event)
  },
  false
)
