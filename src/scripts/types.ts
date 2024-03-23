export type Replace = [string | RegExp, string];

export type Vars = Record<string, any>;

export interface ScriptInfo {
  name: string;
  icon?: string;
  version?: string;
  description?: string;
}
