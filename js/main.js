// ==========================
// LOAD COMPONENTS (WAJIB DI ATAS)
// ==========================

function loadComponent(id, file, callback) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;

            // jalankan callback setelah component masuk
            if (callback) callback();
        });
}

// load header dulu → baru jalankan logic user
loadComponent("header", "../components/header.html", initHeader);
loadComponent("footer", "../components/footer.html");



// ==========================
// CEK LOGIN (PROTECT PAGE)
// ==========================

const path = window.location.pathname;

if (path.includes("index.html")) {
    const user = localStorage.getItem("user");

    if (!user) {
        window.location.href = "login.html";
    }
}



// ==========================
// INIT HEADER (USER SYSTEM)
// ==========================

function initHeader() {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData) return;

    const headerRight = document.querySelector(".header-right");

    if (!headerRight) return;

    // ambil element dari header component
    const avatar = headerRight.querySelector(".avatar");
    const logoutBtn = headerRight.querySelector(".logout");

    // buat nama user
    const nameEl = document.createElement("span");
    nameEl.style.color = "white";
    nameEl.style.marginRight = "10px";
    nameEl.textContent = userData.name || userData.username;

    // kalau login google → pakai foto
    if (userData.picture && avatar) {
        avatar.src = userData.picture;
    }

    // reset isi biar urut rapi
    headerRight.innerHTML = "";

    // susun ulang
    headerRight.appendChild(nameEl);
    if (avatar) headerRight.appendChild(avatar);
    if (logoutBtn) headerRight.appendChild(logoutBtn);

    // ==========================
    // LOGOUT EVENT
    // ==========================

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function(e) {
            e.preventDefault();

            localStorage.removeItem("user");
            window.location.href = "login.html";
        });
    }
}