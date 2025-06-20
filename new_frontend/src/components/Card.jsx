import "../styles/card.css"

export default function Card(props) {

    const handleClick = (id) => {
        sessionStorage.setItem("current_task", id)
        window.location.href = "/task"
    }

    return (
        <div className="bg-white border-1 border-neutral-200 rounded-lg flex flex-col items-center justify-center px-10 py-5 w-100 my-2 gap-3">
            <h2 className="text-xl">Тема: {props.title}</h2>
            <h4 className="text-xl">Автор: {props.author}</h4>
            <h5>ID: {props.id}</h5>
            <button onClick={() => {
                handleClick(props.id)
            }} className="cursor-pointer hover:bg-blue-500 bg-blue-300 transition-colors duration-100 px-5 py-1.5 border-0 rounded-lg">Открыть</button>
        </div>
    )
}