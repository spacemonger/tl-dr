from flask import Flask, request, jsonify
from flask_cors import CORS
from scrape import scrape
from summarize import summary
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
            
            this_dict = {
                'paragraphs' : summary(scrape(search))
            }

            
            return jsonify(this_dict)
        except:
            return jsonify({"rating": 'Not Available.'})
            

if __name__ == '__main__':
    app.run(debug=True)