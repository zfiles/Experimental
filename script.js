document.addEventListener('DOMContentLoaded',()=>{
    const params = new URLSearchParams(window.location.search);
    const lc = params.get('lc');
    const message = document.getElementById('message');
    const isBlocked = localStorage.getItem('blockAccess') === 'true';

    // Защита от ручного удаления блокировки
    Object.defineProperty(window, 'localStorage', {
        writable: false,
        configurable: false
    });

    if (lc === '12345') {
        // Если введён правильный пароль - снимаем блокировку
        localStorage.setItem('blockAccess', 'false');
        message.textContent = 'Да';
    } else if (isBlocked) {
        // Если стоит блокировка и пароль неверный/не введён
        message.textContent = 'Нет (заблокировано)';
    } else if (lc !== null) {
        // Если введён неправильный пароль - ставим блокировку
        message.textContent = 'Нет';
        localStorage.setItem('blockAccess', 'true');
    }
});