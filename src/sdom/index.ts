import { ScriptStyles } from './styles';
import * as Observer from '../observer';

/*
 * Scripts Dom
 */
export class SDom {
  elements: Array<HTMLElement> = [];

  addObserverSubscriber(callback: Observer.ObserverSubscriber) {
    Observer.addSubscriber(callback);
  }

  addHtmlElement(...elements: Array<HTMLElement>) {
    this.elements.push(...elements);
  }

  addStyle(...styles: Array<string>) {
    ScriptStyles.push(...styles);
  }
}

export * from './init';
