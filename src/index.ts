// ==UserScript==
// @name         Evades-SP Dev
// @version      dev-3
// @description  Dev version of E-SP, may contain errors
// @author       @EtherCD, styles by @duesti.
// @match        https://*.evades.io/*
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp-dev.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp-dev.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/favicon-dev.svg
// @run-at       document-idle
// @license      MIT License
// @grant        none
// ==/UserScript==

import * as observer from './observer';
import * as scripts from './scripts';
import * as sdom from './sdom';
import ui from './ui';

window.scripts = new scripts.Scripts();
observer.init();
window.sdom = new sdom.SDom();

document.addEventListener('readystatechange', () => {
  if (window.location.href.search(/\/profile/g) === -1 && window.location.href.search(/\/account/g) === -1) {
    scripts.init();
    ui.init();
  }
  sdom.init();
});
