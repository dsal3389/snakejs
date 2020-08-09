
function Point(){
    this.x = (Math.floor(Math.random() * rows -1) +1) * blockScale;
    this.y = (Math.floor(Math.random() * cols -1) +1) * blockScale;

    this.draw = () => {
        ctx.fillStyle = '#f56ba4';
        ctx.fillRect(this.x, this.y, blockScale, blockScale);
    }
}
