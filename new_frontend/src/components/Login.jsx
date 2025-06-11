import { useState } from "react"
import "../styles/login.css"
import axios from "axios"
import { API_URL } from "../../constants"

export default function Login() {
    const [msg, setMsg] = useState("")
    const [err, setErr] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        if (login.length < 3) {
            setErr("Длина логина не может быть меньше 3 символов")
        }
        else if (password.length < 6) {
            setErr("Длина пароля не может быть меньше 6 символов")
        } else {
            const resp = await axios.post(`${API_URL}/login`, { login: login, password: password })
            if (resp.data.status) {
                setErr("")
                setMsg("Вы успешно вошли в аккаунт. Страница будет обновлена автоматически.")
                sessionStorage.setItem("current_user", login)
                setTimeout(() => {
                    window.location.href = "/"
                }, 3000)
            } else {
                setMsg("")
                setErr("Неверный логин или пароль.")
            }
        }
    }

    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="field">
            <div className="login-form">
                <h2 className="text-2xl">Авторизация</h2>
                <input value={login} onChange={(e) => handleLoginChange(e)} className="input_field" type="text" id="login-auth" placeholder="Введите логин" required />
                <input value={password} onChange={(e) => handlePasswordChange(e)} className="input_field" type="password" id="password-auth" placeholder="Введите пароль" required />
                <button type="button" onClick={handleLogin}>Войти</button>
                <div id="login-message"></div>
            </div>
            <h2 className="err text-center text-3xl">{err}</h2>
            <h2 className="msg text-center text-3xl">{msg}</h2>
        </div>
    )
}