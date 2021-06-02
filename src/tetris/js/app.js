document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10;
    const displayWidth = 4;
    let displayIndex = 0;
    let nextRandom = 0;
    
    let squares = Array.from(document.querySelectorAll('.grid div'));
    let displaySquares = Array.from(document.querySelectorAll('.mini-grid div'));

    // Tetrominoes
    const lTetromino = [
        [1, 2, 11, 21],
        [10, 11, 12, 22],
        [1, 11, 20, 21],
        [10, 20, 21, 22]
    ];

    const zTetromino = [
        [0, 10, 11, 21],
        [11, 12, 20, 21],
        [0, 10, 11, 21],
        [11, 12, 20, 21]
    ];    

    const tTetromino = [
        [1, 10, 11, 12],
        [1, 11, 12, 21],
        [10, 11, 12, 21],
        [1, 10, 11, 21]
    ]; 

    const oTetromino = [
        [0, 1, 10, 11],
        [0, 1, 10, 11],
        [0, 1, 10, 11],
        [0, 1, 10, 11]
    ]; 

    const iTetromino = [
        [1, 11, 21, 31],
        [10, 11, 12, 13],
        [1, 11, 21, 31],
        [10, 11, 12, 13]
    ];     

    const theTetrominoes = [
        lTetromino, 
        zTetromino, 
        tTetromino, 
        oTetromino,
        iTetromino
    ];

    const upNextTetrominoes = [
        [1, 2, 5, 9],
        [1, 4, 5, 9],
        [1, 4, 5, 6],
        [0, 1, 4, 5],
        [1, 5, 9, 13],
    ];

    let currentPosition = 4; // starting point on the board
    let currentRotation = 0;
    let random = Math.floor(Math.random() * theTetrominoes.length);

    let current = theTetrominoes[random][currentRotation];


    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
            //console.log('draw index = ' + index);
        });
    };

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino');
            //console.log('undraw index = ' + index);            
        });
    };

    timerId = setInterval(moveDown, 1000);

    function control(e) {
        if (e.keyCode === 37) { 
            moveLeft()
        } else if (e.keyCode === 38) { 
            rotate();
        } else if (e.keyCode === 39) { 
            moveRight();
        } else if (e.keyCode === 40) { 
            moveDown();
        }
    }

    document.addEventListener('keyup', control);

    function moveDown() {
        undraw();
        currentPosition += width;
        draw();
        freeze();
    }

    function freeze() {
        if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentPosition + index].classList.add('taken'));
            
            // let a new tetromino fall
            random = nextRandom;
            nextRandom = Math.floor(Math.random() * theTetrominoes.length);
            console.log('random = ' + random); 
            console.log('currentRotation = ' + currentRotation); 

            current = theTetrominoes[random][currentRotation];
            console.log('current = ' + current);
            console.log('currentPosition = ' + currentPosition);
            currentPosition = 4;

            draw();
            displayShape();
        }
    }

    function moveLeft() {
        undraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
        if (!isAtLeftEdge) currentPosition -=1;

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition +=1;
        }

        draw();
    }

    function moveRight() {
        undraw();
        const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1);
        if (!isAtRightEdge) currentPosition +=1; 

        if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
            currentPosition -=1;
        }

        draw();
     }

     function rotate() {
        undraw();
         
        currentRotation++;
        if (currentRotation === current.length) {
            currentRotation = 0;
        }  

        current = theTetrominoes[random][currentRotation];

        draw();
     }

     function displayShape() {
         displaySquares.forEach(index => {
            index.classList.remove('tetromino');
         });
         upNextTetrominoes[nextRandom].forEach(index => {
             displaySquares[displayIndex + index].classList.add('tetromino');
         });
     }
})
