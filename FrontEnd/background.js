
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
     
  const api_url = "http://127.0.0.1:5000/api"
  
  fetch(api_url, {
    method: 'POST',
    body: JSON.stringify(request),
    headers:{
      'Content-Type': 'application/json'
    } })
  .then(data => { return data.json() })
  .then(function(summary) {
       text = summary.json["data"];
  })
  .catch(error => console.error('Error:', error));

  sendResponse(request)

return true;
});


