
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
     
  const serverUrl = "http://localhost:5000/"

  fetch(serverUrl + "?url=" + request.link, {
    method: 'POST',
    origin: '*',
    mode: "cors",
    body: JSON.stringify({url: request.link}),
    headers:{
      'Content-Type': 'application/json'
    } })
  .then((response) => { 
    console.log("ran")
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


