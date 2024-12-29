if (localStorage.getItem('authenticated') !== 'true') {
    localStorage.setItem('redirectAfterLogin', window.location.href);
    window.location.href = 'index.html';
}

function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.classList.toggle('hidden');
}