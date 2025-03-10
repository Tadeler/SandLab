// water_soil_interaction.js

function handleWaterSoilInteraction(x, y, grid, nextGrid, elements) {
    if (grid[y][x] === WATER) {
        // Check surrounding cells for soil
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dy === 0 && dx === 0) continue; // Skip the current cell

                const ny = y + dy;
                const nx = x + dx;

                if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
                    if (grid[ny][nx] === DIRT) {
                        // Soil is touching water, start a timer
                        if (!elements[DIRT].wetTimer) {
                            elements[DIRT].wetTimer = 0;
                        }

                        elements[DIRT].wetTimer++;

                        if (elements[DIRT].wetTimer > 10) { // Adjust the timer as needed
                            nextGrid[ny][nx] = MUD;
                            delete elements[DIRT].wetTimer; // Remove the timer
                        }
                    } else if (elements[grid[ny][nx]] && elements[grid[ny][nx]].wetTimer){
                        delete elements[grid[ny][nx]].wetTimer;
                    }
                }
            }
        }
    } else {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dy === 0 && dx === 0) continue; // Skip the current cell

                const ny = y + dy;
                const nx = x + dx;

                if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
                    if (elements[grid[ny][nx]] && elements[grid[ny][nx]].wetTimer){
                        delete elements[grid[ny][nx]].wetTimer;
                    }
                }
            }
        }
    }
}