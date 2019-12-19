main();

async function getData(url) {
  const response = await fetch(url);

  return response.json();
}

async function main() {
  let url = "./js/data.json";
  const data = await getData(url);
  

  var arrayData = [data.mylist, data.recommendations];
  var listContainer = document.querySelectorAll('.list-container');
  arrayData.forEach(function(data, j){
    console.log(listContainer[j]);
    var myLists = listContainer[j];
    for (var i = 0; i < data.length; i++) {
  
      // Wrapping Div with class atvImg
      let atvImgDiv = document.createElement("div");
      atvImgDiv.setAttribute("class", "atvImg");
  
      // Image
      let myListsImg = document.createElement("img");
      myListsImg.setAttribute("src", data[i].img);
  
      // Divs for effects
      let effectDiv1 = document.createElement("div");
      effectDiv1.setAttribute("class", "atvImg-layer");
      effectDiv1.setAttribute(
        "data-img",
        data[i].img
      );
  
      let effectDiv2 = document.createElement("div");
      effectDiv2.setAttribute("class", "atvImg-layer");
      effectDiv2.setAttribute(
        "data-img",
        data[i].img
      );
  
      let title = document.createElement('h3');
      title.setAttribute('data-title', data[i].title);
      title.className = 'title';
  
      let button = document.createElement('button');
      if(j==0){
        button.setAttribute('data-text', "Remove");
        button.setAttribute('data-class', 'btn btn-remove');
      }
      else{
        button.setAttribute('data-text', "Add");
        button.setAttribute('data-class', 'btn btn-add');
      }
        
      button.setAttribute('data-id', data[i].id);
      
  
      atvImgDiv.append(myListsImg);
      atvImgDiv.append(effectDiv1);
      atvImgDiv.append(effectDiv2);
      atvImgDiv.append(title);
      atvImgDiv.append(button);
    
      myLists.append(atvImgDiv);
    }
  });
  

  
  atvImg();
}

