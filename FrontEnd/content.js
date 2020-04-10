window.onload = function () {
  //create HTMLCollection of all B6fmyf divs
  var searches = document.querySelectorAll(".B6fmyf" , ".LC20lb MMgsKf"); //videos not integrated yet because the video class can also show up for nomarl searches
  var links = [];

  var template = [
   '<link rel="stylesheet" type="text/css" href="/FrontEnd/summary.css">', 
        '<div class="tldr-scroll">',
        '<div class="tldr-content">',
            '<div class="tldr-image">',
            '</div>',
            '<div class="tldr-iconDiv">',
                '<a style="display: flex; align-items: center; text-decoration: none;">',
                    '<img src="/images/icon32.png"/>',
                    '<span>Summary by <b>TL;DR</b></span>',
                '</a>',
            '</div>',
            '<a href="" style="font-size: 18px; font-weight: 700;text-decoration: none;">',
            '</a>',
            '<div class="">',
            '</div>',
        '</div>'
  ]
  
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
      
      body.appendChild(summary)
      });
      
    searches[i].appendChild(newDiv); //add tl;dr on the side
  }());


}
}


