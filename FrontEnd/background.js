
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
     
  const serverUrl = "http://127.0.0.1:5000/api"
  
  fetch(serverUrl + "?" + request, {
    params: request,
    method: 'POST',
    mode: "cors",
    body: JSON.stringify(request),
    headers:{
      'Content-Type': 'application/args'
    } })
  .then((data) => { 
    if (!data.ok) {
      sendResponse("error")
    }
    return data.json() })
  .then(function(summary) {
       sendResponse(summary["data"]);
  })
  .catch(error => console.error('Error:', error));
  sendResponse(serverUrl + "?" + request)

return true;
});


