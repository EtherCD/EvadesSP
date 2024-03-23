/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/observer/helper.ts":
/*!********************************!*\
  !*** ./src/observer/helper.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateState = exports.submitChanges = exports.checkChanges = exports.isPage = void 0;
let curState = { currentPage: 'menu' };
let oldState = { currentPage: 'menu' };
const isPage = (event, className) => event.target.classList ? event.target.classList.contains(className) : false;
exports.isPage = isPage;
const checkChanges = () => {
    if (curState.currentPage !== oldState.currentPage) {
        oldState = JSON.parse(JSON.stringify(curState));
        return true;
    }
    return false;
};
exports.checkChanges = checkChanges;
const submitChanges = (subs) => {
    if ((0, exports.checkChanges)())
        subs.forEach((os) => os(curState));
};
exports.submitChanges = submitChanges;
const updateState = (event, subs) => {
    if (event.target.classList ? event.target.classList.length === 0 : true)
        return;
    if ((0, exports.isPage)(event, 'menu'))
        curState.currentPage = 'menu';
    if ((0, exports.isPage)(event, 'server-browser-box'))
        curState.currentPage = 'server-list';
    if ((0, exports.isPage)(event, 'leaderboard-title-break'))
        curState.currentPage = 'game';
    if ((0, exports.isPage)(event, 'hero-select'))
        curState.currentPage = 'hero-select';
    if ((0, exports.isPage)(event, 'results'))
        curState.currentPage = 'game-end';
    (0, exports.submitChanges)(subs);
};
exports.updateState = updateState;


/***/ }),

/***/ "./src/observer/index.ts":
/*!*******************************!*\
  !*** ./src/observer/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addSubscriber = exports.init = void 0;
const helper_1 = __webpack_require__(/*! ./helper */ "./src/observer/helper.ts");
let subscribers = [];
const init = () => {
    document.body.addEventListener('DOMNodeInserted', (e) => (0, helper_1.updateState)(e, subscribers), false);
};
exports.init = init;
const addSubscriber = (callback) => {
    subscribers.push(callback);
};
exports.addSubscriber = addSubscriber;
__exportStar(__webpack_require__(/*! ./helper */ "./src/observer/helper.ts"), exports);
__exportStar(__webpack_require__(/*! ./types */ "./src/observer/types.ts"), exports);


/***/ }),

/***/ "./src/observer/types.ts":
/*!*******************************!*\
  !*** ./src/observer/types.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/scripts/index.ts":
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Scripts = void 0;
const script_1 = __webpack_require__(/*! ./script */ "./src/scripts/script.ts");
class Scripts {
    constructor() {
        this.list = [];
    }
    add(info) {
        this.list.push(new script_1.default(info));
    }
    create(info) {
        const script = new script_1.default(info);
        this.list.push(script);
        return script;
    }
    get(name) {
        for (const i in this.list) {
            if (this.list[i].name === name)
                return this.list[i];
        }
        console.log(name);
        console.warn(`Loading Script Error: Trying get not exists script, name: ${name}`);
    }
    forEach(callback) {
        for (const e in this.list) {
            callback(this.list[e]);
        }
    }
}
exports.Scripts = Scripts;
__exportStar(__webpack_require__(/*! ./script */ "./src/scripts/script.ts"), exports);
__exportStar(__webpack_require__(/*! ./types */ "./src/scripts/types.ts"), exports);
__exportStar(__webpack_require__(/*! ./init */ "./src/scripts/init.ts"), exports);


/***/ }),

/***/ "./src/scripts/init.ts":
/*!*****************************!*\
  !*** ./src/scripts/init.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = void 0;
const init = () => {
    // From script by @Irudis: Evades Helper
    let elem = Array.from(document.querySelectorAll('script')).filter((a) => a.type === 'module' && a.src.match(/\/index\.[0-9a-f]{8}\.js/))[0];
    if (!elem)
        return;
    if (!navigator.userAgent.includes('Firefox'))
        elem.remove();
    let src = elem.src;
    let req = new XMLHttpRequest();
    req.open('GET', src, false);
    req.send();
    let code = req.response;
    for (const s in window.scripts.list)
        code = window.scripts.list[s].patch(code);
    let nScr = document.createElement('script');
    nScr.setAttribute('type', 'module');
    nScr.innerHTML = code;
    document.body.appendChild(nScr);
    console.log('All Scripts was loaded!');
};
exports.init = init;


/***/ }),

/***/ "./src/scripts/script.ts":
/*!*******************************!*\
  !*** ./src/scripts/script.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class Script {
    constructor(info) {
        this.replaces = [];
        this.vars = {};
        this.name = info.name;
        this.icon = info.icon ?? 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/empty-script.svg';
        this.version = info.version ?? 'none';
        this.description = info.description ?? 'Description is not added';
        this.enabled = true;
    }
    addReplace(a, b) {
        this.replaces.push([a, this.formatReplace(b)]);
    }
    addReplaces(...replaces) {
        for (const a in replaces)
            this.addReplace(replaces[a][0], replaces[a][1]);
    }
    formatReplace(v) {
        return v.replace(/#\{([^\}]+)\}/g, (_, m) => `window.scripts.get("${this.name}").getVar("${m}")`);
    }
    addVar(key, value) {
        this.vars[key] = value;
    }
    getVar(key) {
        return this.vars[key];
    }
    patch(code) {
        for (const i in this.replaces)
            code = code.replace(this.replaces[i][0], this.replaces[i][1]);
        console.log(this.name + ' was loaded!');
        return code;
    }
}
exports["default"] = Script;


/***/ }),

/***/ "./src/scripts/types.ts":
/*!******************************!*\
  !*** ./src/scripts/types.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/sdom/index.ts":
/*!***************************!*\
  !*** ./src/sdom/index.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SDom = void 0;
const styles_1 = __webpack_require__(/*! ./styles */ "./src/sdom/styles.ts");
const Observer = __webpack_require__(/*! ../observer */ "./src/observer/index.ts");
/*
 * Scripts Dom
 */
class SDom {
    constructor() {
        this.elements = [];
    }
    addObserverSubscriber(callback) {
        Observer.addSubscriber(callback);
    }
    addHtmlElement(...elements) {
        this.elements.push(...elements);
    }
    addStyle(...styles) {
        styles_1.ScriptStyles.push(...styles);
    }
}
exports.SDom = SDom;
__exportStar(__webpack_require__(/*! ./init */ "./src/sdom/init.ts"), exports);


/***/ }),

