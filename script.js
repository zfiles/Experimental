document.addEventListener('DOMContentLoaded',()=>{
    const _=(d,k)=>[...d].map((c,i)=>String.fromCharCode(c.charCodeAt(0)^k.charCodeAt(i%k.length))).join(''),
          L='blockData',K='secretKey',
          t=K=>btoa(K).slice(0,8),
          b=JSON.parse(_(localStorage[L]||'',K)||'{}'),
          p=new URLSearchParams(window.location.search),
          lc=p.get('lc'),
          m=document.getElementById('message');
    
    if(b.h===t(K)&&b.b||localStorage.getItem('blockAccess')==='true'){
        m.textContent='Нет (заблокировано)';
        return;
    }
    
    if(lc!==null){
        if(lc==='12345'){
            m.textContent='Да';
            localStorage.setItem(L,_(JSON.stringify({h:t(K),b:false}),K));
        }else{
            m.textContent='Нет';
            localStorage.setItem('blockAccess','true');
            localStorage.setItem(L,_(JSON.stringify({h:t(K),b:true}),K));
        }
    }
});