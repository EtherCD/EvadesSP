export namespace ScriptStyles {
  let styles: Array<string> = [];

  export const push = (...style: Array<string>) => {
    styles.push(...style);
  };

  export const patch = () => {
    const style = document.createElement('style');
    style.innerHTML = styles.join(' ');
    style.id = 'esp-styles';
    document.head.appendChild(style);
  };
}
