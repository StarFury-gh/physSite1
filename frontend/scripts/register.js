const URL = "http://127.0.0.1:8000"

function onSubmit(e){

    e.preventDefault()

}

const form = document.getElementById("Form")
form.addEventListener("submit", onSubmit)

const register = async () => {

    const login = document.getElementById("login-field").value;
    const password = document.getElementById("password-field").value;
    const token = document.getElementById("token-field").value;


    if(!!login && !!password && !!token){
        try{
            fetch(`${URL}/register/${login}/${password}/${token}`, {method:"POST"})
            .then((response) => response.json())
            .then((data) => {
                
                if(data["status"]){
        
                    const statusElement = document.getElementById("is_successful")
                    statusElement.style.display = "block"
                    statusElement.style.color = "green";
                    statusElement.innerHTML = "Вы успешно зарегистрированы.<br>Вы будете переадресованы на главную страницу."
                    setTimeout(() => {
                        window.location.href = "./index.html"
                    }, 3000)

                }
                else{

                    if(data["code"]===404){
                        const statusElement = document.getElementById("is_successful")
                        statusElement.style.display = "block"
                        statusElement.style.color = "red";
                        statusElement.innerHTML = "Аккаунт с таким именем уже зарегистрирован."
                    }
                    else if(data["code"]===400){

                        const statusElement = document.getElementById("is_successful")
                        statusElement.style.display = "block"
                        statusElement.style.color = "red";
                        statusElement.innerHTML = "Неверный идентификатор."

                    }

                }
        
            })
        }
        catch{
            const statusElement = document.getElementById("is_successful")
            statusElement.style.display = "block"
            statusElement.style.color = "red"
            statusElement.innerHTML = "Ошибка сервера."            
        }
    } 
    else{

        const statusElement = document.getElementById("is_successful")
        statusElement.style.display = "block"
        statusElement.style.color = "red"
        statusElement.innerHTML = "Ошибка регистрации. Заполните все поля."
        
    }

}