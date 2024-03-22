import SettingsElement from './iu';

export default class Dom {
  settings = new SettingsElement();

  push() {
    this.settings.push();
  }
}
