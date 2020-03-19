from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/test')
def test():
    return 'It is working'

if __name__ == '__main__':
    app.run(debug=True)