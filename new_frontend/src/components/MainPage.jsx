export default function MainPage() {
    const logout = () => {
        sessionStorage.setItem("current_user", null)
        window.location.reload()
    }
    return (
        <div className="">
            {/* <button onClick={logout}>Выйти</button> */}
        </div>
    )
}