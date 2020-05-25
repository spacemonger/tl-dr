from flask import Flask, request, jsonify
from flask_cors import CORS
from scrape import scrape
from scrape import title
from summarize import summary, length
from keywords import TextRank4Keyword
import json



app = Flask(__name__)
CORS(app)

@app.route('/')
def main():

    return "Main"

@app.route('/api', methods=['GET', 'POST'])
def getUrl():
        # get url that the user has entered
        try:
            search = request.args['url']

            rawText = scrape(search)
            tr4kw = TextRank4Keyword()
            tr4kw.analyze(rawText, candidate_pos = ['NOUN', 'PROPN', 'ADJ'], window_size=4)
            
            summarization = summary(rawText)

            this_dict = {
                'keywords' : tr4kw.get_keywords(10),
                'paragraphs' : summarization,
                'reduction' : length(rawText, summarization)
            }

            
            return jsonify(this_dict)
        except:
            return jsonify({"rating": 'Not Available.'})
            

if __name__ == '__main__':
    app.run(debug=True)
