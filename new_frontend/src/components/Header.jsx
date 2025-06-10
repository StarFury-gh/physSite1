import "../styles/header.css"

export default function Header(props) {
    const currentUser = sessionStorage.getItem("current_user")
    return (
        <header>
            <nav>
                <button onClick={() => props.setter('main')} className="button">Главная</button>
                <button onClick={() => props.setter('teachers')} className="button">Преподаватели</button>
                <button onClick={() => props.setter('excercises')} className="button">Задачи</button>
                {(currentUser === String(null) || currentUser === null) ?
                    <>
                        <button id="log_btn" onClick={() => props.setter('login')} className="button">Войти</button>
                        <button id="reg_btn" onClick={() => props.setter('register')} className="button">Зарегистрироваться</button>
                    </>
                    : <button id="lk_btn" onClick={() => props.setter('lk')}>Личный кабинет</button>}
            </nav>
        </header>
    )
}