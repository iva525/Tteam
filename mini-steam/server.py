# server.py — минимальный Flask static server + scoreboard API
from flask import Flask, send_from_directory, jsonify, request
import os

app = Flask(__name__, static_folder='mini-steam')
SCORES_FILE = 'scores.json'

@app.route('/')
def index():
    return send_from_directory('mini-steam', 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory('mini-steam', path)

# Simple in-memory scoreboard (no auth)
_scores = []

@app.route('/api/score', methods=['GET','POST'])
def score():
    global _scores
    if request.method == 'POST':
        data = request.json or {}
        name = data.get('name','anon')
        score = int(data.get('score',0))
        _scores.append({'name':name,'score':score})
        _scores = sorted(_scores, key=lambda x: -x['score'])[:20]
        return jsonify({'ok':True,'scores':_scores})
    return jsonify({'scores':_scores})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
