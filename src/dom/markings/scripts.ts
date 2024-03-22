import Script from '../../script';
import { addStyle } from '../../styles';

export namespace ScriptsMenuMarking {
  export const makeScriptsMenu = (): HTMLDivElement => {
    makeStyles();
    return makeScriptsNode();
  };

  const makeScriptsNode = (): HTMLDivElement => {
    const scriptsMenu = document.createElement('div');
    scriptsMenu.classList.add('esp-scripts-menu');
    scriptsMenu.style.display = 'none';
    scriptsMenu.setAttribute('id', 'esp-scripts-menu');

    const scriptsContainer = document.createElement('div');
    scriptsContainer.classList.add('esp-scripts-container');

    const spanName = document.createElement('span');
    spanName.innerHTML = 'Scripts';
    spanName.classList.add('esp-scripts-title');
    scriptsContainer.appendChild(spanName);

    const closeMenu = document.createElement('input');
    closeMenu.type = 'button';
    closeMenu.value = 'x';
    closeMenu.onclick = () => (document.getElementById('esp-scripts-menu').style.display = 'none');
    closeMenu.classList.add('esp-scripts-close-btn');
    scriptsContainer.appendChild(closeMenu);

    const scriptsList = document.createElement('div');
    scriptsList.classList.add('esp-scripts-list');

    window.scripts.forEach((e) => {
      scriptsList.appendChild(makeScriptLable(e));
    });

    scriptsContainer.appendChild(scriptsList);

    scriptsMenu.appendChild(scriptsContainer);

    return scriptsMenu;
  };

  const makeScriptLable = (e: Script): HTMLLabelElement => {
    const labelContainer = document.createElement('label');
    labelContainer.classList.add('esp-script-lable');

    const divContainer = document.createElement('div');
    divContainer.classList.add('esp-script-container');

    const scriptIconImg = document.createElement('img');
    scriptIconImg.classList.add('esp-script-icon');
    scriptIconImg.src = e.icon;
    /* Adds Script Icon */
    divContainer.appendChild(scriptIconImg);

    const scriptNameSpan = document.createElement('span');
    scriptNameSpan.classList.add('esp-script-name');
    scriptNameSpan.innerHTML = e.name;
    /* Adds Script Name */
    divContainer.appendChild(scriptNameSpan);

    const scriptDescriptionSpan = document.createElement('span');
    scriptDescriptionSpan.classList.add('esp-script-description');
    /* Adds Script Description P */
    const scriptDescriptionP = document.createElement('p');
    scriptDescriptionP.innerHTML = e.description;
    scriptDescriptionSpan.appendChild(scriptDescriptionP);
    /* Adds Script Description Span */
    divContainer.appendChild(scriptDescriptionSpan);

    const scriptCooollllCheckboxDiv = document.createElement('div');
    scriptCooollllCheckboxDiv.classList.add('checkbox-wrapper-12');
    scriptCooollllCheckboxDiv.innerHTML = `<div class="cbx"><input id="cbx-12" type="checkbox"/><label for="cbx-12"></label><svg width="15" height="14" viewbox="0 0 15 14" fill="none"><path d="M2 8.36364L6.23077 12L13 2"></path></svg></div><!-- Gooey--><svg xmlns="http://www.w3.org/2000/svg" version="1.1"><defs><filter id="goo-12"><fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur><fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></fecolormatrix><feblend in="SourceGraphic" in2="goo-12"></feblend></filter></defs></svg>`;
    divContainer.appendChild(scriptCooollllCheckboxDiv);

    labelContainer.appendChild(divContainer);

    return labelContainer;
  };

  const makeStyles = () => {
    addStyle(`:root {\n--mainFont: Montserrat;\n}`);
    addStyle(
      `.esp-scripts-menu{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);flex-direction:column;color:#fff}.esp-scripts-container{width:450px;background-color:rgba(0,0,0,.9);display:flex;border-radius:12px;padding:30px 10px 0}.esp-scripts-title{margin-top:-23px;position:absolute;letter-spacing:.02em}.esp-scripts-close-btn{position:absolute;margin-top:-32px;margin-left:428px;font-weight:700;font-size:25px;font-family:var(--mainFont);border:none;background-color:transparent;color:red;cursor:pointer}.esp-script-icon{height:36px;width:36px;margin-top:10px;margin-left:10px}.esp-script-name{font-size:16px;margin-top:10px;position:absolute;margin-left:10px;letter-spacing:.02em}.esp-script-description p{text-align:left;max-width:320px;letter-spacing:.02em;margin-top:-15px;margin-left:55px}.cbx{margin-top:-33px}.checkbox-wrapper-12{position:absolute;margin-left:410px;margin-top:-44px}.checkbox-wrapper-12>svg{position:absolute;top:-130%;left:-170%;width:110px;pointer-events:none}.checkbox-wrapper-12 *{box-sizing:border-box}.checkbox-wrapper-12 input[type=checkbox]{-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent;cursor:pointer;margin:0}.checkbox-wrapper-12 input[type=checkbox]:focus{outline:0}.checkbox-wrapper-12 .cbx{width:24px;height:24px;top:calc(50vh - 12px);left:calc(50vw - 12px)}.checkbox-wrapper-12 .cbx input{position:absolute;top:0;left:0;width:24px;height:24px;border:2px solid #bfbfc0;border-radius:50%}.checkbox-wrapper-12 .cbx label{width:24px;height:24px;background:0 0;border-radius:50%;position:absolute;top:0;left:0;-webkit-filter:url('#goo-12');filter:url('#goo-12');transform:trasnlate3d(0,0,0);pointer-events:none}.checkbox-wrapper-12 .cbx svg{position:absolute;top:5px;left:4px;z-index:1;pointer-events:none}.checkbox-wrapper-12 .cbx svg path{stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:19;stroke-dashoffset:19;transition:stroke-dashoffset .3s 0.2s}.checkbox-wrapper-12 .cbx input:checked+label{animation:.6s forwards splash-12}.checkbox-wrapper-12 .cbx input:checked+label+svg path{stroke-dashoffset:0}@-moz-keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}@-webkit-keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}@-o-keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}@keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}`
    );
  };
}
