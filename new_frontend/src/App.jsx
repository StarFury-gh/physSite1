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
import NotFound from "./components/NotFound"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App() {

  return (
    <div className="">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/task" element={<CurrentTask />}></Route>
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/teacher" element={<CurrentTeacherPage />} />
          <Route path="/lk" element={<PersonalPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}