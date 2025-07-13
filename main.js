let squarePerSide = 16;

const squareContainer = document.querySelector('.container');

for (let i = 0; i < squarePerSide*squarePerSide; i++) {
    const squareGrid = document.createElement("div");
    squareGrid.classList.add("square")

    squareGrid.style.width = `${100 / squarePerSide}%`;
    squareGrid.style.height = `${100 / squarePerSide}%`;

    squareContainer.appendChild(squareGrid);
}

