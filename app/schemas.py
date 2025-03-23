from pydantic import BaseModel


class Task(BaseModel):
    teacher: str
    theme: str
    task_text: str
