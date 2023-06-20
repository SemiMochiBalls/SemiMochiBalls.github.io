"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: 
      Date:   

      Filename: js05.js
*/

window.addEventListener("load", createLightbox);
let favoritePictures = [];
let errorOverlay = null;

function addToFavorites(picture) {
   if (favoritePictures.length >= 3) {
       console.log("Cannot add more than three pictures to favorites.");
       displayErrorMessage("Cannot add more than three pictures to favorites.");
       return;
   }

   if (favoritePictures.includes(picture)) {
       console.log("Image is already in favorites list.");
       displayErrorMessage("Image is already in favorites list.");
       return;
   }

   favoritePictures.push(picture);
   console.log("Added to favorites:", picture);
   displayFavorites();
}

function displayErrorMessage(message) {
   // Create the popup overlay element
   let overlay = document.createElement("div");
   overlay.classList.add("popup-overlay");

   // Create the error message container
   let errorMessage = document.createElement("div");
   errorMessage.classList.add("error-message");
   errorMessage.textContent = message;

   // Create the close button
   let closeButton = document.createElement("span");
   closeButton.classList.add("close-button");
   closeButton.innerHTML = "&times;";
   closeButton.addEventListener("click", function () {
       overlay.remove();
   });

   // Append the error message and close button to the overlay
   overlay.appendChild(errorMessage);
   overlay.appendChild(closeButton);

   // Append the overlay to the document body
   document.body.appendChild(overlay);
}

function createLightbox() {
    // Lightbox Container
    let lightBox = document.getElementById("lightbox");

    // Parts of the lightbox
    let lbTitle = document.createElement("h1");
    let lbCounter = document.createElement("div");
    let lbPrev = document.createElement("div");
    let lbNext = document.createElement("div");
    let lbPlay = document.createElement("div");
    let lbImages = document.createElement("div");
    let slidesTitle = "My Slideshow";

    // Design the lightbox title
    lightBox.appendChild(lbTitle);
    lbTitle.id = "lbTitle";
    lbTitle.textContent = lightboxTitle;

    // Design the lightbox slide counter
    lightBox.appendChild(lbCounter);
    lbCounter.id = "lbCounter";
    let currentImg = 1;
    lbCounter.textContent = currentImg + " / " + imgCount;

    // Design the lightbox previous slide button
    lightBox.appendChild(lbPrev);
    lbPrev.id = "lbPrev";
    lbPrev.innerHTML = "&#9664;";
    lbPrev.onclick = showPrev;

    // Design the lightbox next slide button
    lightBox.appendChild(lbNext);
    lbNext.id = "lbNext";
    lbNext.innerHTML = "&#9654;";
    lbNext.onclick = showNext;

    // Design the lightbox Play-Pause button
    lightBox.appendChild(lbPlay);
    lbPlay.id = "lbPlay";
    lbPlay.innerHTML = "&#9199;";
    let timeID;
    lbPlay.onclick = function () {
        if (timeID) {
            // Stop the slideshow
            window.clearInterval(timeID);
            timeID = undefined;
        } else {
            // Start the slideshow
            showNext();
            timeID = window.setInterval(showNext, 1500);
        }
    }

    // Design the lightbox images container
    lightBox.appendChild(lbImages);
    lbImages.id = "lbImages";

    // Add images from the imgFiles array to the container
    for (let i = 0; i < imgCount; i++) {
        let image = document.createElement("img");
        image.src = imgFiles[i];
        image.alt = imgCaptions[i];
        image.onclick = createOverlay;
        lbImages.appendChild(image);
    }

    // Function to move forward through the image list
    function showNext() {
        lbImages.appendChild(lbImages.firstElementChild);
        (currentImg < imgCount) ? currentImg++ : currentImg = 1;
        lbCounter.textContent = currentImg + " / " + imgCount;
    }

    // Function to move backward through the image list
    function showPrev() {
        lbImages.insertBefore(lbImages.lastElementChild, lbImages.firstElementChild);
        (currentImg > 1) ? currentImg-- : currentImg = imgCount;
        lbCounter.textContent = currentImg + " / " + imgCount;
    }
function displayFavorites() {
  let favoritesList = document.getElementById("favoritesList");

  // Clear the previous content of the favorites list
  favoritesList.innerHTML = "";

  for (let i = 0; i < favoritePictures.length; i++) {
    let imgElement = document.createElement("img");
    imgElement.src = favoritePictures[i];
    imgElement.alt = "Favorite Picture";

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button"); // Add the CSS class for styling
    removeButton.addEventListener("click", function () {
      removeFavorite(i);
    });

    let listItem = document.createElement("li");
    listItem.appendChild(imgElement);
    listItem.appendChild(removeButton);
    favoritesList.appendChild(listItem);
  }
}

  
  function removeFavorite(index) {
      favoritePictures.splice(index, 1);
      displayFavorites();
  }
      function createOverlay() {
      for (let i = 0; i < favoritePictures.length; i++) {
          let listItem = document.createElement("li");
          listItem.textContent = favoritePictures[i];
          favoritesList.appendChild(listItem);
      }
  }
    function createOverlay() {
        let overlay = document.createElement("div");
        overlay.id = "lbOverlay";

        // Add the figure box to the overlay
        let figureBox = document.createElement("figure");
        overlay.appendChild(figureBox);

        // Add the image to the figure box
        let overlayImage = this.cloneNode(true);
        figureBox.appendChild(overlayImage);

        // Add the caption to the figure box
        let overlayCaption = document.createElement("figcaption");
        overlayCaption.textContent = this.alt;
        figureBox.appendChild(overlayCaption);

        // Add a close button to the overlay
        let closeBox = document.createElement("div");
        closeBox.id = "lbOverlayClose";
        closeBox.innerHTML = "&times;";
        closeBox.onclick = function () {
            document.body.removeChild(overlay);
        };
        overlay.appendChild(closeBox);

        // Add an add to favorites button to the overlay
               let addFavoriteBox = document.createElement("div");
               addFavoriteBox.id = "lbAddFavorite";
               addFavoriteBox.textContent = "Add to Favorites";
               addFavoriteBox.onclick = function (event) {
                  event.preventDefault(); 
                  event.stopPropagation(); 
                  addToFavorites(overlayImage.src); 
                  displayFavorites();
              };
              
        overlay.appendChild(addFavoriteBox);
        document.body.appendChild(overlay);
    }
}

