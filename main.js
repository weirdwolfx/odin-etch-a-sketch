// return random integer from 0 to n
function random(n) {
    return Math.floor(Math.random() * (n + 1));
}

// return a random color
function getRandomColor() {
    return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
}

const squarePerSide = 16;

const squareContainer = document.querySelector('.container');
const randomColorPen = document.querySelector('#random');
const darkenColorPen = document.querySelector('#darken');

function makeGrid() {
    for (let i = 0; i < squarePerSide * squarePerSide; i++) {
        const squareGrid = document.createElement("div");
        squareGrid.classList.add("square")

        squareGrid.style.width = `${100 / squarePerSide}%`;
        squareGrid.style.height = `${100 / squarePerSide}%`;

        squareContainer.appendChild(squareGrid);
    }
}

makeGrid();