/***/ "./src/sdom/init.ts":
/*!**************************!*\
  !*** ./src/sdom/init.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = void 0;
const styles_1 = __webpack_require__(/*! ./styles */ "./src/sdom/styles.ts");
const init = () => {
    styles_1.ScriptStyles.patch();
    window.sdom.elements.forEach((e) => document.body.appendChild(e));
};
exports.init = init;


/***/ }),

/***/ "./src/sdom/styles.ts":
/*!****************************!*\
  !*** ./src/sdom/styles.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScriptStyles = void 0;
var ScriptStyles;
(function (ScriptStyles) {
    let styles = [];
    ScriptStyles.push = (...style) => {
        styles.push(...style);
    };
    ScriptStyles.patch = () => {
        const style = document.createElement('style');
        style.innerHTML = styles.join(' ');
        style.id = 'esp-styles';
        document.head.appendChild(style);
    };
})(ScriptStyles || (exports.ScriptStyles = ScriptStyles = {}));


/***/ }),

/***/ "./src/ui/index.ts":
/*!*************************!*\
  !*** ./src/ui/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const button_1 = __webpack_require__(/*! ./markings/button */ "./src/ui/markings/button.ts");
const scripts_1 = __webpack_require__(/*! ./markings/scripts */ "./src/ui/markings/scripts.ts");
var IU;
(function (IU) {
    IU.init = () => {
        window.sdom.addHtmlElement(button_1.ButtonMarking.makeButton(), scripts_1.ScriptsMenuMarking.makeScriptsMenu());
        window.sdom.addObserverSubscriber((s) => {
            if (s.currentPage !== 'menu' && s.currentPage !== 'server-list') {
                document.getElementById('esp-scripts-button').style.display = 'none';
                document.getElementById('esp-scripts-menu').style.display = 'none';
            }
            else {
                document.getElementById('esp-scripts-button').style.display = '';
            }
        });
    };
})(IU || (IU = {}));
exports["default"] = IU;


/***/ }),

/***/ "./src/ui/markings/button.ts":
/*!***********************************!*\
  !*** ./src/ui/markings/button.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ButtonMarking = void 0;
var ButtonMarking;
(function (ButtonMarking) {
    ButtonMarking.makeButton = () => {
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
    const makeButtonIcon = () => {
        const buttonIcon = document.createElement('img');
        buttonIcon.src = 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/settings.svg';
        buttonIcon.classList.add('esp-scripts-button-icon');
        return buttonIcon;
    };
    const makeStyles = () => {
        window.sdom.addStyle(`.esp-scripts-button {cursor: pointer;position: absolute;bottom: 10px;right: 10px;}.esp-scripts-button-icon {width: 36px;height: 36px;}`);
    };
})(ButtonMarking || (exports.ButtonMarking = ButtonMarking = {}));


/***/ }),

