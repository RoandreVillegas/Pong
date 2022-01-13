//creating initial game screen
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
const user = {
    width: 20,
    height: 200,
    colour: "blue",
    score: 0,
    x: 0,
    y: (canvas.height - 200)/2,
    score: 0,
    speed: 5
}
const com = {
    width: 20,
    height: 200,
    colour: "red",
    score: 0,
    x: canvas.width - 20,
    y: (canvas.height - 200)/2,
    score: 0,
    speed: 5
}
const ball = {
    //need x,y,r,start_angle,end_angle,direction of rotation(optional)
    x: canvas.width/2,
    y: canvas.height/2,
    r: 20,
    speedX: -10,
    speedY: 10,
    speed: 5,
    start_angle: 0,
    end_angle: Math.PI*2,
    colour: "purple"
}
const net = {
    x: canvas.width/2,
    y: 0,
    width: 50,
    height: canvas.height,
    colour: "white"
}
function draw_paddle(x, y, width, height, colour){
    ctx.fillStyle = colour
    ctx.fillRect(x, y, width, height)
}
function draw_ball(x, y, r, start_angle, end_angle, colour){
    ctx.beginPath();
    ctx.arc(x, y, r, start_angle, end_angle);
    ctx.closePath();
    ctx.fillStyle = colour;
    ctx.strokeStyle = "white";
    ctx.fill();
    ctx.stroke();
}
document.addEventListener("keydown", move_paddle);
function move_paddle(e){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var code = e.keyCode || e.which;
    if(code === 87){
        user.y -= 20;
    }else if(code === 83){
        user.y += 20;
    }
}
function update(){
    let curr_pos = user.y;
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    if(ball.y + ball.r > canvas.height || ball.y - ball.r < 0){
        ball.speedY *= -1;
    }
    if(ball.x + ball.r > canvas.width){
        user.score++;
        reset_ball();
    }else if(ball.x - ball.r < 0){
        com.score++;
        reset_ball();
    }
    //check to see who's side the ball is on
    let player = (ball.x < canvas.width / 2) ? user : com;

    if(detect_collision(ball, player)){
        ball.speedX *= -1;
    }
    if (user.y < 0){
        user.y = 0;
    }
    if(user.y > canvas.height - 200){
        user.y = canvas.height - 200;
    }
    //computer AI
    com.y += ((ball.y - (com.y + com.height/2))) * 0.1;
}
function detect_collision(curr_ball, curr_player){
    curr_ball.top = curr_ball.y - curr_ball.r;
    curr_ball.bottom = curr_ball.y + curr_ball.r;
    curr_ball.left = curr_ball.x - curr_ball.r;
    curr_ball.right = curr_ball.x + curr_ball.r;

    curr_player.top = curr_player.y;
    curr_player.bottom = curr_player.y + curr_player.height;
    curr_player.left = curr_player.x;
    curr_player.right = curr_player.x + curr_player.width;

    return curr_ball.right > curr_player.left && curr_ball.bottom > curr_player.top && curr_ball.left < curr_player.right && curr_ball.top < curr_player.bottom ? true : false;
}
function reset_ball(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.speedY = -ball.speedY;
}
function display_score(){
    ctx.fillStyle = "white";
    ctx.font = "50px georgia"
    ctx.fillText(user.score, canvas.width/4, 100);
    ctx.fillText(com.score, (3*canvas.width)/4, 100);
}
function create_game(){
    //clear the game board
    draw_paddle(0, 0, canvas.width, canvas.height, "black");
    
    draw_paddle(user.x, user.y, user.width, user.height, user.colour)
    draw_paddle(com.x, com.y, com.width, com.height, com.colour)
    draw_ball(ball.x, ball.y, ball.r, ball.start_angle, ball.end_angle, ball.colour)
    display_score();
}
function init(){
    update();
    create_game();
}
let frame_per_second = 50;
setInterval(init, 1000/frame_per_second); //repeatedly calls the create_game function
