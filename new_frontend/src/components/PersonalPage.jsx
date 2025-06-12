import { useState } from "react";
import "../styles/lk.css"
import { TaskConstructor, TestConstructor } from "./Costructors";

export default function PersonalPage() {

    const [taskType, setTaskType] = useState("test")

    const elements = {
        "task": <TaskConstructor />,
        "test": <TestConstructor/>
    }

    const logout = () => {
        sessionStorage.setItem("current_user", null)
        window.location.href = "/"
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
                <div className="flex flex-col">
                    <div className="flex flex-row justify-around">
                        <button onClick={() => setTaskType("test")} className={`w-30 border-0 rounded-lg text-white ${taskType == "task" ? 'bg-blue-400' : 'bg-blue-600'} py-1 my-3`}>Тест</button>
                        <button onClick={() => setTaskType("task")} className={`w-30 border-0 rounded-lg text-white ${taskType == "test" ? 'bg-blue-400' : 'bg-blue-600'} py-1 my-3`}>Задача</button>
                    </div>
                    <div className="lk-container">
                        {elements[taskType]}
                    </div>
                </div>
                <h1 className="message" id="messageH"></h1>
            </div >
            <div className="cont"></div>
        </div >
    )
}