document.addEventListener('DOMContentLoaded',()=>{
    const p=new URLSearchParams(window.location.search),
          lc=p.get('lc'),
          m=document.getElementById('message'),
          b=localStorage.getItem('blockAccess'),
          sb=sessionStorage.getItem('tempBlock');

    // Двойная проверка блокировки
    if(b==='true' || sb==='true'){
        m.textContent='Нет (заблокировано)';
        sessionStorage.setItem('tempBlock','true'); // Дублируем в sessionStorage
        return;
    }

    if(lc!==null){
        if(lc==='12345'){
            m.textContent='Да';
            // Сбрасываем блокировку при успешном коде
            localStorage.removeItem('blockAccess');
            sessionStorage.removeItem('tempBlock');
        } else {
            m.textContent='Нет';
            // Двойное сохранение блокировки
            localStorage.setItem('blockAccess','true');
            sessionStorage.setItem('tempBlock','true');
            
            // Дополнительная защита - если пытаются очистить storage
            window.addEventListener('storage',(e)=>{
                if(e.key==='blockAccess' && !e.newValue){
                    localStorage.setItem('blockAccess','true');
                }
            });
        }
    }
    
    // Защита от отключения JavaScript
    document.body.style.display='block';
});