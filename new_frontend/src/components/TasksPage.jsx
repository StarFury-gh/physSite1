import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import Card from "./Card";

export default function TasksPage({ compSetter }) {
    const [tasks, setTasks] = useState([])
    const [necessaryTaskId, setNecessaryTaskID] = useState("")
    const cards = tasks.map((el) => {
        return <Card key={`${el[3]}`} title={el[1]} author={el[0]} id={el[3]} compSetter={compSetter} />
    })
    const [tasksCards, setTasksCard] = useState(cards)

    const handleInputValueChange = (e) => {
        setNecessaryTaskID(e.target.value)
    }

    useEffect(() => {
        axios.get(`${API_URL}/get_tasks`)
            .then(r => {
                setTasks(r.data.tasks)
            })
    }, [])

    useEffect(()=>{
        const tasksCard = tasks.map((el) => {
            if(String(el[3]).includes(necessaryTaskId)){
                return <Card key={`${el[3]}`} title={el[1]} author={el[0]} id={el[3]} compSetter={compSetter} />
            }
            else{
                return
            }
        })
        setTasksCard(tasksCard)
    },[compSetter, necessaryTaskId, tasks])

    

    return (
        <div className="flex flex-col items-center">
            <input onChange={(e) => handleInputValueChange(e)} className="border-2 border-blue-400 outline-0 px-2 py-1 my-5 rounded-lg" type="text" placeholder="Найти задачу по номеру" />
            <div className="flex w-full flex-row flex-wrap justify-around">
                {tasksCards}
            </div>
        </div>
    )

}