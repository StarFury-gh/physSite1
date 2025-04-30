import sqlite3
import config
import os

conn = sqlite3.connect(config.db_name)
cursor = conn.cursor()

cursor.execute("DROP TABLE users")

cursor.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, login VARCHAR(50), password VARCHAR(50))")

cursor.execute("INSERT INTO users (login, password) VALUES ('Владимир Елисеев', '12345')")

cursor.execute("DROP TABLE excercises")

cursor.execute("CREATE TABLE IF NOT EXISTS excercises (id INTEGER PRIMARY KEY, author VARCHAR(50), text TEXT, picture VARCHAR(50), theme VARCHAR(20))")

cursor.execute("INSERT INTO excercises (author, text, theme) VALUES ('Владимир Елисеев', 'Тест', 'Проверить работу сайта')")



conn.commit()
cursor.close()
conn.close()
