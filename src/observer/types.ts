export type CurrentPage = 'menu' | 'server-list' | 'hero-select' | 'game' | 'game-end';

export type EventType = 'change-page' | 'chat-message';

export interface ObserverState {
  currentPage: CurrentPage;
}

export interface ObserverEvent {
  type: EventType;
  value?: any;
  target?: HTMLElement;
}

export type ObserverEventsObject = Array<{
  type: EventType;
  statement: boolean;
  value?: any;
  target?: HTMLElement;
}>;

export type ObserverSubscriber = (event: ObserverEvent) => void;
