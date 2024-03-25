import Script from './script';
import { ScriptInfo } from './types';

export class Scripts {
  list: Array<Script> = [];

  add(info: ScriptInfo): void {
    if (!this.includes(info.name)) this.list.push(new Script(info));
  }

  create(info: ScriptInfo): Script {
    const script = new Script(info);
    this.list.push(script);
    return script;
  }

  includes(name: string) {
    for (const i in this.list) {
      if (this.list[i].name === name) return true;
    }
    return false;
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
}

export * from './script';
export * from './types';
export * from './init';
