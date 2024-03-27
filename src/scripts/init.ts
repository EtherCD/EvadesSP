export const init = () => {
  // From script by @Irudis: Evades Helper
  let elem = Array.from(document.querySelectorAll('script')).filter(
    (a) => a.type === 'module' && a.src.match(/\/index\.[0-9a-f]{8}\.js/)
  )[0];
  if (!elem) return;
  if (!navigator.userAgent.includes('Firefox')) elem.remove();
  let src = elem.src;

  let req = new XMLHttpRequest();
  req.open('GET', src, false);
  req.onload = () => {
    let code = req.response;
    for (const s in window.scripts.list) code = window.scripts.list[s].patch(code);

    // From script by @Zirolio: E-UI-Zond
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://evades.io', true);
    xhr.onload = () => {
      const html = xhr.responseText.replace(/(type="module" src=")(\/index\.[0-9a-zA-Z]+\.js)/g, (_, a) => a + '/ ');
      document.documentElement.innerHTML = html;

      let nScr = document.createElement('script');
      nScr.setAttribute('type', 'module');
      nScr.innerHTML = code;
      document.body.appendChild(nScr);
      console.log('All Scripts was loaded!');
    };
    xhr.send();
  };
  req.send();
};
