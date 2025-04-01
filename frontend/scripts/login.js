const login = async () => {
    const loginValue = document.getElementById("login-auth").value;
    const password = document.getElementById("password-auth").value;
    const statusElement = document.getElementById("is_successful");

    if (loginValue && password) {
        try {
            const response = await fetch(`/login/${loginValue}/${password}`);
            const data = await response.json();

            if (data.status) {
                statusElement.style.display = "block";
                statusElement.style.color = "green";
                statusElement.innerHTML = "Вы успешно авторизированы.<br>Вы будете переадресованы на главную страницу.";
                sessionStorage.setItem("current_user", loginValue);
                setTimeout(() => {
                    window.location.href = "./index.html";
                }, 3000);
            } else {
                statusElement.style.display = "block";
                statusElement.style.color = "red";
                statusElement.innerHTML = "Неверный логин или пароль.";
            }
        } catch (error) {
            console.error("Ошибка:", error);
            statusElement.style.display = "block";
            statusElement.style.color = "red";
            statusElement.innerHTML = "Ошибка сервера.";
        }
    } else {
        statusElement.style.display = "block";
        statusElement.style.color = "red";
        statusElement.innerHTML = "Ошибка входа. Заполните все поля.";
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".login-form button");
    if (loginButton) {
        loginButton.addEventListener("click", login);
    }
});