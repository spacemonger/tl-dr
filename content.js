window.onload = function () {
  //create HTMLCollection of all B6fmyf divs
  var searches = document.querySelectorAll(".B6fmyf");
  var links = [];

var i;
for (i = 0; i < searches.length; i++) {

  links[i] = searches[i].previousSibling.href;
  
  var newDiv = document.createElement("div");
  newDiv.innerText = "TL;DR" ;
  newDiv.className = ("tl-dr-sum-button");
  newDiv.setAttribute("data-url", links[i]);
  console.log(links[i]);

  searches[i].appendChild(newDiv); //add tl;dr on the side
  
  searches[i].querySelector(".tl-dr-sum-button").addEventListener("click", function(){
    console.log(links[i]);
  });
  }
}


