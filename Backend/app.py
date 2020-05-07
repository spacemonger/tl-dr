from flask import Flask, request, jsonify
from flask_cors import CORS
from scrape import scrape
from scrape import title
from summarize import summary
import json

class ComplexEncoder(json.JSONEncoder):
    def default(self, o): # pylint: disable=E0202
        if isinstance(o, complex):
            return o.__dict__
        
        return json.JSONEncoder.default(self, o)


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

            this_dict = {
                'title' : title(search),
                'paragraphs' : summary(scrape(search))
            }

            
            return jsonify(this_dict)
        except:
            return jsonify({"rating": 'Not Available.'})
            

if __name__ == '__main__':
    app.run(debug=True)
