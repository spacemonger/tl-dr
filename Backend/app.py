from flask import Flask, request
from flask_cors import CORS
from flask_jsglue import JSGlue
from scrape import scrape

app = Flask(__name__)
CORS(app)
JSGlue(app)

@app.route('/')
def main():

    return "Main"

@app.route('/api', methods=['GET', 'POST'])
def getUrl():
        # get url that the user has entered
        try:
            print("Entered")
            search = request.args['url']
            return scrape(search)
        except:
            return "not working"
    

if __name__ == '__main__':
    app.run(debug=True)