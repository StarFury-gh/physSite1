import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../constants"
import TasksPage from "./TasksPage"
import Card from "./Card"

export default function CurrentTeacherPage({compSetter}){
    
    const [teacherData, setTeacherData] = useState([])
    const [tasks, setTasks] = useState(teacherData.tasks)
    const [tasksCards, setTasksCards] = useState([])
    const [taskId, setTaskId] = useState("")

    useEffect(()=>{
        axios.get(`${API_URL}/get_tasks_by_teacher/${sessionStorage.getItem("current_teacher")}`)
        .then(r => {
            console.log(r)
            setTeacherData(r.data)
        })
    },[])

    // useEffect(() => {
    //     const cards = tasks.map((el) => {
    //         if(String(el[0]).includes(taskId)){
    //             return <Card key={`${el[3]}`} title={el[1]} author={el[0]} id={el[3]} compSetter={compSetter} />
    //         } else {
    //             return
    //         }
    //     })
    //     setTasksCards(cards)
    // }, [compSetter, taskId])

    return(
        <div className="flex flex-col justify-center items-center h-[30vh] w-full">
            <div className="flex flex-col items-center gap-3">
                <h2 className="text-2xl">{teacherData.teacherName}</h2>
                <input className="outline-0 border-2 border-blue-400 w-50 px-7 py-1" placeholder="Введите ID задачи" type="text" />
                <p>Задачи:</p>
                <div className="">
                    {tasksCards}
                </div>
            </div>
        </div>
    )
}