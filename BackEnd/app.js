const http = require('http');
const url = require('url');
const puppeteer = require('puppeteer');

const hostname = 'localhost';
const port = 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");

  var search = url.parse(req.url,true).query;

  console.log(search.url);
  scrape(search.url)
  res.write("hello world");
  res.end()
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function scrape(searched) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(searched, {waitUntil: "domcontentloaded"});
  const html = await page.content();

  await browser.close();
  //look into using cache if pressed again
}

