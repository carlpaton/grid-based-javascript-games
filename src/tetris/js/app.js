document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10;
    
    let squares = Array.from(document.querySelectorAll('.grid div'));

    // Tetrominoes
    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2,width*2+1, width*2+2]
    ];

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ];    

    const theTetrominoes = [lTetromino, zTetromino];

    let currentPosition = 4; // starting point on the board
    let currentRotation = 0;
    let random = Math.floor(Math.random() * theTetrominoes.length);
    //console.log('random = ' + random); 

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

    timerId = setInterval(moveDown, 500);

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
            random = Math.floor(Math.random() * theTetrominoes.length);
            console.log('random = ' + random); 
            console.log('currentRotation = ' + currentRotation); 

            current = theTetrominoes[random][currentRotation];
            console.log('current = ' + current);
            console.log('currentPosition = ' + currentPosition);
            currentPosition = 4;


            draw();
        }
    }
})
