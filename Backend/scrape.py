  
import requests
from bs4 import BeautifulSoup
import lxml

def scrape(url):
    page = requests.get(url)

    soup = BeautifulSoup(page.text, 'lxml')


    for img in soup.find_all('img'):
        img.decompose()
    for a in soup.find_all('a'):
        a.unwrap()
    for comments in soup.find_all('comment'):
        comments.decompose()
    for ul in soup.find_all('ul'):
        ul.unwrap()
    for li in soup.find_all('li'):
        li.unwrap()
    for i in soup.find_all('i'):
        i.unwrap()
    for span in soup.find_all('span'):
        span.unwrap()
    for cite in soup.find_all('cite'):
        cite.decompose()
    for link in soup.find_all('link'):
        link.decompose
    soup.smooth()
    return soup.prettify()



