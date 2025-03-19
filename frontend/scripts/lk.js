const login = document.getElementById("user-login")
const current_login = sessionStorage.getItem("current_user")
login.innerHTML = current_login

const logout = () => {

    sessionStorage.setItem("current_user", "")
    window.location.href = "./index.html"

}
