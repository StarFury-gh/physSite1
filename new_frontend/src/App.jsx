import { useState } from "react"
import Header from "./components/Header"
import Login from "./components/Login"
import PersonalPage from "./components/PersonalPage"
import Register from "./components/Register"
import MainPage from "./components/MainPage"
import TasksPage from "./components/TasksPage"
import CurrentTask from "./components/CurrentTask"
import TeachersPage from "./components/TeachersPage"
import CurrentTeacherPage from "./components/CurrentTeacherPage"

export default function App() {

  const [currentComponent, setCurrentComponent] = useState("main")

  const components = {
    "main": <MainPage />,
    "login": <Login />,
    "register": <Register />,
    "excercises": <TasksPage compSetter={setCurrentComponent} />,
    "teachers": <TeachersPage compSetter={setCurrentComponent}/>,
    "lk": <PersonalPage />,
    "currentTask": <CurrentTask />,
    "teacher_page": <CurrentTeacherPage/>
  }

  return (
    <div className="">
      <Header setter={setCurrentComponent} />
      {currentComponent && components[currentComponent]}
    </div>
  )
}