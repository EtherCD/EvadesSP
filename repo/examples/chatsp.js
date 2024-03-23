// ==UserScript==
// @name         ResizableChatSP
// @version      -
// @description  Resizable Chat for Evades.io game, with script EvadesSP
// @author       @EtherCD
// @match        https://*.evades.io/*
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/empty-script.svg
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  if (!window.scripts) {
    console.log('ResizableChatSP is not working without EvadesSP');
    return;
  }

  window.scripts.add({
    name: 'ResizableChatSP',
    version: '-',
    description: 'Adds resizable chat',
    icon: 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/empty-script.svg',
  });

  const resizableChat = () => {
    let chat = document.getElementById('chat');
    if (!chat) return;
    chat.addEventListener(
      'click',
      function clicke() {
        chat.removeEventListener('click', clicke, false);
        const resizer = document.createElement('div');
        resizer.className = 'sp-chat-resizer';
        chat.appendChild(resizer);
        resizer.addEventListener('mousedown', initDrag, false);
        resizer.addEventListener('dblclick', resizeBack, false);
      },
      false
    );

    var startX, startY, startWidth, startHeight;
    var newWidth, newHeight;

    function initDrag(e) {
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(chat.clientWidth, 10);
      startHeight = parseInt(chat.clientHeight, 10);
      document.documentElement.addEventListener('mousemove', doDrag, false);
      document.documentElement.addEventListener('mouseup', stopDrag, false);
    }

    function doDrag(e) {
      chat.style.width = startWidth + e.clientX - startX + 'px';
      chat.style.height = startHeight + e.clientY - startY + 'px';
      newWidth = startWidth + e.clientX - startX + 'px';
      newHeight = startHeight + e.clientY - startY + 'px';
    }

    function stopDrag(e) {
      document.documentElement.removeEventListener('mousemove', doDrag, false);
      document.documentElement.removeEventListener('mouseup', stopDrag, false);
    }

    function resizeBack() {
      startWidth = 300;
      startHeight = 200;
      newWidth = '300px';
      newHeight = '200px';
      chat.style.width = '300px';
      chat.style.height = '200px';
      stopDrag();
    }

    window.onresize = () => {
      chat.style.width = newWidth;
      chat.style.height = newHeight;
    };
  };

  window.sdom.addObserverSubscriber((v) => {
    if (v.currentPage === 'game') resizableChat();
  });
  window.sdom.addStyle(
    `.sp-chat-resizer { width: 10px; height: 10px; background: #ffffff55; position:absolute; right: 0; bottom: 25px; cursor: se-resize; }`
  );
})();
