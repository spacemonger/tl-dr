/*
class TldrBox extends HTMLElement {
  constructor() {
    super();
    // element created
    const shadowRoot =  this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
    :host {
      display: block;
      visbility: hidden;
    }
    <div id="tldr-wrapper"></div>
    `;
  }

  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  disconnectedCallback() {
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  static get observedAttributes() {
    return [ array of attribute names to monitor for changes];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }

  adoptedCallback() {
    // called when the element is moved to a new document
    // (happens in document.adoptNode, very rarely used)
  }

  // there can be other element methods and properties
}
customElements.define("tldr-box", TldrBox);
special element could be implemented in the future, but most likely not
*/

window.onload = function () {

  var tldr = document.createElement("div");
  tldr.id = ("tl-dr-popup");
  var shadowRoot =  tldr.attachShadow({mode:'open'});
  shadowRoot.innerHTML = `
  <div id="tl-dr-wrapper" style="visibility:hidden"></div>`;
  document.body.appendChild(tldr);


  //create HTMLCollection of all B6fmyf divs
  var searches = document.querySelectorAll(".B6fmyf" , ".LC20lb MMgsKf"); //videos not integrated yet because the video class can also show up for nomarl searches
  var links = [];

  iconUrl = chrome.runtime.getURL("/images/icon16.png");
  //template = chrome.runtime.getURL("/FrontEnd/summary.html");

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
      document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper').style.visibility = "visible";
      });
      
    searches[i].appendChild(newDiv); //add tl;dr on the side
  }());

}
}


