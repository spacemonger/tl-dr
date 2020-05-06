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
  
  var opened=-1; //store whether the summary box is already displayed

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
      searches[i].appendChild(newDiv); //add tl;dr on the side
    }());

  }

  var currentButton; //compare which summary is currently opened

  document.addEventListener("click", function(event){
    var targetButton=event.target.parentElement;

    if(event.target.closest('#tl-dr-popup')) return;
    if(event.target.closest('.tl-dr-sum-button')) {

      if (opened==-1 || event.target.parentElement.dataset.url!=currentButton) {

        currentButton=event.target.parentElement.dataset.url;

        render(templateLoading, document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper'));
        document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper').style.visibility = "visible";      
        opened=0;

        if (targetButton==null) {
          console.log("u suck");
        }

        var info = {link: targetButton.dataset.url, title: targetButton.dataset.title}
        chrome.runtime.sendMessage(info, (response) => {
          
          render(templateSummary, document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper'));
          var title=document.createElement("h1");
          title.className="title";
          title.innerHTML="Placeholder Title";
          document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper').appendChild(title);
          var x;
          for (x in response.paragraphs){

            console.log(response.paragraphs[x]);
            //summary[x] = response.paragraphs[x];
            var sentence=document.createElement("span");
            sentence.innerHTML=response.paragraphs[x];
            document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper').appendChild(sentence); //add sentence to the summary box
            var space=document.createElement("div"); //create spacing between each sentence
            space.className="space";
            document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper').appendChild(space);
            x++;

          }

        });
        
        opened=0;
        
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

    var templateSummary = `
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

      .space {
        margin-top: 15px;
      }

      span {
        text-align: left;
        font-family: questrial;
      }

      .title {
        text-align: center;
        font-family: questrial;
        font-size: 20px;
      }

    </style>
    <div id="tl-dr-summary">
    </div>
    `
}
