import { useState } from "react"
import axios from "axios"
import { API_URL } from "../../constants"

export function TestConstructor() {
  // состояние для хранения списка вопросов
  const [questions, setQuestions] = useState([
    { id: 1, question: "", answer: "" }, 
  ])

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1
    if(newId > 5){
        alert("Нельзя добавть больше заданий")
        return
    }
    setQuestions([...questions, { id: newId, question: "", answer: "" }])
  }

  const removeQuestion = (id) => {
    if (questions.length <= 1) return // не удаляем последний
    setQuestions(questions.filter(q => q.id !== id))
  }

  // обновление данных вопроса
  const handleChange = (id, field, value) => {
    setQuestions(
      questions.map(q => 
        q.id === id ? { ...q, [field]: value } : q
      )
    )
  }

  const handleSubmit = () => {
    console.log("Все вопросы:", questions)
    let answers = []
    let tasks = []
    for(const el of questions){
        if(el.question == "" || el.answer == ""){
            alert("Не валидные поля теста.")
            return
        }
    }
    for(const el of questions){
      answers.push(el.answer)
      tasks.push(el.question)
    }
    tasks = tasks.join("|||")
    answers = answers.join("|||")

    console.log(`Tasks: ${tasks}\tAnswers: ${answers}`)
    axios.post(`${API_URL}/add_test`, {author: sessionStorage.getItem("current_user"), tasks: tasks, answers: answers})
    .then(r => {
      console.log(r)
    })
}

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1>Конструктор тестов</h1>
      <input type="text" placeholder="Тема" className="border-1 border-neutral-300 px-3 py-1 rounded-xs" />
      {questions.map((q) => (
        <QuestionBlock
          key={q.id}
          id={q.id}
          question={q.question}
          answer={q.answer}
          onChange={handleChange}
          onRemove={removeQuestion}
        />
      ))}

      <div className="flex flex-row gap-3">
        <button className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-xs cursor-pointer" onClick={addQuestion}>
          + Добавить вопрос
        </button>
        <button className="bg-green-500 hover:bg-green-600 py-1 border-0 rounded-xs cursor-pointer"
          onClick={handleSubmit} 
        >
          Сохранить тест
        </button>
      </div>
    </div>
  )
}

const QuestionBlock = ({ id, question, answer, onChange, onRemove }) => {
  return (
    <div className="bg-white border-1 border-neutral-300 px-3 py-2 rounded-xs">
      <div className="flex flex-row justify-between my-2">
        <h3 className="font-bold">Вопрос #{id}</h3>
        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-0 rounded-xs cursor-pointer"
          onClick={() => onRemove(id)} 
        >
          Удалить
        </button>
      </div>
      <div className="flex flex-col-reverse mx-3 gap-1">
        <input
            className="outline-none border-1 border-gray-200 px-2 py-1 rounded-xs"
            type="text"
            value={question}
            onChange={(e) => onChange(id, "question", e.target.value)}
            placeholder="Правильный ответ"
        />
        <textarea
            className="text-xs h-24 resize-none outline-none border-1 border-gray-200 px-2 py-1 rounded-xs"
            value={answer}
            onChange={(e) => onChange(id, "answer", e.target.value)}
            placeholder="Задача"
        />
      </div>
    </div>
  )
}

export function TaskConstructor(){

    const [taskTheme, setTaskTitle] = useState("")
    const [taskText, setTaskText] = useState("")
    const [msg, setMsg] = useState("")
    const [err, setErr] = useState("")

    const handleTaskTitleChange = (e) => {
        setTaskTitle(e.target.value)
    }
    const handleTaskTextChange = (e) => {
        setTaskText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(taskText.length < 3 || taskTheme.length < 5){
            setErr("Не валидные поля ввода.")
            setMsg("")
            return
        }
        axios.post(`${API_URL}/add_task`, {teacher: sessionStorage.getItem("current_user"), task_text: taskText, theme:taskTheme}).then(r => {
            console.log(r)
            if(r.data.status){
                setErr("")
                setMsg("Задание успешно добавлено.")
            }
        })
    } 

    return(
        <form action="" onSubmit={e => handleSubmit(e)}>
            <p className="text-green-500 font-bold">{msg}</p>
            <p className="text-red-500 font-bold">{err}</p>
            <div className="flex flex-col gap-3">
                <input value={taskTheme} onChange={(e) => handleTaskTitleChange(e)} className="outline-0 border-1 border-gray-300 px-5 py-1 w-full" placeholder="Тема" type="text"  required/>
                <textarea value={taskText} onChange={(e) => handleTaskTextChange(e)} placeholder="Текст задачи" className="outline-0 border-1 border-gray-300 w-full px-5 py-1 text-xs h-50" name="" id="" required></textarea>
                <button type="submit" className="bg-green-500 py-1 border-0 rounded-lg cursor-pointer">Добавить</button>
            </div>
        </form>
    )
}