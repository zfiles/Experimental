document.addEventListener('DOMContentLoaded',()=>{
    // Защита от изменения localStorage через консоль
    const _setItem = localStorage.setItem.bind(localStorage);
    const _removeItem = localStorage.removeItem.bind(localStorage);
    localStorage.setItem = function(k,v) { if(k !== 'blockAccess') _setItem(k,v); };
    localStorage.removeItem = function(k) { if(k !== 'blockAccess') _removeItem(k); };
    Object.defineProperty(window, 'localStorage', { configurable: false, writable: false });

    const p = new URLSearchParams(window.location.search),
          lc = p.get('lc'),
          m = document.getElementById('message'),
          b = localStorage.getItem('blockAccess');
    
    if(b === 'true') {
        m.textContent = 'Нет (заблокировано)';
        return;
    }
    
    if(lc !== null) {
        m.textContent = lc === '12345' ? 'Да' : 'Нет';
        if(lc !== '12345') _setItem('blockAccess', 'true'); // Используем оригинальный setItem
    }
});