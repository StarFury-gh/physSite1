import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../constants"
import Card from "./Card"

export default function CurrentTeacherPage() {
    const [teacherData, setTeacherData] = useState([])
    const [tasks, setTasks] = useState([])
    const crds = tasks.map(el => {
        return <Card id={el[0]} author={""} title={el[1]} />
    })
    const [tasksCards, setTasksCards] = useState(crds)
    const [taskId, setTaskId] = useState('')

    useEffect(() => {
        axios.get(`${API_URL}/get_tasks_by_teacher/${sessionStorage.getItem("current_teacher")}`)
            .then(r => {
                setTeacherData(r.data)
                setTasks(r.data.tasks)
            })
    }, [])

    useEffect(() => {
        console.log("changed")
        const cards = tasks.map(el => {
            if (String(el[0]).includes(taskId)) {
                return <Card key={el[0]} id={el[0]} title={el[1]} author={""} />
            } else {
                return
            }
        })
        setTasksCards(cards)
    }, [taskId, tasks])

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-3">
                <div className="flex flex-col justify-center items-center gap-3">
                    <h2 className="text-2xl">{teacherData.teacherName}</h2>
                    <input onChange={(e) => setTaskId(e.target.value)} className="outline-0 border-2 rounded-lg border-blue-400 w-50 px-7 py-1" placeholder="Введите ID задачи" type="text" />
                    <p>Задачи:</p>
                </div>
                <div className="flex w-full flex-row flex-wrap justify-around">
                    {tasksCards}
                </div>
            </div>
        </div>
    )
}