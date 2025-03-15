const current_user = localStorage.getItem("current_user")
const URL = "http://127.0.0.1:8000"

const login = async () => {

    const login = document.getElementById("login-auth").value
    const password = document.getElementById("password-auth").value

    // statusElement.style.display = "block"

    if(!!login && !!password){
        try{
            fetch(`${URL}/login/${login}/${password}`)
            .then(async(response) => await response.json())
            .then((data) => {
                if(data["status"]){
                    const statusElement = document.getElementById("is_successful")
    
                    statusElement.style.display = "block"
                    statusElement.style.color = "green";
                    statusElement.innerHTML = "Вы успешно авторизированы.<br>Вы будете переадресованы на главную страницу."
                    localStorage.setItem("current_user", login)
                    console.log(localStorage.getItem("current_user"))

                    setTimeout(() => {
                        window.location.href = "./index.html"
                    }, 3000)

                } else {
                    const statusElement = document.getElementById("is_successful")
                    
                    statusElement.style.display = "block"
                    statusElement.style.color = "red";
                    statusElement.innerHTML = "Неверный логин или пароль."
    
                }
    
            })
        
        }
        catch{
            const statusElement = document.getElementById("is_successful")
            statusElement.style.display = "block"
            statusElement.style.color = "red"
            statusElement.innerHTML = "Ошибка сервера."
        }
    } else {
        const statusElement = document.getElementById("is_successful")
        statusElement.style.display = "block"
        statusElement.style.color = "red";
        statusElement.innerHTML = "Ошибка входа. Заполните все поля."

    }

}