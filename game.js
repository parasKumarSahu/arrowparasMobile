//document.addEventListener("deviceready", onDeviceReady, false);
 
//function onDeviceReady(){



var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-example', {
  preload: preload,
  create: create,
  update: update
});

var bow, bag, arrow, angle, newArrow;
var score=0;
var x;
var y;
var oldx, oldy;
var xVel;  // calculate this based on distance
var yVel;  // 
var g = 0.25;
var arrowCreated = false;
var shot = false;

function preload() {
  game.load.image('bag', 'assets/bag.jpg');
  game.load.image('bow', 'assets/bow.jpg');
  game.load.image('arrow', 'assets/arrow.jpg');

}

function create() {
//  game.world.setBounds(0, 0, window.innerWidth, window.innerHeight);
  bow = game.add.sprite(window.innerWidth/4, window.innerHeight/2, 'bow');
  bow.anchor.setTo(0.5);
  
  bag = game.add.sprite(3*window.innerWidth/4,window.innerHeight/2,'bag');
  bag.anchor.setTo(0.5);
  
  
  
  arrow = game.add.sprite(bow.x, bow.y, 'arrow');
  arrow.anchor.setTo(0.5);
  arrow.scale.setTo(0.5);
  arrow.angle = bow.angle;
  x = oldx = arrow.x;
  y = oldy = arrow.y;
  //game.input.onDown.add(createArrow, this);
  game.input.onUp.add(shootArrow, this);
}

function update() {
  //console.log(shot);
  if (!shot) {
    angle = Math.atan2(game.input.activePointer.x - bow.x, -(game.input.activePointer.y - bow.y)) * (180 / Math.PI) - 180;
    bow.angle = arrow.angle = angle;
    
  } else {
    
    //console.log("x",x,"y",y,"xVel",xVel,"yVel",yVel,"oldx",oldx,"oldy",oldy);
    
    x += xVel;
    y += yVel;
    yVel += g;

    newArrow.x = x;
    newArrow.y = y;
    
    
    arrowAngle = Math.atan2(x-oldx, -(y-oldy)) * (180 / Math.PI);
    newArrow.angle = arrowAngle;
    /*var a = game.add.sprite(x,y,'arrow');
    a.angle = arrowAngle;
    a.scale.setTo(0.5);
    a.anchor.setTo(0.5);
    a.alpha-=0.1;
    */
    
     oldx = x;
     oldy = y;
    
    
    if(newArrow.y>window.innerHeight) {
      resetArrow();
    }
    
    
    var intersects = Phaser.Rectangle.intersection(newArrow, bag);
    if(intersects.width>0) {
      //console.log(intersects.width);
      resetArrow();
      score=score+45;
      console.log(score);
    }
    
  }
}
function resetArrow() {
  shot = false;
  arrow.x=bow.x;
  arrow.y=bow.y;

  x=oldx=arrow.x;
  y=oldy=arrow.y;
}
function createArrow() {
  arrowCreated = true;
}

function shootArrow() {
  if(!shot) {
    shot = true;
    newArrow = game.add.sprite(bow.x, bow.y, 'arrow');
    newArrow.anchor.setTo(0.5);
    newArrow.scale.setTo(0.5);
    newArrow.angle = bow.angle;
    xVel = - (game.input.activePointer.x-bow.x)/6;
    yVel = - (game.input.activePointer.y-bow.y)/6;
  }
}
//}
