class Maze {
    constructor(mazeContainer, mazes) {
        this.mazeContainer = mazeContainer;
        this.mazes = mazes;
        this.currentMaze = [];
        this.playerPosition = { x: 1, y: 7 };
        this.wavePosition = 9;
        this.timerInterval = null;
        this.startTime = null;
    }

    initializeGame() {
        let currentMazeIndex = Math.floor(Math.random() * this.mazes.length);
        this.currentMaze = JSON.parse(JSON.stringify(this.mazes[currentMazeIndex]));
        this.playerPosition = { x: 1, y: 7 };
        this.wavePosition = this.currentMaze.length;
        this.startTime = Date.now();
        this.drawMaze();
        this.startWave();
    }

    drawMaze() {
        this.mazeContainer.innerHTML = "";
        this.currentMaze.forEach((row, y) => {
            const tr = document.createElement("tr");
            row.forEach((cell, x) => {
                const td = document.createElement("td");
                if (cell === 1) td.classList.add("wall");
                if (cell === 2) td.classList.add("exit");
                if (y === this.playerPosition.y && x === this.playerPosition.x) td.classList.add("player");
                if (y >= this.wavePosition) td.classList.add("water");
                tr.appendChild(td);
            });
            this.mazeContainer.appendChild(tr);
        });
        this.checkGameOver();
    }

    startWave() {
        this.timerInterval = setInterval(() => {
            if (this.wavePosition > 0) {
                this.wavePosition--;
                this.drawMaze();
            }
        }, 60000 / this.currentMaze.length);
    }

    movePlayer(dx, dy) {
        let newX = this.playerPosition.x + dx;
        let newY = this.playerPosition.y + dy;

        if (
            newX >= 0 &&
            newX < this.currentMaze[0].length &&
            newY >= 0 &&
            newY < this.currentMaze.length &&
            this.currentMaze[newY][newX] !== 1
        ) {
            this.playerPosition = { x: newX, y: newY };
            this.drawMaze();
        }
    }

    checkGameOver() {
        if (this.currentMaze[this.playerPosition.y][this.playerPosition.x] === 2) {
            clearInterval(this.timerInterval);
            this.gameOver(true);
        }
        if (this.playerPosition.y >= this.wavePosition) {
            clearInterval(this.timerInterval);
            this.gameOver(false);
        }
    }

    gameOver(won) {
        document.getElementById("game-container").style.display = "none";
        document.getElementById("restart-container").style.display = "block";
        document.getElementById("restart-message").innerText = won
            ? `You escaped in ${Math.floor((Date.now() - this.startTime) / 1000)} seconds!`
            : "You drowned!";
    }
}

// Integração com o código existente
document.addEventListener("DOMContentLoaded", () => {
    const mazeContainer = document.getElementById("maze");
    const mazes = [
        //maze 1
        [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,2],
            [1,1,1,0,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,1,0,1],
            [1,0,1,1,1,1,0,1,0,1],
            [1,0,1,0,0,0,0,1,0,1],
            [1,0,1,1,1,1,0,1,0,1],
            [1,0,0,1,0,0,0,1,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ],
        //maze 2
        [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,2],
            [1,1,1,0,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,1,0,1],
            [1,0,1,1,1,1,0,1,0,1],
            [1,0,1,0,0,0,0,1,0,1],
            [1,0,1,1,1,1,0,1,0,1],
            [1,0,0,1,0,0,0,1,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ],
        //maze 3
        [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,2],
            [1,1,1,0,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,1,0,1],
            [1,0,1,1,1,1,0,1,0,1],
            [1,0,1,0,0,0,0,1,0,1],
            [1,0,1,1,1,1,0,1,0,1],
            [1,0,0,1,0,0,0,1,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ],
        //maze 4
        [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,2],
            [1,1,1,0,1,1,1,1,0,1],
            [1,0,0,0,0,0,0,1,0,1],
            [1,0,1,1,1,1,0,1,0,1],
            [1,0,1,0,0,0,0,1,0,1],
            [1,0,1,1,1,1,0,1,0,1],
            [1,0,0,1,0,0,0,1,0,1],
            [1,1,1,1,1,1,1,1,1,1]
        ],
    ];

    const game = new Maze(mazeContainer, mazes);

    document.getElementById("start").addEventListener("click", () => {
    document.getElementById("restart").addEventListener("click", () => {
        window.location.href = "index.html";
    });
        document.querySelector(".menuInicial").style.display = "none";
        document.getElementById("game-container").style.display = "block";
        game.initializeGame();
    });

    document.querySelectorAll(".controls button").forEach(button => {
        button.addEventListener("click", (e) => {
            const directions = { "up": [0, -1], "down": [0, 1], "left": [-1, 0], "right": [1, 0] };
            game.movePlayer(...directions[e.target.id]);
        });
    });

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp": game.movePlayer(0, -1); break;
            case "ArrowDown": game.movePlayer(0, 1); break;
            case "ArrowLeft": game.movePlayer(-1, 0); break;
            case "ArrowRight": game.movePlayer(1, 0); break;
        }
    });
});
