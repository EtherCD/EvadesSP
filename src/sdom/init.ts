import { ScriptStyles } from './styles';

export const init = () => {
  ScriptStyles.patch();
  window.sdom.elements.forEach((e) => document.body.appendChild(e));
};
