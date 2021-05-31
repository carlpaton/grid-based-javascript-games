document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const width = 10;

    // Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2,width*2+1, width*2+2]
    ];

    const theTetrominoes = [lTetromino];

    let currentPosition = 4; // starting point on the board
    let current = theTetrominoes[0][0];

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        })
    }

    function getRandomInt(max) {
console.log('max = ' + max);

let random = Math.random();
console.log('Math.random() = ' + random);

let randomTimesMax = random * max;
console.log('randomTimesMax = ' + randomTimesMax);

let mathFloor = Math.floor(randomTimesMax);
console.log('Math.floor(randomTimesMax) = ' + mathFloor);
      }

    let random = Math.floor(Math.random()*theTetrominoes.length);
    // console.log(random); 
    getRandomInt(3); 

    draw();
})
