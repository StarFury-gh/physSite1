const login = document.getElementById("user-login")
const current_login = localStorage.getItem("current_user")
login.innerHTML = current_login

const logout = () => {

    localStorage.setItem("current_user", "")
    window.location.href = "./index.html"

}
