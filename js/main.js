if(window.location.pathname.includes("index.html")) {
    const user = localStorage.getItem("user");

    if(!user) {
        window.location.href = "login.html";
    }
}