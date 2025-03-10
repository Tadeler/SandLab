function showMouseCoordinates() {
    if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
        const gridX = Math.floor(mouseX / cellSize);
        const gridY = Math.floor(mouseY / cellSize);
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText(`X: ${gridX}, Y: ${gridY}`, width - 80, height - 40);
    }
}