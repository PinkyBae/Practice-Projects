var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//load images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipenorth = new Image();
var pipesouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg3.jpg";
fg.src = "images/fg2.png";
pipenorth.src = "images/pipeNorth.png";
pipesouth.src = "images/pipeSouth.png";

//additional variables
var gap = 85;
var constant = pipenorth.height + gap;
//alert(constant);
var bx = 10;        //bird x pos
var by = 150;       //bird y pos
var gravity = 1.5;
var score = 0;

//load audio
var fly = new Audio();
var scoreSound = new Audio();

fly.src = "sounds/fly.mp3"
scoreSound.src = "sounds/score.mp3"

//on key down
document.addEventListener("keydown",moveUp);    //keydown refers to all the keys
function moveUp(){
    by -= 25;
    fly.play();
}

//pipecoordinates
var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
};

//draw images

function draw(){
    ctx.drawImage(bg,0,0);
    //bg.onload = function(){ctx.drawImage(bg,0,0);};

    for(var i=0; i<pipe.length; i++){

        ctx.drawImage(pipenorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipesouth,pipe[i].x,pipe[i].y+constant);
        //pipenorth.onload = function(){ctx.drawImage(pipenorth,100,0);};
        //pipesouth.onload = function(){ctx.drawImage(pipesouth,100,0+constant);};
        pipe[i].x--;
        if(pipe[i].x == 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipenorth.height)-pipenorth.height
            });
        }
        //console.log(i);

        //detect collision
        if((bx+bird.width >= pipe[i].x && bx <= pipe[i].x+pipenorth.width) && (by <= pipe[i].y+pipenorth.height || by+bird.height >= pipe[i].y+constant)){
            location.reload();  //reload the page
        }
        if(by+bird.height >= cvs.height-fg.height){
            location.reload();
            console.log(cond1);
        }
        if(pipe[i].x == 5){
            score++;
            scoreSound.play();
        }
    }

    ctx.drawImage(fg,0,cvs.height-fg.height);
    //fg.onload = function(){ctx.drawImage(fg,0,cvs.height-fg.height);};      -> If window.onload was not used
    
    ctx.drawImage(bird,bx,by);

    by += gravity;      //bird falling down
    
    //for score
    ctx.fillstyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("SCORE : "+score,10,cvs.height-20);

    requestAnimationFrame(draw);        // recursive drawing

}
window.onload = function(){
    this.draw();
}
//draw();            //-> Not Working
//console.log("active");