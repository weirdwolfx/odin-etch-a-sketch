// return random integer from 0 to n
function random(n) {
    return Math.floor(Math.random() * (n + 1));
}


// return a random color
function getRandomColor() {
    return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
}


const squarePerSide = 16; // number of squares per side
const pauseKey = 'p'; // key to press to enable/disable pen
const darkenIndex = 0.1; // factor by which you want to darken grid squares

const squareContainer = document.querySelector('.container');
const colorPallete = document.querySelector('.color-choices');
const randomColorPen = document.querySelector('#random');
const darkenColorPen = document.querySelector('#darken');


// form a grid of side length = squarePerSide
function makeGrid() {
    for (let i = 0; i < squarePerSide * squarePerSide; i++) {
        const squareGrid = document.createElement("div");
        squareGrid.classList.add("square")

        squareGrid.style.width = `${100 / squarePerSide}%`;
        squareGrid.style.height = `${100 / squarePerSide}%`;

        squareContainer.appendChild(squareGrid);
    }
}


// allow the user to draw on the grid
function enablePen() {
    squareContainer.addEventListener('mouseover', changeBoxColor);
    document.body.style.cursor = "url(./images/paintbrush.png) 4 28, default";
}


function disablePen() {
    squareContainer.removeEventListener('mouseover', changeBoxColor);
    document.body.style.cursor = "default";
}


// allows user to pause/disable the pen by pressing the key 'p'
function togglePen(e) {
    if (e.key != pauseKey) return;

    // if pen is enabled, grid has an attribute of 'pen'
    if (squareContainer.hasAttribute('pen')) {
        disablePen();
    }
    else {
        enablePen();
    }

    // if pen was disabled, it will remove the attribute 'pen'...else it will add it
    squareContainer.toggleAttribute('pen');
}


document.addEventListener('keypress', togglePen);
colorPallete.addEventListener('click', setPenColor);


// default pen color
let penColor = 'white';


// user can change pen color by clicking on the colour options in the side menu
function setPenColor(e) {
    if (e.target.className != 'color') return;
    penColor = e.target.id;
}


// what to do when hovering over the grid squares
function changeBoxColor(e) {
    if (e.target.className != 'square') return;

    switch(penColor) {
        case 'random':
            e.target.style.backgroundColor = getRandomColor();
            break;
        case 'darken':
            // lower the opacity
            e.target.style.opacity = getComputedStyle(e.target).opacity - darkenIndex;
            break;
        default:
            e.target.style.backgroundColor = penColor;
    }
}

makeGrid();