function atvImg() {
  var d = document,
    de = d.documentElement,
    bd = d.getElementsByTagName("body")[0],
    win = window,
    imgs = d.querySelectorAll(".atvImg"),
    totalImgs = imgs.length,
    supportsTouch = "ontouchstart" in win || navigator.msMaxTouchPoints;

  if (totalImgs <= 0) {
    return;
  }

  // build HTML
  for (var l = 0; l < totalImgs; l++) {
    var thisImg = imgs[l],
      layerElems = thisImg.querySelectorAll(".atvImg-layer"),
      totalLayerElems = layerElems.length,
      title = thisImg.querySelectorAll('.title'),
      cta = thisImg.querySelectorAll('button');
      // console.log(thisImg);
    if (totalLayerElems <= 0) {
      continue;
    }

    while (thisImg.firstChild) {
      thisImg.removeChild(thisImg.firstChild);
    }

    var containerHTML = d.createElement("div"),
      shineHTML = d.createElement("div"),
      shadowHTML = d.createElement("div"),
      layersHTML = d.createElement("div"),
      layers = [];

    thisImg.id = "atvImg__" + l;
    containerHTML.className = "atvImg-container";
    shineHTML.className = "atvImg-shine";
    shadowHTML.className = "atvImg-shadow";
    layersHTML.className = "atvImg-layers";

    for (var i = 0; i < totalLayerElems; i++) {
      var layer = d.createElement("div"),
        imgSrc = layerElems[i].getAttribute("data-img");

      layer.className = "atvImg-rendered-layer";
      layer.setAttribute("data-layer", i);
      layer.style.backgroundImage = "url(" + imgSrc + ")";
      layersHTML.appendChild(layer);

      layers.push(layer);
    }

    var h3 = document.createElement('h3');
    h3.className = "title";
    h3.innerText = title[0].getAttribute("data-title");   

    let button = document.createElement('button');
    button.innerText = cta[0].getAttribute("data-text");
    button.setAttribute("data-id", cta[0].getAttribute("data-id"));
    button.className = cta[0].getAttribute("data-class");


    containerHTML.appendChild(shadowHTML);
    containerHTML.appendChild(layersHTML);
    containerHTML.appendChild(shineHTML);
    thisImg.appendChild(containerHTML);
    thisImg.appendChild(h3);
    thisImg.appendChild(button);

    var w = thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
    thisImg.style.transform = "perspective(" + w * 3 + "px)";

    if (supportsTouch) {
      win.preventScroll = false;

      (function(_thisImg, _layers, _totalLayers, _shine) {
        thisImg.addEventListener("touchmove", function(e) {
          if (win.preventScroll) {
            e.preventDefault();
          }
          processMovement(e, true, _thisImg, _layers, _totalLayers, _shine);
        });
        thisImg.addEventListener("touchstart", function(e) {
          win.preventScroll = true;
          processEnter(e, _thisImg);
        });
        thisImg.addEventListener("touchend", function(e) {
          win.preventScroll = false;
          processExit(e, _thisImg, _layers, _totalLayers, _shine);
        });
      })(thisImg, layers, totalLayerElems, shineHTML);
    } else {
      (function(_thisImg, _layers, _totalLayers, _shine) {
        thisImg.addEventListener("mousemove", function(e) {
          processMovement(e, false, _thisImg, _layers, _totalLayers, _shine);
        });
        thisImg.addEventListener("mouseenter", function(e) {
          processEnter(e, _thisImg);
        });
        thisImg.addEventListener("mouseleave", function(e) {
          processExit(e, _thisImg, _layers, _totalLayers, _shine);
        });
      })(thisImg, layers, totalLayerElems, shineHTML);
    }
  }

  function processMovement(e, touchEnabled, elem, layers, totalLayers, shine) {
    var bdst = bd.scrollTop,
      bdsl = bd.scrollLeft,
      pageX = touchEnabled ? e.touches[0].pageX : e.pageX,
      pageY = touchEnabled ? e.touches[0].pageY : e.pageY,
      offsets = elem.getBoundingClientRect(),
      w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth, // width
      h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight, // height
      wMultiple = 320 / w,
      offsetX = 0.52 - (pageX - offsets.left - bdsl) / w, //cursor position X
      offsetY = 0.52 - (pageY - offsets.top - bdst) / h, //cursor position Y
      dy = pageY - offsets.top - bdst - h / 2, //@h/2 = center of container
      dx = pageX - offsets.left - bdsl - w / 2, //@w/2 = center of container
      yRotate = (offsetX - dx) * (0.07 * wMultiple), //rotation for container Y
      xRotate = (dy - offsetY) * (0.1 * wMultiple), //rotation for container X
      imgCSS = "rotateX(" + xRotate + "deg) rotateY(" + yRotate + "deg)", //img transform
      arad = Math.atan2(dy, dx), //angle between cursor and center of container in RAD
      angle = (arad * 180) / Math.PI - 90; //convert rad in degrees

    //get angle between 0-360
    if (angle < 0) {
      angle = angle + 360;
    }

    //container transform
    if (elem.firstChild.className.indexOf(" over") != -1) {
      imgCSS += " scale3d(1.07,1.07,1.07)";
    }
    elem.firstChild.style.transform = imgCSS;

    //gradient angle and opacity for shine
    shine.style.background =
      "linear-gradient(" +
      angle +
      "deg, rgba(255,255,255," +
      ((pageY - offsets.top - bdst) / h) * 0.4 +
      ") 0%,rgba(255,255,255,0) 80%)";
    shine.style.transform =
      "translateX(" +
      offsetX * totalLayers -
      0.1 +
      "px) translateY(" +
      offsetY * totalLayers -
      0.1 +
      "px)";

    //parallax for each layer
    var revNum = totalLayers;
    for (var ly = 0; ly < totalLayers; ly++) {
      layers[ly].style.transform =
        "translateX(" +
        offsetX * revNum * ((ly * 2.5) / wMultiple) +
        "px) translateY(" +
        offsetY * totalLayers * ((ly * 2.5) / wMultiple) +
        "px)";
      revNum--;
    }
  }

  function processEnter(e, elem) {
    elem.firstChild.className += " over";
  }

  function processExit(e, elem, layers, totalLayers, shine) {
    var container = elem.firstChild;

    container.className = container.className.replace(" over", "");
    container.style.transform = "";
    shine.style.cssText = "";

    for (var ly = 0; ly < totalLayers; ly++) {
      layers[ly].style.transform = "";
    }
  }
}
