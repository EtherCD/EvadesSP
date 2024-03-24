import { ButtonMarking } from './markings/button';
import { ScriptsMenuMarking } from './markings/scripts';

namespace IU {
  export const init = () => {
    window.sdom.addHtmlElement(ButtonMarking.makeButton(), ScriptsMenuMarking.makeScriptsMenu());
    window.sdom.addObserverSubscriber((s) => {
      if (s.type === 'change-page' && s.value !== 'menu' && s.value !== 'server-list') {
        document.getElementById('esp-scripts-button').style.display = 'none';
        document.getElementById('esp-scripts-menu').style.display = 'none';
      } else if (s.type === 'change-page') {
        document.getElementById('esp-scripts-button').style.display = '';
      }
    });
  };
}

export default IU;
