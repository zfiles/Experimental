document.addEventListener('DOMContentLoaded',()=>{
    const p=new URLSearchParams(window.location.search),
          lc=p.get('lc'),
          m=document.getElementById('message'),
          b=localStorage.getItem('blockAccess'),
          s=sessionStorage.getItem('lock');
    
    // Двойная блокировка
    if(b==='true' || s==='1'){
        m.textContent='Нет (заблокировано)';
        sessionStorage.setItem('lock','1');
        return;
    }
    
    if(lc!==null){
        if(lc==='12345'){
            m.textContent='Да';
        } else {
            m.textContent='Нет';
            localStorage.setItem('blockAccess','true');
            sessionStorage.setItem('lock','1');
            Object.defineProperty(window, 'localStorage', {
                value: {},
                writable: false
            });
        }
    }
});