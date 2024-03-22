export type CurrentPage = 'menu' | 'server-list' | 'hero-select' | 'game' | 'game-end';

export interface ObserverState {
  currentPage: string;
}

export type ObserverSubscriber = (state: ObserverState) => void;
