from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

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

    def __repr__(self):
        return f"<Test(author={self.author}, tasks={self.tasks}, answers={self.answers})>"

def get_test_info(test):
    tasks = test.tasks.split("|||")
    answers = test.answers.split("|||")
    return {"author": test.author, "tasks": tasks, "answers": answers}

# new_test = Test(author="Владимир", tasks="1|||2|||3", answers="3|||2|||1")
# session.add(new_test)
all_tests = session.query(Test).all()
print("data:", all_tests)
print(get_test_info(all_tests[0]))

# session.commit()