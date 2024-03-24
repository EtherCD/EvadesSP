// ==UserScript==
// @name         Nekosed Heroes
// @version      e1n2
// @description  Nekosed Heroes for Evades.io
// @author       @EtherCD, nekoses by @Plot1na
// @match        https://*.evades.io/*
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/examples/nekos.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/examples/nekos.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/icons/nekos.svg
// @run-at       document-idle
// @grant        none
// ==/UserScript==

const neko = {
  loadNeko() {
    const nekoechlone = new Image();
    nekoechlone.onload = () => {
      window.nekoechlone = nekoechlone;
    };
    nekoechlone.src = 'https://github.com/EtherCD/Evades-SP/blob/main/repo/assets/nekoechalone.png?raw=true';
    const nekonecro = new Image();
    nekonecro.onload = () => {
      window.nekonecro = nekonecro;
    };
    nekonecro.src = 'https://github.com/EtherCD/Evades-SP/blob/main/repo/assets/nekonecro.png?raw=true';
  },

  replaces: [
    [
      /(renderAccessory\(\w\,\w\,\w\)\{)([\w\d\$<>+&*|!\[\]\{\}\/\-="'.,;#?:\s\(\)]+\})/g,
      `$1 if (this.heroType === 26 || this.heroType === 4) { e.globalAlpha = this.isDowned() ? 0.4 : 1; e.drawImage(this.heroType === 4 ? window.nekonecro : window.nekoechlone, t - (5 * this.radius) / 3,a - (5 * this.radius) / 3,(10 * this.radius) / 3,(10 * this.radius) / 3); e.globalAlpha = 1; }; $2`,
    ],
  ],

  insert() {
    // From script by @Irudis: Evades Helper
    let elem = Array.from(document.querySelectorAll('script')).filter(
      (a) => a.type === 'module' && a.src.match(/\/index\.[0-9a-f]{8}\.js/)
    )[0];
    if (!elem) return;
    if (!navigator.userAgent.includes('Firefox')) elem.remove();
    let src = elem.src;

    let req = new XMLHttpRequest();
    req.open('GET', src, false);
    req.send();
    let code = req.response;
    for (const r in this.replaces) code = code.replace(this.replaces[r][0], this.replaces[r][1]);

    let nScr = document.createElement('script');
    nScr.setAttribute('type', 'module');
    nScr.innerHTML = code;
    document.body.appendChild(nScr);
    console.log('NekoedHeroes was loaded!');
  },

  withsp() {
    window.scripts
      .create({
        name: 'NekoedHeroes',
        version: 'e1n2',
        description: 'Neko Echalone and Necro >:3',
        icon: 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/icons/nekos.svg',
      })
      .addReplaces(...this.replaces);
  },

  load() {
    this.loadNeko();
    window.scripts ? this.withsp() : this.insert();
  },
};

neko.load();
