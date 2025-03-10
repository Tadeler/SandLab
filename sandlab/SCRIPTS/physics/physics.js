function update() {
    const nextGrid = grid.map(row => [...row]);

    for (let y = grid.length - 2; y >= 0; y--) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] !== EMPTY) {
                const current = grid[y][x];
                const element = elements[current];

                // Check if fire is touching water
                if (element.isFire) {
                    // Check all surrounding cells for water
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            if (dy === 0 && dx === 0) continue; // Skip the current cell

                            const ny = y + dy;
                            const nx = x + dx;

                            if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
                                if (elements[grid[ny][nx]] && elements[grid[ny][nx]].isWater) {
                                    // Extinguish the fire
                                    nextGrid[y][x] = EMPTY;
                                    break; // No need to check other cells
                                }
                            }
                        }
                        if (nextGrid[y][x] === EMPTY) break; // If fire is extinguished, no need to check other directions
                    }
                }

                // Call the lava-water interaction function
                handleWaterLavaInteraction(x, y, grid, nextGrid, elements);
                  // Call the water interaction function
                handleLavaparticles(x, y, grid, nextGrid, elements);
                // Call the water soil interaction function
                handleWaterSoilInteraction(x, y, grid, nextGrid, elements);
                // Seed growth logic
                if (current === SEED) {
                    handleSeedGrowth(grid, nextGrid, x, y, elements);
                }


                // Rest of the update logic...
                if (element.flows) {
                    if (element.flows && !element.rises) {
                        if (y < grid.length - 1 && nextGrid[y + 1][x] === EMPTY) {
                            nextGrid[y + 1][x] = current;
                            nextGrid[y][x] = EMPTY;
                        } else if (Math.random() < 0.2 && x > 0 && nextGrid[y][x - 1] === EMPTY) {
                            nextGrid[y][x - 1] = current;
                            nextGrid[y][x] = EMPTY;
                        } else if (Math.random() < 0.2 && x < grid[0].length - 1 && nextGrid[y][x + 1] === EMPTY) {
                            nextGrid[y][x + 1] = current;
                            nextGrid[y][x] = EMPTY;
                        }
                    } else if (element.rises) {
                        if (!element.age) {
                            elements[current].age = 0;
                        }

                        elements[current].age++;

                        if (elements[current].age > 15) {
                            nextGrid[y][x] = EMPTY;
                            delete elements[current].age;
                        } else {
                            const direction = Math.floor(Math.random() * 3);

                            if (direction === 0 && y > 0 && nextGrid[y - 1][x] === EMPTY) {
                                nextGrid[y - 1][x] = current;
                                nextGrid[y][x] = EMPTY;
                            } else if (direction === 1 && x > 0 && nextGrid[y][x - 1] === EMPTY) {
                                nextGrid[y][x - 1] = current;
                                nextGrid[y][x] = EMPTY;
                            } else if (direction === 2 && x < grid[0].length - 1 && nextGrid[y][x + 1] === EMPTY) {
                                nextGrid[y][x + 1] = current;
                                nextGrid[y][x] = EMPTY;
                            }
                        }
                    } else {
                        if (y < grid.length - 1) { //make sure not to go past the bottom
                            if (grid[y + 1][x] === EMPTY) {
                                nextGrid[y + 1][x] = current;
                                nextGrid[y][x] = EMPTY;
                            } else if (elements[grid[y + 1][x]] && elements[grid[y + 1][x]].density < element.density) {
                                nextGrid[y + 1][x] = current;
                                nextGrid[y][x] = grid[y + 1][x];
                            } else {
                                const left = x > 0 && grid[y][x - 1] === EMPTY;
                                const right = x < grid[0].length - 1 && grid[y][x + 1] === EMPTY;
                                const downLeft = x > 0 && grid[y + 1][x - 1] === EMPTY;
                                const downRight = x < grid[0].length - 1 && grid[y + 1][x + 1] === EMPTY;

                                if (downLeft && downRight) {
                                    nextGrid[y + 1][Math.random() < 0.5 ? x - 1 : x + 1] = current;
                                    nextGrid[y][x] = EMPTY;
                                } else if (downLeft) {
                                    nextGrid[y + 1][x - 1] = current;
                                    nextGrid[y][x] = EMPTY;
                                } else if (downRight) {
                                    nextGrid[y + 1][x + 1] = current;
                                    nextGrid[y][x] = EMPTY;
                                } else if (left && right) {
                                    nextGrid[y][Math.random() < 0.5 ? x - 1 : x + 1] = current;
                                    nextGrid[y][x] = EMPTY;
                                } else if (left) {
                                    nextGrid[y][x - 1] = current;
                                    nextGrid[y][x] = EMPTY;
                                } else if (right) {
                                    nextGrid[y][x + 1] = current;
                                    nextGrid[y][x] = EMPTY;
                                }
                            }
                        }
                    }
                } else if (element.solid) {
                    if (y < grid.length - 1) { //make sure not to go past the bottom
                        if (grid[y + 1][x] === EMPTY) {
                            nextGrid[y + 1][x] = current;
                            nextGrid[y][x] = EMPTY;
                        } else if (elements[grid[y + 1][x]].flows) {
                            nextGrid[y + 1][x] = current;
                            nextGrid[y][x] = grid[y + 1][x];
                        }
                    }
                }

                // Check for fire touching flammable objects
                if (element.flammable) {
                    if (y > 0 && grid[y - 1][x] === FIRE) {
                        nextGrid[y][x] = FIRE;
                    }
                    if (y < grid.length - 1 && grid[y + 1][x] === FIRE) {
                        nextGrid[y][x] = FIRE;
                    }
                    if (x > 0 && grid[y][x - 1] === FIRE) {
                        nextGrid[y][x] = FIRE;
                    }
                    if (x < grid[0].length - 1 && grid[y][x + 1] === FIRE) {
                        nextGrid[y][x] = FIRE;
                    }
                }

                if (grid[y][x] === WATER_VAPOR) {
                    // Chance to dissipate (like fire)
                    if (Math.random() < 0.01) { // 0.1% chance to disappear each frame
                        nextGrid[y][x] = EMPTY;
                    } else {
                        // Make it rise
                        const direction = Math.floor(Math.random() * 3);
                        if (direction === 0 && y > 0 && nextGrid[y - 1][x] === EMPTY) {
                            nextGrid[y - 1][x] = WATER_VAPOR;
                            nextGrid[y][x] = EMPTY;
                        } else if (direction === 1 && x > 0 && nextGrid[y][x - 1] === EMPTY) {
                            nextGrid[y][x - 1] = WATER_VAPOR;
                            nextGrid[y][x] = EMPTY;
                        } else if (direction === 2 && x < grid[0].length - 1 && nextGrid[y][x + 1] === EMPTY) {
                            nextGrid[y][x + 1] = WATER_VAPOR;
                            nextGrid[y][x] = EMPTY;
                        }
                        // Check for ignition
                        if (element.ignites) {
                            // Check surrounding cells for flammable materials
                            for (let dy = -1; dy <= 1; dy++) {
                                for (let dx = -1; dx <= 1; dx++) {
                                    if (dy === 0 && dx === 0) continue; // Skip the current cell

                                    const ny = y + dy;
                                    const nx = x + dx;

                                    if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
                                        const neighbor = elements[grid[ny][nx]];
                                        if (neighbor && neighbor.flammable) {
                                            nextGrid[ny][nx] = FIRE; // Turn flammable element into fire
                                        }
                                    }
                                }
                            }
                        }
                    }
                }


                // Add lava burning logic here:
                if (element.isLava) {
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            if (dy === 0 && dx === 0) continue;

                            const ny = y + dy;
                            const nx = x + dx;

                            if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
                                const neighbor = elements[grid[ny][nx]];
                                if (neighbor && neighbor.flammable) {
                                    nextGrid[ny][nx] = FIRE; // Turn flammable elements into fire
                                } else if (neighbor && neighbor.melts) {
                                    nextGrid[ny][nx] = EMPTY; // Meltable elements disappear
                                }
                            }
                        }
                    }
                }

                // Grass spreading logic
                if (grid[y][x] === GRASS) {
                    for (const [dy, dx] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
                        const ny = y + dy, nx = x + dx;
                        if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length && grid[ny][nx] === DIRT) {
                            if (Math.random() < 0.02) { // Small chance to spread
                                nextGrid[ny][nx] = GRASS;
                            }
                        }
                    }
                }
            }
        }
    }

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            grid[y][x] = nextGrid[y][x];
        }
    }
}