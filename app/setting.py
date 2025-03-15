import sqlite3
import config
import os

conn = sqlite3.connect(config.db_name)
cursor = conn.cursor()

# cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, login VARCHAR(50), password VARCHAR(50))")

cursor.execute("DROP TABLE excercises")

cursor.execute("CREATE TABLE IF NOT EXISTS excercises (id INTEGER PRIMARY KEY, author VARCHAR(50), text TEXT, picture VARCHAR(50), theme VARCHAR(20))")

# cursor.execute("INSERT INTO users (login, password) VALUES ('Vova', 'Vovka')")
cursor.execute("INSERT INTO excercises (author, text, picture, theme) VALUES ('Admin', 'Test TEXT', 'pic.png', 'tada')")



conn.commit()
cursor.close()
conn.close()
