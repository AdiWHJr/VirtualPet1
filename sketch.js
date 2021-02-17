var dog, happyDog;
var database;
var foodS, foodStock;

function preload()
{
  dogImg = loadImage("dogImg.png")
  dogImg1 = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(500, 500);

  database = firebase.database()
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)

  dog = createSprite(250,300,50,50)
  dog.addImage(dogImg)
  dog.scale = 0.2
}

function draw() {  
  background(46,139,87)
  if(keyDown(UP_ARROW)){
    writeStock(foodS)
    dog.addImage(dogImg1)
  }
  drawSprites();

  fill("white")
  stroke("white")
  textSize(30)
  text('Food : '+ foodS, 180, 50)
}

function readStock(data){
  foodS = data.val()
}

function writeStock(x){
  if(x<=0){
    x = 0
  }
  else{
    x-=1
  }
  database.ref('/').update({
    Food : x
  })
}

