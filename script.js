// script.js
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const lc = urlParams.get('lc');
    const messageDiv = document.getElementById('message');
    const storedBlock = localStorage.getItem('blockAccess');

    if (storedBlock === 'true') {
        messageDiv.textContent = 'Нет (заблокировано)';
        return;
    }

    if (lc !== null) {
        if (lc === '12345') {
            messageDiv.textContent = 'Да';
        } else {
            messageDiv.textContent = 'Нет';
            localStorage.setItem('blockAccess', 'true');
        }
    }
});