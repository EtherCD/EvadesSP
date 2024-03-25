// ==UserScript==
// @name         Chat messages with Time SP
// @version      exp-1
// @description  Adds timestamp of accepting message from chat
// @author       @EtherCD
// @match        https://*.evades.io/*
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/examples/mwithtime.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/examples/mwithtime.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/icons/mwithtime.svg
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  if (!window.scripts) return;

  window.scripts.add({
    name: 'Chat messages with Time SP',
    description: 'Adds timestamp of accepting message from chat',
    icon: 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/icons/mwithtime.svg',
  });

  var messagesTimes = [];

  const patchMessage = (target) => {
    const date = new Date(Date.now());
    const dateFormatted = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] `;

    target.innerHTML = `<span class="chat-message-time">${dateFormatted} </span>` + target.innerHTML;
    messagesTimes.push(dateFormatted);
  };

  const restoreAllMessages = (target) => {
    target.childNodes.forEach((e, i) => {
      if (messagesTimes[i]) {
        e.innerHTML = `<span class="chat-message-time">${messagesTimes[i]} </span>` + e.innerHTML;
      } else {
        messagesTimes.push('[none]');
        e.innerHTML = `<span class="chat-message-time">[none] </span>` + e.innerHTML;
      }
    });
  };

  window.sdom.addObserverSubscriber((v) => {
    if (v.type === 'chat-message') patchMessage(v.target);
    if (v.type === 'chat-window-added') restoreAllMessages(v.target);
  });
  window.sdom.addStyle(`.chat-message-time {color: #666; font-size: 10px;}`);
})();
