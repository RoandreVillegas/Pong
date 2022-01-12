/**
 * steps for pong:
 * - render the screen - done
 * - code start button (any key to start)
 * - create user and computer paddles (create them as objects) - done
 * - code user movement - in progress
 * - create the ball - done
 * - code for ball movement
 * - then code for computer movement
 * - create middle border
 * - add scores for each player - done
 * ...(add more later)
 */
/**
 * OBJECTS:
 * - user paddle
 * - computer paddle
 * - net
 * - the game as a whole
 */
/**
 * logic for player movement:
 * - press W or S to move up or down, respectively
 * - add keydown listener
 * - if key is not W or S, do nothing
 * - otherwise, move at specified speed
 */
//creating initial game screen
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");
var direction = {
    
}
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
    speedX: 5,
    speedY: 5,
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
        user.y -= 10;
    }else if(code === 83){
        user.y += 10;
    }
}
function update(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}
// canvas.addEventListener('keydown', keyListener);
// function keyListener(e){

// }

function display_score(){
    ctx.fillStyle = "white";
    ctx.font = "50px georgia"
    ctx.fillText(user.score, canvas.width/4, 100);
    ctx.fillText(com.score, (3*canvas.width)/4, 100);
}
function create_game(){
    draw_paddle(user.x, user.y, user.width, user.height, user.colour)
    draw_paddle(com.x, com.y, com.width, com.height, com.colour)
    draw_ball(ball.x, ball.y, ball.r, ball.start_angle, ball.end_angle, ball.colour)
    display_score();
}
function init(){
    create_game();
    //update();
}
let frame_per_second = 120;
setInterval(init, 1000/frame_per_second); //repeatedly calls the create_game function