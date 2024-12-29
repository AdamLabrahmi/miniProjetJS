// document.getElementById('loginForm').addEventListener('submit', function(event) {
//             event.preventDefault();
//             const username = document.getElementById('username').value;
//             const password = document.getElementById('password').value;

//             // Add your login logic here
//             if (username === 'admin' && password === 'admin') {
//                 localStorage.setItem('authenticated', 'true'); // Set authentication flag

//                 // Redirigez vers la page initialement demandée ou vers une page par défaut
//                 const redirectUrl = localStorage.getItem('redirectAfterLogin') || 'dashboard.html';
//                 localStorage.removeItem('redirectAfterLogin'); // Supprimez l'URL stockée
//                 window.location.href = redirectUrl;
//             } else {
//                 const errorMessage = document.getElementById('error-message');
//                 errorMessage.textContent = 'Nom d\'utilisateur ou mot de passe incorrect.';
//             }
//         });


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const adminUsername = 'admin';
    const adminPassword = 'admin';

    const username = document.getElementById('username');
    const password = document.getElementById('password');

    if (username.value === adminUsername && password.value === adminPassword) {
        window.location.href = '../html/dashboard.html'; 
    } else {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerHTML = `<strong>Nom d\'utilisateur ou mot de passe incorrect.</strong>`;
        errorMessage.style.display = 'block';

        
        setTimeout(() => {
            errorMessage.style.display = 'none';
            username.value = '';
            password.value = '';
        }, 3000); 
    }
});

