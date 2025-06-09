from pydantic import BaseModel

class Task(BaseModel):
	teacher: str
	theme: str
	task_text: str

class NewUser(BaseModel):
	login: str
	password: str
	validation_code: str

class User(BaseModel):
	login: str
	password: str