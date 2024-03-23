export namespace ButtonMarking {
  export const makeButton = (): HTMLDivElement => {
    makeStyles();
    const button = document.createElement('div');
    button.classList.add('esp-scripts-button');
    button.setAttribute('id', 'esp-scripts-button');
    button.appendChild(makeButtonIcon());
    button.onclick = () => {
      const e = document.getElementById('esp-scripts-menu');
      e.style.display = e.style.display === 'none' ? '' : 'none';
    };
    return button;
  };

  const makeButtonIcon = (): HTMLImageElement => {
    const buttonIcon = document.createElement('img');
    buttonIcon.src = 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/settings.svg';
    buttonIcon.classList.add('esp-scripts-button-icon');
    return buttonIcon;
  };

  const makeStyles = () => {
    window.sdom.addStyle(
      `.esp-scripts-button {cursor: pointer;position: absolute;bottom: 10px;right: 10px;}.esp-scripts-button-icon {width: 36px;height: 36px;}`
    );
  };
}
