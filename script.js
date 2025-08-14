document.addEventListener('DOMContentLoaded',()=>{
    const p=new URLSearchParams(window.location.search),
          lc=p.get('lc'),
          m=document.getElementById('message'),
          b=localStorage.getItem('blockAccess');
    
    // Защита от ручного удаления блокировки
    Object.defineProperty(window, 'localStorage', {
        writable: false,
        configurable: false
    });
    Object.defineProperty(window, 'location', {
        writable: false,
        configurable: false
    });
    
    if(b==='true'){
        m.textContent='Нет (заблокировано)';
        return;
    }
    
    if(lc!==null){
        m.textContent=lc==='12345'?'Да':'Нет';
        if(lc!=='12345')localStorage.setItem('blockAccess','true');
    }
});