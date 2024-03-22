import { ObserverState } from '../observer/types';
import { addStyle, pushStylesToDom } from '../styles';
import { ButtonMarking } from './markings/button';
import { ScriptsMenuMarking } from './markings/scripts';

export default class SettingsElement {
  elements: Array<HTMLDivElement> = [];
  constructor() {
    this.elements.push(ButtonMarking.makeButton(), ScriptsMenuMarking.makeScriptsMenu());

    window.observerSubs.push(this.ping);
  }

  ping(state: ObserverState) {
    if (state.currentPage !== 'menu' && state.currentPage !== 'server-list') {
      document.getElementById('esp-scripts-button').style.display = 'none';
      document.getElementById('esp-scripts-menu').style.display = 'none';
    } else {
      document.getElementById('esp-scripts-button').style.display = '';
    }
  }

  push() {
    pushStylesToDom();
    this.elements.forEach((e) => document.body.appendChild(e));
  }
}
