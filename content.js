var searches = document.getElementsByClassName("B6fmyf");
var links = document.getElementsByClassName("r").getElementsById("a").href;


var i;
for (i = 0; i < searches.length; i++) {

  var newDiv = document.createElement("div");
  newDiv.innerText = "TL;DR" ;
  newDiv[i].setAttribute("data-url", links[i]);
  searches[i].appendChild(newDiv);
}
