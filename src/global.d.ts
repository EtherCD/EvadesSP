import { ObserverState, ObserverSubscriber } from './observer/types';
import Scripts from './scripts';

declare global {
  interface Window {
    scripts: Scripts;
    observerState: { cur: ObserverState; old: ObserverState };
    observerSubs: Array<ObserverSubscriber>;
    tsmod?: boolean;
  }
}
