// grass_spread.js
function updateGrassSpread(grid, elements) {
    const nextGrid = grid.map(row => [...row]);

    for (let y = 0; y < grid.length - 1; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] === 'GRASS') {
                // Check adjacent dirt tiles to spread grass
                const directions = [
                    { dx: 0, dy: 1 }, // Down
                    { dx: 0, dy: -1 }, // Up
                    { dx: -1, dy: 0 }, // Left
                    { dx: 1, dy: 0 }  // Right
                ];

                for (const { dx, dy } of directions) {
                    const nx = x + dx;
                    const ny = y + dy;
                    
                    if (nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length) {
                        if (grid[ny][nx] === 'DIRT' && Math.random() < 0.1) { // 10% chance to spread
                            nextGrid[ny][nx] = 'GRASS';
                        }
                    }
                }
            }
        }
    }
    
    return nextGrid;
}
