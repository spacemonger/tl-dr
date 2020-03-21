from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api', methods=['GET', 'POST'])
def main():
    if request.method == "POST":
        # get url that the user has entered
        try:
            url = request.form['url']
            r = requests.get(url)
            print(r.text)
        except:
            return "not working"
    return "working"

if __name__ == '__main__':
    app.run(debug=True)