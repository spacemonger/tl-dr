from flask import Flask, request, jsonify
from flask_cors import CORS
from scrape import scrape
from summarize import summary

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
            return summary(scrape(search)) #jsonify({"html": scrape(search)}) 
        except:
            return jsonify({"rating": 'Not Available.'})
            '''
def template():

        try:
            search = request.args['url']
            return jsonify({"rating": 'Available.'}) #render_templates('summary.html', search = search)
        except:
            return jsonify({"rating": 'Not Available.'})
'''



if __name__ == '__main__':
    app.run(debug=True)