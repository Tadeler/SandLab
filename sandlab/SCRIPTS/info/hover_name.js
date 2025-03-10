function showElementName() {
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        const cellX = Math.floor(mouseX / cellSize);
        const cellY = Math.floor(mouseY / cellSize);

        if (grid[cellY][cellX] !== EMPTY) {
            const elementValue = grid[cellY][cellX];
            let elementName = "";

            switch (elementValue) {
                case 0: elementName = "EMPTY"; break;
                case 1: elementName = "SAND"; break;
                case 2: elementName = "WATER"; break;
                case 3: elementName = "STONE"; break;
                case 4: elementName = "FIRE"; break;
                case 5: elementName = "WOOD"; break;
                case 6: elementName = "DIRT"; break;
                case 7: elementName = "LAVA"; break;
                case 8: elementName = "WATER_VAPOR"; break;
                case 9: elementName = "GRASS"; break;
                case 10: elementName = "MUD"; break;
                case 11: elementName = "SEED"; break;
                default: elementName = "UNKNOWN";
            }

            ctx.font = '13px Arial';
            const textWidth = ctx.measureText(elementName).width; // Measure the text width

            const boxPadding = 5; // Add some padding around the text
            const boxX = width - textWidth - boxPadding * 2 - 10; // Calculate box X position
            const boxY = height - 25; // Calculate box Y position
            const boxWidth = textWidth + boxPadding * 2; // Calculate box width
            const boxHeight = 20; // Calculate box height

            // Draw the outline
            ctx.strokeStyle = 'rgb(232, 232, 232)'; // Set the outline color
            ctx.lineWidth = 2; // Set the outline thickness (optional)
            ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

            // Draw the text
            ctx.fillStyle = 'white';
            ctx.fillText(elementName, width - textWidth - boxPadding - 10, height - 10);
        }
    }
}