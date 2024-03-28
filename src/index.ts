// ==UserScript==
// @name         Evades-SP Dev
// @version      dev-5
// @description  Dev version of E-SP, may contain errors
// @author       @EtherCD, styles by @duesti.
// @match        https://*.evades.io/*
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp-dev.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp-dev.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/favicon-dev.svg
// @run-at       document-start
// @license      MIT License
// @grant        none
// ==/UserScript==

import { init } from './init';
import * as scripts from './scripts';
import * as sdom from './sdom';

(() => {
  if (window.scripts) return;

  window.scripts = new scripts.Scripts();
  window.sdom = new sdom.SDom();

  if (window.location.href.search(/\/profile/g) === -1 && window.location.href.search(/\/account/g) === -1)
    new MutationObserver(init).observe(document, { childList: true, subtree: true });
})();
