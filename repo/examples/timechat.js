// ==UserScript==
// @name         Chat With Time SP
// @version      exp-1
// @description  Adds timestamp of accepting message from chat
// @author       @EtherCD
// @match        https://*.evades.io/*
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/empty-script.svg
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  if (!window.scripts) return;

  window.scripts.add({
    name: 'Chat With Time',
    description: 'Adds timestamp of accepting message from chat',
    icon: 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/icons/bluemsg.svg',
  });

  var messagesCount = 0;
  var messagesTimes = [];

  const patchAllMessages = () => {
    const date = new Date(Date.now());
    const dateFormatted = `[${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}] `;
    const chatMessageElements = document.querySelectorAll('.chat-message > span > span');
    chatMessageElements.forEach((e, i) => {
      if (messagesCount == i) {
        e.innerHTML = `<span class="chat-message-time">${dateFormatted} </span>` + e.innerHTML;
      }
    });
    messagesTimes[messagesCount] = dateFormatted;
    messagesCount++;
  };

  const restoreAllMessages = () => {
    const chatMessageElements = document.querySelectorAll('.chat-message > span > span');
    chatMessageElements.forEach((e, i) => {
      if (messagesTimes[i]) {
        e.innerHTML = `<span class="chat-message-time">${messagesTimes[i]} </span>` + e.innerHTML;
      }
    });
  };

  document.addEventListener('keyup', function (e) {
    if (e.keyCode === 86) {
      if (!document.getElementById('chat').hidden) {
        restoreAllMessages();
      }
    }
  });

  window.sdom.addObserverSubscriber((v) => {
    if (v.type === 'chat-message') patchAllMessages(v.target);
  });
  window.sdom.addStyle(`.chat-message-time {color: #666; font-size: 10px;}`);
})();
