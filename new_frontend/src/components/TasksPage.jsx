import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import Card from "./Card";

export default function TasksPage({ compSetter, idSetter }) {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const resp = axios.get(`${API_URL}/get_tasks`)
            .then(r => {
                setTasks(r.data.tasks)
            })
    }, [])

    const cards = tasks.map((el) => {
        return <Card key={`${el[3]}`} title={el[1]} author={el[0]} id={el[3]} compSetter={compSetter} idSetter={idSetter} />
    })

    return (
        <div className="flex flex-col items-center">
            <input className="border-2 border-blue-400 outline-0 px-2 py-1 my-5" type="text" placeholder="Найти задачу по номеру" />
            <div className="flex w-full flex-row flex-wrap justify-around">
                {cards}
            </div>
        </div>
    )

}