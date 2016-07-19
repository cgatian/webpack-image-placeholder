var milkyWayImage = require('./pup.jpg');

var placeHolderImage = document.createElement('img');
placeHolderImage.src = milkyWayImage.placeHolder;
setSize(placeHolderImage, milkyWayImage.size);
setupPlaceHolderImage(placeHolderImage);

var rawImage = document.createElement('img');
rawImage.src = milkyWayImage.fileName;
setSize(rawImage, milkyWayImage.size);
setupRawImage(rawImage);

var container = document.createElement('div');
container.style.position = 'relative';
container.style.overflow = 'hidden';
setSize(container, milkyWayImage.size);
container.appendChild(rawImage);
container.appendChild(placeHolderImage);
document.body.appendChild(container);

function setSize(element, size) {
    element.style.width = size.width / 8 + 'px';
    element.style.height = size.height / 8 + 'px';
}

function setupPlaceHolderImage(img) {
    img.style.opacity = 1;
    img.style.transition = 'opacity 300ms ease-out';
    img.style.position = 'absolute';
    img.style.webkitFilter = 'blur(10px)';
}

function setupRawImage(img) {
    img.style.opacity = 0;
    img.style.transition = 'opacity 300ms ease-in';
    img.style.position = 'absolute';    
    img.onload = function () {
        setTimeout(function () {
            
            img.style.opacity = 1;
            img.nextSibling.style.opacity = 0;
            
        }, 1000);
    };
}