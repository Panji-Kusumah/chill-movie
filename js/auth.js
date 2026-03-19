document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.querySelector("input[type='text']").value;
    const password = document.querySelector("input[type='password']").value;

    if(username && password) {
        localStorage.setItem("user", username);
        window.location.href = "index.html";
    } else {
        alert("Isi dulu semua field");
    }
});