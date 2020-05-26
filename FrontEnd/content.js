window.onload = function () {

  var tldr = document.createElement("div");
  tldr.id = ("tl-dr-popup");
  var shadowRoot =  tldr.attachShadow({mode:'open'});
  shadowRoot.innerHTML = `
  <div id="tl-dr-wrapper" style="visibility:hidden"></div>
  `;
  document.body.appendChild(tldr);


  //create HTMLCollection of all B6fmyf divs
  var searches = document.querySelectorAll(".B6fmyf"); //videos not integrated yet because the video class can also show up for normal searches
  console.log(searches);
  var links = [];

  iconUrl = chrome.runtime.getURL("/images/icon16.png");
  
  var opened=-1; //store whether the summary box is already displayed

  var i;
  for (i = 0; i < searches.length; i++) {
    
    links[i] = searches[i].previousSibling.href;
    
    (function() {
      var newDiv = document.createElement("div");
      
      newDiv.innerHTML = '<img src="'+ iconUrl +'">';
      newDiv.className = ("tl-dr-sum-button");
      newDiv.setAttribute("data-url", links[i]);
      searches[i].appendChild(newDiv); //add tl;dr on the side
    }());

  }

  var currentButton; //compare which summary is currently opened
  var tldrWrapper=document.querySelector('#tl-dr-popup').shadowRoot.querySelector('#tl-dr-wrapper'); //reduce bulk

  document.addEventListener("click", function(event){
    var targetButton=event.target.parentElement;

    if(event.target.closest('#tl-dr-popup')) return;
    if(event.target.closest('.tl-dr-sum-button')) {

      if (opened==-1 || (targetButton.className=='tl-dr-sum-button' && targetButton.dataset.url!=currentButton)) {

        currentButton=targetButton.dataset.url;

        render(templateLoading, tldrWrapper);
        tldrWrapper.style.visibility = "visible";      
        opened=0;

        var info = {link: targetButton.dataset.url, title: targetButton.dataset.title}
        
        chrome.runtime.sendMessage(info, (response) => {
          
          render(templateSummary, tldrWrapper);
          createTitle(response.title);

          console.log(response);
          var ts1=document.createElement("div");
          ts1.innerHTML = timeSaved(response.reduction["before"], response.reduction["after"], response.reduction["percentage"]);
          // ts1.innerHTML = "20 minutes saved (300 words → 2 words)";
          ts1.className="subtitle";
          tldrWrapper.querySelector('#header').appendChild(ts1);
          tldrWrapper.querySelector('#header').appendChild(document.createElement("div")); //next line
          var sp=document.createElement("div");
          sp.className="space";
          tldrWrapper.querySelector('#header').appendChild(sp);

          var y;
          var keyword="Keywords within this article: "; //initial string to collect & display keywords
          for (y in response.keywords) {
            keyword+=response.keywords[y];
            if (y!=response.keywords.length-1) {
              keyword+=", ";
            }
            y++;
          }

          var key=document.createElement("div");
          key.innerHTML = keyword;
          key.className = "keyword";
          tldrWrapper.querySelector('#header').appendChild(key);

          var x;
          for (x in response.paragraphs){

            console.log(response.paragraphs[x]);
            var sentence=document.createElement("p");
            sentence.innerHTML=response.paragraphs[x];
            tldrWrapper.querySelector('#content').appendChild(sentence); //add sentence to the summary box
            createSpace();
            x++;
          }

        });

        opened=0;

      } else {
        tldrWrapper.style.visibility = "hidden";
        opened=-1;
      }
      return;
    }
    tldrWrapper.style.visibility = "hidden";
    opened=-1;
  });

  var render = function(templateLoading, node) {
      if (!node) return;
      node.innerHTML = templateLoading;
  };

  var createTitle = function(tit) {
    var title=document.createElement("h1");
    title.className="title";
    title.innerHTML=tit;
    tldrWrapper.querySelector('#header').appendChild(title);
  }

  var createSpace = function() {
    var space=document.createElement("div"); //create spacing between each sentence
    space.className="space";
    tldrWrapper.appendChild(space);
    console.log("space");
  }

  var timeSaved = function(before, after, percentage) {
    // var saved=(before-after)/300; //you can read approx. 300 words/min.
    var bef1 = parseInt(before);
    var aft1 = parseInt(after);
    var minutes = Math.round((bef1-aft1)/300);
    if (minutes==1) {
      var sentence = minutes + " minute saved (" + before + " words → " + after + " words, reduced by " + percentage+")";
      return;
    }
    var sentence = minutes + " minutes saved (" + before + " words → " + after + " words, reduced by " + percentage+")";
    return sentence;
  }

    var templateSummary = `
    <style>
      #tl-dr-wrapper {
          visibility: visible;
          background-color: #F6F6F6; 
          width: 420px; 
          overflow-x: hidden; 
          overflow-y: auto;
          text-align: center; 
          padding: 40px;
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
      }

      .space {
        margin-top: 12px;
      }

      p {
        text-align: justify;
        font-family: questrial;
      }

      .title {
        text-align: left;
        font-family: questrial;
        font-style: bold;
        font-size: 25px;
        position: relative;
        margin-top: 35px;
        margin-bottom: 0px;
      }

      .credits {
        text-align: left;
        font-family: questrial;
        font-size: 13px;
        position: absolute;
        top: 50px;
        color: #6b6b6bff;
      }

      .creditPic {
        display: inline-block;
        position: absolute;
        top: 47px;
        left: 110px;
      }

      .subtitle {
        text-align: left;
        font-family: questrial;
        font-size: 15px;
        color: #adadadff;
      }

      .keyword {
        text-align: left;
        font-family: questrial;
        font-size: 15px;
        color: #6b6b6bff;
        font-style: italic;
      }
      
    </style>
    <div >
      <div id="header">
        <div class="credits">Summary by </div><img class="creditPic" align="left" src="https://i.imgur.com/woo8AEU.png"/>
      </div>
      <div id="content"> <!-- contains actual summary -->
      </div>
    </div>
    `
    
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

}
