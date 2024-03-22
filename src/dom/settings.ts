import { ObserverState } from '../observer/types';

export default class SettingsElement {
  button: HTMLDivElement;
  menu: HTMLDivElement;

  constructor() {
    let button = document.createElement('div');

    button.setAttribute('id', 'esp-button');
    button.style.cursor = 'pointer';
    button.style.position = 'absolute';
    button.style.bottom = '10px';
    button.style.right = '10px';
    button.innerHTML = `<img width="32" height="32" src="https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/settings.svg"/>`;

    let menu = document.createElement('div');
    menu.setAttribute('id', 'esp-menu');
    menu.classList.add('settings');
    menu.style.display = 'none';

    button.onclick = () => {
      const e = document.getElementById('esp-menu');
      e.style.display = e.style.display === 'none' ? '' : 'none';
    };

    this.button = button;
    this.menu = menu;

    window.observerSubs.push(this.ping);
  }

  ping(state: ObserverState) {
    if (state.currentPage !== 'menu' && state.currentPage !== 'server-list') {
      document.getElementById('esp-button').style.display = 'none';
      document.getElementById('esp-menu').style.display = 'none';
    } else {
      document.getElementById('esp-button').style.display = '';
    }
  }

  updateMenu() {
    this.menu.innerHTML = `
    <span class="settings-title">Scripts</span>
    <input type="button" class="settings-exit" value="X" onclick="document.getElementById('esp-menu').style.display = 'none'">
    <div class="settings-container">
    ${(() => {
      let e = '';
      for (const i in window.scripts.scripts) {
        const script = window.scripts.scripts[i];
        e += `<label class="settings-label">
        <div class="settings-setting">
          <img src='${script.icon}' width='36'/>
          <span style='position:absolute;'>${script.name}</span>
          <span style='color: #ffffff77'>${script.description}</span>
          <input style="float: right;" type="checkbox" disabled ${script.enabled ? 'checked' : ''}/>
          </div>
        </label>`;
      }
      return e;
    })()}
    </div>
    `;
  }

  push() {
    document.body.appendChild(this.button);
    this.updateMenu();
    document.body.appendChild(this.menu);
  }
}
