import { WORDS } from './words.js'

//  Globals //
let CURRENT_ROW = 0
let CURRENT_BOX = 0
let CURRENT_GUESS = ''
let SOLUTION = WORDS[Math.floor(Math.random() * WORDS.length)]
console.log(SOLUTION)
let GAME_OVER = false

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
    //console.log('guess: ' + CURRENT_GUESS)

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
    //console.log('guess: ' + CURRENT_GUESS)
  } else if (CURRENT_BOX === 4 && boxText != '') {
    box.innerHTML = ''
    box.style.border = '2px solid var(--light-grey)'
    CURRENT_GUESS = CURRENT_GUESS.slice(0, -1)
    //console.log('guess: ' + CURRENT_GUESS)
  }
}

const recolorKeyboard = (letter, color) => {
  //find box in keyboard with the letter of letter
  for (const button of document.querySelectorAll('button')) {
    if (button.textContent.includes(`${letter}`)) {
      console.log(button.textContent)
      button.style.backgroundColor = color
      button.style.color = 'white'
    }
  }
}

const doesSolutionShareLettersWithGuess = (row) => {
  //set current-box to zero and then increment with very loop
  for (let i = 0; i < 5; i++) {
    //console.log(CURRENT_GUESS[i])
    //make text white
    let box = row[0].childNodes[i]
    box.style.color = 'white'
    if (SOLUTION.includes(CURRENT_GUESS[i])) {
      console.log('contained')
      //make background yellow
      box.style.backgroundColor = 'var(--yellow)'
      box.style.border = '2px solid var(--yellow)'

      //do the same for the visual keyboard
      console.log('lkjengflknmsdlfk' + box.innerHTML)
      recolorKeyboard(box.innerHTML, 'var(--yellow)')
    } else {
      //make background grey
      box.style.backgroundColor = 'var(--dark-grey)'
      box.style.border = '2px solid var(--dark-grey)'
      recolorKeyboard(box.innerHTML, 'var(--dark-grey)')
    }
  }
}

const doesGuessHaveAnyCorrectLetterPlacements = (row) => {
  for (let i = 0; i < 5; i++) {
    if (CURRENT_GUESS[i] === SOLUTION[i]) {
      //set box i to green
      let box = row[0].childNodes[i]
      box.style.backgroundColor = 'var(--green)'
      box.style.border = '2px solid var(--green)'
      recolorKeyboard(box.innerHTML, 'var(--green)')
    }
  }
}

const anyReapeatLetters = (str) => {
  //this is a regex expression I don't totally understand
  return /(.).*\1/.test(str)
}

const correctlyColorRepeatLetters = (repeatsNum, letterOfIntrest) => {
  let indexOfFirst = SOLUTION.indexOf(letterOfIntrest)
  console.log(`indexOfFirst: ${indexOfFirst}`)
  //color correct plaements green
  for (let i = 0; i < repeatsNum; i++) {
    if (
      SOLUTION[SOLUTION.indexOf(letterOfIntrest, indexOfFirst + i)] ===
      CURRENT_GUESS[SOLUTION.indexOf(letterOfIntrest, indexOfFirst + i)]
    ) {
      console.log(
        `SOLUTION: ${
          SOLUTION[SOLUTION.indexOf(letterOfIntrest, indexOfFirst + i)]
        }`
      )
      console.log(
        `GUESS: ${
          CURRENT_GUESS[SOLUTION.indexOf(letterOfIntrest, indexOfFirst + i)]
        }`
      )
      //turn guess to green
      //repeatsNum--
      console.log('turn green')
      repeatsNum--
    }
  }
  //color incorrect placements yellow
  let counter = 0
  while (repeatsNum > 0 && counter < 5) {
    console.log(`Number ${counter} time in while loops`)
    counter++
  }
}

const doesSolutionShareDupeLettersWithGuess = () => {
  //no: leave, do nothing
  //yes: how many times is that letter in SOLUTION? = counter
  let repeatsNum = 2 //for now
  let letterOfIntrest = 'a' //for now
  correctlyColorRepeatLetters(repeatsNum, letterOfIntrest)
}

const enterPressed = () => {
  let row = document.getElementsByClassName(`row-${CURRENT_ROW}`)
  let box = row[0].childNodes[CURRENT_BOX]
  let boxText = box.innerText

  if (CURRENT_BOX === 4 && boxText != '') {
    if (CURRENT_GUESS === SOLUTION) {
      console.log('pog')
      alert('YOU WIN!~!!!!@!@!!@!!@')
      //write win function
    } else {
      console.log('wrong')
      doesSolutionShareLettersWithGuess(row)
      doesGuessHaveAnyCorrectLetterPlacements(row)
      if (anyReapeatLetters(CURRENT_GUESS)) {
        //if you're here the guess has duplicate letters
        console.log('dupe')
        doesSolutionShareDupeLettersWithGuess()
      }
      //if current row is the last -> game over
      //else move to next row down
      //empty current guess and current box
      if (CURRENT_ROW != 5) {
        CURRENT_ROW++
        CURRENT_BOX = 0
        CURRENT_GUESS = ''
      } else {
        //game over, cause all rows used
        console.log('game over')
        GAME_OVER = true
      }
    }
  } else {
    alert('needs more letters')
  }
}

const isGuessInWordsList = () => {
  if (WORDS.includes(CURRENT_GUESS)) {
    return true
  } else {
    alert('Word not in list')
  }
}

const keyboardPressed = (e) => {
  let key = e.key
  let code = e.keyCode
  //console.log(key, code)

  if (code >= 65 && code <= 122) {
    letterPressed(key)
  } else if (code === 8) {
    backspacePressed()
  } else if (code === 13) {
    if (isGuessInWordsList()) {
      enterPressed()
    }
  }
}

// Listeners //
document.addEventListener(
  'keydown',
  (event) => {
    keyboardPressed(event)
    if (GAME_OVER) {
      alert(`Game Over. The correct word was '${SOLUTION.toUpperCase()}'`)
    }
  },
  false
)
