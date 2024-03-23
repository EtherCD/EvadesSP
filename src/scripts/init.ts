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
  req.send();
  let code = req.response;
  for (const s in window.scripts.list) code = window.scripts.list[s].patch(code);

  let nScr = document.createElement('script');
  nScr.setAttribute('type', 'module');
  nScr.innerHTML = code;
  document.body.appendChild(nScr);
  console.log('All Scripts was loaded!');
};
