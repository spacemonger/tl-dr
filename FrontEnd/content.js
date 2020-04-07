window.onload = function () {
  //create HTMLCollection of all B6fmyf divs
  var searches = document.querySelectorAll(".B6fmyf" , ".LC20lb MMgsKf");
  var links = [];
  
  iconUrl = chrome.runtime.getURL("images/16x16.png");

var i;
for (i = 0; i < searches.length; i++) {

  
  links[i] = searches[i].previousSibling.href;
  
  (function() {
    var newDiv = document.createElement("div");
    
    newDiv.innerHTML = '<img src="'+ iconUrl +'">';
    newDiv.className = ("tl-dr-sum-button");
    newDiv.setAttribute("data-url", links[i]);
    newDiv.addEventListener("click", function(){
      chrome.runtime.sendMessage(newDiv.dataset.url, (response) => {
        console.log(response);
      });
      });
      
    searches[i].appendChild(newDiv); //add tl;dr on the side
  }());

  console.log(links)
}
}


