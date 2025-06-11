export default function NotFound() {

    const handleClick = () => {
        window.location.href = "/"
    }

    return (
        <div className="w-full h-200 flex justify-center items-center">
            <div className="bg-white w-100 h-30 border-0 rounded-lg text-center flex flex-col items-center justify-center gap-3">
                <h1>Ошибка 404. Страница не найдена.</h1>
                <button onClick={handleClick} className="transition-colors duration-125 cursor-pointer hover:bg-blue-500 bg-blue-400 px-10 py-3 border-0 rounded-lg text-white">Вернуться на главную</button>
            </div>
        </div>
    )
}