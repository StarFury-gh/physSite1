export default function TestCard(props) {
    const handleClick = (id) => {
        sessionStorage.setItem("current_test", props.id)
        window.location.href = 'test'
    }
    return (
        <div className="flex flex-col w-100 px-10 py-5 gap-2 bg-white border-1 border-gray-300 justify-center items-center rounded-lg">
            <h2 className="text-xl">Тема: {props.title}</h2>
            <h3 className="text-xl">Автор: {props.author}</h3>
            <h4 className="text-xl">ID: {props.id}</h4>
            <button onClick={() => handleClick()} className="cursor-pointer hover:bg-blue-500 bg-blue-300 transition-colors duration-100 px-5 py-1.5 border-0 rounded-lg">Открыть</button>
        </div>
    )
}