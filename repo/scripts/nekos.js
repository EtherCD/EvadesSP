// ==UserScript==
// @name         Nekosed Heroes
// @version      pre-release-3
// @description  Nekosed Heroes for Evades.io
// @author       @EtherCD, nekoses by @Plot1na
// @match        https://*.evades.io/
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/examples/nekos.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/examples/nekos.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/icons/nekos.svg
// @run-at       document-start
// @grant        none
// ==/UserScript==

function loadImage(s, v) {
  const i = new Image();
  i.onload = () => (window.nekoses[v] = i);
  i.src = s;
}

const neko = {
  preload() {
    window.nekoses = {};
    loadImage('https://github.com/EtherCD/Evades-SP/blob/main/repo/assets/nekoechalone.png?raw=true', 'echelon');
    loadImage('https://github.com/EtherCD/Evades-SP/blob/main/repo/assets/nekonecro.png?raw=true', 'necro');
  },

  replaces: [
    [
      /(renderAccessory\(\w\,\w\,\w\)\{)([\w\d\$<>+&*|!\[\]\{\}\/\-="'.,;#?:\s\(\)]+\})/g,
      `$1 if ([26, 4].includes(this.heroType)) { e.globalAlpha = this.isDowned() ? 0.4 : 1; e.drawImage(this.heroType === 4 ? window.nekoses.necro : window.nekoses.echelon, t - (5 * this.radius) / 3,a - (5 * this.radius) / 3,(10 * this.radius) / 3,(10 * this.radius) / 3); e.globalAlpha = 1; }; $2`,
    ],
  ],

  insertCode(code) {
    // From script by @Zirolio: E-UI-Zond
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://evades.io', true);
    xhr.onload = () => {
      const html = xhr.responseText.replace(/(type="module" src=")(\/index\.[0-9a-zA-Z]+\.js)/g, (_, a) => a + '/ ');
      document.documentElement.innerHTML = html;

      let s = document.createElement('script');
      s.setAttribute('type', 'module');
      s.innerHTML = code;
      document.body.appendChild(s);

      console.log('NekosedHeroes was loaded normal.');
    };
    xhr.send();
  },

  loadNormal() {
    // From script by @Irudis: Evades Helper
    let elem = Array.from(document.querySelectorAll('script')).filter(
      (a) => a.type === 'module' && a.src.match(/\/index\.[0-9a-f]{8}\.js/)
    )[0];
    if (!elem) return;
    if (!navigator.userAgent.includes('Firefox')) elem.remove();

    let req = new XMLHttpRequest();
    req.open('GET', elem.src, false);
    req.onload = () => {
      let code = req.response;
      for (const r in neko.replaces) code = code.replace(neko.replaces[r][0], neko.replaces[r][1]);
      neko.insertCode(code);
    };
    req.send();
  },

  withSp() {
    window.scripts
      .create({
        name: 'NekosedHeroes',
        version: 'pre-release-3',
        description: 'Neko Echalone and Necro >:3',
        icon: 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/icons/nekos.svg',
      })
      .addReplaces(...neko.replaces);
  },

  load(_, o) {
    if (window.nekoses) {
      o.disconnect();
      return;
    }
    neko.preload();
    window.scripts
      ? neko.withSp()
      : setTimeout(() => {
          neko.loadNormal();
        }, 200);
    o.disconnect();
  },
};

// const obs = document.addEventListener('DOMNodeInserted', (e) => {
//   if (e.target.classList && e.target.classList[0] && e.target.classList.contains('menu')) {
//     neko.load();
//     document.removeEventListener(obs);
//   }
// });

new MutationObserver(neko.load).observe(document, { childList: true, subtree: true });
