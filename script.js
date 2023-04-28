import { WORDS } from './words.js'

let solution = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(solution)

const initGameBoard = () => {
  //make "game-board-and-keyboard" flex
  let gameBoardAndKeyboardDiv = document.createElement('div')
  gameBoardAndKeyboardDiv.className = 'game-board-and-keyboard'
  document.body.appendChild(gameBoardAndKeyboardDiv)
  //make "game-board-Container" flex
  let gameBoardContainerDiv = document.createElement('div')
  gameBoardContainerDiv.className = 'game-board-Container'
  gameBoardAndKeyboardDiv.appendChild(gameBoardContainerDiv)
  //make "game-board" grid

  for (let i = 0; i < 6; i++) {
    //make a new row (grid)
    for (let j = 0; j < 5; j++) {
      //make 5 containers in the row (flex)
    }
  }
}
initGameBoard()
