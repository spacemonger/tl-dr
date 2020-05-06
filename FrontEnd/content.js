window.onload = function () {

  var tldr = document.createElement("div");
  tldr.id = ("tl-dr-popup");
  var shadowRoot =  tldr.attachShadow({mode:'open'});
  shadowRoot.innerHTML = `
  <div id="tl-dr-wrapper" style="visibility:hidden"></div>
  `;
  document.body.appendChild(tldr);


  //create HTMLCollection of all B6fmyf divs
  var searches = document.querySelectorAll(".B6fmyf"); //videos not integrated yet because the video class can also show up for nomarl searches
  var searchTitles = document.querySelectorAll(".LC20lb");
  console.log(searches);
  console.log(searchTitles);
  var links = [];
  var titles = [];

  iconUrl = chrome.runtime.getURL("/images/icon16.png");
  //template = chrome.runtime.getURL("/FrontEnd/summary.html");
<<<<<<< HEAD
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
  <div id="tl-dr-content">
</div>
  `
  
 
  

var i;
for (i = 0; i < searches.length; i++) {

  
  links[i] = searches[i].previousSibling.href;
  titles[i] = searches[i].previousSibling.innerText;
  
  (function() {
    var newDiv = document.createElement("div");
    
    newDiv.innerHTML = '<img src="'+ iconUrl +'">';
    newDiv.className = ("tl-dr-sum-button");
    newDiv.setAttribute("data-url", links[i]);
    newDiv.setAttribute("data-title", titles[i]);
    newDiv.addEventListener("click", function(){
    var info = {link: newDiv.dataset.url, title: newDiv.dataset.title}
      chrome.runtime.sendMessage(info, (response) => {
            if(response){

        }
        
        var x;
        for (x in response.paragraphs){
          console.log(response.paragraphs[x]);
          var new_par = document.createElement("p");
          new_par.innerText = response.paragraphs[x];
          //var par_id = "new_par" + x;
          //new_par.id = par_id; 
          document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper').appendChild(new_par);
          x++;
        }

      });
      });
=======
  
 var templateLoading = `
    <style>
    #tl-dr-wrapper {
        visibility: visible;
        background-color: #F6F6F6; 
        width: 420px; 
        height: 130px; 
        overflow-x: hidden; 
        overflow-y: auto;
        text-align: center; 
        padding: 20px;
        right: 20px;
        top: 20px;
        position: fixed;
        font-size: 16px;
        z-index: 99999999; 
        border: 0px;
        border-radius: 10px;
        margin-left: auto;
        margin-right: auto;
        max-height: calc(100vh - 40px);
        box-shadow: 0 2px 5px 0 rgba(0,0,0,0.49);
        color: rgb(30,30,30);
    }

    @font-face {
        font-family: 'questrial';
        src: url(/fonts/Questrial-Regular.ttf);
        font-style: normal;
        font-weight: normal;
    }

    @keyframes loading {
        from {
            transform: rotate(0deg);
        } to {
            transform: rotate(359deg);
        }
    }

    @keyframes order {
      0% {
        opacity: 1;
      } 19% {
        opacity: 1 ;
      } 20% {
        opacity: 0;
      } 90% {
        opacity: 0;
      } 91% {
        opacity: 1;
      }
    }

    .text {
      font-size: 20px;
      font-family: questrial;
      font-style: "bold";
    }
   
    .images {
      position: relative;
      top: 12px;
      left: 170px;
      height: 75px;
      width: 75px;
    }

    .blue {
      animation: loading 2s infinite, order 8s infinite;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 4;
    }

    .red {
      animation: loading 2s infinite, order 8s 2s infinite;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 3;
    }

    .yellow {
      animation: loading 2s infinite, order 8s 4s infinite;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 2;
    }

    .green {
      animation: loading 2s infinite, order 8s 6s infinite;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 1;
    }

    .first {
      animation: ellipsis1 2s infinite;
      margin-left: 1px;
    }

    .second {
      animation: ellipsis2 2s infinite;
      margin-left: 1px;
    }

    .third {
      animation: ellipsis3 2s infinite;
      margin-left: 1px;
    }

    @keyframes ellipsis1 {
      0% {
        opacity:0;
      } 10% {
        opacity: 1;
      }
    }

    @keyframes ellipsis2 {
      0% {
        opacity:0;
      } 50% {
        opacity: 1;
      }
    }

    @keyframes ellipsis3 {
      0% {
        opacity:0;
      } 90% {
        opacity: 1;
      }
    }

    </style>
    <div id="tl-dr-content">
        <span class="text">Just a Moment</h1><span class="first">.</span><span class="second">.</span><span class="third">.</span>
        <div class="images"> 
          <img class="blue" src="https://i.imgur.com/LNqAd7q.png"/>
          <img class="red" src="https://i.imgur.com/R1dj1pI.png"/>
          <img class="yellow" src="https://i.imgur.com/nAzAzih.png"/>
          <img class="green" src="https://i.imgur.com/zBYhhc7.png"/>
        </div>
    </div> `

  var i;
  for (i = 0; i < searches.length; i++) {
    links[i] = searches[i].previousSibling.href;
    
    (function() {
      var newDiv = document.createElement("div");
>>>>>>> 770a730f28e8e9340e8eb7f9cfc44ef1bb5672e3
      
      newDiv.innerHTML = '<img src="'+ iconUrl +'">';
      newDiv.className = ("tl-dr-sum-button");
      newDiv.setAttribute("data-url", links[i]);
      newDiv.addEventListener("click", function(){
        chrome.runtime.sendMessage(newDiv.dataset.url, (response) => {
              if(response){

          }
          console.log(response);

        });
        });
        
      searches[i].appendChild(newDiv); //add tl;dr on the side
    }());

  }

  var opened=-1; //store whether the summary box is already displayed
  document.addEventListener("click", function(event){
    if(event.target.closest('#tl-dr-popup')) return;
    if(event.target.closest('.tl-dr-sum-button')) {
      if (opened==-1) {
        render(templateLoading, document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper'));
        document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper').style.visibility = "visible";      
        opened=0;
            
        // var loadingIcon = document.getElementById('loading');
        // loadingIcon.src = chrome.runtime.getURL("/images/loading-yellow.png");
      } else {
        document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper').style.visibility = "hidden";
        opened=-1;
      }
      return;
    }
    document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper').style.visibility = "hidden";
  });

  var render = function(templateLoading, node) {
      if (!node) return;
      node.innerHTML = templateLoading;
  };
}
