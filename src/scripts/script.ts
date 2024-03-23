import { ScriptInfo } from './types';
import { Replace, Vars } from './types';

export default class Script {
  name: string;
  icon: string;
  version: string;
  description: string;

  enabled: boolean;

  replaces: Array<Replace> = [];
  vars: Vars = {};

  constructor(info: ScriptInfo) {
    this.name = info.name;
    this.icon = info.icon ?? 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/empty-script.svg';
    this.version = info.version ?? 'none';
    this.description = info.description ?? 'Description is not added';

    this.enabled = true;
  }

  addReplace(a: RegExp | string, b: string) {
    this.replaces.push([a, this.formatReplace(b)]);
  }

  addReplaces(...replaces: Array<Replace>) {
    for (const a in replaces) this.addReplace(replaces[a][0], replaces[a][1]);
  }

  private formatReplace(v: string) {
    return v.replace(/#\{([^\}]+)\}/g, (_, m) => `window.scripts.get("${this.name}").getVar("${m}")`);
  }

  addVar(key: string, value: any) {
    this.vars[key] = value;
  }

  getVar(key: string): any {
    return this.vars[key];
  }

  patch(code: string) {
    for (const i in this.replaces) code = code.replace(this.replaces[i][0], this.replaces[i][1]);
    console.log(this.name + ' was loaded!');
    return code;
  }
}
