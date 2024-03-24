/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/observer/helper.ts":
/*!********************************!*\
  !*** ./src/observer/helper.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateState = exports.pingAllListeners = exports.checkChanges = exports.isElementId = exports.isElement = void 0;
let curState = { currentPage: 'menu' };
let oldState = { currentPage: 'menu' };
const isElement = (event, className) => event.target.classList ? event.target.classList.contains(className) : false;
exports.isElement = isElement;
const isElementId = (event, id) => event.target.id ? event.target.id === id : false;
exports.isElementId = isElementId;
const checkChanges = () => {
    if (curState.currentPage !== oldState.currentPage) {
        oldState = JSON.parse(JSON.stringify(curState));
        return true;
    }
    return false;
};
exports.checkChanges = checkChanges;
const pingAllListeners = (subs, events) => {
    for (const e in events) {
        const event = events[e];
        if (event.statement) {
            let observerEvent = {
                type: event.type,
            };
            event.value ? (observerEvent.value = event.value) : 'none';
            event.target ? (observerEvent.target = event.target) : 'none';
            subs.forEach((v) => v(observerEvent));
        }
    }
};
exports.pingAllListeners = pingAllListeners;
const updateState = (event, subs) => {
    if (!((event.target.id ? event.target.id.length !== 0 : false) ||
        (event.target.classList ? event.target.classList.length !== 0 : false)))
        return;
    if ((0, exports.isElement)(event, 'menu'))
        curState.currentPage = 'menu';
    if ((0, exports.isElement)(event, 'server-browser-box'))
        curState.currentPage = 'server-list';
    if ((0, exports.isElement)(event, 'leaderboard-title-break'))
        curState.currentPage = 'game';
    if ((0, exports.isElement)(event, 'hero-select'))
        curState.currentPage = 'hero-select';
    if ((0, exports.isElement)(event, 'results'))
        curState.currentPage = 'game-end';
    const eventsObject = [
        {
            type: 'change-page',
            statement: oldState.currentPage !== curState.currentPage,
            value: curState.currentPage,
        },
        {
            type: 'chat-message',
            statement: (0, exports.isElement)(event, 'chat-message'),
            target: event.target,
        },
        {
            type: 'chat-window-added',
            statement: (0, exports.isElementId)(event, 'chat-window'),
            target: event.target,
        },
    ];
    (0, exports.pingAllListeners)(subs, eventsObject);
    oldState = JSON.parse(JSON.stringify(curState));
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
            if (s.type === 'change-page' && s.value !== 'menu' && s.value !== 'server-list') {
                document.getElementById('esp-scripts-button').style.display = 'none';
                document.getElementById('esp-scripts-menu').style.display = 'none';
            }
            else if (s.type === 'change-page') {
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
        scriptNameSpan.innerHTML = e.name + ' - ' + e.version;
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
// @version      dev-4
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL29ic2VydmVyL2hlbHBlci50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9vYnNlcnZlci9pbmRleC50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9vYnNlcnZlci90eXBlcy50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3NjcmlwdHMvaW5pdC50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9zY3JpcHRzL3NjcmlwdC50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9zY3JpcHRzL3R5cGVzLnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3Nkb20vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvc2RvbS9pbml0LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3Nkb20vc3R5bGVzLnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3VpL2luZGV4LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3VpL21hcmtpbmdzL2J1dHRvbi50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy91aS9tYXJraW5ncy9zY3JpcHRzLnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51cGRhdGVTdGF0ZSA9IGV4cG9ydHMucGluZ0FsbExpc3RlbmVycyA9IGV4cG9ydHMuY2hlY2tDaGFuZ2VzID0gZXhwb3J0cy5pc0VsZW1lbnRJZCA9IGV4cG9ydHMuaXNFbGVtZW50ID0gdm9pZCAwO1xubGV0IGN1clN0YXRlID0geyBjdXJyZW50UGFnZTogJ21lbnUnIH07XG5sZXQgb2xkU3RhdGUgPSB7IGN1cnJlbnRQYWdlOiAnbWVudScgfTtcbmNvbnN0IGlzRWxlbWVudCA9IChldmVudCwgY2xhc3NOYW1lKSA9PiBldmVudC50YXJnZXQuY2xhc3NMaXN0ID8gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpIDogZmFsc2U7XG5leHBvcnRzLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcbmNvbnN0IGlzRWxlbWVudElkID0gKGV2ZW50LCBpZCkgPT4gZXZlbnQudGFyZ2V0LmlkID8gZXZlbnQudGFyZ2V0LmlkID09PSBpZCA6IGZhbHNlO1xuZXhwb3J0cy5pc0VsZW1lbnRJZCA9IGlzRWxlbWVudElkO1xuY29uc3QgY2hlY2tDaGFuZ2VzID0gKCkgPT4ge1xuICAgIGlmIChjdXJTdGF0ZS5jdXJyZW50UGFnZSAhPT0gb2xkU3RhdGUuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgb2xkU3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGN1clN0YXRlKSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuZXhwb3J0cy5jaGVja0NoYW5nZXMgPSBjaGVja0NoYW5nZXM7XG5jb25zdCBwaW5nQWxsTGlzdGVuZXJzID0gKHN1YnMsIGV2ZW50cykgPT4ge1xuICAgIGZvciAoY29uc3QgZSBpbiBldmVudHMpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBldmVudHNbZV07XG4gICAgICAgIGlmIChldmVudC5zdGF0ZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBvYnNlcnZlckV2ZW50ID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IGV2ZW50LnR5cGUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZXZlbnQudmFsdWUgPyAob2JzZXJ2ZXJFdmVudC52YWx1ZSA9IGV2ZW50LnZhbHVlKSA6ICdub25lJztcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldCA/IChvYnNlcnZlckV2ZW50LnRhcmdldCA9IGV2ZW50LnRhcmdldCkgOiAnbm9uZSc7XG4gICAgICAgICAgICBzdWJzLmZvckVhY2goKHYpID0+IHYob2JzZXJ2ZXJFdmVudCkpO1xuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydHMucGluZ0FsbExpc3RlbmVycyA9IHBpbmdBbGxMaXN0ZW5lcnM7XG5jb25zdCB1cGRhdGVTdGF0ZSA9IChldmVudCwgc3VicykgPT4ge1xuICAgIGlmICghKChldmVudC50YXJnZXQuaWQgPyBldmVudC50YXJnZXQuaWQubGVuZ3RoICE9PSAwIDogZmFsc2UpIHx8XG4gICAgICAgIChldmVudC50YXJnZXQuY2xhc3NMaXN0ID8gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5sZW5ndGggIT09IDAgOiBmYWxzZSkpKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCgwLCBleHBvcnRzLmlzRWxlbWVudCkoZXZlbnQsICdtZW51JykpXG4gICAgICAgIGN1clN0YXRlLmN1cnJlbnRQYWdlID0gJ21lbnUnO1xuICAgIGlmICgoMCwgZXhwb3J0cy5pc0VsZW1lbnQpKGV2ZW50LCAnc2VydmVyLWJyb3dzZXItYm94JykpXG4gICAgICAgIGN1clN0YXRlLmN1cnJlbnRQYWdlID0gJ3NlcnZlci1saXN0JztcbiAgICBpZiAoKDAsIGV4cG9ydHMuaXNFbGVtZW50KShldmVudCwgJ2xlYWRlcmJvYXJkLXRpdGxlLWJyZWFrJykpXG4gICAgICAgIGN1clN0YXRlLmN1cnJlbnRQYWdlID0gJ2dhbWUnO1xuICAgIGlmICgoMCwgZXhwb3J0cy5pc0VsZW1lbnQpKGV2ZW50LCAnaGVyby1zZWxlY3QnKSlcbiAgICAgICAgY3VyU3RhdGUuY3VycmVudFBhZ2UgPSAnaGVyby1zZWxlY3QnO1xuICAgIGlmICgoMCwgZXhwb3J0cy5pc0VsZW1lbnQpKGV2ZW50LCAncmVzdWx0cycpKVxuICAgICAgICBjdXJTdGF0ZS5jdXJyZW50UGFnZSA9ICdnYW1lLWVuZCc7XG4gICAgY29uc3QgZXZlbnRzT2JqZWN0ID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY2hhbmdlLXBhZ2UnLFxuICAgICAgICAgICAgc3RhdGVtZW50OiBvbGRTdGF0ZS5jdXJyZW50UGFnZSAhPT0gY3VyU3RhdGUuY3VycmVudFBhZ2UsXG4gICAgICAgICAgICB2YWx1ZTogY3VyU3RhdGUuY3VycmVudFBhZ2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjaGF0LW1lc3NhZ2UnLFxuICAgICAgICAgICAgc3RhdGVtZW50OiAoMCwgZXhwb3J0cy5pc0VsZW1lbnQpKGV2ZW50LCAnY2hhdC1tZXNzYWdlJyksXG4gICAgICAgICAgICB0YXJnZXQ6IGV2ZW50LnRhcmdldCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NoYXQtd2luZG93LWFkZGVkJyxcbiAgICAgICAgICAgIHN0YXRlbWVudDogKDAsIGV4cG9ydHMuaXNFbGVtZW50SWQpKGV2ZW50LCAnY2hhdC13aW5kb3cnKSxcbiAgICAgICAgICAgIHRhcmdldDogZXZlbnQudGFyZ2V0LFxuICAgICAgICB9LFxuICAgIF07XG4gICAgKDAsIGV4cG9ydHMucGluZ0FsbExpc3RlbmVycykoc3VicywgZXZlbnRzT2JqZWN0KTtcbiAgICBvbGRTdGF0ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY3VyU3RhdGUpKTtcbn07XG5leHBvcnRzLnVwZGF0ZVN0YXRlID0gdXBkYXRlU3RhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5hZGRTdWJzY3JpYmVyID0gZXhwb3J0cy5pbml0ID0gdm9pZCAwO1xuY29uc3QgaGVscGVyXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJcIik7XG5sZXQgc3Vic2NyaWJlcnMgPSBbXTtcbmNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlSW5zZXJ0ZWQnLCAoZSkgPT4gKDAsIGhlbHBlcl8xLnVwZGF0ZVN0YXRlKShlLCBzdWJzY3JpYmVycyksIGZhbHNlKTtcbn07XG5leHBvcnRzLmluaXQgPSBpbml0O1xuY29uc3QgYWRkU3Vic2NyaWJlciA9IChjYWxsYmFjaykgPT4ge1xuICAgIHN1YnNjcmliZXJzLnB1c2goY2FsbGJhY2spO1xufTtcbmV4cG9ydHMuYWRkU3Vic2NyaWJlciA9IGFkZFN1YnNjcmliZXI7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vaGVscGVyXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi90eXBlc1wiKSwgZXhwb3J0cyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNjcmlwdHMgPSB2b2lkIDA7XG5jb25zdCBzY3JpcHRfMSA9IHJlcXVpcmUoXCIuL3NjcmlwdFwiKTtcbmNsYXNzIFNjcmlwdHMge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxpc3QgPSBbXTtcbiAgICB9XG4gICAgYWRkKGluZm8pIHtcbiAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3IHNjcmlwdF8xLmRlZmF1bHQoaW5mbykpO1xuICAgIH1cbiAgICBjcmVhdGUoaW5mbykge1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBuZXcgc2NyaXB0XzEuZGVmYXVsdChpbmZvKTtcbiAgICAgICAgdGhpcy5saXN0LnB1c2goc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuIHNjcmlwdDtcbiAgICB9XG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMubGlzdCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdFtpXS5uYW1lID09PSBuYW1lKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmxpc3RbaV07XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2cobmFtZSk7XG4gICAgICAgIGNvbnNvbGUud2FybihgTG9hZGluZyBTY3JpcHQgRXJyb3I6IFRyeWluZyBnZXQgbm90IGV4aXN0cyBzY3JpcHQsIG5hbWU6ICR7bmFtZX1gKTtcbiAgICB9XG4gICAgZm9yRWFjaChjYWxsYmFjaykge1xuICAgICAgICBmb3IgKGNvbnN0IGUgaW4gdGhpcy5saXN0KSB7XG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLmxpc3RbZV0pO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5TY3JpcHRzID0gU2NyaXB0cztcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9zY3JpcHRcIiksIGV4cG9ydHMpO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3R5cGVzXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9pbml0XCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0ID0gdm9pZCAwO1xuY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICAvLyBGcm9tIHNjcmlwdCBieSBASXJ1ZGlzOiBFdmFkZXMgSGVscGVyXG4gICAgbGV0IGVsZW0gPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdCcpKS5maWx0ZXIoKGEpID0+IGEudHlwZSA9PT0gJ21vZHVsZScgJiYgYS5zcmMubWF0Y2goL1xcL2luZGV4XFwuWzAtOWEtZl17OH1cXC5qcy8pKVswXTtcbiAgICBpZiAoIWVsZW0pXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoIW5hdmlnYXRvci51c2VyQWdlbnQuaW5jbHVkZXMoJ0ZpcmVmb3gnKSlcbiAgICAgICAgZWxlbS5yZW1vdmUoKTtcbiAgICBsZXQgc3JjID0gZWxlbS5zcmM7XG4gICAgbGV0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHJlcS5vcGVuKCdHRVQnLCBzcmMsIGZhbHNlKTtcbiAgICByZXEuc2VuZCgpO1xuICAgIGxldCBjb2RlID0gcmVxLnJlc3BvbnNlO1xuICAgIGZvciAoY29uc3QgcyBpbiB3aW5kb3cuc2NyaXB0cy5saXN0KVxuICAgICAgICBjb2RlID0gd2luZG93LnNjcmlwdHMubGlzdFtzXS5wYXRjaChjb2RlKTtcbiAgICBsZXQgblNjciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIG5TY3Iuc2V0QXR0cmlidXRlKCd0eXBlJywgJ21vZHVsZScpO1xuICAgIG5TY3IuaW5uZXJIVE1MID0gY29kZTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5TY3IpO1xuICAgIGNvbnNvbGUubG9nKCdBbGwgU2NyaXB0cyB3YXMgbG9hZGVkIScpO1xufTtcbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFNjcmlwdCB7XG4gICAgY29uc3RydWN0b3IoaW5mbykge1xuICAgICAgICB0aGlzLnJlcGxhY2VzID0gW107XG4gICAgICAgIHRoaXMudmFycyA9IHt9O1xuICAgICAgICB0aGlzLm5hbWUgPSBpbmZvLm5hbWU7XG4gICAgICAgIHRoaXMuaWNvbiA9IGluZm8uaWNvbiA/PyAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0V0aGVyQ0QvRXZhZGVzU1AvbWFpbi9yZXBvL2VtcHR5LXNjcmlwdC5zdmcnO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSBpbmZvLnZlcnNpb24gPz8gJ25vbmUnO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gaW5mby5kZXNjcmlwdGlvbiA/PyAnRGVzY3JpcHRpb24gaXMgbm90IGFkZGVkJztcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgYWRkUmVwbGFjZShhLCBiKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZXMucHVzaChbYSwgdGhpcy5mb3JtYXRSZXBsYWNlKGIpXSk7XG4gICAgfVxuICAgIGFkZFJlcGxhY2VzKC4uLnJlcGxhY2VzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYSBpbiByZXBsYWNlcylcbiAgICAgICAgICAgIHRoaXMuYWRkUmVwbGFjZShyZXBsYWNlc1thXVswXSwgcmVwbGFjZXNbYV1bMV0pO1xuICAgIH1cbiAgICBmb3JtYXRSZXBsYWNlKHYpIHtcbiAgICAgICAgcmV0dXJuIHYucmVwbGFjZSgvI1xceyhbXlxcfV0rKVxcfS9nLCAoXywgbSkgPT4gYHdpbmRvdy5zY3JpcHRzLmdldChcIiR7dGhpcy5uYW1lfVwiKS5nZXRWYXIoXCIke219XCIpYCk7XG4gICAgfVxuICAgIGFkZFZhcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFyc1trZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGdldFZhcihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFyc1trZXldO1xuICAgIH1cbiAgICBwYXRjaChjb2RlKSB7XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLnJlcGxhY2VzKVxuICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSh0aGlzLnJlcGxhY2VzW2ldWzBdLCB0aGlzLnJlcGxhY2VzW2ldWzFdKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJyB3YXMgbG9hZGVkIScpO1xuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTY3JpcHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNEb20gPSB2b2lkIDA7XG5jb25zdCBzdHlsZXNfMSA9IHJlcXVpcmUoXCIuL3N0eWxlc1wiKTtcbmNvbnN0IE9ic2VydmVyID0gcmVxdWlyZShcIi4uL29ic2VydmVyXCIpO1xuLypcbiAqIFNjcmlwdHMgRG9tXG4gKi9cbmNsYXNzIFNEb20ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgfVxuICAgIGFkZE9ic2VydmVyU3Vic2NyaWJlcihjYWxsYmFjaykge1xuICAgICAgICBPYnNlcnZlci5hZGRTdWJzY3JpYmVyKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgYWRkSHRtbEVsZW1lbnQoLi4uZWxlbWVudHMpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKC4uLmVsZW1lbnRzKTtcbiAgICB9XG4gICAgYWRkU3R5bGUoLi4uc3R5bGVzKSB7XG4gICAgICAgIHN0eWxlc18xLlNjcmlwdFN0eWxlcy5wdXNoKC4uLnN0eWxlcyk7XG4gICAgfVxufVxuZXhwb3J0cy5TRG9tID0gU0RvbTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9pbml0XCIpLCBleHBvcnRzKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pbml0ID0gdm9pZCAwO1xuY29uc3Qgc3R5bGVzXzEgPSByZXF1aXJlKFwiLi9zdHlsZXNcIik7XG5jb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIHN0eWxlc18xLlNjcmlwdFN0eWxlcy5wYXRjaCgpO1xuICAgIHdpbmRvdy5zZG9tLmVsZW1lbnRzLmZvckVhY2goKGUpID0+IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZSkpO1xufTtcbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU2NyaXB0U3R5bGVzID0gdm9pZCAwO1xudmFyIFNjcmlwdFN0eWxlcztcbihmdW5jdGlvbiAoU2NyaXB0U3R5bGVzKSB7XG4gICAgbGV0IHN0eWxlcyA9IFtdO1xuICAgIFNjcmlwdFN0eWxlcy5wdXNoID0gKC4uLnN0eWxlKSA9PiB7XG4gICAgICAgIHN0eWxlcy5wdXNoKC4uLnN0eWxlKTtcbiAgICB9O1xuICAgIFNjcmlwdFN0eWxlcy5wYXRjaCA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICBzdHlsZS5pbm5lckhUTUwgPSBzdHlsZXMuam9pbignICcpO1xuICAgICAgICBzdHlsZS5pZCA9ICdlc3Atc3R5bGVzJztcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfTtcbn0pKFNjcmlwdFN0eWxlcyB8fCAoZXhwb3J0cy5TY3JpcHRTdHlsZXMgPSBTY3JpcHRTdHlsZXMgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBidXR0b25fMSA9IHJlcXVpcmUoXCIuL21hcmtpbmdzL2J1dHRvblwiKTtcbmNvbnN0IHNjcmlwdHNfMSA9IHJlcXVpcmUoXCIuL21hcmtpbmdzL3NjcmlwdHNcIik7XG52YXIgSVU7XG4oZnVuY3Rpb24gKElVKSB7XG4gICAgSVUuaW5pdCA9ICgpID0+IHtcbiAgICAgICAgd2luZG93LnNkb20uYWRkSHRtbEVsZW1lbnQoYnV0dG9uXzEuQnV0dG9uTWFya2luZy5tYWtlQnV0dG9uKCksIHNjcmlwdHNfMS5TY3JpcHRzTWVudU1hcmtpbmcubWFrZVNjcmlwdHNNZW51KCkpO1xuICAgICAgICB3aW5kb3cuc2RvbS5hZGRPYnNlcnZlclN1YnNjcmliZXIoKHMpID0+IHtcbiAgICAgICAgICAgIGlmIChzLnR5cGUgPT09ICdjaGFuZ2UtcGFnZScgJiYgcy52YWx1ZSAhPT0gJ21lbnUnICYmIHMudmFsdWUgIT09ICdzZXJ2ZXItbGlzdCcpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXNwLXNjcmlwdHMtYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXNwLXNjcmlwdHMtbWVudScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChzLnR5cGUgPT09ICdjaGFuZ2UtcGFnZScpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXNwLXNjcmlwdHMtYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufSkoSVUgfHwgKElVID0ge30pKTtcbmV4cG9ydHMuZGVmYXVsdCA9IElVO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJ1dHRvbk1hcmtpbmcgPSB2b2lkIDA7XG52YXIgQnV0dG9uTWFya2luZztcbihmdW5jdGlvbiAoQnV0dG9uTWFya2luZykge1xuICAgIEJ1dHRvbk1hcmtpbmcubWFrZUJ1dHRvbiA9ICgpID0+IHtcbiAgICAgICAgbWFrZVN0eWxlcygpO1xuICAgICAgICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHRzLWJ1dHRvbicpO1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKCdpZCcsICdlc3Atc2NyaXB0cy1idXR0b24nKTtcbiAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKG1ha2VCdXR0b25JY29uKCkpO1xuICAgICAgICBidXR0b24ub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXNwLXNjcmlwdHMtbWVudScpO1xuICAgICAgICAgICAgZS5zdHlsZS5kaXNwbGF5ID0gZS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAnJyA6ICdub25lJztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1dHRvbjtcbiAgICB9O1xuICAgIGNvbnN0IG1ha2VCdXR0b25JY29uID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBidXR0b25JY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGJ1dHRvbkljb24uc3JjID0gJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9FdGhlckNEL0V2YWRlc1NQL21haW4vcmVwby9zZXR0aW5ncy5zdmcnO1xuICAgICAgICBidXR0b25JY29uLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHRzLWJ1dHRvbi1pY29uJyk7XG4gICAgICAgIHJldHVybiBidXR0b25JY29uO1xuICAgIH07XG4gICAgY29uc3QgbWFrZVN0eWxlcyA9ICgpID0+IHtcbiAgICAgICAgd2luZG93LnNkb20uYWRkU3R5bGUoYC5lc3Atc2NyaXB0cy1idXR0b24ge2N1cnNvcjogcG9pbnRlcjtwb3NpdGlvbjogYWJzb2x1dGU7Ym90dG9tOiAxMHB4O3JpZ2h0OiAxMHB4O30uZXNwLXNjcmlwdHMtYnV0dG9uLWljb24ge3dpZHRoOiAzNnB4O2hlaWdodDogMzZweDt9YCk7XG4gICAgfTtcbn0pKEJ1dHRvbk1hcmtpbmcgfHwgKGV4cG9ydHMuQnV0dG9uTWFya2luZyA9IEJ1dHRvbk1hcmtpbmcgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNjcmlwdHNNZW51TWFya2luZyA9IHZvaWQgMDtcbnZhciBTY3JpcHRzTWVudU1hcmtpbmc7XG4oZnVuY3Rpb24gKFNjcmlwdHNNZW51TWFya2luZykge1xuICAgIFNjcmlwdHNNZW51TWFya2luZy5tYWtlU2NyaXB0c01lbnUgPSAoKSA9PiB7XG4gICAgICAgIG1ha2VTdHlsZXMoKTtcbiAgICAgICAgcmV0dXJuIG1ha2VTY3JpcHRzTm9kZSgpO1xuICAgIH07XG4gICAgY29uc3QgbWFrZVNjcmlwdHNOb2RlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzY3JpcHRzTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzY3JpcHRzTWVudS5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy1tZW51Jyk7XG4gICAgICAgIHNjcmlwdHNNZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHNjcmlwdHNNZW51LnNldEF0dHJpYnV0ZSgnaWQnLCAnZXNwLXNjcmlwdHMtbWVudScpO1xuICAgICAgICBjb25zdCBzY3JpcHRzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNjcmlwdHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdHMtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHNwYW5OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzcGFuTmFtZS5pbm5lckhUTUwgPSAnU2NyaXB0cyc7XG4gICAgICAgIHNwYW5OYW1lLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHRzLXRpdGxlJyk7XG4gICAgICAgIHNjcmlwdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3Bhbk5hbWUpO1xuICAgICAgICBjb25zdCBjbG9zZU1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBjbG9zZU1lbnUudHlwZSA9ICdidXR0b24nO1xuICAgICAgICBjbG9zZU1lbnUudmFsdWUgPSAneCc7XG4gICAgICAgIGNsb3NlTWVudS5vbmNsaWNrID0gKCkgPT4gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlc3Atc2NyaXB0cy1tZW51Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XG4gICAgICAgIGNsb3NlTWVudS5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy1jbG9zZS1idG4nKTtcbiAgICAgICAgc2NyaXB0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9zZU1lbnUpO1xuICAgICAgICBjb25zdCBzY3JpcHRzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzY3JpcHRzTGlzdC5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy1saXN0Jyk7XG4gICAgICAgIHdpbmRvdy5zY3JpcHRzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgIHNjcmlwdHNMaXN0LmFwcGVuZENoaWxkKG1ha2VTY3JpcHRMYWJsZShlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY3JpcHRzQ29udGFpbmVyLmFwcGVuZENoaWxkKHNjcmlwdHNMaXN0KTtcbiAgICAgICAgc2NyaXB0c01lbnUuYXBwZW5kQ2hpbGQoc2NyaXB0c0NvbnRhaW5lcik7XG4gICAgICAgIHJldHVybiBzY3JpcHRzTWVudTtcbiAgICB9O1xuICAgIGNvbnN0IG1ha2VTY3JpcHRMYWJsZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgbGFiZWxDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdC1sYWJsZScpO1xuICAgICAgICBjb25zdCBkaXZDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHNjcmlwdEljb25JbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgc2NyaXB0SWNvbkltZy5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0LWljb24nKTtcbiAgICAgICAgc2NyaXB0SWNvbkltZy5zcmMgPSBlLmljb247XG4gICAgICAgIC8qIEFkZHMgU2NyaXB0IEljb24gKi9cbiAgICAgICAgZGl2Q29udGFpbmVyLmFwcGVuZENoaWxkKHNjcmlwdEljb25JbWcpO1xuICAgICAgICBjb25zdCBzY3JpcHROYW1lU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc2NyaXB0TmFtZVNwYW4uY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdC1uYW1lJyk7XG4gICAgICAgIHNjcmlwdE5hbWVTcGFuLmlubmVySFRNTCA9IGUubmFtZSArICcgLSAnICsgZS52ZXJzaW9uO1xuICAgICAgICAvKiBBZGRzIFNjcmlwdCBOYW1lICovXG4gICAgICAgIGRpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChzY3JpcHROYW1lU3Bhbik7XG4gICAgICAgIGNvbnN0IHNjcmlwdERlc2NyaXB0aW9uU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc2NyaXB0RGVzY3JpcHRpb25TcGFuLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHQtZGVzY3JpcHRpb24nKTtcbiAgICAgICAgLyogQWRkcyBTY3JpcHQgRGVzY3JpcHRpb24gUCAqL1xuICAgICAgICBjb25zdCBzY3JpcHREZXNjcmlwdGlvblAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHNjcmlwdERlc2NyaXB0aW9uUC5pbm5lckhUTUwgPSBlLmRlc2NyaXB0aW9uO1xuICAgICAgICBzY3JpcHREZXNjcmlwdGlvblNwYW4uYXBwZW5kQ2hpbGQoc2NyaXB0RGVzY3JpcHRpb25QKTtcbiAgICAgICAgLyogQWRkcyBTY3JpcHQgRGVzY3JpcHRpb24gU3BhbiAqL1xuICAgICAgICBkaXZDb250YWluZXIuYXBwZW5kQ2hpbGQoc2NyaXB0RGVzY3JpcHRpb25TcGFuKTtcbiAgICAgICAgY29uc3Qgc2NyaXB0Q29vb2xsbGxDaGVja2JveERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzY3JpcHRDb29vbGxsbENoZWNrYm94RGl2LmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94LXdyYXBwZXItMTInKTtcbiAgICAgICAgc2NyaXB0Q29vb2xsbGxDaGVja2JveERpdi5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImNieFwiPjxpbnB1dCBpZD1cImNieC0xMlwiIHR5cGU9XCJjaGVja2JveFwiLz48bGFiZWwgZm9yPVwiY2J4LTEyXCI+PC9sYWJlbD48c3ZnIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxNFwiIHZpZXdib3g9XCIwIDAgMTUgMTRcIiBmaWxsPVwibm9uZVwiPjxwYXRoIGQ9XCJNMiA4LjM2MzY0TDYuMjMwNzcgMTJMMTMgMlwiPjwvcGF0aD48L3N2Zz48L2Rpdj48IS0tIEdvb2V5LS0+PHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmVyc2lvbj1cIjEuMVwiPjxkZWZzPjxmaWx0ZXIgaWQ9XCJnb28tMTJcIj48ZmVnYXVzc2lhbmJsdXIgaW49XCJTb3VyY2VHcmFwaGljXCIgc3RkZGV2aWF0aW9uPVwiNFwiIHJlc3VsdD1cImJsdXJcIj48L2ZlZ2F1c3NpYW5ibHVyPjxmZWNvbG9ybWF0cml4IGluPVwiYmx1clwiIG1vZGU9XCJtYXRyaXhcIiB2YWx1ZXM9XCIxIDAgMCAwIDAgIDAgMSAwIDAgMCAgMCAwIDEgMCAwICAwIDAgMCAyMiAtN1wiIHJlc3VsdD1cImdvby0xMlwiPjwvZmVjb2xvcm1hdHJpeD48ZmVibGVuZCBpbj1cIlNvdXJjZUdyYXBoaWNcIiBpbjI9XCJnb28tMTJcIj48L2ZlYmxlbmQ+PC9maWx0ZXI+PC9kZWZzPjwvc3ZnPmA7XG4gICAgICAgIGRpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChzY3JpcHRDb29vbGxsbENoZWNrYm94RGl2KTtcbiAgICAgICAgbGFiZWxDb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2Q29udGFpbmVyKTtcbiAgICAgICAgcmV0dXJuIGxhYmVsQ29udGFpbmVyO1xuICAgIH07XG4gICAgY29uc3QgbWFrZVN0eWxlcyA9ICgpID0+IHtcbiAgICAgICAgd2luZG93LnNkb20uYWRkU3R5bGUoYDpyb290IHtcXG4tLW1haW5Gb250OiBNb250c2VycmF0O1xcbn1gKTtcbiAgICAgICAgd2luZG93LnNkb20uYWRkU3R5bGUoYC5lc3Atc2NyaXB0cy1tZW51e3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7bGVmdDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZSgtNTAlLC01MCUpO2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtjb2xvcjojZmZmfS5lc3Atc2NyaXB0cy1jb250YWluZXJ7d2lkdGg6NDUwcHg7YmFja2dyb3VuZC1jb2xvcjpyZ2JhKDAsMCwwLC45KTtkaXNwbGF5OmZsZXg7Ym9yZGVyLXJhZGl1czoxMnB4O3BhZGRpbmc6MzBweCAxMHB4IDB9LmVzcC1zY3JpcHRzLXRpdGxle21hcmdpbi10b3A6LTIzcHg7cG9zaXRpb246YWJzb2x1dGU7bGV0dGVyLXNwYWNpbmc6LjAyZW19LmVzcC1zY3JpcHRzLWNsb3NlLWJ0bntwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW4tdG9wOi0zMnB4O21hcmdpbi1sZWZ0OjQyOHB4O2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MjVweDtmb250LWZhbWlseTp2YXIoLS1tYWluRm9udCk7Ym9yZGVyOm5vbmU7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtjb2xvcjpyZWQ7Y3Vyc29yOnBvaW50ZXJ9LmVzcC1zY3JpcHQtaWNvbntoZWlnaHQ6MzZweDt3aWR0aDozNnB4O21hcmdpbi10b3A6MTBweDttYXJnaW4tbGVmdDoxMHB4fS5lc3Atc2NyaXB0LW5hbWV7Zm9udC1zaXplOjE2cHg7bWFyZ2luLXRvcDoxMHB4O3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbi1sZWZ0OjEwcHg7bGV0dGVyLXNwYWNpbmc6LjAyZW19LmVzcC1zY3JpcHQtZGVzY3JpcHRpb24gcHt0ZXh0LWFsaWduOmxlZnQ7bWF4LXdpZHRoOjMyMHB4O2xldHRlci1zcGFjaW5nOi4wMmVtO21hcmdpbi10b3A6LTE1cHg7bWFyZ2luLWxlZnQ6NTVweH0uY2J4e21hcmdpbi10b3A6LTMzcHh9LmNoZWNrYm94LXdyYXBwZXItMTJ7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLWxlZnQ6NDEwcHg7bWFyZ2luLXRvcDotNDRweH0uY2hlY2tib3gtd3JhcHBlci0xMj5zdmd7cG9zaXRpb246YWJzb2x1dGU7dG9wOi0xMzAlO2xlZnQ6LTE3MCU7d2lkdGg6MTEwcHg7cG9pbnRlci1ldmVudHM6bm9uZX0uY2hlY2tib3gtd3JhcHBlci0xMiAqe2JveC1zaXppbmc6Ym9yZGVyLWJveH0uY2hlY2tib3gtd3JhcHBlci0xMiBpbnB1dFt0eXBlPWNoZWNrYm94XXstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTstbW96LWFwcGVhcmFuY2U6bm9uZTthcHBlYXJhbmNlOm5vbmU7LXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnRyYW5zcGFyZW50O2N1cnNvcjpwb2ludGVyO21hcmdpbjowfS5jaGVja2JveC13cmFwcGVyLTEyIGlucHV0W3R5cGU9Y2hlY2tib3hdOmZvY3Vze291dGxpbmU6MH0uY2hlY2tib3gtd3JhcHBlci0xMiAuY2J4e3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7dG9wOmNhbGMoNTB2aCAtIDEycHgpO2xlZnQ6Y2FsYyg1MHZ3IC0gMTJweCl9LmNoZWNrYm94LXdyYXBwZXItMTIgLmNieCBpbnB1dHtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtib3JkZXI6MnB4IHNvbGlkICNiZmJmYzA7Ym9yZGVyLXJhZGl1czo1MCV9LmNoZWNrYm94LXdyYXBwZXItMTIgLmNieCBsYWJlbHt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2JhY2tncm91bmQ6MCAwO2JvcmRlci1yYWRpdXM6NTAlO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDstd2Via2l0LWZpbHRlcjp1cmwoJyNnb28tMTInKTtmaWx0ZXI6dXJsKCcjZ29vLTEyJyk7dHJhbnNmb3JtOnRyYXNubGF0ZTNkKDAsMCwwKTtwb2ludGVyLWV2ZW50czpub25lfS5jaGVja2JveC13cmFwcGVyLTEyIC5jYnggc3Zne3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1cHg7bGVmdDo0cHg7ei1pbmRleDoxO3BvaW50ZXItZXZlbnRzOm5vbmV9LmNoZWNrYm94LXdyYXBwZXItMTIgLmNieCBzdmcgcGF0aHtzdHJva2U6I2ZmZjtzdHJva2Utd2lkdGg6MztzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWRhc2hhcnJheToxOTtzdHJva2UtZGFzaG9mZnNldDoxOTt0cmFuc2l0aW9uOnN0cm9rZS1kYXNob2Zmc2V0IC4zcyAwLjJzfS5jaGVja2JveC13cmFwcGVyLTEyIC5jYnggaW5wdXQ6Y2hlY2tlZCtsYWJlbHthbmltYXRpb246LjZzIGZvcndhcmRzIHNwbGFzaC0xMn0uY2hlY2tib3gtd3JhcHBlci0xMiAuY2J4IGlucHV0OmNoZWNrZWQrbGFiZWwrc3ZnIHBhdGh7c3Ryb2tlLWRhc2hvZmZzZXQ6MH1ALW1vei1rZXlmcmFtZXMgc3BsYXNoLTEyezQwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0xOHB4IDAgLThweCAjODY2ZWZiLDE2cHggLThweCAwIC04cHggIzg2NmVmYiwxNnB4IDhweCAwIC04cHggIzg2NmVmYiwwIDE4cHggMCAtOHB4ICM4NjZlZmIsLTE2cHggOHB4IDAgLThweCAjODY2ZWZiLC0xNnB4IC04cHggMCAtOHB4ICM4NjZlZmJ9MTAwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0zNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDMycHggMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDAgMzZweCAwIC0xMHB4IHRyYW5zcGFyZW50LC0zMnB4IDE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwtMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50fX1ALXdlYmtpdC1rZXlmcmFtZXMgc3BsYXNoLTEyezQwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0xOHB4IDAgLThweCAjODY2ZWZiLDE2cHggLThweCAwIC04cHggIzg2NmVmYiwxNnB4IDhweCAwIC04cHggIzg2NmVmYiwwIDE4cHggMCAtOHB4ICM4NjZlZmIsLTE2cHggOHB4IDAgLThweCAjODY2ZWZiLC0xNnB4IC04cHggMCAtOHB4ICM4NjZlZmJ9MTAwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0zNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDMycHggMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDAgMzZweCAwIC0xMHB4IHRyYW5zcGFyZW50LC0zMnB4IDE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwtMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50fX1ALW8ta2V5ZnJhbWVzIHNwbGFzaC0xMns0MCV7YmFja2dyb3VuZDojODY2ZWZiO2JveC1zaGFkb3c6MCAtMThweCAwIC04cHggIzg2NmVmYiwxNnB4IC04cHggMCAtOHB4ICM4NjZlZmIsMTZweCA4cHggMCAtOHB4ICM4NjZlZmIsMCAxOHB4IDAgLThweCAjODY2ZWZiLC0xNnB4IDhweCAwIC04cHggIzg2NmVmYiwtMTZweCAtOHB4IDAgLThweCAjODY2ZWZifTEwMCV7YmFja2dyb3VuZDojODY2ZWZiO2JveC1zaGFkb3c6MCAtMzZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDMycHggLTE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwzMnB4IDE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwwIDM2cHggMCAtMTBweCB0cmFuc3BhcmVudCwtMzJweCAxNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsLTMycHggLTE2cHggMCAtMTBweCB0cmFuc3BhcmVudH19QGtleWZyYW1lcyBzcGxhc2gtMTJ7NDAle2JhY2tncm91bmQ6Izg2NmVmYjtib3gtc2hhZG93OjAgLTE4cHggMCAtOHB4ICM4NjZlZmIsMTZweCAtOHB4IDAgLThweCAjODY2ZWZiLDE2cHggOHB4IDAgLThweCAjODY2ZWZiLDAgMThweCAwIC04cHggIzg2NmVmYiwtMTZweCA4cHggMCAtOHB4ICM4NjZlZmIsLTE2cHggLThweCAwIC04cHggIzg2NmVmYn0xMDAle2JhY2tncm91bmQ6Izg2NmVmYjtib3gtc2hhZG93OjAgLTM2cHggMCAtMTBweCB0cmFuc3BhcmVudCwzMnB4IC0xNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMzJweCAxNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMCAzNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsLTMycHggMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LC0zMnB4IC0xNnB4IDAgLTEwcHggdHJhbnNwYXJlbnR9fWApO1xuICAgIH07XG59KShTY3JpcHRzTWVudU1hcmtpbmcgfHwgKGV4cG9ydHMuU2NyaXB0c01lbnVNYXJraW5nID0gU2NyaXB0c01lbnVNYXJraW5nID0ge30pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vID09VXNlclNjcmlwdD09XG4vLyBAbmFtZSAgICAgICAgIEV2YWRlcy1TUCBEZXZcbi8vIEB2ZXJzaW9uICAgICAgZGV2LTRcbi8vIEBkZXNjcmlwdGlvbiAgRGV2IHZlcnNpb24gb2YgRS1TUCwgbWF5IGNvbnRhaW4gZXJyb3JzXG4vLyBAYXV0aG9yICAgICAgIEBFdGhlckNELCBzdHlsZXMgYnkgQGR1ZXN0aS5cbi8vIEBtYXRjaCAgICAgICAgaHR0cHM6Ly8qLmV2YWRlcy5pby8qXG4vLyBAZG93bmxvYWRVUkwgIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9FdGhlckNEL0V2YWRlc1NQL21haW4vYnVpbGQvZXZhZGVzc3AtZGV2LmpzXG4vLyBAdXBkYXRlVVJMICAgIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9FdGhlckNEL0V2YWRlc1NQL21haW4vYnVpbGQvZXZhZGVzc3AtZGV2LmpzXG4vLyBAaWNvbiAgICAgICAgIGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9FdGhlckNEL0V2YWRlc1NQL21haW4vcmVwby9mYXZpY29uLWRldi5zdmdcbi8vIEBydW4tYXQgICAgICAgZG9jdW1lbnQtaWRsZVxuLy8gQGxpY2Vuc2UgICAgICBNSVQgTGljZW5zZVxuLy8gQGdyYW50ICAgICAgICBub25lXG4vLyA9PS9Vc2VyU2NyaXB0PT1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG9ic2VydmVyID0gcmVxdWlyZShcIi4vb2JzZXJ2ZXJcIik7XG5jb25zdCBzY3JpcHRzID0gcmVxdWlyZShcIi4vc2NyaXB0c1wiKTtcbmNvbnN0IHNkb20gPSByZXF1aXJlKFwiLi9zZG9tXCIpO1xuY29uc3QgdWlfMSA9IHJlcXVpcmUoXCIuL3VpXCIpO1xud2luZG93LnNjcmlwdHMgPSBuZXcgc2NyaXB0cy5TY3JpcHRzKCk7XG5vYnNlcnZlci5pbml0KCk7XG53aW5kb3cuc2RvbSA9IG5ldyBzZG9tLlNEb20oKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNlYXJjaCgvXFwvcHJvZmlsZS9nKSA9PT0gLTEgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYuc2VhcmNoKC9cXC9hY2NvdW50L2cpID09PSAtMSkge1xuICAgICAgICBzY3JpcHRzLmluaXQoKTtcbiAgICAgICAgdWlfMS5kZWZhdWx0LmluaXQoKTtcbiAgICB9XG4gICAgc2RvbS5pbml0KCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==