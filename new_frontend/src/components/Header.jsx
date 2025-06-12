import "../styles/header.css"

export default function Header() {
    const currentUser = sessionStorage.getItem("current_user")
    const handleClick = (path) => {
        window.location.href = `/${path}`
    }
    return (
        <header>
            <nav>
                <button onClick={() => { handleClick("") }} className="button">Главная</button>
                <button onClick={() => { handleClick("teachers") }} className="button">Преподаватели</button>
                <button onClick={() => { handleClick("tasks") }} className="button">Задачи</button>
                <button onClick={() => { handleClick("tests") }} className="button">Тесты</button>

                {(currentUser === String(null) || currentUser === null) ?
                    <>
                        <button id="log_btn" onClick={() => { handleClick("login") }} className="button">Войти</button>
                        <button id="reg_btn" onClick={() => { handleClick("register") }} className="button">Зарегистрироваться</button>
                    </>
                    : <button className="button" id="lk_btn" onClick={() => { handleClick("lk") }}>Личный кабинет</button>}
            </nav>
        </header>
    )
}