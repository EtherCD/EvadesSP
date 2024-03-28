// ==UserScript==
// @name         Nekosed Heroes
// @version      pre-release-4
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
    const styles = Array.from(document.head.querySelectorAll('style'));
    let tsModStyles = styles.filter((e) => e.innerHTML.match(/#version-warning/g) !== null)[0];

    // From script by @Zirolio: E-UI-Zond
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://evades.io', true);
    xhr.onload = () => {
      const html = xhr.responseText.replace(/(type="module" src=")(\/index\.[0-9a-zA-Z]+\.js)/g, (_, a) => a + '/ ');
      document.documentElement.innerHTML = html;

      let script = document.createElement('script');
      script.setAttribute('type', 'module');
      script.innerHTML = code;
      document.body.appendChild(script);

      if (tsModStyles) document.head.appendChild(tsModStyles);

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

  loadNormalOnTimeout(_, o) {
    setTimeout(() => {
      neko.loadNormal();
    }, 100);
    o.disconnect();
  },

  withSp() {
    if (window.nekoses) return;
    window.scripts
      .create({
        name: 'NekosedHeroes',
        version: 'pre-release-4',
        description: 'Neko Echalone and Necro >:3',
        icon: 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/icons/nekos.svg',
      })
      .addReplaces(...neko.replaces);
  },

  load() {
    if (window.nekoses) {
      return;
    }
    neko.preload();
    window.scripts
      ? neko.withSp()
      : new MutationObserver(neko.loadNormalOnTimeout).observe(document, { childList: true, subtree: true });
  },
};

neko.load();
