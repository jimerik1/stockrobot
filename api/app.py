from flask import Flask, jsonify
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/stock/<symbol>')
def get_stock_data(symbol):
    try:
        ticker = yf.Ticker(symbol)
        hist = ticker.history(period="5d")
        
        data = hist[['Open', 'High', 'Low', 'Close']].reset_index().to_dict('records')
        
        for item in data:
            item['Date'] = item['Date'].strftime('%Y-%m-%d')
        
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Note: No app.run() call here