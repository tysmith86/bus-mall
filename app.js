'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images = [];
var currentImageIndices = [0, 1, 2];
var totalClicks = 0;

// get local storage, then check the length of the array

// var jsonImages = [];
if (localStorage.length === 1) {
  images = JSON.parse(localStorage.getItem('jsonImages'));
} else {
  for(var i = 0; i < imagePaths.length; i++) {
    var imgName = imagePaths[i].split('.')[0];
    // console.log('imgName', imgName);
    var imgPath = imagePaths[i];
    new Img(imgName, imgPath);
    // console.log('New image:', Img);
  }
}


function Img(name, path) {
  this.views = 0;
  this.clicks = 0;
  this.name = name;
  this.path = 'imgs/' + path;

  images.push(this);
}


var imageList = document.getElementById('images');

imageList.addEventListener('click', clickHandler);

drawImage(0);
drawImage(1);
drawImage(2);


var resetButton = document.getElementById('clear_storage');

function clickHandler(event) {
  // console.log('Event Target:', event.target);
  var matchPath = event.target.getAttribute('src');
  if (totalClicks >= 25) {
    var chartButton = document.getElementById('show_chart');
    chartButton.setAttribute('class', '');
    resetButton.setAttribute('class', '');
    return;
  }
  if(!matchPath) {
    return;
  }

  totalClicks += 1;
  // console.log('Match Path:', matchPath);
  var arrayOfRandomIndices = randomIndices();
  for(var i = 0; i < currentImageIndices.length; i++) {
    var currentIndex = currentImageIndices[i];
    var displayedObject = images[currentIndex];
    // console.log('Previous Displayed', displayedObject);
    displayedObject.views += 1;
    // console.log('Views:', displayedObject.views);
  }


  for (var j = 0; j < images.length; j++) {
    var currentImageObject = images[j];
    if(currentImageObject.path === matchPath) {
      // console.log('Clicked', currentImageObject);
      currentImageObject.clicks += 1;
      voteCounter();
    };
  }
  currentImageIndices = arrayOfRandomIndices;
  imageList.textContent = '';
  drawImage(arrayOfRandomIndices[0]);
  drawImage(arrayOfRandomIndices[1]);
  drawImage(arrayOfRandomIndices[2]);
}

function voteCounter() {
  var votes = [];
  for (i = 0; i < images.length; i++) {
    votes.push(images[i].clicks);
  };
  return votes;
}

// this code is working correctly
function randomIndices() {
  var firstRandomIndex = randomIndex();
  var secondRandomIndex = randomIndex();
  var thirdRandomIndex = randomIndex();
  while(currentImageIndices.indexOf(firstRandomIndex) !== -1) {
    firstRandomIndex = randomIndex();
  }
  while(secondRandomIndex === firstRandomIndex || currentImageIndices.indexOf(secondRandomIndex) !== -1) {
    secondRandomIndex = randomIndex();
  }
  while(thirdRandomIndex === secondRandomIndex || thirdRandomIndex === firstRandomIndex || currentImageIndices.indexOf(thirdRandomIndex) !== -1) {
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

var chartButton = document.getElementById('show_chart');
chartButton.addEventListener('click', chartClickHandler);

resetButton.addEventListener('click', resetClickHandler);

function resetClickHandler() {
  location.reload();
};

function chartClickHandler() {
  var chartCanvas = document.getElementById('chart');
  chartCanvas.setAttribute('class', '');

  var imageNames = [];
  var imageClicks = [];
  var imageViews = [];
  for (i = 0; i < images.length; i++) {
    imageNames.push(images[i].name);
    imageClicks.push(images[i].clicks);
    imageViews.push(images[i].views);
  };

  var jsonImages = JSON.stringify(images);
  localStorage.setItem('jsonImages', jsonImages);

  var ctx = document.getElementById('clicks_chart');
  var cty = document.getElementById('views_chart');

  var clicksChart = new Chart(ctx, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: imageNames,
      datasets: [{
        label: '# of Votes',
        data: imageClicks,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderWidth: 1
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 5
          }
        }]
      }
    }
  });
  var viewsChart = new Chart(cty, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: imageNames,
      datasets: [{
        label: '# of Views',
        data: imageViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 20
          }
        }]
      }
    }
  });
  chartButton.disabled = true;
}
