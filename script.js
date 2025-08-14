(()=>{
  const k='blockData',h='a1b2c3d4',p='12345',d=document.getElementById('message'),
        s=JSON.parse(atob(localStorage[k]||'')||{};
  if(s.h===h&&s.b){d.textContent='Нет (заблокировано)';return}
  const l=new URLSearchParams(location.search).get('lc');
  if(l!==null){
    d.textContent=l===p?'Да':'Нет';
    localStorage[k]=btoa(JSON.stringify({b:l!==p,h:h}))
  }
})()