// Конфиг (можно менять)
const C = {
  PASS: "12345",         // Пароль
  KEY: "xS2!pF9#vY0@",   // Ключ шифрования (должен быть сложным)
  NAME: "x_data"         // Ключ в localStorage (неочевидный)
};

// Шифрование (AES-подобное, но упрощенное для размера)
const E = {
  enc: (d,k) => [...d].map((c,i) => String.fromCharCode(c.charCodeAt(0) ^ k.charCodeAt(i % k.length)).join(''),
  dec: (e,k) => [...e].map((c,i) => String.fromCharCode(c.charCodeAt(0) ^ k.charCodeAt(i % k.length)).join(''))
};

// Проверка блокировки
const B = {
  get: () => {
    try {
      const e = localStorage.getItem(C.NAME);
      if (!e) return null;
      const d = JSON.parse(E.dec(e, C.KEY));
      return (d.h === btoa(C.KEY).slice(0,8)) ? d : null;
    } catch { return null; }
  },
  set: (v) => {
    const d = { h: btoa(C.KEY).slice(0,8), b: v, t: Date.now() };
    localStorage.setItem(C.NAME, E.enc(JSON.stringify(d), C.KEY));
  },
  clear: () => localStorage.removeItem(C.NAME)
};

// Основная логика
const lc = new URLSearchParams(location.search).get('lc');
const msg = document.getElementById('message');
let blocked = B.get();

if (blocked?.b) {
  msg.textContent = 'Нет (заблокировано)';
} else if (lc) {
  if (lc === C.PASS) {
    msg.textContent = 'Да';
    B.clear();
  } else {
    msg.textContent = 'Нет';
    B.set(true);
  }
}