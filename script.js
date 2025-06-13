// ==========================================================
// 1. Rolagem Suave (Smooth Scrolling) - CSS já cobre, mas aqui para JS
// ==========================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Verifica se o href é apenas uma âncora na mesma página
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================================
// 2. Validação de Formulários (Login e Cadastro)
// ==========================================================
// Validação do formulário de Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário
        let isValid = true;

        const email = document.getElementById('login-email');
        const password = document.getElementById('login-password');

        const emailError = document.getElementById('loginEmailError');
        const passwordError = document.getElementById('loginPasswordError');

        // Limpar mensagens de erro anteriores
        emailError.textContent = '';
        passwordError.textContent = '';

        if (email.value.trim() === '') {
            emailError.textContent = 'O email é obrigatório.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
            emailError.textContent = 'Email inválido.';
            isValid = false;
        }

        if (password.value.trim() === '') {
            passwordError.textContent = 'A senha é obrigatória.';
            isValid = false;
        }

        if (isValid) {
            alert('Login simulado realizado com sucesso! (Nenhum dado real foi enviado)');
            // Aqui você enviaria os dados para um backend real
            // loginForm.submit(); // Descomente para enviar o formulário
        }
    });
}

// Validação do formulário de Cadastro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Impede o envio padrão do formulário
        let isValid = true;

        const name = document.getElementById('register-name');
        const email = document.getElementById('register-email');
        const password = document.getElementById('register-password');
        const confirmPassword = document.getElementById('register-confirm-password');

        const nameError = document.getElementById('registerNameError');
        const emailError = document.getElementById('registerEmailError');
        const passwordError = document.getElementById('registerPasswordError');
        const confirmPasswordError = document.getElementById('registerConfirmPasswordError');

        // Limpar mensagens de erro anteriores
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        if (name.value.trim() === '') {
            nameError.textContent = 'O nome é obrigatório.';
            isValid = false;
        }

        if (email.value.trim() === '') {
            emailError.textContent = 'O email é obrigatório.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
            emailError.textContent = 'Email inválido.';
            isValid = false;
        }

        if (password.value.trim() === '') {
            passwordError.textContent = 'A senha é obrigatória.';
            isValid = false;
        } else if (password.value.length < 6) {
            passwordError.textContent = 'A senha deve ter no mínimo 6 caracteres.';
            isValid = false;
        }

        if (confirmPassword.value.trim() === '') {
            confirmPasswordError.textContent = 'A confirmação de senha é obrigatória.';
            isValid = false;
        } else if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = 'As senhas não coincidem.';
            isValid = false;
        }

        if (isValid) {
            alert('Cadastro simulado realizado com sucesso! (Nenhum dado real foi enviado)');
            // Aqui você enviaria os dados para um backend real
            // registerForm.submit(); // Descomente para enviar o formulário
        }
    });
}

// ==========================================================
// 3. Contador Regressivo (Countdown Timer)
// ==========================================================
const countdownElement = document.getElementById('countdown');
if (countdownElement) {
    // Defina a data do seu chá de casa nova (Ano, Mês-1, Dia, Hora, Minuto, Segundo)
    // Lembre-se que o mês é baseado em 0 (janeiro é 0, dezembro é 11)
    const countdownDate = new Date("December 25, 2027 18:00:00").getTime(); // Exemplo: 25 de Dezembro de 2025, 18:00

    const updateCountdown = setInterval(function () {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        if (distance < 0) {
            clearInterval(updateCountdown);
            countdownElement.innerHTML = "O chá já aconteceu!";
        }
    }, 1000);
}

// ==========================================================
// 4. Copiar Chave PIX com um Clique
// ==========================================================
const copyPixButton = document.getElementById('copyPixButton');
if (copyPixButton) {
    copyPixButton.addEventListener('click', function () {
        const pixKeyElement = document.getElementById('pixKeyToCopy');
        // Pega apenas o texto da chave PIX, ignorando a tag strong
        const pixKey = pixKeyElement.innerText.replace('Chave PIX:', '').trim();

        navigator.clipboard.writeText(pixKey)
            .then(() => {
                alert('Chave PIX copiada: ' + pixKey);
                // Opcional: Feedback visual temporário no botão
                const originalText = copyPixButton.textContent;
                copyPixButton.textContent = 'Copiado!';
                setTimeout(() => {
                    copyPixButton.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Erro ao copiar a chave PIX:', err);
                alert('Erro ao copiar a chave PIX. Por favor, copie manualmente.');
            });
    });
}

// ... (código anterior do script.js) ...

// ==========================================================
// 5. Galeria de Imagens/Carrossel de Destaque (AJUSTADO)
// ==========================================================
let slideIndex = 1;
let autoSlideTimer; // Variável para o timer automático

// Adiciona um listener para iniciar o carrossel quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.getElementsByClassName("carousel-slide");
    if (slides.length > 0) {
        showSlides(slideIndex); // Mostra o primeiro slide ao carregar
        startAutoSlide(); // Inicia o carrossel automático
    }
});


// Controles de Próximo/Anterior
function plusSlides(n) {
    stopAutoSlide(); // Para o auto-slide ao interagir manualmente
    showSlides(slideIndex += n);
    startAutoSlide(); // Reinicia o auto-slide após um curto período, se desejar, ou remova
}

// Controles de imagem em miniatura
function currentSlide(n) {
    stopAutoSlide(); // Para o auto-slide ao interagir manualmente
    showSlides(slideIndex = n);
    startAutoSlide(); // Reinicia o auto-slide
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("carousel-slide");
    const dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return; // Garante que há slides

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].classList.remove('active-slide'); // Remove a classe ativa
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].classList.add('active-slide'); // Adiciona a classe ativa
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
}

// Carrossel automático
function startAutoSlide() {
    // Limpa qualquer timer existente antes de iniciar um novo
    if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
    }
    autoSlideTimer = setInterval(() => {
        plusSlides(1); // Chama plusSlides para mudar o slide e gerenciar o timer
    }, 5000); // Mude 5000 para o tempo em milissegundos (5 segundos)
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

// ... (restante do seu script.js, como validação de formulários, contador, PIX, etc.) ...