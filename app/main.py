from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import config
import uvicorn
import utils
from schemas import Task

import setting
setting.init_db()

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
def test():
    return {"message": "hello"}

# Эндпоинт для логина
@app.get("/login/{login}/{password}")
def login(login: str, password: str):
    try:
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE login = ? AND password = ?", (login, password))
        user = cursor.fetchone()
        conn.close()
        if user:
            return {"status": True, "message": "Login successful"}
        else:
            return {"status": False, "info": "Invalid credentials"}
    except Exception as e:
        print(f"Error during login: {e}")
        return {"status": False, "info": "Server error"}

#тут по-хорошему переделать на Pydantic схему, но мне лень
@app.post("/register/{user}/{password}/{validation_code}")
def register(user: str, password: str, validation_code: str):
    try:
        if validation_code == 'teacher_account':
            conn = sqlite3.connect(config.db_name)
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM users WHERE login = ?", (user,))
            existing_user = cursor.fetchone()
            if existing_user:
                conn.close()
                return {"status": False, "code": 404, "info": "User already in database"}
            cursor.execute("INSERT INTO users (login, password) VALUES (?, ?)", (user, password))
            conn.commit()
            conn.close()
            return {"status": True, "code": 200}
        else:
            return {"status": False, "code": 400, "info": "Incorrect validation code"}
    except Exception as e:
        print(f"Error during registration: {e}")
        return {"status": False, "info": "Server error"}

# Эндпоинт для получения списка учителей
@app.get("/get_teachers")
def get_teachers():
    try:
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        teachers = cursor.execute("SELECT id, login FROM users").fetchall()
        conn.close()
        if teachers:
            return {"status": True, "data": teachers}
        return {"status": False, "info": "No teachers in database"}
    except Exception as e:
        print(f"Error fetching teachers: {e}")
        return {"status": False, "info": "Server error"}

# Эндпоинт для получения учителя по ID
@app.get("/get_teacher_by_id/{id}")
def get_teacher_by_id(id: int):
    try:
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        cursor.execute("SELECT login FROM users WHERE id = ?", (id,))
        teacher = cursor.fetchone()
        conn.close()
        if teacher:
            return {"status": True, "teacher": teacher[0]}
        return {"status": False, "info": "No teacher with this id"}
    except Exception as e:
        print(f"Error fetching teacher: {e}")
        return {"status": False, "info": "Server error"}

#ну тут уже юзаю Pydantic
# Эндпоинт для добавления задачи
@app.post("/add_task")
def add_task(task: Task):
    try:
        task_teacher = task.teacher
        task_text = task.task_text
        task_theme = task.theme
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        cursor.execute("INSERT INTO excercises (author, text, theme) VALUES (?, ?, ?)", 
                        (task_teacher, task_text, task_theme))
        conn.commit()
        conn.close()
        return {"status": True}
    except Exception as e:
        print(f"Error adding task: {e}")
        return {"status": False, "info": "Server error"}

# Эндпоинт для получения задач
@app.get("/get_tasks")
def get_tasks():
    try:
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        tasks = cursor.execute("SELECT author, theme, text, id, image FROM excercises").fetchall()
        conn.close()
        return {"status": True, "tasks": tasks}
    except Exception as e:
        print(f"Error fetching tasks: {e}")
        return {"status": False, "info": "Server error"}

# Эндпоинт для обновления изображения задачи
@app.post("/update_task_image/{task_id}")
def update_task_image(task_id: int, image: dict):
    try:
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        cursor.execute("UPDATE excercises SET image = ? WHERE id = ?", (image["image"], task_id))
        conn.commit()
        conn.close()
        return {"status": True, "message": f"Image updated for task {task_id}"}
    except Exception as e:
        print(f"Error updating image: {e}")
        return {"status": False, "info": "Server error"}

# Эндпоинт для получения задачи по ID
@app.get("/get_task_by_id/{id}")
def get_task_by_id(id: int):
    try:
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM excercises WHERE id = ?", (id,))
        task = cursor.fetchone()
        conn.close()
        if task:
            return {"status": True, "task_info": task}
        return {"status": False, "info": "No task with this ID"}
    except Exception as e:
        print(f"Error fetching task: {e}")
        return {"status": False, "info": "Server error"}

# Эндпоинт для получения задач по учителю
@app.get("/get_tasks_by_teacher/{teacher_id}")
def get_tasks_by_teacher(teacher_id: int):
    try:
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        cursor.execute("SELECT login FROM users WHERE id = ?", (teacher_id,))
        teacher_name = cursor.fetchone()
        if not teacher_name:
            conn.close()
            return {"status": False, "info": "No teacher with this ID"}
        cursor.execute("SELECT id, theme FROM excercises WHERE author = ?", (teacher_name[0],))
        tasks = cursor.fetchall()
        conn.close()
        if tasks:
            return {"status": True, "tasks": tasks}
        return {"status": False, "info": "No tasks by this teacher"}
    except Exception as e:
        print(f"Error fetching tasks by teacher: {e}")
        return {"status": False, "info": "Server error"}

# Эндпоинт для удаления задачи
@app.delete("/delete_task/{task_id}")
def delete_task(task_id: int):
    try:
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM excercises WHERE id = ?", (task_id,))
        task = cursor.fetchone()
        if task:
            cursor.execute("DELETE FROM excercises WHERE id = ?", (task_id,))
            conn.commit()
            conn.close()
            return {"status": True, "message": f"Task {task_id} deleted"}
        conn.close()
        return {"status": False, "info": f"No task with ID {task_id}"}
    except Exception as e:
        print(f"Error deleting task: {e}")
        return {"status": False, "info": "Server error"}

# Эндпоинт для получения максимального ID
@app.get("/get_max_image_id")
def get_max_image_id():
    try:
        conn = sqlite3.connect(config.db_name)
        cursor = conn.cursor()
        max_id = cursor.execute("SELECT MAX(id) FROM excercises").fetchone()[0]
        conn.close()
        if max_id is None:
            return {"status": True, "max_id": 0}
        return {"status": True, "max_id": max_id}
    except Exception as e:
        print(f"Error fetching max ID: {e}")
        return {"status": False, "info": "Server error"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, host="0.0.0.0")