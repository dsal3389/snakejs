
function Snake(){
    this.currentDir = 39; // mean arrowRight
    this.xSpeed = 10;
    this.ySpeed = 0;

    this.tail = [
        {x: 0, y: 0}, // head
    ]

    this.canEat = (point) => {
        const head = this.tail[this.tail.length - 1];
        return head.x === point.x && head.y === point.y;
    }

    this.eat = (point) => {
        this.tail.push({
            x: point.x, y: point.y
        });
    }

    this.draw = () => {
        ctx.fillStyle = "#2e9dec";

        for(let tail of this.tail){
            ctx.fillRect(tail.x, tail.y, blockScale, blockScale);
        }
    }

    this.update = () => {
        const length = this.tail.length;
        let head = this.tail[length - 1];

        for(let i=0; i < (length - 1);i++){
            this.tail[i] = {...this.tail[i + 1]};
        }

        head.x += this.xSpeed;
        head.y += this.ySpeed;

        if(this.xSpeed)
            head.x = head.x < 0 ? canvas.width : head.x > canvas.width ? 0 : head.x;
        else 
            head.y = head.y < 0 ? canvas.height : head.y > canvas.height ? 0 : head.y;

        if(this.collision(head.x, head.y)){
            throw Error('collision!')
        }
    }

    this.changeDirection = (direc) => {
        /*
            checks for invalid "sharp" direction, like from arrowUp to arrowDown, if key is invalid
            take no action, if key direction is valid take action base on the key
        */
        const notValidDirect = Math.abs(this.currentDir - direc) === 2;
        if(notValidDirect) return;

        switch(direc){
            case 37:
                this.xSpeed = -blockScale;
                this.ySpeed = 0;
                break;

            case 38:
                this.xSpeed = 0;
                this.ySpeed = -blockScale;
                break;

            case 39:
                this.xSpeed = blockScale;
                this.ySpeed = 0;
                break;
            
            case 40:
                this.xSpeed = 0;
                this.ySpeed = blockScale;
                break;
        }
        this.currentDir = direc;
    }

    this.collision = (x, y) => {
        for(let i=0; i < (this.tail.length - 1); i++){
            const tail = this.tail[i];
            if(tail.x == x && tail.y == y)
                return true;
        }
        return false;
    } 
}

