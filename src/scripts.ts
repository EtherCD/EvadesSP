import Script from './script';
import { ScriptInfo } from './types';

export default class Scripts {
  scripts: Array<Script> = [];

  add(info: ScriptInfo) {
    this.scripts.push(new Script(info));
  }

  get(name: string): Script {
    for (const i in this.scripts) {
      if (this.scripts[i].name === name) return this.scripts[i];
    }
    throw new Error('Script is not found!');
  }

  init() {
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
    for (const s in this.scripts) code = this.scripts[s].patch(code);

    let nScr = document.createElement('script');
    nScr.setAttribute('type', 'module');
    nScr.innerHTML = code;
    document.body.appendChild(nScr);
    console.log('All Scripts was loaded!');
  }
}
