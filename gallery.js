var galleryData = null;
var galleryPointer = -1;

//vars for DOM elements manipulation
var guiLoader = null;
var guiImageContainer = null
var guiImage = null;

var lock = 0; //used to lock keys action when image is loading

//just 1 black pixel image, used to replace last one when jumping from thumbnails to image view
var blackImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

//wrapper for XHMHttpRequest
function getData(item, callback){
    var request = new XMLHttpRequest();
    request.timeout = 2000; //wait 2 seconds
    request.open('GET', item, true);
    request.onreadystatechange = function(){
        if (request.readyState === 4){
            if(request.status === 200){
                callback(request.response);
            }
        }
    };
    request.send();
}

getData("data.json",initGallery);

//After receiving gallery data, init takes place there.
function initGallery(data){
  galleryData = JSON.parse(data)["images"];

  //get gui elements from DOM
  guiLoader = document.getElementById("loader");
  guiImageContainer = document.getElementById("image-gui");
  guiImage = document.getElementById("image");

  generateThumbnails();
  parseUriParams();

  //attach events
  var prevKey = document.getElementById("previous");
  var nextKey = document.getElementById("next");

  prevKey.addEventListener("click", prevImage);
  nextKey.addEventListener("click", nextImage);

  window.onhashchange = parseUriParams;
  document.onkeydown = checkKey;
}

//Populates thumbnails view
function generateThumbnails(){
  var guiThumbnails = document.getElementById("thumbnails-container");

  galleryData.forEach( function(image, index){
    var span = document.createElement("a");
    span.href="#" + index;
    span.className += "thumb";
    span.style.backgroundImage = 'url("thumb/' + image + '")';

    guiThumbnails.appendChild(span);
  });
}

//Parses arguments in URI passed after hash character.
function parseUriParams(){
  url = document.location.hash.substr(1);

  switch(url){
    case "thumbs": //show thumbnails
    case "":
      toggleGuiImage(0);
      break;
    default: //try to parse it as image number
      var image = parseInt(url);
      if((image >= 0) && (image < galleryData.length)){
        galleryPointer = image;
        loadImage();
        }
  }
}

/*
 * loads image to cache and when image is loaded, displays it.
 * Does not verify boundaries, verification must be done in calling function.
 */
function loadImage(){
    /*
     * When switching from thumbs to image, load black img before showing gui.
     * Otherwise last shown image would be displayed before selected one loads.
     */
    if(guiImageContainer.style.display != "block"){
        guiImage.src = blackImage;
        toggleGuiImage(1);
    }
    var src = "./photo/" + galleryData[galleryPointer];
    var img = new Image();

    toggleGuiLoader(1);
    img.onload = function(){ //image is loaded to cache
        document.location.hash = galleryPointer; //update URI to current image

        guiImage.src = src;
        toggleGuiLoader(0);
    }
    img.src = src; //load image to cache
}

function nextImage(){
  if(lock || (galleryPointer + 1 >= galleryData.length)) return;
  ++galleryPointer;
  loadImage();
}

function prevImage(){
  if(lock || (galleryPointer <= 0)) return;
  --galleryPointer;
  loadImage();
}

function toggleGuiLoader(mode){
  lock = mode;
  guiLoader.style.opacity = mode;
}

function toggleGuiImage(show){
  guiImageContainer.style.display = (show ? "block" : "none");
}

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
       prevImage();
    }
    else if (e.keyCode == '39') {
       nextImage();
    }
}
