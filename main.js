const squarePerSide = 32; // number of squares per side
const pauseKey = 'p'; // key to press to enable/disable pen
const darkenIndex = 0.1; // factor by which you want to darken grid squares
const maxGridSize = 100; 
const minGridSize = 1;
let penColor = 'white'; // default pen color


const squareContainer = document.querySelector('.container');
const colorPallete = document.querySelector('.color-choices');
const randomColorPen = document.querySelector('#random');
const darkenColorPen = document.querySelector('#darken');
const form = document.querySelector('.grid-form');


// Error Messages
const emptyInput = 'Input cannot be empty';
const invalidGridSize = `Enter a number from ${minGridSize} to ${maxGridSize}`;


document.addEventListener('keypress', togglePen);
colorPallete.addEventListener('click', setPenColor);
form.addEventListener('submit', resetGrid);


makeGrid(squarePerSide);


// return random integer from 0 to n
function random(n) {
    return Math.floor(Math.random() * (n + 1));
}


// return a random color
function getRandomColor() {
    return `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
}


// form a grid of side length = squarePerSide
function makeGrid(gridSize) {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const squareGrid = document.createElement("div");
        squareGrid.classList.add("square")

        squareGrid.style.width = `${100 / gridSize}%`;
        squareGrid.style.height = `${100 / gridSize}%`;

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
    if (e.key.toLowerCase() != pauseKey) return;

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

            // increase the darkness of square
            let newDarkness = extractBrightness(getComputedStyle(e.target).filter) - darkenIndex;
            e.target.style.filter = `brightness(${newDarkness})`;
            break;
        default:
            e.target.style.backgroundColor = penColor;
    }
}


// takes a string of type 'brightness(number)' and function returns the number
function extractBrightness(filterProperties) {
    let brightnessValue;
    filterProperties.split(' ').forEach( property => {
        if (property.startsWith('brightness')) {
            let brightness = property.slice(('brightness(').length, -1); // format: 'brightness(x)' always

            // brightness could be decimal, integer or percentage
            // it's fine if it's decimal or integer, but for percentage we must convert it to decimal
            if (brightness.endsWith('%')) {
                brightness = brightness.slice(0, -1) / 100;
            }
            brightnessValue = parseFloat(brightness);
        }
    })
    return brightnessValue;
}


// displays error message' for element, by appending 'message' to the <p> tag who is sibling of the input
function displayErrorMessage(element, message) {
    (element.parentNode).querySelector('p').textContent = message;
}


// erase the grid
function clearGrid() {
    squareContainer.innerHTML = '';
}


// make a grid of size given by user
function resetGrid(e) {
    e.preventDefault();

    // function will return false if input is invalid, else the value
    const gridSize = validateGridSizeInput(form.elements['grid-input'].value);

    if (gridSize) {

        // make input entry blank 
        form.elements['grid-input'].value = '';

        clearErrorMessage(form.elements['grid-input']);       
        clearGrid();
        makeGrid(gridSize);
    }
}


// check if grid size is a valid number
function validateGridSizeInput(size) {
    if (size <= maxGridSize && size >= minGridSize) {
        return size;
    }
    else if (size.trim() == '') {
        displayErrorMessage(form.elements['grid-input'], emptyInput);
    }
    else {
        displayErrorMessage(form.elements['grid-input'], invalidGridSize);
    }
    return false;
}


function clearErrorMessage(element) {
    (element.parentNode).querySelector('p').textContent = '';
}
