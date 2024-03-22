import { isPage, submitChanges, updateState } from './helper';

export const observerRegister = () => {
  window.observerState = {
    cur: { currentPage: 'menu' },
    old: { currentPage: 'menu' },
  };
  window.observerSubs = [];
  document.body.addEventListener('DOMNodeInserted', (e) => updateState(e), false);
};

export * from './helper';
export * from './types';
