
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
     var xhttp = new XMLHttpRequest();
     
     xhttp.open("POST", "http://127.0.0.1:5000/test", true);

     xhttp.send(request); 

    sendResponse(request);
});


