let styles: Array<string> = [];

/**
 * Adds styles to document
 * @param css Styles
 */
export function addStyle(css: string): void {
  styles.push(css);
}

/**
 * Creates style node, and put all styles
 */
export function pushStylesToDom(): void {
  const style = document.createElement('style');
  style.innerHTML = styles.join(' ');
  style.id = 'esp-styles';
  document.head.appendChild(style);
}
