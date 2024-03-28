// ==UserScript==
// @name         ResizableChatSP
// @version      exp4
// @description  Resizable Chat for Evades.io game, with script EvadesSP
// @author       @EtherCD
// @match        https://*.evades.io/*
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/examples/chatsp.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/examples/chatsp.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/empty-script.svg
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  if (window.esp1beta1exp1resizablechatspenabled) return;
  window.esp1beta1exp1resizablechatspenabled = true;

  var chatWindow;

  var startX, startY, startWidth, startHeight;
  var newWidth, newHeight, scale, newHeightWindow;
  var isInited = false;

  const resizableChat = () => {
    if (isInited) return;
    isInited = true;
    let chat = document.getElementById('chat');
    chatWindow = document.getElementById('chat-window');
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

    function initDrag(e) {
      scale = chat.style.transform.match(/scale\(([^\)]+)\)/);
      scale = scale[1] ? scale[1] : 1;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = parseInt(chat.clientWidth, 10) * scale;
      startHeight = parseInt(chat.clientHeight, 10) * scale;
      document.documentElement.addEventListener('mousemove', doDrag, false);
      document.documentElement.addEventListener('mouseup', stopDrag, false);
    }

    function doDrag(e) {
      const jy = (startHeight + e.clientY - startY) / scale;

      const x = (startWidth + e.clientX - startX) / scale + 'px';
      const y = (startHeight + e.clientY - startY) / scale + 'px';

      chat.style.width = x;
      chat.style.height = y;
      chatWindow.style.width = x;
      chatWindow.style.height = jy - 30 + 'px';
      newHeightWindow = jy - 30 + 'px';
      newWidth = x;
      newHeight = y;
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
      chatWindow.style.width = '300px';
      chatWindow.style.height = '170px';
      stopDrag();
    }

    window.onresize = () => {
      chat.style.width = newWidth;
      chat.style.height = newHeight;
    };
  };

  const updateChatWindow = (target) => {
    target.style.width = newWidth;
    target.style.height = newHeightWindow;
    chatWindow = target;
  };

  const styles = `.sp-chat-resizer { width: 10px; height: 10px; background: #ffffff55; position:absolute; right: 0; bottom: 25px; cursor: se-resize; }`;

  if (window.scripts) {
    window.scripts.add({
      name: 'ResizableChatSP',
      version: 'exp2',
      description: 'Adds resizable chat',
      icon: 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/empty-script.svg',
    });
    window.sdom.addObserverSubscriber((v) => {
      if (v.type === 'change-page' && v.value === 'game') resizableChat();
      if (v.type === 'chat-window-added') updateChatWindow(v.target);
    });
    window.sdom.addStyle(styles);
  } else {
    // Adding patches
    const style = document.createElement('style');
    style.innerHTML = styles;
    style.id = 'estyler';
    document.head.appendChild(style);

    // Adding listeners
    const isElement = (event, className) =>
      event.target.classList ? event.target.classList.contains(className) : false;
    const isElementId = (event, id) => (event.target.id ? event.target.id === id : false);
    function listenerCallback(event) {
      if (
        !(
          (event.target.id ? event.target.id.length !== 0 : false) ||
          (event.target.classList ? event.target.classList.length !== 0 : false)
        )
      )
        return;
      if (isElement(event, 'leaderboard-title-break')) resizableChat();
      if (isElementId(event, 'chat-window')) updateChatWindow(event.target);
    }
    document.body.addEventListener('DOMNodeInserted', listenerCallback, false);
  }
})();
