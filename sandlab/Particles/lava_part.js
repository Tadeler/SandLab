// lava_interactions.js

// lava_interactions.js

function handleLavaparticles(x, y, grid, nextGrid, elements) {
    if (grid[y][x] === LAVA) {
        // Chance for random fire generation
        if (Math.random() < 0.005) {
            for (let dy = -1; dy >= -3; dy--) {
                const ny = y + dy;

                if (ny >= 0 && ny < grid.length) {
                    if (nextGrid[ny][x] === EMPTY) {
                        nextGrid[ny][x] = FIRE;
                        break;
                    } else {
                        break;
                    }
                }
            }
        }

        // Check cells ABOVE for fire from drops (only if NOT lava below)
        if (y < grid.length - 1 && grid[y + 1][x] !== LAVA) { // Check if the cell below is NOT lava
            for (let dy = -1; dy >= -3; dy--) {
                const ny = y + dy;

                if (ny >= 0 && ny < grid.length) {
                    if (nextGrid[ny][x] === EMPTY) {
                        if (Math.random() < 0.01) {
                            nextGrid[ny][x] = FIRE;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
    }
}