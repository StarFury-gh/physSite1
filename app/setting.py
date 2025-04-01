import sqlite3
import os
from config import db_name

def init_db():
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS excercises (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            author TEXT,
            theme TEXT,
            text TEXT,
            image TEXT
        )
    """)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT UNIQUE,
            password TEXT
        )
    """)
    conn.commit()
    conn.close()
    print(f"Database initialized at: {db_name}")
    
if __name__ == "__main__":
    init_db()
