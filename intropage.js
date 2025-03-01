document.addEventListener("DOMContentLoaded", () => {
    const introPage = document.querySelector(".menuInicial");
    const gamePage = document.querySelector("#game-container");
    const restartPage = document.querySelector("#restart-container");
    const restartMessage = document.getElementById("restart-message");
    const restartButton = document.getElementById("restart");
    const mazeContainer = document.getElementById("maze");
    const startButton = document.getElementById("start");
    const timeDisplay = document.getElementById("time");

    let playerPosition;
    let wavePosition;
    let currentMaze;
    let startTime;
    let timerInterval;

    const mazes = [
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
        ]
    ];

    function initializeGame() {
        let currentMazeIndex = Math.floor(Math.random() * mazes.length);
        currentMaze = JSON.parse(JSON.stringify(mazes[currentMazeIndex]));

        playerPosition = { x: 1, y: 8 };
        wavePosition = 9;
        startTime = Date.now();
    }

    function drawMaze() {
        mazeContainer.innerHTML = "";
        currentMaze.forEach((row, y) => {
            const tr = document.createElement("tr");
            row.forEach((cell, x) => {
                const td = document.createElement("td");

                if (cell === 1) td.classList.add("wall");
                if (cell === 2) td.classList.add("exit");
                if (y === playerPosition.y && x === playerPosition.x) td.classList.add("player");
                if (y >= wavePosition) td.classList.add("water");

                tr.appendChild(td);
            });
            mazeContainer.appendChild(tr);
        });

        checkGameOver();
    }

    function startWave() {
        setInterval(() => {
            if (wavePosition > 0) {
                wavePosition--;
                drawMaze();
            }
        }, 120000 / currentMaze.length);
    }

    function gameOver(message) {
        gamePage.style.display = "none";
        restartPage.style.display = "block";
        restartMessage.innerText = message;
    }

    startButton.addEventListener("click", () => {
        initializeGame();
        introPage.style.display = "none";
        gamePage.style.display = "block";
        drawMaze();
        startWave();
    });

    restartButton.addEventListener("click", () => location.reload());
});
