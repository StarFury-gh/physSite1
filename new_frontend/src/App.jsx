import { useState } from "react"
import Header from "./components/Header"
import Login from "./components/Login"
import PersonalPage from "./components/PersonalPage"
import Register from "./components/Register"
import MainPage from "./components/MainPage"
import TasksPage from "./components/TasksPage"
import CurrentTask from "./components/CurrentTask"

export default function App() {

  const [currentComponent, setCurrentComponent] = useState("main")
  const [taskId, setTaskId] = useState(0)

  const components = {
    "main": <MainPage />,
    "login": <Login />,
    "register": <Register />,
    "excercises": <TasksPage idSetter={setTaskId} compSetter={setCurrentComponent} />,
    "teachers": <h1>Teachers page</h1>,
    "lk": <PersonalPage />,
    "currentTask": <CurrentTask />
  }

  return (
    <div className="">
      <Header setter={setCurrentComponent} />
      {currentComponent && components[currentComponent]}
    </div>
  )
}