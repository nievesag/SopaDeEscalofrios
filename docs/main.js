let currentTab = 0; 
const tabs = ["Juego", "Descripción del juego", "Sobre nosotros", "Nuestras redes"]; 

function updateArrows() {
    const leftArrow = document.querySelector('.left');
    const rightArrow = document.querySelector('.right');

    if (currentTab === 0) {
        leftArrow.style.display = "none"; 
        rightArrow.style.display = "block"; 
    } else if (currentTab === tabs.length - 1) {
        rightArrow.style.display = "none"; 
        leftArrow.style.display = "block"; 
    } else {
        leftArrow.style.display = "block"; 
        rightArrow.style.display = "block";
    }
}

function showTab(tabName) {
    tabs.forEach(tab => {
        document.getElementById(tab).classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');

    currentTab = tabs.indexOf(tabName);

    updateArrows();
    hideTooltip(); 
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

function showTooltip(text, x, y) {
    const tooltip = document.getElementById('tooltip');
    tooltip.innerText = text;
    tooltip.style.display = 'block';
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}

// Agregar eventos para las flechas
const leftArrow = document.querySelector('.left');
const rightArrow = document.querySelector('.right');

leftArrow.addEventListener('mouseover', (e) => {
    showTooltip(tabs[currentTab - 1], e.clientX + 10, e.clientY);
});
leftArrow.addEventListener('mouseout', hideTooltip);
leftArrow.addEventListener('click', hideTooltip); 

rightArrow.addEventListener('mouseover', (e) => {
    showTooltip(tabs[currentTab + 1], e.clientX + 10, e.clientY);
});
rightArrow.addEventListener('mouseout', hideTooltip);
rightArrow.addEventListener('click', hideTooltip);

showTab(tabs[currentTab]);
