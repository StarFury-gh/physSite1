import { useState } from "react";
import "../styles/register.css"
import axios from "axios"
import { API_URL } from "../../constants.js"

export default function Register() {
    const [msg, setMsg] = useState("")
    const [err, setErr] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [token, setToken] = useState("")

    const handleRegister = async () => {
        console.log("register")
        console.log(`Login: ${login}\tPassword: ${password}\tToken: ${token}`)
        const resp = await axios.post(`${API_URL}/register`, { login: login, password: password, validation_code: token })
        console.log(resp)
        if (resp.data.status) {
            setErr("")
            setMsg("Вы успешно зарегистрировались!")
        } else {
            if (resp.data.code === 404) {
                setMsg("")
                setErr("Пользователь с таким именем уже зарегистрирован.")
            }
            if (resp.data.code === 400) {
                setMsg("")
                setErr("Неверный код валидации.")
            }
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("From send")
        await handleRegister()
    }

    const handleLoginChange = (e) => {
        setLogin(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    const handleTokenChange = (e) => {
        setToken(e.target.value)
    }

    return (
        <div className="field">
            <div className="register-form">
                <form action="" onSubmit={(e) => handleSubmit(e)}>
                    <h2 className="text-2xl">Регистрация</h2>
                    <input onChange={(e) => handleLoginChange(e)} value={login} className="input_field" type="text" id="login-field" placeholder="Введите логин" required />
                    <input onChange={(e) => handlePasswordChange(e)} value={password} className="input_field" type="password" id="password-field" placeholder="Введите пароль" required />
                    <input onChange={(e) => handleTokenChange(e)} value={token} className="input_field" type="password" id="token-field" placeholder="Введите идентификатор" required />
                    <button className="regBtn" type="submit">Зарегистрироваться</button>
                </form>
            </div>
            <h2 className="msg">{msg}</h2>
            <h2 className="err">{err}</h2>
        </div>
    )
}