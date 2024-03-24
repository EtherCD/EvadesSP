import { EventType, ObserverEvent, ObserverEventsObject, ObserverState, ObserverSubscriber } from './types';

let curState: ObserverState = { currentPage: 'menu' };
let oldState: ObserverState = { currentPage: 'menu' };

export const isElement = (event: Event, className: string) =>
  (event.target as HTMLDivElement).classList ? (event.target as HTMLDivElement).classList.contains(className) : false;

export const isElementId = (event: Event, id: string) =>
  (event.target as HTMLDivElement).id ? (event.target as HTMLDivElement).id === id : false;

export const checkChanges = () => {
  if (curState.currentPage !== oldState.currentPage) {
    oldState = JSON.parse(JSON.stringify(curState));
    return true;
  }
  return false;
};

export const pingAllListeners = (subs: Array<ObserverSubscriber>, events: ObserverEventsObject) => {
  for (const e in events) {
    const event = events[e];
    if (event.statement) {
      let observerEvent: ObserverEvent = {
        type: event.type,
      };
      event.value ? (observerEvent.value = event.value) : 'none';
      event.target ? (observerEvent.target = event.target) : 'none';
      subs.forEach((v) => v(observerEvent));
    }
  }
};

export const updateState = (event: Event, subs: Array<ObserverSubscriber>) => {
  if (
    !(
      ((event.target as HTMLDivElement).id ? (event.target as HTMLDivElement).id.length !== 0 : false) ||
      ((event.target as HTMLDivElement).classList ? (event.target as HTMLDivElement).classList.length !== 0 : false)
    )
  )
    return;
  if (isElement(event, 'menu')) curState.currentPage = 'menu';
  if (isElement(event, 'server-browser-box')) curState.currentPage = 'server-list';
  if (isElement(event, 'leaderboard-title-break')) curState.currentPage = 'game';
  if (isElement(event, 'hero-select')) curState.currentPage = 'hero-select';
  if (isElement(event, 'results')) curState.currentPage = 'game-end';
  const eventsObject: ObserverEventsObject = [
    {
      type: 'change-page',
      statement: oldState.currentPage !== curState.currentPage,
      value: curState.currentPage,
    },
    {
      type: 'chat-message',
      statement: isElement(event, 'chat-message'),
      target: event.target as HTMLDivElement,
    },
    {
      type: 'chat-window-added',
      statement: isElementId(event, 'chat-window'),
      target: event.target as HTMLDivElement,
    },
  ];
  pingAllListeners(subs, eventsObject);
  oldState = JSON.parse(JSON.stringify(curState));
};
