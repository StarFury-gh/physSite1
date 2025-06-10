import "../styles/card.css"

export default function Card(props) {

    const setComponent = props.compSetter
    const setTaskId = props.idSetter

    const handleClick = (id) => {
        sessionStorage.setItem("current_task", id)
        setComponent("currentTask")
        setTaskId(id)
    }

    return (
        <div className="bg-white border-1 border-neutral-200 rounded-lg flex flex-col items-center justify-center px-10 py-5 w-100 my-2">
            <h2 className="font-bold text-2xl">{props.title}</h2>
            <h4 className="text-2xl">{props.author}</h4>
            <h5>ID: {props.id}</h5>
            <button onClick={() => {
                handleClick(props.id)
            }} className="cursor-pointer hover:bg-blue-500 bg-blue-300 transition-colors duration-100 px-3 py-1.5 border-0 rounded-lg">Открыть</button>
        </div>
    )
}