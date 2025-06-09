import { useState } from "react"
import Header from "./components/Header"
import Login from "./components/Login"
import PersonalPage from "./components/PersonalPage"
import Register from "./components/Register"
import MainPage from "./components/MainPage"

export default function App() {

  const [currentComponent, setCurrentComponent] = useState("main")

  const components = {
    "main": <MainPage />,
    "login": <Login />,
    "register": <Register />,
    "excercises": <h1>Excercises page</h1>,
    "teachers": <h1>Teachers page</h1>,
    "lk": <PersonalPage />
  }

  return (
    <div className="">
      <Header setter={setCurrentComponent} />
      {currentComponent && components[currentComponent]}
    </div>
  )
}