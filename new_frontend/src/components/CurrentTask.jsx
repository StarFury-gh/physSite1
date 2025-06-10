import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../constants"

export default function CurrentTask() {

    const [taskInfo, setTaskInfo] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/get_task_by_id/${sessionStorage.getItem("current_task")}`).then(r => {
            setTaskInfo(r.data)
        })

    }, [])

    return (
        <div className="h-[50vh] flex justify-center items-center">
            <div className="">
                {taskInfo.status ?
                    <div className="border-0 bg-white inline-flex flex-col px-15 py-10 rounded-lg w-100 text-center">
                        <h1 className="text-2xl">Тема: {taskInfo.task_info[4]}</h1>
                        <h2 className="text-2xl">Автор: {taskInfo.task_info[1]}</h2>
                        <h4 className="text-2xl">ID: {taskInfo.task_info[0]}</h4>
                        <h3 className="text-2xl">Текст задачи: <br/>{taskInfo.task_info[2]}</h3>
                    </div>
                    :
                    <h2>NotLoaded</h2>}
            </div>
        </div>
    )
}