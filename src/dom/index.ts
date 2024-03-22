import SettingsElement from './settings';

export default class Dom {
  elements: Array<HTMLElement> = [];

  settings = new SettingsElement();

  add(elem: HTMLElement) {
    this.elements.push(elem);
  }

  push() {
    this.settings.push();
  }
}
