window.onload = function () {
  //create HTMLCollection of all B6fmyf divs
  var searches = document.querySelectorAll(".B6fmyf" , ".LC20lb MMgsKf"); //videos not integrated yet because the video class can also show up for nomarl searches
  var links = [];
  
  iconUrl = chrome.runtime.getURL("/images/icon16.png");

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
      var body = document.querySelector("body");
      var summary = document.createElement("div");
      summary.className = ("tldr-summary");
      var shadow = document.querySelector("tldr-summary").createShadowRoot();
      var template = document.querySelector()
      body.appendChild(summary)
      });
      
    searches[i].appendChild(newDiv); //add tl;dr on the side
  }());


}
}


