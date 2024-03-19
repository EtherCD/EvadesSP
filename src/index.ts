// ==UserScript==
// @name         Evades-SP
// @version      p0r1e5
// @description  Evades Scripts Paradise
// @author       @EtherCD
// @match        https://*.evades.io/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mozilla.org
// @run-at       document-idle
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSp/main/build/evadessp.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSp/main/build/evadessp.js
// @grant        none
// ==/UserScript==

import Scripts from './scripts';

window.scripts = new Scripts();

document.addEventListener('readystatechange', () => {
  window.scripts.init();
});
