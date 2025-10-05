document.addEventListener('DOMContentLoaded', () => {


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

 if (navToggle) navToggle.addEventListener('click', showMenu);



 const select = document.getElementById('preference');

  const msg = document.getElementById('currentPref');

  const saveBtn = document.getElementById('saveBtn');

  const clearBtn = document.getElementById('clearBtn');

  const KEY = 'preference';

  function renderSaved() {

    const saved = localStorage.getItem(KEY);

    if (saved) {

      select.value = saved;

      msg.textContent = 'Current Option: ' + saved;

    } else {

      msg.textContent = '';

    }
  }

  function savePref() {

    const choice = select.value;

    if (!choice) { msg.textContent = 'Please select a sport.'; return; }

    localStorage.setItem(KEY, choice);

    msg.textContent = 'Saved: ' + choice;
    
  }

  function clearData() {

    localStorage.removeItem(KEY);

    select.value = '';

    msg.textContent = 'Data cleared.';

  }

  saveBtn.addEventListener('click', savePref);

  clearBtn.addEventListener('click', clearData);

  select.addEventListener('change', savePref);


  renderSaved();
  
});