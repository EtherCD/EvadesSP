import { ObserverState, ObserverSubscriber } from './types';

let curState: ObserverState = { currentPage: 'menu' };
let oldState: ObserverState = { currentPage: 'menu' };

export const isPage = (event: Event, className: string) =>
  (event.target as HTMLDivElement).classList ? (event.target as HTMLDivElement).classList.contains(className) : false;

export const checkChanges = () => {
  if (curState.currentPage !== oldState.currentPage) {
    oldState = JSON.parse(JSON.stringify(curState));
    return true;
  }
  return false;
};

export const submitChanges = (subs: Array<ObserverSubscriber>) => {
  if (checkChanges()) subs.forEach((os) => os(curState));
};

export const updateState = (event: Event, subs: Array<ObserverSubscriber>) => {
  if ((event.target as HTMLDivElement).classList ? (event.target as HTMLDivElement).classList.length === 0 : true)
    return;
  if (isPage(event, 'menu')) curState.currentPage = 'menu';
  if (isPage(event, 'server-browser-box')) curState.currentPage = 'server-list';
  if (isPage(event, 'leaderboard-title-break')) curState.currentPage = 'game';
  if (isPage(event, 'hero-select')) curState.currentPage = 'hero-select';
  if (isPage(event, 'results')) curState.currentPage = 'game-end';
  submitChanges(subs);
};
