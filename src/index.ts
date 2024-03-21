// ==UserScript==
// @name         Evades-SP Dev
// @version      dev
// @description  Dev version of E-SP, may contain errors
// @author       @EtherCD
// @match        https://*.evades.io/*
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSp/main/build/evadessp-dev.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSp/main/build/evadessp-dev.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/favicon-dev.svg
// @run-at       document-idle
// @grant        none
// ==/UserScript==

import Scripts from './scripts';

window.scripts = new Scripts();

document.addEventListener('readystatechange', () => {
  window.scripts.init();
});
