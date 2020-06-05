const http = require('http');
const url = require('url');
const puppeteer = require('puppeteer');

const hostname = 'localhost';
const port = 5000;

const server = http.createServer((req, res) => {

  // const headers = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
  //   'Access-Control-Max-Age': 2592000, // 30 days
  //   /** add other headers too */
  // };

  if(req.method === "POST" || req.method === "GET"){
    res.setHeader("Access-Control-Allow-Origin",  "*");
    res.setHeader("Access-COntrol-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json');

    // var response = {
    //   "title": search.title,
    //   "link": search,
    //   "text": scrape(search.url)
    // }
    console.log(req.body)
  
    var search = url.parse(req.url,true).query;
    console.log(search.url);
    // scrape(search.url).then(text => {
    //   console.log("ran")
    //   res.write(text)
    //   console.log("hunh")
    //   res.end()
    // });
    res.write(search.url)
    res.end()
    //console.log(res)
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function scrape(searched) {

  try{
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(searched, {waitUntil: "domcontentloaded"});
    const html = await page.content();
    
    //await browser.close();
    return html;
  } catch(err) {
    console.log("error")
    console.log(err)
  }
}

