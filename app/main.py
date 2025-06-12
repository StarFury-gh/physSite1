from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import config
import uvicorn
import utils
import json
from schemas import Task, User, NewUser, Test, NewTest
import testsModule

#ну тут функции называются вроде так, что они делают, так что комментарии с пояснением работы функции будут редкими

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


#ну написано тестовая функция
@app.get("/")
async def test():
    return {"message": "hello"}


@app.post("/login")
async def login(user: User) -> dict:
    conn = sqlite3.connect(config.db_name)
    cursor = conn.cursor()
    picked_data = cursor.execute(f"SELECT * FROM users WHERE (login='{user.login}' AND password='{user.password}')").fetchall()

    if utils.isExists(picked_data):
        cursor.close()
        conn.close()
        return {
            "status": True, 
            "code": 200
        }

    else:
        cursor.close()
        conn.close()
        return {
            "status": False, 
            "code": 404, 
            "info": "no user in DataBase"
        }


#тут по-хорошему переделать на Pydantic схему, но мне лень (10.06.2025 - переделал на Pydantic)
@app.post("/register")
async def register(user: NewUser) -> dict:
    if user.validation_code == 'teacher_account':    
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        picked_data = cursor.execute(f"SELECT * FROM users WHERE (login='{user.login}')").fetchall()

        if utils.isExists(picked_data):
            cursor.close()
            conn.close()
            return {
                "status": False, 
                "code": 404, 
                "info": "user already in DataBase"
            }

        else:
            cursor.execute(f"INSERT INTO users (login, password) VALUES ('{user.login}', '{user.password}')")
            conn.commit()
            cursor.close()
            conn.close()
            return {
                "status": True,
                "code": 200
            }

    else:   
        return {
            "status": False, 
            "code": 400, 
            "info": "incorrect validation code"
        }


@app.get("/get_teachers")
def get_teachers() -> dict:

    conn = sqlite3.connect(config.db_name)
    cursor = conn.cursor()
    teachers = cursor.execute("SELECT id, login FROM users").fetchall()
    if teachers:
        return {"status": True, "data":teachers}
    return {"status": False, "info":"No teachers in DataBase"}


@app.get("/get_teacher_by_id/{id}")
def get_teacher_by_id(id: int):
    conn = sqlite3.connect(config.db_name)
    cursor = conn.cursor()
    necessary_teacher = cursor.execute(f"SELECT login FROM users WHERE id={id}").fetchone()
    if necessary_teacher:
        return {"status": True, "teacher": necessary_teacher}
    return {"status": False, "info": "No teacher with this id"}


#ну тут уже юзаю Pydantic
@app.post("/add_task")
def add_task(task: Task) -> dict:
    
    try:
        task_teacher = task.teacher
        task_text = task.task_text
        task_theme = task.theme
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        cursor.execute(f"INSERT INTO excercises (author, text, theme) VALUES ('{task_teacher}', '{task_text}', '{task_theme}')")
        conn.commit()
        return {"status": True}
            
    except Exception as e:
        print(e)
        return {"status": False, "info": "Server error."}


@app.get("/get_tasks")
async def get_tasks():
    try:
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        data = cursor.execute("SELECT author, theme, text, id FROM excercises").fetchall()
        return {"status": True, "tasks": data}
    except:
        return {"status": False}


@app.get("/get_task_by_id/{id}")
def get_task_by_id(id):
    try:
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        task = cursor.execute(f"SELECT * FROM excercises WHERE (id={id})").fetchone()
        if task:
            return {"status": True, "task_info": task}
        return {"status": False, "info": "No task with this ID"}
    except:
        return {"status": False, "info": "Server error"}
    

@app.get("/get_tasks_by_teacher/{teacher}")
async def get_tasks_by_teacher(teacher):
    conn = sqlite3.connect(config.db_name)
    cursor = conn.cursor()
    teachersName = cursor.execute(f"SELECT login FROM users WHERE id={int(teacher)}").fetchone()
    tasks = cursor.execute(f"SELECT id, theme FROM excercises WHERE (author='{teachersName[0]}')").fetchall()
    
    if tasks:
        return {"status": True, "tasks": tasks, "teacherName": teachersName[0] }
    return {"status": False, "info": "No tasks by this teacher", "teacherName": teachersName[0], "tasks": []}


@app.get("/get_tests")
async def get_tests():
    resp = testsModule.get_tests()
    return resp

@app.post("/add_test")
async def add_new_test(test: NewTest):
    resp = testsModule.add_new_test(test.author, test.tasks, test.answers)
    if resp:
        return {"status": True}
    return {"status": False, "info": "Server error"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, host="0.0.0.0")
