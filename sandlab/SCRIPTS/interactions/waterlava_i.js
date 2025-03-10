// waterLavaInteraction.js
function handleWaterLavaInteraction(x, y, grid, nextGrid, elements) {
    if (elements[grid[y][x]] && elements[grid[y][x]].isWater) {
        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                if (dy === 0 && dx === 0) continue;

                const ny = y + dy;
                const nx = x + dx;

                if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
                    if (elements[grid[ny][nx]] && elements[grid[ny][nx]].isLava) {
                        nextGrid[y][x] = WATER_VAPOR;
                        nextGrid[ny][nx] = STONE;
                    }
                }
            }
        }
    }
}