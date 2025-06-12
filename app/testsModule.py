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

    def get_test_info(self):
        tasks = self.tasks.split("|||")
        answers = self.answers.split("|||")
        return {"author": self.author, "tasks": tasks, "answers": answers, "id": self.id}

    def __repr__(self):
        return f"<Test(author={self.author}, tasks={self.tasks}, answers={self.answers})>"


def get_test_info(test: Test):
    tasks = test.tasks.split("|||")
    answers = test.answers.split("|||")
    return {"author": test.author, "tasks": tasks, "answers": answers}


def add_new_test(author, tasks, answers):
    try:
        new_test = Test(author=author, tasks=tasks, answers=answers)
        session.add(new_test)
        session.commit()
        return True
    except:
        return False


def get_test_by_id(id):
    test = session.query(Test).filter(Test.id == id).first()
    if test:
        print("test:", test)
        test_info = test.get_test_info()
        return test_info
    return {}


def check_answers(test_id, u_answers):
    test = get_test_by_id(test_id)
    if test:
        res_list = []
        r_answers = test["answers"]
        for i in range(0, len(u_answers)):
            if str(u_answers[i]).lower() == str(r_answers[i]).lower():
                res_list.append(True)
            else:
                res_list.append(False)
        return {"status": True, "correct": res_list.count(True), "results": res_list}
    else:
        return {"status": False, "info": "Test not found"}


def get_tests():
    tests = session.query(Test).all()
    result = [t.get_test_info() for t in tests]
    return result


print("get_tests:", get_tests())