window.addEventListener("load", setupGallery);

function setupGallery() {
    let imageCount = imgFiles.length;
    let galleryBox = document.getElementById("gallery");
    let currentSlide = 1;
    let runShow = true;
    let showRunning;

    let galleryTitle = document.createElement("h1");
    galleryTitle.id = "galleryTitle";
    galleryTitle.textContent = slidesTitle;
    galleryBox.appendChild(galleryTitle);

    let slideCounter = document.createElement("div");
    slideCounter.id = "slideCounter";
    slideCounter.textContent = currentSlide + "/" + imageCount;
    galleryBox.appendChild(slideCounter);

    let leftBox = document.createElement("div");
    leftBox.id = "leftBox";
    leftBox.innerHTML = "&#9664;";
    leftBox.onclick = moveToLeft;
    galleryBox.appendChild(leftBox);

    let rightBox = document.createElement("div");
    rightBox.id = "rightBox";
    rightBox.innerHTML = "&#9654;";
    rightBox.onclick = moveToRight;
    galleryBox.appendChild(rightBox);

    let playPause = document.createElement("div");
    playPause.id = "playPause";
    playPause.innerHTML = "&#9199;";
    playPause.onclick = startStopShow;
    galleryBox.appendChild(playPause);

    let slideBox = document.createElement("div");
    slideBox.id = "slideBox";
    galleryBox.appendChild(slideBox);

    for (let i = 0; i < imageCount; i++) {
        let image = document.createElement("img");
        image.src = imgFiles[i];
        image.alt = imgCaptions[i];
        image.onclick = createModal;
        slideBox.appendChild(image);
    }

    function moveToRight() {
        let firstImage = slideBox.firstElementChild.cloneNode(true);
        firstImage.onclick = createModal;
        slideBox.appendChild(firstImage);
        slideBox.removeChild(slideBox.firstElementChild);
        currentSlide++;
        if (currentSlide > imageCount) {
            currentSlide = 1;
        }
        slideCounter.textContent = currentSlide + " / " + imageCount;
    }

    function moveToLeft() {
        let lastImage = slideBox.lastElementChild.cloneNode(true);
        lastImage.onclick = createModal;
        slideBox.removeChild(slideBox.lastElementChild);
        slideBox.insertBefore(lastImage, slideBox.firstElementChild);
        currentSlide--;
        if (currentSlide === 0) {
            currentSlide = imageCount;
        }
        slideCounter.textContent = currentSlide + " / " + imageCount;
    }

    function startStopShow() {
        if (runShow) {
            showRunning = window.setInterval(moveToRight, 2000);
            runShow = false;
        } else {
            window.clearInterval(showRunning);
            runShow = true;
        }
    }

    function createModal() {
        let modalWindow = document.createElement("div");
        modalWindow.id = "activeModal";
        let figureBox = document.createElement("figure");
        modalWindow.appendChild(figureBox);

        let modalImage = this.cloneNode(true);
        figureBox.appendChild(modalImage);

        let figureCaption = document.createElement("figcaption");
        figureCaption.textContent = modalImage.alt;
        figureBox.appendChild(figureCaption);

        let closeBox = document.createElement("div");
        closeBox.id = "modalClose";
        closeBox.innerHTML = "&times;";
        closeBox.onclick = function () {
            document.body.removeChild(modalWindow);
        }

        modalWindow.appendChild(closeBox);

        document.body.appendChild(modalWindow);
    }
}
