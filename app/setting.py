import sqlite3
import config
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Движок + подключение к бд
engine = create_engine("sqlite:///database.db", echo=True)

# Базовый класс для декларативного описания таблиц
Base = declarative_base()

# Создание сессии
Session = sessionmaker(bind=engine)
session = Session()


class Test(Base):
    __tablename__ = "tests"

    id = Column(Integer, primary_key=True)
    author = Column(String)
    tasks = Column(String)
    answers = Column(String)
    title = Column(String)

    def __repr__(self):
        return f"<Test(author={self.author}, tasks={self.tasks},answers={self.answers})>"


Base.metadata.create_all(engine)

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
