const canvas = document.getElementById('game-display');
const ctx = canvas.getContext('2d');
const blockScale = 10;

const rows = canvas.width / blockScale;
const cols = canvas.height / blockScale;


(function ready(){
    const snake = new Snake();
    let point = new Point();
    var refreshInterval = window.setInterval(frame, 250);

    function frame(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        try{
            snake.update();
        } catch(e){
            clearInterval(refreshInterval);
            
            ctx.fillStyle = '#0000005c';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            document.body.style.backgroundColor = 'lightcoral';
        }

        if(snake.canEat(point)){
            snake.eat(point);
            delete point;
            point = new Point(); // generate a new point with new location
        }

        snake.draw();
        point.draw();
    }

    window.addEventListener('keydown', (event) => {
        snake.changeDirection(event.keyCode);
    });
})()
