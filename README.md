# Tic Tac Toe with Twist

This is a Flask + JavaScript project implementing Tic Tac Toe with a twist:

- 3x3 grid
- Players X and O take turns
- No more than 3 of each mark on the board
- When a player places a 4th mark, the oldest mark of that type flashes and then is removed
- Win condition checked after every placement

## Setup
```
cd TIC_TAC_TOE
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Open `http://127.0.0.1:5000/` in your browser to play.
