//to get a reference from html and save it in js variable

const canvas = document.getElementById('canvas1');
//2d or 3d methods?
const ctx = canvas.getContext('2d');
//refering to canvas variable from line one and parsing it 2d as an argument
// returns canvas rendering context: an object built into modern browsers
// for 3d parse WEBGL
// console.log(ctx); to see effects that can be used

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
// because I want to empty this array later

let numberOfParticles = 1000;

//to make particles bounce
let titleElement = document.getElementById('title1');
let titleMeasurements = titleElement.getBoundingClientRect();
let title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10
    //this html element border box is now a js oject
}

class Particle {
// when we want to create many similar objects
// constructor is mandatory method for each class
constructor(x, y){
    this.x = x;
    // x property on new object will be x variable on line 20
    this.y = y;
    //how big each will be
    this.size = Math.random() * 15 + 1;
    //this determines how heavy they are so how fast they fall and how high they bounce
    this.weight = Math.random() * 2 + 1;
    //simulates wind...same time when weight is pulling down
    this.directionX = Math.random() * 2 + 1;;
}
update(){
     //so particle comes back after falling.
     if(this.y > canvas.height) {
     this.y = 0 - this.size;
     this.weight = Math.random() * 1 + 1;
     //back to original value
     this.x = Math.random() * canvas.weight * 1.3;
     //horizontal x coordinate random number btw 0 & canvas weight
     //now falls from random points
     }
    //custom method to calculate and update particles position for every frame of animation
    //for every frame of animation, increase particle weight by 0.01
    this.weight += 0.01;
    //the longer they fall the heavier they get
    //i want them to move down so I update vertical y data
    this.y += this.weight;
   this.x += this.directionX;

   //check for collision between each particle and title element
   if (
       this.x < title.x + title.width &&
       this.x + this.size > title.x &&
       this.y < title.y + title.height &&
       this.y + this.size > title.y
   ){
       this.y -= 3;
       //to bounce
       this.weight *= -0.3;
   }
}
draw(){
    //takes position x, y & size and draws a circle representing each point
    //all canvas 2d methods are now available on my ctx variable and I can call them..this is API
    ctx.fillStyle = 'red';
    ctx.beginPath();
    //this tell js we want to start drawing
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    //size=radius, 0=start angle, math.pi*2(360degrees)=end angle
    ctx.closePath();
    ctx.fill()
}
}
//creates 300 randomized particles
function init(){
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++){
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y)); 
    }
    console.log(particlesArray);
}
init();

//for loop to draw canvas over and over thereby creating animation
function animate(){
    //so it's not leaving old canvas paint as long line
    ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
    //white colour & opacity
    ctx.fillRect(0, 0, canvas.width, canvas.height);
//rectangle of same size....semitransparent

for (let i = 0; i < particlesArray.length; i++){
    particlesArray[i].update();
    particlesArray[i].draw();
}
    
    //instead of set interval, this method causes a recurssion...over and over
    requestAnimationFrame(animate);
}
animate();

//to be responsize
window.addEventListener('resize', function(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
titleMeasurements = titleElement.getBoundingClientRect();
title = {
    x: titleMeasurements.left,
    y: titleMeasurements.top,
    width: titleMeasurements.width,
    height: 10

}
init();
});