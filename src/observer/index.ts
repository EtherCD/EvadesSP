import { updateState } from './helper';
import { ObserverSubscriber } from './types';

let subscribers: Array<ObserverSubscriber> = [];

export const init = () => {
  document.body.addEventListener('DOMNodeInserted', (e) => updateState(e, subscribers), false);
};

export const addSubscriber = (callback: ObserverSubscriber) => {
  subscribers.push(callback);
};

export * from './helper';
export * from './types';
