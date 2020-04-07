
import requests
from bs4 import BeautifulSoup
from bs4 import Comment
import lxml
import re




def scrape(url):
    page = requests.get(url)

    soup = BeautifulSoup(page.text, 'lxml')

    soup.head.decompose()
    comments = soup.find_all(text=lambda text: isinstance(text, Comment))
    for c in comments:
        c.extract()
    for nav in soup.find_all('nav'):
        nav.decompose()
    for header in soup.find_all('header'):
        header.decompose()
    for footer in soup.find_all('footer'):
        footer.decompose()
    
    '''
    for tag in soup.find_all(id=re.compile(["footer", "header", "navigation"])):
        tag.decompose()
    '''

    for img in soup.find_all('img'):
        img.decompose()
    for a in soup.find_all('a'):
        a.unwrap()
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

