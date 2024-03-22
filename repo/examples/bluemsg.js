// ==UserScript==
// @name         BlueMsg
// @version      -
// @description  Changes color of message area
// @author       @EtherCD
// @match        https://*.evades.io/*
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/e86210f798636232a6dd072e23448290c44cd9bf/repo/icons/bluemsg.svg
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  if (!window.scripts) {
    console.log('Example Script is not working without EvadesSP');
    return;
  }

  window.scripts.add({
    name: 'BlueMsg',
    version: '-',
    description: 'Changes color of message area',
    icon: 'https://raw.githubusercontent.com/EtherCD/EvadesSP/e86210f798636232a6dd072e23448290c44cd9bf/repo/icons/bluemsg.svg',
  });

  const script = window.scripts.get('ExampleScript');
  script.addReplace(/=['"]#006b2c['"]/g, `="#006b66"`);
  script.addReplace(/=['"]#00ff6b['"]/g, `="#00fff4"`);
})();
