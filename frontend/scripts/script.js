const API_URL = "http://127.0.0.1:8000";

const sidebar = document.getElementById('sidebar');

// Показываем сайдбар при наведении курсора
document.addEventListener('mousemove', (event) => {
    if (event.clientX < 185) { // Если курсор близко к левому краю
        sidebar.classList.add('visible');
    } else {
        sidebar.classList.remove('visible');
    }
});

// document.getElementById("open-login").addEventListener("click", function() {
//     document.getElementById("login-modal").style.display = "flex";
// });

// document.getElementById("open-register").addEventListener("click", function() {
//     document.getElementById("register-modal").style.display = "flex";
// });

// function closeModal(id) {
//     document.getElementById(id).style.display = "none";
// }

// const handleRegister = async () => {
//     let login = document.getElementById("login").value;
//     let password = document.getElementById("password").value;
//     let validationCode = "";  //пока что не использутеся 
//     let messageBox = document.getElementById("register-message");

//     if (!login || !password) {
//         messageBox.textContent = "Заполните все поля!";
//         messageBox.style.color = "red";
//         return;
//     }

//     try {
//         let loginEncoded = encodeURIComponent(login);
//         let passwordEncoded = encodeURIComponent(password);
//         let validationCodeEncoded = encodeURIComponent(validationCode);

//         let response = await fetch(`${API_URL}/register/${loginEncoded}/${passwordEncoded}/${validationCodeEncoded}`, {
//             method: "GET",
//         });

//         let result = await response.json();
//         if (result.status) {
//             messageBox.textContent = "Регистрация успешна!";
//             messageBox.style.color = "green";
//             setTimeout(() => closeModal("register-modal"), 1000);
//         } else {
//             messageBox.textContent = "Ошибка регистрации";
//             messageBox.style.color = "red";
//         }
//     } catch (error) {
//         console.error("Ошибка:", error);
//         messageBox.textContent = "Ошибка соединения с сервером";
//         messageBox.style.color = "red";
//     }
// };

// const handleLogin = async () => {
//     let login = document.getElementById("login-auth").value;
//     let password = document.getElementById("password-auth").value;
//     let messageBox = document.getElementById("login-message");

//     if (!login || !password) {
//         messageBox.textContent = "Заполните все поля!";
//         messageBox.style.color = "red";
//         return;
//     }

//     try {
//         let loginEncoded = encodeURIComponent(login);
//         let passwordEncoded = encodeURIComponent(password);

//         let response = await fetch(`${API_URL}/login/${loginEncoded}/${passwordEncoded}`, {
//             method: "GET",
//         });

//         let result = await response.json();
//         if (result.status) {
//             messageBox.textContent = "Авторизация успешна!";
//             messageBox.style.color = "green";
//             setTimeout(() => closeModal("login-modal"), 1000);
//             localStorage.setItem("authToken", result.token);
//         } else {
//             messageBox.textContent = "Ошибка авторизации";
//             messageBox.style.color = "red";
//         }
//     } catch (error) {
//         console.error("Ошибка:", error);
//         messageBox.textContent = "Ошибка соединения с сервером";
//         messageBox.style.color = "red";
//     }
// };
