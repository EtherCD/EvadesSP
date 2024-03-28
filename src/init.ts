import * as observer from './observer';
import * as sdom from './sdom';
import ui from './ui';

const patchDom = (code: string) => {
  const styles = Array.from(document.head.querySelectorAll('style'));
  let tsModStyles = styles.filter((e) => e.innerHTML.match(/#version-warning/g) !== null)[0];

  // From script by @Zirolio: E-UI-Zond
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://evades.io', true);
  xhr.onload = () => {
    const html = xhr.responseText.replace(/(type="module" src=")(\/index\.[0-9a-zA-Z]+\.js)/g, (_, a) => a + '/ ');
    document.documentElement.innerHTML = html;

    observer.init();

    let script = document.createElement('script');
    script.setAttribute('type', 'module');
    script.innerHTML = code;
    document.body.appendChild(script);

    if (tsModStyles) document.head.appendChild(tsModStyles);

    ui.init();
    sdom.init();

    console.log('EvadesSP was loaded normal.');
  };
  xhr.send();
};

const patchScript = () => {
  // From script by @Irudis: Evades Helper
  let elem = Array.from(document.querySelectorAll('script')).filter(
    (a) => a.type === 'module' && a.src.match(/\/index\.[0-9a-f]{8}\.js/)
  )[0];
  if (!elem) return;

  let req = new XMLHttpRequest();
  req.open('GET', elem.src, false);
  req.onload = () => {
    let code = req.response;
    for (const s in window.scripts.list) code = window.scripts.list[s].patch(code);

    patchDom(code);
  };
  req.send();
};

export const init = (_, o: MutationObserver) => {
  setTimeout(() => {
    patchScript();
  }, 100);
  o.disconnect();
};
