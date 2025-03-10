// seedGrowth.js

function handleSeedGrowth(grid, nextGrid, x, y, elements) {
    const seed = elements[grid[y][x]];

    if (grid[y][x] !== SEED) return;

    if (y < grid.length - 1 && grid[y + 1][x] !== EMPTY) {
        if (!seed.trunkHeight) {
            seed.trunkHeight = 0;
            seed.growTimer = 0;
            nextGrid[y][x] = WOOD;
            seed.trunkHeight++;
        }

        seed.growTimer++;

        if (seed.growTimer >= 10) {
            if (seed.trunkHeight < 10) {
                if (y - seed.trunkHeight >= 0 && nextGrid[y - seed.trunkHeight][x] === EMPTY) {
                    nextGrid[y - seed.trunkHeight][x] = WOOD;
                    seed.trunkHeight++;
                    seed.growTimer = 0;
                }
            } else {
                generateLeaves(grid, nextGrid, x, y - 1, elements);
                delete seed.trunkHeight;
                delete seed.growTimer;
            }
        }
    }
}

function generateLeaves(grid, nextGrid, x, y, elements) {
    for (let i = -2; i <= 2; i++) {
        // Leaves on top and sides only
        for (let j = -1; j <= 1; j++) {
            if (x + i >= 0 && x + i < grid[0].length && y + j >= 0 && y + j <= y && nextGrid[y + j][x + i] === EMPTY && Math.random() < 0.2) {
                nextGrid[y + j][x + i] = GRASS;
            }
        }
    }
}