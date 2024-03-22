// ==UserScript==
// @name         Evades-SP Dev
// @version      dev-2
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

import Dom from './dom';
import { observerRegister } from './observer';
import Scripts from './scripts';

window.scripts = new Scripts();

observerRegister();

document.addEventListener('readystatechange', () => {
  if (window.location.href.search(/\/profile/g) === -1 && window.location.href.search(/\/account/g) === -1)
    window.scripts.init();
  const dom = new Dom();
  dom.push();
});