/***/ "./src/ui/markings/scripts.ts":
/*!************************************!*\
  !*** ./src/ui/markings/scripts.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScriptsMenuMarking = void 0;
var ScriptsMenuMarking;
(function (ScriptsMenuMarking) {
    ScriptsMenuMarking.makeScriptsMenu = () => {
        makeStyles();
        return makeScriptsNode();
    };
    const makeScriptsNode = () => {
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
    const makeScriptLable = (e) => {
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
        window.sdom.addStyle(`:root {\n--mainFont: Montserrat;\n}`);
        window.sdom.addStyle(`.esp-scripts-menu{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);flex-direction:column;color:#fff}.esp-scripts-container{width:450px;background-color:rgba(0,0,0,.9);display:flex;border-radius:12px;padding:30px 10px 0}.esp-scripts-title{margin-top:-23px;position:absolute;letter-spacing:.02em}.esp-scripts-close-btn{position:absolute;margin-top:-32px;margin-left:428px;font-weight:700;font-size:25px;font-family:var(--mainFont);border:none;background-color:transparent;color:red;cursor:pointer}.esp-script-icon{height:36px;width:36px;margin-top:10px;margin-left:10px}.esp-script-name{font-size:16px;margin-top:10px;position:absolute;margin-left:10px;letter-spacing:.02em}.esp-script-description p{text-align:left;max-width:320px;letter-spacing:.02em;margin-top:-15px;margin-left:55px}.cbx{margin-top:-33px}.checkbox-wrapper-12{position:absolute;margin-left:410px;margin-top:-44px}.checkbox-wrapper-12>svg{position:absolute;top:-130%;left:-170%;width:110px;pointer-events:none}.checkbox-wrapper-12 *{box-sizing:border-box}.checkbox-wrapper-12 input[type=checkbox]{-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent;cursor:pointer;margin:0}.checkbox-wrapper-12 input[type=checkbox]:focus{outline:0}.checkbox-wrapper-12 .cbx{width:24px;height:24px;top:calc(50vh - 12px);left:calc(50vw - 12px)}.checkbox-wrapper-12 .cbx input{position:absolute;top:0;left:0;width:24px;height:24px;border:2px solid #bfbfc0;border-radius:50%}.checkbox-wrapper-12 .cbx label{width:24px;height:24px;background:0 0;border-radius:50%;position:absolute;top:0;left:0;-webkit-filter:url('#goo-12');filter:url('#goo-12');transform:trasnlate3d(0,0,0);pointer-events:none}.checkbox-wrapper-12 .cbx svg{position:absolute;top:5px;left:4px;z-index:1;pointer-events:none}.checkbox-wrapper-12 .cbx svg path{stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:19;stroke-dashoffset:19;transition:stroke-dashoffset .3s 0.2s}.checkbox-wrapper-12 .cbx input:checked+label{animation:.6s forwards splash-12}.checkbox-wrapper-12 .cbx input:checked+label+svg path{stroke-dashoffset:0}@-moz-keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}@-webkit-keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}@-o-keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}@keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}`);
    };
})(ScriptsMenuMarking || (exports.ScriptsMenuMarking = ScriptsMenuMarking = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

// ==UserScript==
// @name         Evades-SP Dev
// @version      dev-3
// @description  Dev version of E-SP, may contain errors
// @author       @EtherCD, styles by @duesti.
// @match        https://*.evades.io/*
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp-dev.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp-dev.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/favicon-dev.svg
// @run-at       document-idle
// @license      MIT License
// @grant        none
// ==/UserScript==
Object.defineProperty(exports, "__esModule", ({ value: true }));
const observer = __webpack_require__(/*! ./observer */ "./src/observer/index.ts");
const scripts = __webpack_require__(/*! ./scripts */ "./src/scripts/index.ts");
const sdom = __webpack_require__(/*! ./sdom */ "./src/sdom/index.ts");
const ui_1 = __webpack_require__(/*! ./ui */ "./src/ui/index.ts");
window.scripts = new scripts.Scripts();
observer.init();
window.sdom = new sdom.SDom();
document.addEventListener('readystatechange', () => {
    if (window.location.href.search(/\/profile/g) === -1 && window.location.href.search(/\/account/g) === -1) {
        scripts.init();
        ui_1.default.init();
    }
    sdom.init();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWtCLE1BQU0sT0FBTyw4QkFBOEIsc0JBQXNCLDZCQUE2QixvQkFBb0IsOEJBQThCLGtCQUFrQixRQUFRLFNBQVMsVUFBVSxvQkFBb0IsbUNBQW1DLFlBQVksZUFBZSxxQkFBcUIsc0JBQXNCLG9CQUFvQixxQkFBcUIsc0NBQXNDLDhDQUE4QyxpQ0FBaUMsdURBQXVELG9CQUFvQiwwQkFBMEIsSUFBSSxtQkFBbUIsNEpBQTRKLEtBQUssbUJBQW1CLCtMQUErTCw2QkFBNkIsSUFBSSxtQkFBbUIsNEpBQTRKLEtBQUssbUJBQW1CLCtMQUErTCx3QkFBd0IsSUFBSSxtQkFBbUIsNEpBQTRKLEtBQUssbUJBQW1CLCtMQUErTCxxQkFBcUIsSUFBSSxtQkFBbUIsNEpBQTRKLEtBQUssbUJBQW1CLCtMQUErTDtBQUN0d0g7QUFDQSxDQUFDLHlCQUF5QiwwQkFBMEIsMEJBQTBCOzs7Ozs7O1VDckU5RTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDdEJhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCLG1CQUFPLENBQUMsMkNBQVk7QUFDckMsZ0JBQWdCLG1CQUFPLENBQUMseUNBQVc7QUFDbkMsYUFBYSxtQkFBTyxDQUFDLG1DQUFRO0FBQzdCLGFBQWEsbUJBQU8sQ0FBQywrQkFBTTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvb2JzZXJ2ZXIvaGVscGVyLnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL29ic2VydmVyL2luZGV4LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL29ic2VydmVyL3R5cGVzLnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3NjcmlwdHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvc2NyaXB0cy9pbml0LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3NjcmlwdHMvc2NyaXB0LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3NjcmlwdHMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvc2RvbS9pbmRleC50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9zZG9tL2luaXQudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvc2RvbS9zdHlsZXMudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvdWkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvdWkvbWFya2luZ3MvYnV0dG9uLnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3VpL21hcmtpbmdzL3NjcmlwdHMudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVwZGF0ZVN0YXRlID0gZXhwb3J0cy5zdWJtaXRDaGFuZ2VzID0gZXhwb3J0cy5jaGVja0NoYW5nZXMgPSBleHBvcnRzLmlzUGFnZSA9IHZvaWQgMDtcbmxldCBjdXJTdGF0ZSA9IHsgY3VycmVudFBhZ2U6ICdtZW51JyB9O1xubGV0IG9sZFN0YXRlID0geyBjdXJyZW50UGFnZTogJ21lbnUnIH07XG5jb25zdCBpc1BhZ2UgPSAoZXZlbnQsIGNsYXNzTmFtZSkgPT4gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCA/IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSA6IGZhbHNlO1xuZXhwb3J0cy5pc1BhZ2UgPSBpc1BhZ2U7XG5jb25zdCBjaGVja0NoYW5nZXMgPSAoKSA9PiB7XG4gICAgaWYgKGN1clN0YXRlLmN1cnJlbnRQYWdlICE9PSBvbGRTdGF0ZS5jdXJyZW50UGFnZSkge1xuICAgICAgICBvbGRTdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY3VyU3RhdGUpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5leHBvcnRzLmNoZWNrQ2hhbmdlcyA9IGNoZWNrQ2hhbmdlcztcbmNvbnN0IHN1Ym1pdENoYW5nZXMgPSAoc3VicykgPT4ge1xuICAgIGlmICgoMCwgZXhwb3J0cy5jaGVja0NoYW5nZXMpKCkpXG4gICAgICAgIHN1YnMuZm9yRWFjaCgob3MpID0+IG9zKGN1clN0YXRlKSk7XG59O1xuZXhwb3J0cy5zdWJtaXRDaGFuZ2VzID0gc3VibWl0Q2hhbmdlcztcbmNvbnN0IHVwZGF0ZVN0YXRlID0gKGV2ZW50LCBzdWJzKSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QgPyBldmVudC50YXJnZXQuY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMCA6IHRydWUpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoKDAsIGV4cG9ydHMuaXNQYWdlKShldmVudCwgJ21lbnUnKSlcbiAgICAgICAgY3VyU3RhdGUuY3VycmVudFBhZ2UgPSAnbWVudSc7XG4gICAgaWYgKCgwLCBleHBvcnRzLmlzUGFnZSkoZXZlbnQsICdzZXJ2ZXItYnJvd3Nlci1ib3gnKSlcbiAgICAgICAgY3VyU3RhdGUuY3VycmVudFBhZ2UgPSAnc2VydmVyLWxpc3QnO1xuICAgIGlmICgoMCwgZXhwb3J0cy5pc1BhZ2UpKGV2ZW50LCAnbGVhZGVyYm9hcmQtdGl0bGUtYnJlYWsnKSlcbiAgICAgICAgY3VyU3RhdGUuY3VycmVudFBhZ2UgPSAnZ2FtZSc7XG4gICAgaWYgKCgwLCBleHBvcnRzLmlzUGFnZSkoZXZlbnQsICdoZXJvLXNlbGVjdCcpKVxuICAgICAgICBjdXJTdGF0ZS5jdXJyZW50UGFnZSA9ICdoZXJvLXNlbGVjdCc7XG4gICAgaWYgKCgwLCBleHBvcnRzLmlzUGFnZSkoZXZlbnQsICdyZXN1bHRzJykpXG4gICAgICAgIGN1clN0YXRlLmN1cnJlbnRQYWdlID0gJ2dhbWUtZW5kJztcbiAgICAoMCwgZXhwb3J0cy5zdWJtaXRDaGFuZ2VzKShzdWJzKTtcbn07XG5leHBvcnRzLnVwZGF0ZVN0YXRlID0gdXBkYXRlU3RhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hZGRTdWJzY3JpYmVyID0gZXhwb3J0cy5pbml0ID0gdm9pZCAwO1xuY29uc3QgaGVscGVyXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJcIik7XG5sZXQgc3Vic2NyaWJlcnMgPSBbXTtcbmNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlSW5zZXJ0ZWQnLCAoZSkgPT4gKDAsIGhlbHBlcl8xLnVwZGF0ZVN0YXRlKShlLCBzdWJzY3JpYmVycyksIGZhbHNlKTtcbn07XG5leHBvcnRzLmluaXQgPSBpbml0O1xuY29uc3QgYWRkU3Vic2NyaWJlciA9IChjYWxsYmFjaykgPT4ge1xuICAgIHN1YnNjcmliZXJzLnB1c2goY2FsbGJhY2spO1xufTtcbmV4cG9ydHMuYWRkU3Vic2NyaWJlciA9IGFkZFN1YnNjcmliZXI7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vaGVscGVyXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi90eXBlc1wiKSwgZXhwb3J0cyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNjcmlwdHMgPSB2b2lkIDA7XG5jb25zdCBzY3JpcHRfMSA9IHJlcXVpcmUoXCIuL3NjcmlwdFwiKTtcbmNsYXNzIFNjcmlwdHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxpc3QgPSBbXTtcbiAgICB9XG4gICAgYWRkKGluZm8pIHtcbiAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3IHNjcmlwdF8xLmRlZmF1bHQoaW5mbykpO1xuICAgIH1cbiAgICBjcmVhdGUoaW5mbykge1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBuZXcgc2NyaXB0XzEuZGVmYXVsdChpbmZvKTtcbiAgICAgICAgdGhpcy5saXN0LnB1c2goc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuIHNjcmlwdDtcbiAgICB9XG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMubGlzdCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFtpXS5uYW1lID09PSBuYW1lKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RbaV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cobmFtZSk7XG4gICAgICAgIGNvbnNvbGUud2FybihgTG9hZGluZyBTY3JpcHQgRXJyb3I6IFRyeWluZyBnZXQgbm90IGV4aXN0cyBzY3JpcHQsIG5hbWU6ICR7bmFtZX1gKTtcbiAgICB9XG4gICAgZm9yRWFjaChjYWxsYmFjaykge1xuICAgICAgICBmb3IgKGNvbnN0IGUgaW4gdGhpcy5saXN0KSB7XG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLmxpc3RbZV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5TY3JpcHRzID0gU2NyaXB0cztcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zY3JpcHRcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3R5cGVzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9pbml0XCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0ID0gdm9pZCAwO1xuY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICAvLyBGcm9tIHNjcmlwdCBieSBASXJ1ZGlzOiBFdmFkZXMgSGVscGVyXG4gICAgbGV0IGVsZW0gPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdCcpKS5maWx0ZXIoKGEpID0+IGEudHlwZSA9PT0gJ21vZHVsZScgJiYgYS5zcmMubWF0Y2goL1xcL2luZGV4XFwuWzAtOWEtZl17OH1cXC5qcy8pKVswXTtcbiAgICBpZiAoIWVsZW0pXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoIW5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoJ0ZpcmVmb3gnKSlcbiAgICAgICAgZWxlbS5yZW1vdmUoKTtcbiAgICBsZXQgc3JjID0gZWxlbS5zcmM7XG4gICAgbGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcS5vcGVuKCdHRVQnLCBzcmMsIGZhbHNlKTtcbiAgICByZXEuc2VuZCgpO1xuICAgIGxldCBjb2RlID0gcmVxLnJlc3BvbnNlO1xuICAgIGZvciAoY29uc3QgcyBpbiB3aW5kb3cuc2NyaXB0cy5saXN0KVxuICAgICAgICBjb2RlID0gd2luZG93LnNjcmlwdHMubGlzdFtzXS5wYXRjaChjb2RlKTtcbiAgICBsZXQgblNjciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIG5TY3Iuc2V0QXR0cmlidXRlKCd0eXBlJywgJ21vZHVsZScpO1xuICAgIG5TY3IuaW5uZXJIVE1MID0gY29kZTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5TY3IpO1xuICAgIGNvbnNvbGUubG9nKCdBbGwgU2NyaXB0cyB3YXMgbG9hZGVkIScpO1xufTtcbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFNjcmlwdCB7XG4gICAgY29uc3RydWN0b3IoaW5mbykge1xuICAgICAgICB0aGlzLnJlcGxhY2VzID0gW107XG4gICAgICAgIHRoaXMudmFycyA9IHt9O1xuICAgICAgICB0aGlzLm5hbWUgPSBpbmZvLm5hbWU7XG4gICAgICAgIHRoaXMuaWNvbiA9IGluZm8uaWNvbiA/PyAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0V0aGVyQ0QvRXZhZGVzU1AvbWFpbi9yZXBvL2VtcHR5LXNjcmlwdC5zdmcnO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSBpbmZvLnZlcnNpb24gPz8gJ25vbmUnO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gaW5mby5kZXNjcmlwdGlvbiA/PyAnRGVzY3JpcHRpb24gaXMgbm90IGFkZGVkJztcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgYWRkUmVwbGFjZShhLCBiKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZXMucHVzaChbYSwgdGhpcy5mb3JtYXRSZXBsYWNlKGIpXSk7XG4gICAgfVxuICAgIGFkZFJlcGxhY2VzKC4uLnJlcGxhY2VzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYSBpbiByZXBsYWNlcylcbiAgICAgICAgICAgIHRoaXMuYWRkUmVwbGFjZShyZXBsYWNlc1thXVswXSwgcmVwbGFjZXNbYV1bMV0pO1xuICAgIH1cbiAgICBmb3JtYXRSZXBsYWNlKHYpIHtcbiAgICAgICAgcmV0dXJuIHYucmVwbGFjZSgvI1xceyhbXlxcfV0rKVxcfS9nLCAoXywgbSkgPT4gYHdpbmRvdy5zY3JpcHRzLmdldChcIiR7dGhpcy5uYW1lfVwiKS5nZXRWYXIoXCIke219XCIpYCk7XG4gICAgfVxuICAgIGFkZFZhcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFyc1trZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGdldFZhcihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFyc1trZXldO1xuICAgIH1cbiAgICBwYXRjaChjb2RlKSB7XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLnJlcGxhY2VzKVxuICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSh0aGlzLnJlcGxhY2VzW2ldWzBdLCB0aGlzLnJlcGxhY2VzW2ldWzFdKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJyB3YXMgbG9hZGVkIScpO1xuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTY3JpcHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNEb20gPSB2b2lkIDA7XG5jb25zdCBzdHlsZXNfMSA9IHJlcXVpcmUoXCIuL3N0eWxlc1wiKTtcbmNvbnN0IE9ic2VydmVyID0gcmVxdWlyZShcIi4uL29ic2VydmVyXCIpO1xuLypcbiAqIFNjcmlwdHMgRG9tXG4gKi9cbmNsYXNzIFNEb20ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgfVxuICAgIGFkZE9ic2VydmVyU3Vic2NyaWJlcihjYWxsYmFjaykge1xuICAgICAgICBPYnNlcnZlci5hZGRTdWJzY3JpYmVyKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgYWRkSHRtbEVsZW1lbnQoLi4uZWxlbWVudHMpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKC4uLmVsZW1lbnRzKTtcbiAgICB9XG4gICAgYWRkU3R5bGUoLi4uc3R5bGVzKSB7XG4gICAgICAgIHN0eWxlc18xLlNjcmlwdFN0eWxlcy5wdXNoKC4uLnN0eWxlcyk7XG4gICAgfVxufVxuZXhwb3J0cy5TRG9tID0gU0RvbTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9pbml0XCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0ID0gdm9pZCAwO1xuY29uc3Qgc3R5bGVzXzEgPSByZXF1aXJlKFwiLi9zdHlsZXNcIik7XG5jb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIHN0eWxlc18xLlNjcmlwdFN0eWxlcy5wYXRjaCgpO1xuICAgIHdpbmRvdy5zZG9tLmVsZW1lbnRzLmZvckVhY2goKGUpID0+IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZSkpO1xufTtcbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2NyaXB0U3R5bGVzID0gdm9pZCAwO1xudmFyIFNjcmlwdFN0eWxlcztcbihmdW5jdGlvbiAoU2NyaXB0U3R5bGVzKSB7XG4gICAgbGV0IHN0eWxlcyA9IFtdO1xuICAgIFNjcmlwdFN0eWxlcy5wdXNoID0gKC4uLnN0eWxlKSA9PiB7XG4gICAgICAgIHN0eWxlcy5wdXNoKC4uLnN0eWxlKTtcbiAgICB9O1xuICAgIFNjcmlwdFN0eWxlcy5wYXRjaCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSBzdHlsZXMuam9pbignICcpO1xuICAgICAgICBzdHlsZS5pZCA9ICdlc3Atc3R5bGVzJztcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfTtcbn0pKFNjcmlwdFN0eWxlcyB8fCAoZXhwb3J0cy5TY3JpcHRTdHlsZXMgPSBTY3JpcHRTdHlsZXMgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBidXR0b25fMSA9IHJlcXVpcmUoXCIuL21hcmtpbmdzL2J1dHRvblwiKTtcbmNvbnN0IHNjcmlwdHNfMSA9IHJlcXVpcmUoXCIuL21hcmtpbmdzL3NjcmlwdHNcIik7XG52YXIgSVU7XG4oZnVuY3Rpb24gKElVKSB7XG4gICAgSVUuaW5pdCA9ICgpID0+IHtcbiAgICAgICAgd2luZG93LnNkb20uYWRkSHRtbEVsZW1lbnQoYnV0dG9uXzEuQnV0dG9uTWFya2luZy5tYWtlQnV0dG9uKCksIHNjcmlwdHNfMS5TY3JpcHRzTWVudU1hcmtpbmcubWFrZVNjcmlwdHNNZW51KCkpO1xuICAgICAgICB3aW5kb3cuc2RvbS5hZGRPYnNlcnZlclN1YnNjcmliZXIoKHMpID0+IHtcbiAgICAgICAgICAgIGlmIChzLmN1cnJlbnRQYWdlICE9PSAnbWVudScgJiYgcy5jdXJyZW50UGFnZSAhPT0gJ3NlcnZlci1saXN0Jykge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlc3Atc2NyaXB0cy1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlc3Atc2NyaXB0cy1tZW51Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlc3Atc2NyaXB0cy1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59KShJVSB8fCAoSVUgPSB7fSkpO1xuZXhwb3J0cy5kZWZhdWx0ID0gSVU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQnV0dG9uTWFya2luZyA9IHZvaWQgMDtcbnZhciBCdXR0b25NYXJraW5nO1xuKGZ1bmN0aW9uIChCdXR0b25NYXJraW5nKSB7XG4gICAgQnV0dG9uTWFya2luZy5tYWtlQnV0dG9uID0gKCkgPT4ge1xuICAgICAgICBtYWtlU3R5bGVzKCk7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBidXR0b24uY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdHMtYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2VzcC1zY3JpcHRzLWJ1dHRvbicpO1xuICAgICAgICBidXR0b24uYXBwZW5kQ2hpbGQobWFrZUJ1dHRvbkljb24oKSk7XG4gICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlc3Atc2NyaXB0cy1tZW51Jyk7XG4gICAgICAgICAgICBlLnN0eWxlLmRpc3BsYXkgPSBlLnN0eWxlLmRpc3BsYXkgPT09ICdub25lJyA/ICcnIDogJ25vbmUnO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYnV0dG9uO1xuICAgIH07XG4gICAgY29uc3QgbWFrZUJ1dHRvbkljb24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGJ1dHRvbkljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgYnV0dG9uSWNvbi5zcmMgPSAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0V0aGVyQ0QvRXZhZGVzU1AvbWFpbi9yZXBvL3NldHRpbmdzLnN2Zyc7XG4gICAgICAgIGJ1dHRvbkljb24uY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdHMtYnV0dG9uLWljb24nKTtcbiAgICAgICAgcmV0dXJuIGJ1dHRvbkljb247XG4gICAgfTtcbiAgICBjb25zdCBtYWtlU3R5bGVzID0gKCkgPT4ge1xuICAgICAgICB3aW5kb3cuc2RvbS5hZGRTdHlsZShgLmVzcC1zY3JpcHRzLWJ1dHRvbiB7Y3Vyc29yOiBwb2ludGVyO3Bvc2l0aW9uOiBhYnNvbHV0ZTtib3R0b206IDEwcHg7cmlnaHQ6IDEwcHg7fS5lc3Atc2NyaXB0cy1idXR0b24taWNvbiB7d2lkdGg6IDM2cHg7aGVpZ2h0OiAzNnB4O31gKTtcbiAgICB9O1xufSkoQnV0dG9uTWFya2luZyB8fCAoZXhwb3J0cy5CdXR0b25NYXJraW5nID0gQnV0dG9uTWFya2luZyA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2NyaXB0c01lbnVNYXJraW5nID0gdm9pZCAwO1xudmFyIFNjcmlwdHNNZW51TWFya2luZztcbihmdW5jdGlvbiAoU2NyaXB0c01lbnVNYXJraW5nKSB7XG4gICAgU2NyaXB0c01lbnVNYXJraW5nLm1ha2VTY3JpcHRzTWVudSA9ICgpID0+IHtcbiAgICAgICAgbWFrZVN0eWxlcygpO1xuICAgICAgICByZXR1cm4gbWFrZVNjcmlwdHNOb2RlKCk7XG4gICAgfTtcbiAgICBjb25zdCBtYWtlU2NyaXB0c05vZGUgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNjcmlwdHNNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNjcmlwdHNNZW51LmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHRzLW1lbnUnKTtcbiAgICAgICAgc2NyaXB0c01lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgc2NyaXB0c01lbnUuc2V0QXR0cmlidXRlKCdpZCcsICdlc3Atc2NyaXB0cy1tZW51Jyk7XG4gICAgICAgIGNvbnN0IHNjcmlwdHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2NyaXB0c0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy1jb250YWluZXInKTtcbiAgICAgICAgY29uc3Qgc3Bhbk5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNwYW5OYW1lLmlubmVySFRNTCA9ICdTY3JpcHRzJztcbiAgICAgICAgc3Bhbk5hbWUuY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdHMtdGl0bGUnKTtcbiAgICAgICAgc2NyaXB0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChzcGFuTmFtZSk7XG4gICAgICAgIGNvbnN0IGNsb3NlTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNsb3NlTWVudS50eXBlID0gJ2J1dHRvbic7XG4gICAgICAgIGNsb3NlTWVudS52YWx1ZSA9ICd4JztcbiAgICAgICAgY2xvc2VNZW51Lm9uY2xpY2sgPSAoKSA9PiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VzcC1zY3JpcHRzLW1lbnUnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcbiAgICAgICAgY2xvc2VNZW51LmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHRzLWNsb3NlLWJ0bicpO1xuICAgICAgICBzY3JpcHRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb3NlTWVudSk7XG4gICAgICAgIGNvbnN0IHNjcmlwdHNMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNjcmlwdHNMaXN0LmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHRzLWxpc3QnKTtcbiAgICAgICAgd2luZG93LnNjcmlwdHMuZm9yRWFjaCgoZSkgPT4ge1xuICAgICAgICAgICAgc2NyaXB0c0xpc3QuYXBwZW5kQ2hpbGQobWFrZVNjcmlwdExhYmxlKGUpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNjcmlwdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc2NyaXB0c0xpc3QpO1xuICAgICAgICBzY3JpcHRzTWVudS5hcHBlbmRDaGlsZChzY3JpcHRzQ29udGFpbmVyKTtcbiAgICAgICAgcmV0dXJuIHNjcmlwdHNNZW51O1xuICAgIH07XG4gICAgY29uc3QgbWFrZVNjcmlwdExhYmxlID0gKGUpID0+IHtcbiAgICAgICAgY29uc3QgbGFiZWxDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsYWJlbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0LWxhYmxlJyk7XG4gICAgICAgIGNvbnN0IGRpdkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkaXZDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3Qgc2NyaXB0SWNvbkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBzY3JpcHRJY29uSW1nLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHQtaWNvbicpO1xuICAgICAgICBzY3JpcHRJY29uSW1nLnNyYyA9IGUuaWNvbjtcbiAgICAgICAgLyogQWRkcyBTY3JpcHQgSWNvbiAqL1xuICAgICAgICBkaXZDb250YWluZXIuYXBwZW5kQ2hpbGQoc2NyaXB0SWNvbkltZyk7XG4gICAgICAgIGNvbnN0IHNjcmlwdE5hbWVTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzY3JpcHROYW1lU3Bhbi5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0LW5hbWUnKTtcbiAgICAgICAgc2NyaXB0TmFtZVNwYW4uaW5uZXJIVE1MID0gZS5uYW1lO1xuICAgICAgICAvKiBBZGRzIFNjcmlwdCBOYW1lICovXG4gICAgICAgIGRpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChzY3JpcHROYW1lU3Bhbik7XG4gICAgICAgIGNvbnN0IHNjcmlwdERlc2NyaXB0aW9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc2NyaXB0RGVzY3JpcHRpb25TcGFuLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHQtZGVzY3JpcHRpb24nKTtcbiAgICAgICAgLyogQWRkcyBTY3JpcHQgRGVzY3JpcHRpb24gUCAqL1xuICAgICAgICBjb25zdCBzY3JpcHREZXNjcmlwdGlvblAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHNjcmlwdERlc2NyaXB0aW9uUC5pbm5lckhUTUwgPSBlLmRlc2NyaXB0aW9uO1xuICAgICAgICBzY3JpcHREZXNjcmlwdGlvblNwYW4uYXBwZW5kQ2hpbGQoc2NyaXB0RGVzY3JpcHRpb25QKTtcbiAgICAgICAgLyogQWRkcyBTY3JpcHQgRGVzY3JpcHRpb24gU3BhbiAqL1xuICAgICAgICBkaXZDb250YWluZXIuYXBwZW5kQ2hpbGQoc2NyaXB0RGVzY3JpcHRpb25TcGFuKTtcbiAgICAgICAgY29uc3Qgc2NyaXB0Q29vb2xsbGxDaGVja2JveERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzY3JpcHRDb29vbGxsbENoZWNrYm94RGl2LmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94LXdyYXBwZXItMTInKTtcbiAgICAgICAgc2NyaXB0Q29vb2xsbGxDaGVja2JveERpdi5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNieFwiPjxpbnB1dCBpZD1cImNieC0xMlwiIHR5cGU9XCJjaGVja2JveFwiLz48bGFiZWwgZm9yPVwiY2J4LTEyXCI+PC9sYWJlbD48c3ZnIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNFwiIHZpZXdib3g9XCIwIDAgMTUgMTRcIiBmaWxsPVwibm9uZVwiPjxwYXRoIGQ9XCJNMiA4LjM2MzY0TDYuMjMwNzcgMTJMMTMgMlwiPjwvcGF0aD48L3N2Zz48L2Rpdj48IS0tIEdvb2V5LS0+PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmVyc2lvbj1cIjEuMVwiPjxkZWZzPjxmaWx0ZXIgaWQ9XCJnb28tMTJcIj48ZmVnYXVzc2lhbmJsdXIgaW49XCJTb3VyY2VHcmFwaGljXCIgc3RkZGV2aWF0aW9uPVwiNFwiIHJlc3VsdD1cImJsdXJcIj48L2ZlZ2F1c3NpYW5ibHVyPjxmZWNvbG9ybWF0cml4IGluPVwiYmx1clwiIG1vZGU9XCJtYXRyaXhcIiB2YWx1ZXM9XCIxIDAgMCAwIDAgIDAgMSAwIDAgMCAgMCAwIDEgMCAwICAwIDAgMCAyMiAtN1wiIHJlc3VsdD1cImdvby0xMlwiPjwvZmVjb2xvcm1hdHJpeD48ZmVibGVuZCBpbj1cIlNvdXJjZUdyYXBoaWNcIiBpbjI9XCJnb28tMTJcIj48L2ZlYmxlbmQ+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPmA7XG4gICAgICAgIGRpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChzY3JpcHRDb29vbGxsbENoZWNrYm94RGl2KTtcbiAgICAgICAgbGFiZWxDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2Q29udGFpbmVyKTtcbiAgICAgICAgcmV0dXJuIGxhYmVsQ29udGFpbmVyO1xuICAgIH07XG4gICAgY29uc3QgbWFrZVN0eWxlcyA9ICgpID0+IHtcbiAgICAgICAgd2luZG93LnNkb20uYWRkU3R5bGUoYDpyb290IHtcXG4tLW1haW5Gb250OiBNb250c2VycmF0O1xcbn1gKTtcbiAgICAgICAgd2luZG93LnNkb20uYWRkU3R5bGUoYC5lc3Atc2NyaXB0cy1tZW51e3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtjb2xvcjojZmZmfS5lc3Atc2NyaXB0cy1jb250YWluZXJ7d2lkdGg6NDUwcHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC45KTtkaXNwbGF5OmZsZXg7Ym9yZGVyLXJhZGl1czoxMnB4O3BhZGRpbmc6MzBweCAxMHB4IDB9LmVzcC1zY3JpcHRzLXRpdGxle21hcmdpbi10b3A6LTIzcHg7cG9zaXRpb246YWJzb2x1dGU7bGV0dGVyLXNwYWNpbmc6LjAyZW19LmVzcC1zY3JpcHRzLWNsb3NlLWJ0bntwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW4tdG9wOi0zMnB4O21hcmdpbi1sZWZ0OjQyOHB4O2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjVweDtmb250LWZhbWlseTp2YXIoLS1tYWluRm9udCk7Ym9yZGVyOm5vbmU7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtjb2xvcjpyZWQ7Y3Vyc29yOnBvaW50ZXJ9LmVzcC1zY3JpcHQtaWNvbntoZWlnaHQ6MzZweDt3aWR0aDozNnB4O21hcmdpbi10b3A6MTBweDttYXJnaW4tbGVmdDoxMHB4fS5lc3Atc2NyaXB0LW5hbWV7Zm9udC1zaXplOjE2cHg7bWFyZ2luLXRvcDoxMHB4O3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbi1sZWZ0OjEwcHg7bGV0dGVyLXNwYWNpbmc6LjAyZW19LmVzcC1zY3JpcHQtZGVzY3JpcHRpb24gcHt0ZXh0LWFsaWduOmxlZnQ7bWF4LXdpZHRoOjMyMHB4O2xldHRlci1zcGFjaW5nOi4wMmVtO21hcmdpbi10b3A6LTE1cHg7bWFyZ2luLWxlZnQ6NTVweH0uY2J4e21hcmdpbi10b3A6LTMzcHh9LmNoZWNrYm94LXdyYXBwZXItMTJ7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLWxlZnQ6NDEwcHg7bWFyZ2luLXRvcDotNDRweH0uY2hlY2tib3gtd3JhcHBlci0xMj5zdmd7cG9zaXRpb246YWJzb2x1dGU7dG9wOi0xMzAlO2xlZnQ6LTE3MCU7d2lkdGg6MTEwcHg7cG9pbnRlci1ldmVudHM6bm9uZX0uY2hlY2tib3gtd3JhcHBlci0xMiAqe2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY2hlY2tib3gtd3JhcHBlci0xMiBpbnB1dFt0eXBlPWNoZWNrYm94XXstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZTthcHBlYXJhbmNlOm5vbmU7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnRyYW5zcGFyZW50O2N1cnNvcjpwb2ludGVyO21hcmdpbjowfS5jaGVja2JveC13cmFwcGVyLTEyIGlucHV0W3R5cGU9Y2hlY2tib3hdOmZvY3Vze291dGxpbmU6MH0uY2hlY2tib3gtd3JhcHBlci0xMiAuY2J4e3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7dG9wOmNhbGMoNTB2aCAtIDEycHgpO2xlZnQ6Y2FsYyg1MHZ3IC0gMTJweCl9LmNoZWNrYm94LXdyYXBwZXItMTIgLmNieCBpbnB1dHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtib3JkZXI6MnB4IHNvbGlkICNiZmJmYzA7Ym9yZGVyLXJhZGl1czo1MCV9LmNoZWNrYm94LXdyYXBwZXItMTIgLmNieCBsYWJlbHt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2JhY2tncm91bmQ6MCAwO2JvcmRlci1yYWRpdXM6NTAlO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDstd2Via2l0LWZpbHRlcjp1cmwoJyNnb28tMTInKTtmaWx0ZXI6dXJsKCcjZ29vLTEyJyk7dHJhbnNmb3JtOnRyYXNubGF0ZTNkKDAsMCwwKTtwb2ludGVyLWV2ZW50czpub25lfS5jaGVja2JveC13cmFwcGVyLTEyIC5jYnggc3Zne3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1cHg7bGVmdDo0cHg7ei1pbmRleDoxO3BvaW50ZXItZXZlbnRzOm5vbmV9LmNoZWNrYm94LXdyYXBwZXItMTIgLmNieCBzdmcgcGF0aHtzdHJva2U6I2ZmZjtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheToxOTtzdHJva2UtZGFzaG9mZnNldDoxOTt0cmFuc2l0aW9uOnN0cm9rZS1kYXNob2Zmc2V0IC4zcyAwLjJzfS5jaGVja2JveC13cmFwcGVyLTEyIC5jYnggaW5wdXQ6Y2hlY2tlZCtsYWJlbHthbmltYXRpb246LjZzIGZvcndhcmRzIHNwbGFzaC0xMn0uY2hlY2tib3gtd3JhcHBlci0xMiAuY2J4IGlucHV0OmNoZWNrZWQrbGFiZWwrc3ZnIHBhdGh7c3Ryb2tlLWRhc2hvZmZzZXQ6MH1ALW1vei1rZXlmcmFtZXMgc3BsYXNoLTEyezQwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0xOHB4IDAgLThweCAjODY2ZWZiLDE2cHggLThweCAwIC04cHggIzg2NmVmYiwxNnB4IDhweCAwIC04cHggIzg2NmVmYiwwIDE4cHggMCAtOHB4ICM4NjZlZmIsLTE2cHggOHB4IDAgLThweCAjODY2ZWZiLC0xNnB4IC04cHggMCAtOHB4ICM4NjZlZmJ9MTAwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0zNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDMycHggMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDAgMzZweCAwIC0xMHB4IHRyYW5zcGFyZW50LC0zMnB4IDE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwtMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50fX1ALXdlYmtpdC1rZXlmcmFtZXMgc3BsYXNoLTEyezQwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0xOHB4IDAgLThweCAjODY2ZWZiLDE2cHggLThweCAwIC04cHggIzg2NmVmYiwxNnB4IDhweCAwIC04cHggIzg2NmVmYiwwIDE4cHggMCAtOHB4ICM4NjZlZmIsLTE2cHggOHB4IDAgLThweCAjODY2ZWZiLC0xNnB4IC04cHggMCAtOHB4ICM4NjZlZmJ9MTAwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0zNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDMycHggMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDAgMzZweCAwIC0xMHB4IHRyYW5zcGFyZW50LC0zMnB4IDE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwtMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50fX1ALW8ta2V5ZnJhbWVzIHNwbGFzaC0xMns0MCV7YmFja2dyb3VuZDojODY2ZWZiO2JveC1zaGFkb3c6MCAtMThweCAwIC04cHggIzg2NmVmYiwxNnB4IC04cHggMCAtOHB4ICM4NjZlZmIsMTZweCA4cHggMCAtOHB4ICM4NjZlZmIsMCAxOHB4IDAgLThweCAjODY2ZWZiLC0xNnB4IDhweCAwIC04cHggIzg2NmVmYiwtMTZweCAtOHB4IDAgLThweCAjODY2ZWZifTEwMCV7YmFja2dyb3VuZDojODY2ZWZiO2JveC1zaGFkb3c6MCAtMzZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDMycHggLTE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwzMnB4IDE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwwIDM2cHggMCAtMTBweCB0cmFuc3BhcmVudCwtMzJweCAxNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsLTMycHggLTE2cHggMCAtMTBweCB0cmFuc3BhcmVudH19QGtleWZyYW1lcyBzcGxhc2gtMTJ7NDAle2JhY2tncm91bmQ6Izg2NmVmYjtib3gtc2hhZG93OjAgLTE4cHggMCAtOHB4ICM4NjZlZmIsMTZweCAtOHB4IDAgLThweCAjODY2ZWZiLDE2cHggOHB4IDAgLThweCAjODY2ZWZiLDAgMThweCAwIC04cHggIzg2NmVmYiwtMTZweCA4cHggMCAtOHB4ICM4NjZlZmIsLTE2cHggLThweCAwIC04cHggIzg2NmVmYn0xMDAle2JhY2tncm91bmQ6Izg2NmVmYjtib3gtc2hhZG93OjAgLTM2cHggMCAtMTBweCB0cmFuc3BhcmVudCwzMnB4IC0xNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMzJweCAxNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMCAzNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsLTMycHggMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LC0zMnB4IC0xNnB4IDAgLTEwcHggdHJhbnNwYXJlbnR9fWApO1xuICAgIH07XG59KShTY3JpcHRzTWVudU1hcmtpbmcgfHwgKGV4cG9ydHMuU2NyaXB0c01lbnVNYXJraW5nID0gU2NyaXB0c01lbnVNYXJraW5nID0ge30pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vID09VXNlclNjcmlwdD09XG4vLyBAbmFtZSAgICAgICAgIEV2YWRlcy1TUCBEZXZcbi8vIEB2ZXJzaW9uICAgICAgZGV2LTNcbi8vIEBkZXNjcmlwdGlvbiAgRGV2IHZlcnNpb24gb2YgRS1TUCwgbWF5IGNvbnRhaW4gZXJyb3JzXG4vLyBAYXV0aG9yICAgICAgIEBFdGhlckNELCBzdHlsZXMgYnkgQGR1ZXN0aS5cbi8vIEBtYXRjaCAgICAgICAgaHR0cHM6Ly8qLmV2YWRlcy5pby8qXG4vLyBAZG93bmxvYWRVUkwgIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9FdGhlckNEL0V2YWRlc1NQL21haW4vYnVpbGQvZXZhZGVzc3AtZGV2LmpzXG4vLyBAdXBkYXRlVVJMICAgIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9FdGhlckNEL0V2YWRlc1NQL21haW4vYnVpbGQvZXZhZGVzc3AtZGV2LmpzXG4vLyBAaWNvbiAgICAgICAgIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9FdGhlckNEL0V2YWRlc1NQL21haW4vcmVwby9mYXZpY29uLWRldi5zdmdcbi8vIEBydW4tYXQgICAgICAgZG9jdW1lbnQtaWRsZVxuLy8gQGxpY2Vuc2UgICAgICBNSVQgTGljZW5zZVxuLy8gQGdyYW50ICAgICAgICBub25lXG4vLyA9PS9Vc2VyU2NyaXB0PT1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG9ic2VydmVyID0gcmVxdWlyZShcIi4vb2JzZXJ2ZXJcIik7XG5jb25zdCBzY3JpcHRzID0gcmVxdWlyZShcIi4vc2NyaXB0c1wiKTtcbmNvbnN0IHNkb20gPSByZXF1aXJlKFwiLi9zZG9tXCIpO1xuY29uc3QgdWlfMSA9IHJlcXVpcmUoXCIuL3VpXCIpO1xud2luZG93LnNjcmlwdHMgPSBuZXcgc2NyaXB0cy5TY3JpcHRzKCk7XG5vYnNlcnZlci5pbml0KCk7XG53aW5kb3cuc2RvbSA9IG5ldyBzZG9tLlNEb20oKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNlYXJjaCgvXFwvcHJvZmlsZS9nKSA9PT0gLTEgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYuc2VhcmNoKC9cXC9hY2NvdW50L2cpID09PSAtMSkge1xuICAgICAgICBzY3JpcHRzLmluaXQoKTtcbiAgICAgICAgdWlfMS5kZWZhdWx0LmluaXQoKTtcbiAgICB9XG4gICAgc2RvbS5pbml0KCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==