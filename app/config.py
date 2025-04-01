import os

DB_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'app', 'db')
os.makedirs(DB_DIR, exist_ok=True)  # Создаем папку, если её нет
db_name = os.path.join(DB_DIR, 'database.db')
