
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function showMenu() {
    var shown = navMenu.classList.toggle("show");
    navMenu.classList.toggle("hide");

    if (shown) {
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.style.transform = "rotate(270deg)"
    }
    else {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.style.transform = "rotate(0deg)"
    }
}

function checkKey(key_code) {
    if (key_code == 32) {
        showMenu();
        console.log("worked");
    }
}

navToggle.addEventListener('click', showMenu);

function savePref() {
    let choice = document.getElementById('transport').value;
    if (choice) {
        localStorage.setItem('prefrence', choice);
        document.getElementById('message').textContent = "Saved: " + choice;
    }
}

function clearData() {
    localStorage.remlveItem('prefrence');
    document.getElementById('transport').value = "";
    document.getElementById('message').textContent = "Consider it Cleared";
}

let saved = localStorage.getItem('prefrence');
if (saved) {
    document.getElementById('transport').value = saved;
    document.getElementById('message').textContent = "Current Option:" + saved;
}