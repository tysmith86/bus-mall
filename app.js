'use strict';

var imagePaths = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];
var images = JSON.parse(localStorage.getItem('jsonImages'));
var currentImageIndices = [0, 1, 2];
var totalClicks = 0;

// checks the length of local storage
// if there is something in local storage, set the images array equal to that parsed value
// if there is nothing in local storage, generate the image array from scratch
if (!images) {
  images = [];
  for(var i = 0; i < imagePaths.length; i++) {
    var imgName = imagePaths[i].split('.')[0];
  // console.log('imgName', imgName);
    var imgPath = imagePaths[i];
    new Img(imgName, imgPath);
  // console.log('New image:', Img);
  }
}

// Img constructor
function Img(name, path) {
  this.views = 0;
  this.clicks = 0;
  this.name = name;
  this.path = 'imgs/' + path;

  images.push(this);
}

// gets the ul that holds the images
var imageList = document.getElementById('images');

drawImage(0);
drawImage(1);
drawImage(2);

imageList.addEventListener('click', clickHandler);

// clickHandler for image clicks
function clickHandler(event) {
  // console.log('Event Target:', event.target);
  var matchPath = event.target.getAttribute('src');
  // ends the survey at 25 clicks, and removes the hidden class from the buttons
  if (totalClicks >= 25) {
    var chartButton = document.getElementById('show_chart');
    chartButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
    clearButton.classList.remove("hidden");
    return;
  }
  // if area outside of pictures, but inside ul is clicked, the function short circuits
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

// generates random indeces and checks if those indeces repeat in either current or previous set
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

// renders images to page
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

// calculates percentage of clicks per view
var percentageClicksArray = [];
for (var i = 0; i < images.length; i++) {
  var clicksPerView = images[i].clicks / images[i].views;
  if (clicksPerView === NaN) {
    clicksPerView = 0;
  }
  var clickPercentage = Math.floor(clicksPerView * 100);
  // console.log('Clicks per View:', clickPercentage);
  percentageClicksArray.push(clickPercentage);
}

var resetButton = document.getElementById('restart');
var clearButton = document.getElementById('clear');
var chartButton = document.getElementById('show_chart');
chartButton.addEventListener('click', chartClickHandler);
resetButton.addEventListener('click', resetClickHandler);
clearButton.addEventListener('click', clearClickHandler);

// refreshes page
function resetClickHandler() {
  location.reload();
};

// clears local storage and refreshes pages
function clearClickHandler() {
  localStorage.clear();
  location.reload();
}

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

  // turns the images array into a string and stores in local storage
  var jsonImages = JSON.stringify(images);
  localStorage.setItem('jsonImages', jsonImages);

  var ctx = document.getElementById('data_chart');
  var cty = document.getElementById('percent_chart');

  var clicksChart = new Chart(ctx, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: imageNames,
      datasets: [{
        label: '# of Votes',
        data: imageClicks,
        backgroundColor: [
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)'
        ],
        borderColor: [
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)',
          'rgb(255, 165, 0)'
        ],
        borderWidth: 1
      },

      {
        label: '# of Views',
        data: imageViews,
        backgroundColor: [
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)'
        ],
        borderColor: [
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)',
          'rgb(0, 0, 255)'
        ],
          borderWidth: 1
        }

    ],
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

  var percentChart = new Chart(cty, { // eslint-disable-line
    type: 'bar',
    data: {
      labels: imageNames,
      datasets: [{
        label: 'Clicks per Views',
        data: percentageClicksArray,
        backgroundColor: [
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)'
        ],
        borderColor: [
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)',
          'rgb(255, 0, 0)'
        ],
        borderWidth: 1
      },

    ],
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



  chartButton.disabled = true;
}
