import Script from './script';
import { ScriptInfo } from './types';

export default class Scripts {
  list: Array<Script> = [];

  add(info: ScriptInfo): void {
    this.list.push(new Script(info));
  }

  create(info: ScriptInfo): Script {
    const script = new Script(info);
    this.list.push(script);
    return script;
  }

  get(name: string): Script {
    for (const i in this.list) {
      if (this.list[i].name === name) return this.list[i];
    }
    console.log(name);
    console.warn(`Loading Script Error: Trying get not exists script, name: ${name}`);
  }

  forEach(callback: (e: Script) => void) {
    for (const e in this.list) {
      callback(this.list[e]);
    }
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
    for (const s in this.list) code = this.list[s].patch(code);

    let nScr = document.createElement('script');
    nScr.setAttribute('type', 'module');
    nScr.innerHTML = code;
    document.body.appendChild(nScr);
    console.log('All Scripts was loaded!');
  }
}
