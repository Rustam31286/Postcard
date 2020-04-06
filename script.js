let cursor = document.createElement("img");
$(cursor).attr("src","img/sprey.png")
          .css({
            "height": "150px",
            "position": "absolute"
          })
          .appendTo($("body"));

$(document).mousemove(moveCursor);

function moveCursor(e) {
  e.preventDefault();
  $(cursor).css({
    "top": (e.clientY + 5) + "px",
    "left": (e.clientX + 5) + "px",
  })
}

let windowBorder = document.querySelector(".windowBorder");
$(windowBorder).css({
                  "position": "fixed",
                  "top": 0,
                  "left": 0,
                  "height": document.documentElement.clientHeight, //documentElement
                  "width": document.documentElement.clientWidth,
                  "overflow": "hidden",
                })
                
let virusInterval = setInterval(createVirus, 500);
let virusKilled = 0;
function createVirus() {
  if ($(windowBorder).children().length >= 5) {
    return;
  }
  let virus = document.createElement("img");
  $(virus).attr("src", "img/virus.png")
          .css({
            "height": "100px",
            "width": "100px",
            "position": "absolute",
            "top": "-150px",
            "left": Math.floor(Math.random() * ($(windowBorder).width()-100)),
          })
          .appendTo($(windowBorder));
  let maxHeight = document.documentElement.clientHeight + 150;
  let virusDropInterval = setInterval(() => {
    let virusTop = parseInt($(virus).css("top"));
    if (virusTop < maxHeight) {
      $(virus).css("top", virusTop + 1 + "px");
    } else {
      virus.remove();
      clearInterval(virusDropInterval);
    }
  }, 10 + Math.floor(Math.random()*17));
  virus.onclick = () => {
    let virusCoords = virus.getBoundingClientRect();
    let virusTop = virusCoords.y;
    let virusLeft = virusCoords.x;
    virus.remove();
    let pop = document.createElement("img");
    $(pop).attr("src", "img/pop.gif")
          .css({
            "height": "100px",
            "width": "100px",
            "position": "absolute",
            "top": virusTop +"px",
            "left": virusLeft +"px",
          })
          .appendTo($(windowBorder));
    let popTimeout = setTimeout(() => {pop.remove()} , 500)
    killVirus();
  }
}

function killVirus() {
  virusKilled++;
  $(".virusKilled").html(virusKilled);
  if (virusKilled >= 50) {
    alert("Вы победили вирус!");
    virusKilled = 0;
  }
}







