import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/lk.css"

export default function PersonalPage() {

    const [taskTheme, setTaskTheme] = useState("")
    const [taskText, setTaskText] = useState("")


    const logout = () => {
        sessionStorage.setItem("current_user", null)
        window.location.reload()
    }
    const addTask = () => {

    }

    return (
        <div className="items">
            <div className="account_field">
                <div className="lk-container">
                    <h2 className="text-2xl">Личный Кабинет</h2>
                    <p><strong>Преподаватель: </strong> <span id="user-login">{sessionStorage.getItem("current_user")}</span></p>
                    <button onClick={logout} className="logout-button" id="logout-btn">Выйти</button>
                </div>
            </div>
            <div className="new_task_field">
                <div className="lk-container ">
                    <form id="myForm" action="">
                        <h2 className="text-2xl">Добавить задание</h2>
                        <div className="">
                            <p className="text-2xl font-bold">Тема:</p>
                            <input className="border-1 outline-0 border-blue-400 px-4 py-2 rounded-lg" value={taskTheme} onChange={(e) => setTaskTheme(e.target.value)} id="task-theme-input" type="text" required />
                            <p className="text-2xl font-bold">Текст задачи:</p>
                            <textarea value={taskText} onChange={(e) => setTaskText(e.target.value)} type="text" id="task-text-input" className="text_field border-1 outline-0 border-blue-400 px-4 py-2 rounded-lg" />
                        </div>
                        <button onClick={addTask} className="add_btn" id="addTaskBtn">Добавить</button>
                    </form>
                </div>
                <h1 className="message" id="messageH"></h1>
            </div >
            <div className="cont"></div>
        </div >
    )
}