// localStorage.setItem("current_user", "vova")

const current_user = localStorage.getItem("current_user")
console.log(current_user)

if(current_user !== ""){
    const reg_btn = document.getElementById("reg-btn")
    const log_btn = document.getElementById("log-btn")
    const lk_btn = document.getElementById("lk-btn")
    reg_btn.style.display = "none";
    log_btn.style.display = "none";
    lk_btn.style.display = "block";
} else {
    const reg_btn = document.getElementById("reg-btn")
    const log_btn = document.getElementById("log-btn")
    const lk_btn = document.getElementById("lk-btn")
    reg_btn.style.display = "block";
    log_btn.style.display = "block";
    lk_btn.style.display = "none";
}