import { ButtonMarking } from './markings/button';
import { ScriptsMenuMarking } from './markings/scripts';

namespace IU {
  export const init = () => {
    window.sdom.addHtmlElement(ButtonMarking.makeButton(), ScriptsMenuMarking.makeScriptsMenu());
    window.sdom.addObserverSubscriber((s) => {
      if (s.currentPage !== 'menu' && s.currentPage !== 'server-list') {
        document.getElementById('esp-scripts-button').style.display = 'none';
        document.getElementById('esp-scripts-menu').style.display = 'none';
      } else {
        document.getElementById('esp-scripts-button').style.display = '';
      }
    });
  };
}

export default IU;
