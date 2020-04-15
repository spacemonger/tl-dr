
window.onload = function () {

  var tldr = document.createElement("div");
  tldr.id = ("tl-dr-popup");
  var shadowRoot =  tldr.attachShadow({mode:'open'});
  shadowRoot.innerHTML = `
  <div id="tl-dr-wrapper" style="visibility:hidden"></div>
  `;
  document.body.appendChild(tldr);


  //create HTMLCollection of all B6fmyf divs
  var searches = document.querySelectorAll(".B6fmyf" , ".LC20lb MMgsKf"); //videos not integrated yet because the video class can also show up for nomarl searches
  var links = [];

  iconUrl = chrome.runtime.getURL("/images/icon16.png");
  //template = chrome.runtime.getURL("/FrontEnd/summary.html");
  var template = `
  <style>
  #tl-dr-wrapper {
    visibility: visible;
    background-color: #F6F6F6; 
    width: 420px; 
    height: 210px; 
    overflow-x: hidden; 
    overflow-y: auto;
    text-align: center; 
    padding: 20px;
    right: 20px;
    top: 20px;
    position: fixed;
    font-size: 16px;
    z-index: 99999999; /*to order to the front should look into*/
    border: 0px;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    max-height: calc(100vh - 40px);
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.49);
    color: rgb(30,30,30);
  }
  </style>
  `
  /*
  <div id="tl-dr-content">
      <a>{{port}}</a>
  </div>
  */

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
            if(response){

        }
        console.log(response);

      });
      render(template, document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper'));
      document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper').style.visibility = "visible";
      });
      
    searches[i].appendChild(newDiv); //add tl;dr on the side
  }());

}

var render = function(template, node) {
    if (!node) return;
    node.innerHTML = template;
};
}


