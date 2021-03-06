
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
     
  const serverUrl = "http://127.0.0.1:5000/api"
  
  fetch(serverUrl + "?url=" + request.link, {
    method: 'POST',
    mode: "cors",
    body: JSON.stringify(request),
    headers:{
      'Content-Type': 'application/json'
    } })
  .then((response) => { 
    console.log(response)
    return response.json() 
  })
  .then((summary) => {
    console.log(summary)
    sendResponse(summary)
  })
  .catch(error => console.error('Error:', error));
  //sendResponse(serverUrl + "?url=" + request.link + request.title)

return true;
});


