let currentTab = 0; 
const tabs = ["Juego", "Descripción del juego", "Sobre nosotros", "Nuestras redes"]; 

//Enseña las flechas dependiendo de que pestaña se encuentra activa
function updateArrows() {
    const leftArrow = document.querySelector('.left');
    const rightArrow = document.querySelector('.right');

    if (currentTab === 0) {
        leftArrow.style.visibility = "hidden"; 
        rightArrow.style.visibility = "visible"; 
    } else if (currentTab === tabs.length - 1) {
        rightArrow.style.visibility = "hidden"; 
        leftArrow.style.visibility = "visible"; 
    } else {
        leftArrow.style.visibility = "visible"; 
        rightArrow.style.visibility = "visible";
    }
}

//Funcion que se llama para enseñar pestaña
function showTab(tabName) {
    tabs.forEach(tab => {
        document.getElementById(tab).classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');

    currentTab = tabs.indexOf(tabName);

    updateArrows();
 
}


function nextTab() {
    if (currentTab < tabs.length - 1) {
        currentTab++;
        showTab(tabs[currentTab]);
    }
}

function prevTab() {
    if (currentTab > 0) {
        currentTab--;
        showTab(tabs[currentTab]);
    }
}

//Metodo q muestra la ventanita con el texto si pones el raton encima de la flecha
function showVentanita(text, x, y) {
    const vent = document.getElementById('ventanita');
    vent.innerText = text;
    vent.style.display = 'block';
    vent.style.left = `${x}px`;
    vent.style.top = `${y}px`;
}

function hideVentanita() {
    const vent = document.getElementById('ventanita');
    vent.style.display = 'none';
}

//Eventos de las flechas
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');

leftArrow.addEventListener('mouseover', (e) => {
    showVentanita(tabs[currentTab - 1], e.clientX + 10, e.clientY);
});
leftArrow.addEventListener('mouseout', hideVentanita);
leftArrow.addEventListener('click', hideVentanita); 

rightArrow.addEventListener('mouseover', (e) => {
    showVentanita(tabs[currentTab + 1], e.clientX + 10, e.clientY);
});
rightArrow.addEventListener('mouseout', hideVentanita);
rightArrow.addEventListener('click', hideVentanita);

showTab(tabs[currentTab]);
