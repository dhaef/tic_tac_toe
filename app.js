const game = (() => {
    let board = ['','','','','','','','',''];
    let identifer = 'X';
    let turns = 0;
    let boardState = false;

    const boardToDisplay = () => {
        const squares = Array.from(document.querySelectorAll('.square'));
        squares.forEach((square) => {
            board.forEach((item, index) => {
                if (square.dataset.square == index) {
                    square.textContent = item;
                }
            })
        })
    }

    const addClickToArray = (id) => {
        if(boardState === false) {
            if(board[id] === ''){
                board[id] = identifer;
                boardToDisplay();
                changeIdentifer();
                turns++;
                if(turns >= 5) {
                    checkWinner();
                }
            }
        } else {
            alert('Click restart to play again')
        }
    }

    const changeIdentifer = () => {
        if(identifer === 'X') {
            identifer = 'O';
        } else if (identifer === 'O') {
            identifer = 'X';
        }
    }

    const checkWinner = () => {
        let options = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        options.forEach(op => {
            if(checkMatch(board[op[0]], board[op[1]], board[op[2]]) === true) {
                displayController.showWinner(board[op[0]]);
                boardState = true;
            } else if(turns === 9 && checkMatch(board[op[0]], board[op[1]], board[op[2]]) === false) {
                displayController.showWinner(null);
            }
        })
    }

    const checkMatch = (a,b,c) => {
        if(a === b && b === c && a != '' && b != '' && c != '') {
            return true;
        } else {
            return false;
        }
    }

    const restartGame = () => {
        board = ['','','','','','','','',''];
        turns = 0;
        document.getElementById('winner').textContent = '';
        boardToDisplay();
        boardState = false;
    }

    //for testing
    //let showBoard = () => board;
    return { boardToDisplay, addClickToArray, restartGame }
})();

const displayController = (() => {
    //game.boardToDisplay();

    const showWinner = (winner) => {
        console.log(winner, player1.getId(), player2.getId())
        const UIwinner = document.getElementById('winner');
        if(winner === player1.getId()) {
            UIwinner.textContent = `${player1.getName()} is the winner!`;
        } else if (winner === player2.getId()) {
            UIwinner.textContent = `${player2.getName()} is the winner!`;
        } else {
            UIwinner.textContent = "It's a tie";
        }
    }

    // EVENT LISTENERS

    const squares = Array.from(document.querySelectorAll('.square'));
    squares.forEach(square => {
        square.addEventListener('click', (e) => {
            if(win === false) {
                game.addClickToArray(e.target.dataset.square);
            } else if (win === true) {
                alert('Click restart to play again')
            }
        })
    })

    const container = document.getElementById('container');
    container.style.height = window.innerHeight + 'px';
    container.style.width = window.innerWidth + 'px';

    const restart = document.getElementById('restart');
    restart.addEventListener('click', () => game.restartGame());

    const reload = document.getElementById('reload');
    reload.addEventListener('click', () => location.reload());


    let player1, player2;

    const submitInfo = document.getElementById('getInfo');
    submitInfo.addEventListener('click', () => {
        const nameOne = document.getElementById('nameOne'),
            identiferOne = document.getElementById('identiferOne'),
            nameTwo = document.getElementById('nameTwo'),
            identiferTwo = document.getElementById('identiferTwo');

        if (identiferOne.value === identiferTwo.value) {
            alert('Please pick separate operators!');
            identiferOne.value = 'X';
            identiferTwo.value = 'O';
        } else if (nameOne.value === '' || nameTwo.value === '') {
            alert('Please enter player names!')
        } else {
            player1 = Player(nameOne.value, identiferOne.value);
            player2 = Player(nameTwo.value, identiferTwo.value);

            document.getElementById('player1').textContent = `${player1.getName()} is ${player1.getId()}`;
            document.getElementById('player2').textContent = `${player2.getName()} is ${player2.getId()}`;

            document.getElementById('display').style.display = 'grid';
            restart.style.display = 'block';
            reload.style.display = 'block';
            submitInfo.style.display = 'none';
            nameOne.style.display = 'none';
            nameTwo.style.display = 'none';
            identiferOne.style.display = 'none';
            identiferTwo.style.display = 'none';
            const labels = Array.from(document.querySelectorAll('label'));
            labels.forEach(label => {
                label.style.display = 'none';
            })
        }
        
    })

    return { showWinner }
})();

const Player = (name, identifer) => {
    const getName = () => name;
    const getId = () => identifer;
    return { getName, getId };
} 

// Winners = [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]