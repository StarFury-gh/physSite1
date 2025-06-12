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


class NewTest(BaseModel):
	author: str
	answers: str
	tasks: str
	title: str


class Test(BaseModel):
	id: int
	author: str
	tasks: str
	answers: str