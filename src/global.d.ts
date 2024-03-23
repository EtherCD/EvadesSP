import { Scripts } from './scripts';
import { SDom } from './sdom';

declare global {
  interface Window {
    sdom: SDom;
    tsmod?: boolean;
    scripts: Scripts;
  }
}
