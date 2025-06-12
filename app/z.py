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
        return f"<Test(author={self.author}, tasks={self.tasks}, answers={self.answers}, title={self.title}, id={self.id})>"

Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)