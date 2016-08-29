'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images = [];

for(var i = 0; i < imagePaths.length; i++) {
  var imgName = imagePaths[i].split('.')[0];
  // console.log('imgName', imgName);
  var imgPath = imagePaths[i];
  new Img(imgName, imgPath);
}

var imageList = document.getElementById('images');

imageList.addEventListener('click', clickHandler);

drawImage();
drawImage();
drawImage();

function clickHandler(e) {
  imageList.textContent = '';

  drawImage();
  drawImage();
  drawImage();
}

function drawImage() {
  var imageList = document.getElementById('images');
  var li = document.createElement('li');
  var img = document.createElement('img');
  var randomIndex = Math.floor(Math.random() * imagePaths.length);
  // console.log('randomIndex', randomIndex)
  var randomImage = imagePaths[randomIndex];


  img.setAttribute('src', 'imgs/' + randomImage);
  // console.log(img);

  li.appendChild(img);
  imageList.appendChild(li);
}

function Img(name, path) {
  this.views = 0;
  this.clicks = 0;
  this.name = name;
  this.path = path;
  images.push(this);
}
