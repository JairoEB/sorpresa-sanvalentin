// Variables del juego
let heartsCaught = 0;
const totalHearts = 10;
const heartsContainer = document.getElementById('hearts-container');
const countDisplay = document.getElementById('count');
const gameScreen = document.getElementById('game-screen');
const countdownScreen = document.getElementById('countdown-screen');
const countdownElement = document.getElementById('countdown');
const cardScreen = document.getElementById('card-screen');

// Función para crear un corazón
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = `${Math.random() * (heartsContainer.offsetWidth - 40)}px`; // Posición aleatoria en X
    heart.style.top = `-40px`; // Comienza arriba del contenedor
    heartsContainer.appendChild(heart);

    // Duración de la caída (más rápida)
    const fallDuration = Math.random() * 2000 + 1000; // Entre 1 y 3 segundos
    heart.style.animationDuration = `${fallDuration}ms`;

    // Evento al hacer clic en el corazón
    heart.addEventListener('click', () => {
        heart.remove();
        heartsCaught++;
        countDisplay.textContent = heartsCaught;
        if (heartsCaught === totalHearts) {
            startCountdown();
        }
    });

    // Eliminar el corazón después de un tiempo
    setTimeout(() => {
        if (heart.parentElement) {
            heart.remove();
        }
    }, fallDuration);
}

// Función para iniciar la cuenta regresiva
function startCountdown() {
    gameScreen.style.display = 'none'; // Ocultar el minijuego
    countdownScreen.classList.add('visible'); // Mostrar la cuenta regresiva

    let count = 3;
    countdownElement.textContent = count;

    const countdownInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count;

        if (count === 0) {
            clearInterval(countdownInterval);
            countdownScreen.classList.remove('visible'); // Ocultar la cuenta regresiva
            cardScreen.classList.add('visible'); // Mostrar la carta con fade-in
        }
    }, 1000);
}

// Generar corazones cada 500 ms (más frecuente)
setInterval(createHeart, 500);