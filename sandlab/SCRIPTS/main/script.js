


const canvas = document.getElementById('sandbox');
const ctx = canvas.getContext('2d');
//Make sure the canvas width and height are set in the HTML or CSS
const width = 800;
const height = 600;

const grid = [];
const cellSize = 6;


const EMPTY = 0;

let currentElement = SAND;

const sandButton = document.getElementById('sandButton');
const waterButton = document.getElementById('waterButton');
const stoneButton = document.getElementById('stoneButton');
const fireButton = document.getElementById('fireButton');
const woodButton = document.getElementById('woodButton'); // Get wood button
const dirtButton = document.getElementById('dirtButton');
const lavaButton = document.getElementById('lavaButton');
const waterVaporButton = document.getElementById('waterVaporButton');
const grassButton = document.getElementById('grassButton');
const mudButton = document.getElementById('mudButton');
const seedButton = document.getElementById('seedButton');


waterVaporButton.style.backgroundColor = elements[WATER_VAPOR].color;
lavaButton.style.backgroundColor = elements[LAVA].color;
sandButton.style.backgroundColor = elements[SAND].color;
waterButton.style.backgroundColor = elements[WATER].color;
stoneButton.style.backgroundColor = elements[STONE].color;
fireButton.style.backgroundColor = elements[FIRE].color; // Set fire button color
woodButton.style.backgroundColor = elements[WOOD].color;
dirtButton.style.backgroundColor = elements[DIRT].color;
grassButton.style.backgroundColor = elements[GRASS].color;
mudButton.style.backgroundColor = elements[MUD].color;
seedButton.style.backgroundColor = elements[SEED].color;


sandButton.addEventListener('click', () => {
    currentElement = SAND;
    sandButton.classList.add('active');
    waterButton.classList.remove('active');
    stoneButton.classList.remove('active');
});

waterButton.addEventListener('click', () => {
    currentElement = WATER;
    waterButton.classList.add('active');
    sandButton.classList.remove('active');
    stoneButton.classList.remove('active');
});

stoneButton.addEventListener('click', () => {
    currentElement = STONE;
    stoneButton.classList.add('active');
    sandButton.classList.remove('active');
    waterButton.classList.remove('active');
});

fireButton.addEventListener('click', () => { // Fire button event
    currentElement = FIRE;
    fireButton.classList.add('active');
    sandButton.classList.remove('active');
    waterButton.classList.remove('active');
    stoneButton.classList.remove('active');
});

woodButton.addEventListener('click', () => { // Wood button event
    currentElement = WOOD;
    woodButton.classList.add('active');
    sandButton.classList.remove('active');
    waterButton.classList.remove('active');
    stoneButton.classList.remove('active');
    fireButton.classList.remove('active');
});

dirtButton.addEventListener('click', () => {
    currentElement = DIRT;
    dirtButton.classList.add('active');
    sandButton.classList.remove('active');
    waterButton.classList.remove('active');
    stoneButton.classList.remove('active');
    fireButton.classList.remove('active');
    woodButton.classList.remove('active');
});



lavaButton.addEventListener('click', () => {
    currentElement = LAVA;
    lavaButton.classList.add('active');
    sandButton.classList.remove('active');
    waterButton.classList.remove('active');
    stoneButton.classList.remove('active');
    fireButton.classList.remove('active');
    woodButton.classList.remove('active');
    dirtButton.classList.remove('active');
});

waterVaporButton.addEventListener('click', () => {
    currentElement = WATER_VAPOR;
    waterVaporButton.classList.add('active');
    sandButton.classList.remove('active');
    waterButton.classList.remove('active');
    stoneButton.classList.remove('active');
    fireButton.classList.remove('active');
    woodButton.classList.remove('active');
    dirtButton.classList.remove('active');
    lavaButton.classList.remove('active');
});

grassButton.addEventListener('click', () => {
    currentElement = GRASS;
    grassButton.classList.add('active');
    sandButton.classList.remove('active');
    waterButton.classList.remove('active');
    stoneButton.classList.remove('active');
    fireButton.classList.remove('active');
    woodButton.classList.remove('active');
    dirtButton.classList.remove('active');
    lavaButton.classList.remove('active');
    waterVaporButton.classList.remove('active');
});

mudButton.addEventListener('click', () => {
    currentElement = MUD;
    mudButton.classList.add('active');
    // Remove 'active' class from other buttons
    sandButton.classList.remove('active');
    waterButton.classList.remove('active');
    stoneButton.classList.remove('active');
    fireButton.classList.remove('active');
    woodButton.classList.remove('active');
    dirtButton.classList.remove('active');
    lavaButton.classList.remove('active');
    waterVaporButton.classList.remove('active');
    grassButton.classList.remove('active');
});


