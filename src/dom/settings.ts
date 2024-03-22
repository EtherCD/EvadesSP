export default class SettingsElement {
  button: HTMLDivElement;
  menu: HTMLDivElement;

  constructor() {
    let button = document.createElement('div');

    button.style.cursor = 'pointer';
    button.style.position = 'absolute';
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.innerHTML = `<img width="32" height="32" src="https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/settings.svg"/>`;

    let menu = document.createElement('div');

    this.button = button;
    this.menu = menu;
  }

  push() {
    document.body.appendChild(this.button);
  }
}
