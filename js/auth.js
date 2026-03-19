// ==========================
// FORM AUTH (LOGIN / REGISTER)
// ==========================

const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Ambil input
        const usernameInput = document.querySelector("input[name='username']");
        const passwordInput = document.querySelector("input[name='password']");
        const confirmPasswordInput = document.querySelector("input[name='confirmPassword']");
        const errorMsg = document.querySelector(".error-msg");

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value.trim() : null;

        const isRegister = window.location.pathname.includes("register");

        // Reset pesan error
        if (errorMsg) errorMsg.textContent = "";

        // VALIDASI REGISTER
        if (isRegister && confirmPasswordInput) {
            if (password !== confirmPassword) {
                if (errorMsg) errorMsg.textContent = "Password tidak sama!";
                return;
            }
        }

        // VALIDASI FIELD KOSONG
        if (!username || !password) {
            if (errorMsg) errorMsg.textContent = "Isi dulu semua field!";
            return;
        }

        // Simpan user ke localStorage
        localStorage.setItem("user", JSON.stringify({ username }));

        // Redirect ke index.html
        window.location.href = "index.html";
    });
}

// ==========================
// GOOGLE LOGIN / REGISTER
// ==========================

function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);

    console.log("USER:", data);

    localStorage.setItem("user", JSON.stringify({
        name: data.name,
        email: data.email,
        picture: data.picture
    }));

    // Langsung redirect, tanpa alert
    window.location.href = "index.html";
}

// ==========================
// PARSE JWT TOKEN
// ==========================

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    let jsonPayload = decodeURIComponent(
        atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
}