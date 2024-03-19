import Scripts from './scripts';

declare global {
  interface Window {
    scripts: Scripts;
    tsmod?: boolean;
  }
}
