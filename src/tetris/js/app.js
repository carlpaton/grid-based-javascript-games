document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10;
    const displayWidth = 4;
    const displayIndex = 0;
    let nextRandom = 0;
    let score = 0;
    let timerId
    
    drawGrid();
    
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
            current = theTetrominoes[random][currentRotation];
            currentPosition = 4;

            draw();
            displayShape();
            addScore();
            gameOver();
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

     startButton.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        } else {
            draw();
            timerId = setInterval(moveDown, 1000);
            nextRandom = Math.floor(Math.random()*theTetrominoes.length);
            displayShape();
        }
     });

     function addScore() {
         for (let i = 0; i < 199; i += width) {
            const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

            if (row.every(index => squares[index].classList.contains('taken'))) {
                score += 10;
                scoreDisplay.innerHTML = score;
                row.forEach(index => {
                    squares[index].classList.remove('taken');
                    squares[index].classList.remove('tetromino');
                })
            }
            // const squaresRemoved = squares.splice(i, width);
            // console.log(squaresRemoved);
            // squares = squaresRemoved.concat(squares);
            // squares.forEach(cell => grid.appendChild(cell));
         }
     }

     function gameOver() {
         if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
             scoreDisplay.innerHTML = 'Game over';
             clearInterval(timerId);
         }
     }

     function drawGrid() {
         // first 200 squares
        for (let i = 0; i < 200; i += 1) {
            var square = document.createElement('div');
            const text = document.createTextNode(i);
            square.appendChild(text);
            grid.appendChild(square);   
        }   

        // taken squares
        for (let i = 0; i < 10; i += 1) {
            var square = document.createElement('div');
            square.className = "taken";
            grid.appendChild(square);   
        }         
     }
})
