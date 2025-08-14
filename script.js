document.addEventListener('DOMContentLoaded', () => {
    const p = new URLSearchParams(window.location.search),
          lc = p.get('lc'),
          m = document.getElementById('message'),
          b = localStorage.getItem('blockAccess'),
          h = localStorage.getItem('blockHash'); // Хеш для проверки целостности

    // Проверка блокировки (с верификацией хеша)
    if (b === 'true' && h === 'a1b2c3d4') { // Пример хеша (можно заменить на более надежный)
        m.textContent = 'Нет (заблокировано)';
        return;
    }

    // Обработка параметра `lc`
    if (lc !== null) {
        if (lc === '12345') {
            m.textContent = 'Да';
        } else {
            m.textContent = 'Нет';
            localStorage.setItem('blockAccess', 'true');
            localStorage.setItem('blockHash', 'a1b2c3d4'); // Сохраняем хеш
        }
    }

    // Защита от очистки localStorage (если хеш есть, но блокировка сброшена)
    if (h === 'a1b2c3d4' && b !== 'true') {
        localStorage.setItem('blockAccess', 'true'); // Восстанавливаем блокировку
        m.textContent = 'Нет (заблокировано)';
    }
});