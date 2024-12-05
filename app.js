"use strict";
class Board {
    constructor(boardElement, statusElement, currentPlayerLogo) {
        this.board = Array.apply(null, Array(9)).map(() => ''); // Inicializa el array con strings vacíos
        this.currentPlayer = 'BMW'; // Cambia a 'BMW' para representar al jugador 1
        this.isGameOver = false; // Inicializa el estado del juego como activo
        this.boardElement = boardElement; // Asigna el elemento del tablero
        this.statusElement = statusElement; // Asigna el elemento del estado
        this.currentPlayerLogo = currentPlayerLogo; // Asigna el elemento del logo del jugador
    }
    // Inicializa el tablero de juego
    initGame() {
        this.boardElement.innerHTML = ''; // Limpia el contenido anterior del tablero
        this.board.forEach((_, index) => {
            const cell = document.createElement('div'); // Crea un nuevo elemento para cada celda
            cell.classList.add('cell'); // Añade la clase 'cell' al elemento
            cell.dataset.index = index.toString(); // Almacena el índice de la celda en un atributo de datos
            cell.addEventListener('click', (event) => this.handleCellClick(event)); // Agrega un listener de clic a la celda
            this.boardElement.appendChild(cell); // Añade la celda al tablero
        });
        this.updateStatus(); // Actualiza el estado del juego
    }
    // Maneja el clic en una celda del tablero
    handleCellClick(event) {
        const target = event.target; // Obtiene el elemento objetivo del evento
        const index = parseInt(target.dataset.index, 10); // Obtiene el índice de la celda desde el atributo de datos
        // Si la celda ya fue seleccionada o el juego ha terminado, no hacer nada
        if (this.board[index] != '' || this.isGameOver)
            return;
        // Actualiza la celda con el logo del jugador actual
        const logoUrl = this.currentPlayer === 'BMW' ? './imgs/bmwlogo.png' : './imgs/mercedeslogo.png';
        target.innerHTML = `<img src="${logoUrl}" alt="${this.currentPlayer}" style="width: 100px; height: 100px;">`; // Muestra el logo en la celda
        this.board[index] = this.currentPlayer; // Actualiza el estado del tablero
        // Verifica si hay un ganador o empate
        if (this.checkWinner()) {
            this.isGameOver = true; // Marca el juego como terminado    
            this.statusElement.textContent = `¡${this.currentPlayer} gana!`; // Muestra el mensaje de victoria
        }
        else if (this.board.every(cell => cell !== '')) {
            this.isGameOver = true; // Marca el juego como terminado
            this.statusElement.textContent = '¡Empate!'; // Muestra el mensaje de empate
        }
        else {
            // Cambia de jugador
            this.currentPlayer = this.currentPlayer === 'BMW' ? 'Mercedes' : 'BMW'; // Alterna entre los jugadores
            this.updateStatus(); // Actualiza el estado del juego
        }
    }
    // Actualiza el estado de quién es el siguiente en jugar
    updateStatus() {
        const logoUrl = this.currentPlayer === 'BMW' ? './imgs/bmwlogo.png' : './imgs/mercedeslogo.png'; // Determina el logo del jugador actual
        this.currentPlayerLogo.setAttribute('src', logoUrl); // Actualiza la imagen del logo del jugador
        this.statusElement.innerHTML = `Turno del jugador: <img src="${logoUrl}" alt="Turno" class="status-logo">`; // Muestra la imagen del jugador en la barra de estado
    }
    // Verifica si hay un ganador
    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], // Combinaciones para ganar en filas
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6], // Combinaciones para ganar en columnas
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], // Combinaciones para ganar en diagonales
            [2, 4, 6]
        ];
        return winningCombinations.some(combo => {
            const [a, b, c] = combo; // Desestructura la combinación ganadora
            return (this.board[a] && // Verifica que el primer elemento no esté vacío
                this.board[a] === this.board[b] && // Verifica que los tres elementos sean iguales
                this.board[a] === this.board[c]);
        });
    }
    // Reinicia el juego
    resetGame() {
        this.board = Array.apply(null, Array(9)).map(() => ''); // Reinicia el array
        this.currentPlayer = 'BMW'; // Reinicia al jugador 1
        this.isGameOver = false; // Marca el juego como activo
        this.updateBoard(); // Actualiza el tablero visualmente
        this.updateStatus(); // Actualiza el estado del juego
    }
    // Actualiza el contenido del tablero visualmente
    updateBoard() {
        const cells = this.boardElement.querySelectorAll('.cell'); // Selecciona todas las celdas
        cells.forEach((cell) => {
            cell.innerHTML = ''; // Limpia las celdas al reiniciar
        });
    }
}
// Inicializa el juego cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board'); // Obtiene el elemento del tablero
    const statusElement = document.getElementById('status'); // Obtiene el elemento del estado
    const currentPlayerLogo = document.getElementById('currentPlayerLogo'); // Obtiene el elemento del logo del jugador
    const resetButton = document.getElementById('reset'); // Obtiene el botón de reiniciar
    const exitButton = document.getElementById('exit'); // Obtiene el botón de salir
    const gameBoard = new Board(boardElement, statusElement, currentPlayerLogo); // Crea una nueva instancia del tablero
    gameBoard.initGame(); // Inicializa el juego
    resetButton.addEventListener('click', () => gameBoard.resetGame()); // Asocia el evento de reiniciar el juego
    exitButton.addEventListener('click', () => {
        window.close(); // Intenta cerrar la pestaña
    });
});
