'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images = [];
var currentImageIndices = [0, 1, 2];

function Img(name, path) {
  this.views = 0;
  this.clicks = 0;
  this.name = name;
  this.path = 'imgs/' + path;

  images.push(this);
}

for(var i = 0; i < imagePaths.length; i++) {
  var imgName = imagePaths[i].split('.')[0];
  // console.log('imgName', imgName);
  var imgPath = imagePaths[i];
  new Img(imgName, imgPath);
  // console.log('New image:', Img);

}

var imageList = document.getElementById('images');

imageList.addEventListener('click', clickHandler);

drawImage(0);
drawImage(1);
drawImage(2);

function clickHandler(event) {
  // console.log('Event Target:', event.target);
  var matchPath = event.target.getAttribute('src');
  console.log('Match Path:', matchPath);
  var arrayOfRandomIndices = randomIndices();
  for(var i = 0; i < currentImageIndices.length; i++) {
    var currentIndex = currentImageIndices[i];
    var displayedObject = images[currentIndex];
    console.log('Previous Displayed', displayedObject);
    displayedObject.views += 1;
    // console.log('Views:', displayedObject.views);
  }

  for (var j = 0; j < images.length; j++) {
    var currentImageObject = images[j];
    if(currentImageObject.path === matchPath) {
      console.log('Clicked', currentImageObject);
      currentImageObject.clicks += 1;
    };
  }
  currentImageIndices = arrayOfRandomIndices;
  imageList.textContent = '';
  drawImage(arrayOfRandomIndices[0]);
  drawImage(arrayOfRandomIndices[1]);
  drawImage(arrayOfRandomIndices[2]);
}

// this code is working correctly
function randomIndices() {
  var firstRandomIndex = randomIndex();
  var secondRandomIndex = randomIndex();
  var thirdRandomIndex = randomIndex();
  while(secondRandomIndex === firstRandomIndex) {
    secondRandomIndex = randomIndex();
  }
  while(thirdRandomIndex === secondRandomIndex || thirdRandomIndex === firstRandomIndex) {
    thirdRandomIndex = randomIndex();
  }
  return [firstRandomIndex, secondRandomIndex, thirdRandomIndex];
}

function drawImage(index) {
  var imageList = document.getElementById('images');
  var li = document.createElement('li');
  var img = document.createElement('img');
  var randomImage = images[index].path;
  // console.log('randomImage:', randomImage);

  img.setAttribute('src', randomImage);
  // console.log(img);
  li.appendChild(img);
  imageList.appendChild(li);
}

function randomIndex() {
  return Math.floor(Math.random() * imagePaths.length);
}



var ctx = document.getElementById('my_chart');

var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['test 1', 'test 2', 'test 3', 'test 4', 'test 5'],
    datasets: [{
      label: '# of Votes',
      data: [5, 9, 10, 4, 3, 2],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
