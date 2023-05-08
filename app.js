// TODO try adding different tunes on start, eaten etc - refer to google's pacman doodle.
const grid = document.querySelector('.grid'),
  scoreDisplay = document.querySelector('#score'),
  startButton = document.getElementById('start-button'),
  pauseButton = document.getElementById('pause-button'),
  width = 28 // 28 * 28 = 784 squares
let score = 0;

// a grid with 784 squares
const layout = [
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
  1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
  1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
  1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
  1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
  1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

/**
 *    Key
 * 0 - pac-dot
 * 1 - wall
 * 3 - power-pellet
 * 4 - empty
 */

const squares = []

//draw the grid and render
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    const square = document.createElement('div')
    grid.appendChild(square)
    squares.push(square)
    //add styling to the divs on the board
    if (layout[i] === 0) {
      squares[i].classList.add('pac-dot')
      squares[i].innerHTML = '.'
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall')
    }else if(layout[i] === 2){
      squares[i].classList.add('ghost-lair')
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet')
    }
  }
}

createBoard()

function startGame() {
  startButton.removeEventListener('click', startGame)
  //move the Ghosts randomly
  //TODO try adding smart moves to the ghosts to find shortest route to pacman
  ghosts.forEach(ghost => moveGhost(ghost))
  document.addEventListener('keyup', movePacman)
}
startButton.addEventListener('click', startGame)
// pauseButton.removeEventListener('click', startGame)

//starting position of pac-man
let pacmanCurrentIndex = 490
squares[pacmanCurrentIndex].classList.add('pac-man')
squares[pacmanCurrentIndex].classList.add('pac-man-right')

function removePacman() {
  squares[pacmanCurrentIndex].classList.remove('pac-man')
  squares[pacmanCurrentIndex].classList.remove('pac-man-right')
  squares[pacmanCurrentIndex].classList.remove('pac-man-left')
  squares[pacmanCurrentIndex].classList.remove('pac-man-down')
  squares[pacmanCurrentIndex].classList.remove('pac-man-up')
}


function goLeft(){
  if (!squares[pacmanCurrentIndex - 1].classList.contains('wall') && !squares[pacmanCurrentIndex - 1].classList.contains('ghost-lair')) {
    removePacman()
    pacmanCurrentIndex -= 1
    //if pacman is in the left exit
    if((pacmanCurrentIndex - 1) === 363) pacmanCurrentIndex = 391
    
  }
  squares[pacmanCurrentIndex].classList.add('pac-man-left')
}

function goUp(){
  if (!squares[pacmanCurrentIndex - width].classList.contains('wall') && !squares[pacmanCurrentIndex - width].classList.contains('ghost-lair')) {
    removePacman()
    pacmanCurrentIndex -= width
  }
  squares[pacmanCurrentIndex].classList.add('pac-man-up')
}

function goRight(){
  if (!squares[pacmanCurrentIndex + 1].classList.contains('wall') && !squares[pacmanCurrentIndex + 1].classList.contains('ghost-lair')){
    removePacman()
    pacmanCurrentIndex += 1
    //pacman is in the right exit
    if((pacmanCurrentIndex + 1) === 392) pacmanCurrentIndex = 364
  }
  squares[pacmanCurrentIndex].classList.add('pac-man-right')  
}

function goDown(){
  if (!squares[pacmanCurrentIndex + width].classList.contains('wall') && !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair')){
    removePacman()
    pacmanCurrentIndex += width        
  }
  squares[pacmanCurrentIndex].classList.add('pac-man-down')

}

function movePacman(e) {
  //remove pacman from square you are currently in
  squares[pacmanCurrentIndex].classList.remove('pac-man')

  switch (e.key) {
    case 'ArrowLeft':
        goLeft()
      break
      case 'ArrowUp':
        goUp()      
      break
    case 'ArrowRight':
        goRight()
      break
    case 'ArrowDown':
      goDown()
      break
  }

  squares[pacmanCurrentIndex].classList.add('pac-man')

  pacDotEaten()
  powerPelletEaten()
  checkForWin()
}


function pacDotEaten(){
  if(squares[pacmanCurrentIndex].classList.contains('pac-dot')){
    score++
    scoreDisplay.innerHTML = score
    squares[pacmanCurrentIndex].classList.remove('pac-dot')
    squares[pacmanCurrentIndex].innerHTML = ''
  }
}

//when pacman eats a power-pellet
function powerPelletEaten(){
  if(squares[pacmanCurrentIndex].classList.contains('power-pellet')){
    score += 10
    ghosts.forEach(ghost => ghost.isScared = true)
    setTimeout(unScareGhosts, 10000)
    squares[pacmanCurrentIndex].classList.remove('power-pellet')
  }
}

//make the ghosts stop appearing as aquamarine (scared)
function unScareGhosts(){
  ghosts.forEach(ghost => ghost.isScared = false)
}

// Ghost template - speed(milliseconds)
class Ghost{
  constructor(className, startIndex, speed){
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed
    this.currentIndex = startIndex
    this.timerId = NaN
    this.isScared = false
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]

//draw ghosts onto the grid
ghosts.forEach(ghost => {
  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
})


function moveGhost(ghost){
  //left, right, up, down
  const directions = [-1, +1, width, -width]
  let direction =  directions[Math.floor(Math.random() * directions.length)]

  ghost.timerId = setInterval(()=>{
    //if next square your ghost is going to go in does not contain a wall & ghost, you can go there
    if(!squares[ghost.currentIndex + direction].classList.contains('wall') && !squares[ghost.currentIndex + direction].classList.contains('ghost')){
      //remove ghost related classes
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      //change the currentIndex to the new safe square - move into that space
      ghost.currentIndex +=  direction
      //redraw the ghost in the new space
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')


      //else find a new direction to try
    }else direction = directions[Math.floor(Math.random() * directions.length)]

    //ghost is currently scared
    if(ghost.isScared) squares[ghost.currentIndex].classList.add('scared-ghost')

    //ghost's scared and pacman runs into it
    if(ghost.isScared && (squares[ghost.currentIndex].classList.contains('pac-man') && squares[ghost.currentIndex] === squares[pacmanCurrentIndex]) ){
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score += 100
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
  }

  checkForGameOver()

  }, ghost.speed)

}


function checkForGameOver(){
  if(squares[pacmanCurrentIndex].classList.contains('ghost') && !squares[pacmanCurrentIndex].classList.contains('scared-ghost')){
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    scoreDisplay.innerHTML = 'GAME OVER'
    startButton.innerHTML = 'Restart'
  }

  reloadPage()
}


function checkForWin(){
  if(score >= 500){
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    document.removeEventListener('keyup', movePacman)
    scoreDisplay.innerHTML = 'YOU WON'
    startButton.innerHTML = 'Restart'
  } 

  reloadPage()  
}

function reloadPage(){
  if(startButton.innerHTML === 'Restart'){
    startButton.addEventListener('click', ()=>{
      location.reload()
    })
  }
}

// Alan AI voice command functionality
let alanBtnInstance = alanBtn({
  key: "7c089475438648f356eeec80748bd72b2e956eca572e1d8b807a3e2338fdd0dc/stage",
  onCommand: (commandData) => {
    if (commandData.command === 'start') startGame()
    if (commandData.command === 'go-left') goLeft()
    if (commandData.command === 'go-right') goRight()
    if (commandData.command === 'go-down') goDown()
    if (commandData.command === 'go-up') goUp()
  },
  rootEl: document.getElementById("alan-btn"),
});