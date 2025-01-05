document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const adminUsername = 'admin';
    const adminPassword = 'admin';

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    if (username.value === adminUsername && password.value === adminPassword) {
        localStorage.setItem('isLoggedIn', 'true'); // Stocker l'indicateur de connexion
        const successMessage = document.getElementById('success-message');
        successMessage.classList.remove('hidden');

        setTimeout(() => {
            window.location.href = '../html/dashboard.html'; 
        }, 3000); 
    } else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.classList.remove('hidden');

        setTimeout(() => {
            errorMessage.classList.add('hidden');
            username.value = '';
            password.value = '';
        }, 3000); 
    }
});