seedButton.addEventListener('click', () => {
    currentElement = SEED;
    seedButton.classList.add('active'); // Add 'active' class
    sandButton.classList.remove('active'); // Remove 'active' class from other buttons
    waterButton.classList.remove('active');
    stoneButton.classList.remove('active');
    fireButton.classList.remove('active');
    woodButton.classList.remove('active');
    dirtButton.classList.remove('active');
    lavaButton.classList.remove('active');
    waterVaporButton.classList.remove('active');
    grassButton.classList.remove('active');
    mudButton.classList.remove('active');
});


for (let y = 0; y < height / cellSize; y++) {
    grid[y] = [];
    for (let x = 0; x < width / cellSize; x++) {
        grid[y][x] = EMPTY;
    }
}

// Drop grass from the sky
for (let y = 0; y < height / cellSize / 2; y++) { // Drop from the top half
    for (let x = 0; x < width / cellSize; x++) {
        if (Math.random() < 0.05) { // Randomly place grass
            grid[y][x] = GRASS;
        }
    }
}


// + and -
let followerSize = 1;
let particleCount = 1;

document.addEventListener('keydown', (event) => {
    if (event.key === '=' || event.key === '+') { // Check for '=' and '+'
        followerSize++;
        particleCount++;
    } else if (event.key === '-') {
        if (followerSize > 1 && particleCount > 1) {
            followerSize--;
            particleCount--;
        }
    }
});



const textures = {};

function loadTextures() {
    const elementNames = Object.keys(elements); // Get all element names
    let loadedCount = 0;

    elementNames.forEach(name => {
        if (name === "EMPTY") return; //skip empty
        textures[name] = new Image();
        textures[name].src = `textures/${name.toLowerCase()}.png`; // Assuming your filenames are lowercase
        textures[name].onload = () => {
            loadedCount++;
            if (loadedCount === elementNames.length -1 ) { //check if all images are loaded.
                gameLoop(); // Start the game loop after all textures are loaded
            }
        };
    });
}




function draw() {
    for (let y = 0; y < height / cellSize; y++) {
        for (let x = 0; x < width / cellSize; x++) {
            const elementInCell = grid[y][x];



            if (elementInCell !== EMPTY) {
                const elementName = Object.keys(elements).find(key => elements[key] === elements[elementInCell]);

                if (textures[elementName] && textures[elementName].complete && textures[elementName].naturalWidth !== 0) {
                    // Texture is loaded and valid
                    ctx.drawImage(textures[elementName], x * cellSize, y * cellSize, cellSize, cellSize);
                } else {
                    // Texture is missing or not loaded, use color fallback
                    if (elements[elementInCell] && elements[elementInCell].color) {
                        ctx.fillStyle = elements[elementInCell].color;
                        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                    } else {
                        // If color is also missing, use a default color (like gray)
                        ctx.fillStyle = 'gray';
                        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                    }
                }
            } else {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

    showElementName();
    showMouseCoordinates();

    // Draw the selection box around the mouse cursor
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        ctx.strokeStyle = 'white';
        ctx.strokeRect(
            Math.floor(mouseX / cellSize) * cellSize - cellSize * (followerSize - 1) / 2,
            Math.floor(mouseY / cellSize) * cellSize - cellSize * (followerSize - 1) / 2,
            cellSize * followerSize,
            cellSize * followerSize
        );
    }
}



let isMouseDown = false;
let mouseX = 0;
let mouseY = 0;

canvas.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        isMouseDown = true;
        placeElement(event);
    } else if (event.button === 2) {
        eraseElement(event);
    }
});

canvas.addEventListener('mouseup', () => {
    isMouseDown = false;
});

canvas.addEventListener('mousemove', (event) => {
    mouseX = event.offsetX;
    mouseY = event.offsetY;
    if (isMouseDown && event.button === 0) {
        placeElement(event);
    }
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

function placeElement(event) {
    const centerX = Math.floor(event.offsetX / cellSize);
    const centerY = Math.floor(event.offsetY / cellSize);

    const radius = Math.floor(followerSize / 2);

    for (let i = 0; i < particleCount; i++) {
        const offsetX = Math.floor(Math.random() * (radius * 2 + 1)) - radius;
        const offsetY = Math.floor(Math.random() * (radius * 2 + 1)) - radius;

        const particleX = centerX + offsetX;
        const particleY = centerY + offsetY;

        if (particleX >= 0 && particleX < grid[0].length && particleY >= 0 && particleY < grid.length) {
            grid[particleY][particleX] = currentElement;
        }
    }
}

function eraseElement(event) {
    const centerX = Math.floor(event.offsetX / cellSize);
    const centerY = Math.floor(event.offsetY / cellSize);

    const radius = Math.floor(followerSize / 2);

    for (let y = centerY - radius; y <= centerY + radius; y++) {
        for (let x = centerX - radius; x <= centerX + radius; x++) {
            if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length) {
                grid[y][x] = EMPTY;
            }
        }
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}
loadTextures();
