import React, { useState } from "react"

const TestConstructor = () => {
  // состояние для хранения списка вопросов
  const [questions, setQuestions] = useState([
    { id: 1, question: "", description: "" }, 
  ])

  const addQuestion = () => {
    const newId = questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1
    if(newId > 5){
        alert("Нельзя добавть больше заданий")
        return
    }
    setQuestions([...questions, { id: newId, question: "", description: "" }])
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
  }

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h1>Конструктор тестов</h1>
      
      {questions.map((q) => (
        <QuestionBlock
          key={q.id}
          id={q.id}
          question={q.question}
          description={q.description}
          onChange={handleChange}
          onRemove={removeQuestion}
        />
      ))}

      <div className="flex flex-row gap-3">
        <button className="bg-green-300 px-3 rounded-xs" onClick={addQuestion}>
          + Добавить вопрос
        </button>
        <button className="bg-yellow-300 border-0 rounded-xs"
          onClick={handleSubmit} 
        >
          Сохранить тест
        </button>
      </div>
    </div>
  )
}

const QuestionBlock = ({ id, question, description, onChange, onRemove }) => {
  return (
    <div className="bg-white border-1 border-neutral-300 px-3 py-2 h-30">
      <div className="flex flex-row justify-between">
        <h3 className="font-bold">Вопрос #{id}</h3>
        <button className="bg-red-500 text-white px-5 py-0 rounded-xs"
          onClick={() => onRemove(id)} 
        >
          Удалить
        </button>
      </div>
      
      <input
        type="text"
        value={question}
        onChange={(e) => onChange(id, "question", e.target.value)}
        placeholder="Правильный ответ"
      />
      <textarea
        className="resize-none outline-none border-1 border-gray-200"
        value={description}
        onChange={(e) => onChange(id, "description", e.target.value)}
        placeholder="Задача"
      />
    </div>
  )
}

export function TestComponent(){
    return <TestConstructor />
}
