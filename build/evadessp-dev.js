/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom/index.ts":
/*!**************************!*\
  !*** ./src/dom/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const iu_1 = __webpack_require__(/*! ./iu */ "./src/dom/iu.ts");
class Dom {
    constructor() {
        this.settings = new iu_1.default();
    }
    push() {
        this.settings.push();
    }
}
exports["default"] = Dom;


/***/ }),

/***/ "./src/dom/iu.ts":
/*!***********************!*\
  !*** ./src/dom/iu.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const styles_1 = __webpack_require__(/*! ../styles */ "./src/styles.ts");
const button_1 = __webpack_require__(/*! ./markings/button */ "./src/dom/markings/button.ts");
const scripts_1 = __webpack_require__(/*! ./markings/scripts */ "./src/dom/markings/scripts.ts");
class SettingsElement {
    constructor() {
        this.elements = [];
        this.elements.push(button_1.ButtonMarking.makeButton(), scripts_1.ScriptsMenuMarking.makeScriptsMenu());
        window.observerSubs.push(this.ping);
    }
    ping(state) {
        if (state.currentPage !== 'menu' && state.currentPage !== 'server-list') {
            document.getElementById('esp-scripts-button').style.display = 'none';
            document.getElementById('esp-scripts-menu').style.display = 'none';
        }
        else {
            document.getElementById('esp-scripts-button').style.display = '';
        }
    }
    push() {
        (0, styles_1.pushStylesToDom)();
        this.elements.forEach((e) => document.body.appendChild(e));
    }
}
exports["default"] = SettingsElement;


/***/ }),

/***/ "./src/dom/markings/button.ts":
/*!************************************!*\
  !*** ./src/dom/markings/button.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ButtonMarking = void 0;
const styles_1 = __webpack_require__(/*! ../../styles */ "./src/styles.ts");
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
        (0, styles_1.addStyle)(`.esp-scripts-button {cursor: pointer;position: absolute;bottom: 10px;right: 10px;}.esp-scripts-button-icon {width: 36px;height: 36px;}`);
    };
})(ButtonMarking || (exports.ButtonMarking = ButtonMarking = {}));


/***/ }),

/***/ "./src/dom/markings/scripts.ts":
/*!*************************************!*\
  !*** ./src/dom/markings/scripts.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScriptsMenuMarking = void 0;
const styles_1 = __webpack_require__(/*! ../../styles */ "./src/styles.ts");
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
        (0, styles_1.addStyle)(`:root {\n--mainFont: Montserrat;\n}`);
        (0, styles_1.addStyle)(`.esp-scripts-menu{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);flex-direction:column;color:#fff}.esp-scripts-container{width:450px;background-color:rgba(0,0,0,.9);display:flex;border-radius:12px;padding:30px 10px 0}.esp-scripts-title{margin-top:-23px;position:absolute;letter-spacing:.02em}.esp-scripts-close-btn{position:absolute;margin-top:-32px;margin-left:428px;font-weight:700;font-size:25px;font-family:var(--mainFont);border:none;background-color:transparent;color:red;cursor:pointer}.esp-script-icon{height:36px;width:36px;margin-top:10px;margin-left:10px}.esp-script-name{font-size:16px;margin-top:10px;position:absolute;margin-left:10px;letter-spacing:.02em}.esp-script-description p{text-align:left;max-width:320px;letter-spacing:.02em;margin-top:-15px;margin-left:55px}.cbx{margin-top:-33px}.checkbox-wrapper-12{position:absolute;margin-left:410px;margin-top:-44px}.checkbox-wrapper-12>svg{position:absolute;top:-130%;left:-170%;width:110px;pointer-events:none}.checkbox-wrapper-12 *{box-sizing:border-box}.checkbox-wrapper-12 input[type=checkbox]{-webkit-appearance:none;-moz-appearance:none;appearance:none;-webkit-tap-highlight-color:transparent;cursor:pointer;margin:0}.checkbox-wrapper-12 input[type=checkbox]:focus{outline:0}.checkbox-wrapper-12 .cbx{width:24px;height:24px;top:calc(50vh - 12px);left:calc(50vw - 12px)}.checkbox-wrapper-12 .cbx input{position:absolute;top:0;left:0;width:24px;height:24px;border:2px solid #bfbfc0;border-radius:50%}.checkbox-wrapper-12 .cbx label{width:24px;height:24px;background:0 0;border-radius:50%;position:absolute;top:0;left:0;-webkit-filter:url('#goo-12');filter:url('#goo-12');transform:trasnlate3d(0,0,0);pointer-events:none}.checkbox-wrapper-12 .cbx svg{position:absolute;top:5px;left:4px;z-index:1;pointer-events:none}.checkbox-wrapper-12 .cbx svg path{stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:19;stroke-dashoffset:19;transition:stroke-dashoffset .3s 0.2s}.checkbox-wrapper-12 .cbx input:checked+label{animation:.6s forwards splash-12}.checkbox-wrapper-12 .cbx input:checked+label+svg path{stroke-dashoffset:0}@-moz-keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}@-webkit-keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}@-o-keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}@keyframes splash-12{40%{background:#866efb;box-shadow:0 -18px 0 -8px #866efb,16px -8px 0 -8px #866efb,16px 8px 0 -8px #866efb,0 18px 0 -8px #866efb,-16px 8px 0 -8px #866efb,-16px -8px 0 -8px #866efb}100%{background:#866efb;box-shadow:0 -36px 0 -10px transparent,32px -16px 0 -10px transparent,32px 16px 0 -10px transparent,0 36px 0 -10px transparent,-32px 16px 0 -10px transparent,-32px -16px 0 -10px transparent}}`);
    };
})(ScriptsMenuMarking || (exports.ScriptsMenuMarking = ScriptsMenuMarking = {}));


/***/ }),

/***/ "./src/observer/helper.ts":
/*!********************************!*\
  !*** ./src/observer/helper.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateState = exports.submitChanges = exports.checkChanges = exports.isPage = void 0;
const isPage = (event, className) => event.target.classList ? event.target.classList.contains(className) : false;
exports.isPage = isPage;
const checkChanges = () => {
    if (window.observerState.cur.currentPage !== window.observerState.old.currentPage) {
        window.observerState.old = JSON.parse(JSON.stringify(window.observerState.cur));
        return true;
    }
    return false;
};
exports.checkChanges = checkChanges;
const submitChanges = () => {
    if ((0, exports.checkChanges)())
        window.observerSubs.forEach((os) => os(window.observerState.cur));
};
exports.submitChanges = submitChanges;
const updateState = (event) => {
    if (event.target.classList ? event.target.classList.length === 0 : true)
        return;
    let state = window.observerState.cur;
    if ((0, exports.isPage)(event, 'menu'))
        state.currentPage = 'menu';
    if ((0, exports.isPage)(event, 'server-browser-box'))
        state.currentPage = 'server-list';
    if ((0, exports.isPage)(event, 'leaderboard-title-break'))
        state.currentPage = 'game';
    if ((0, exports.isPage)(event, 'hero-select'))
        state.currentPage = 'hero-select';
    if ((0, exports.isPage)(event, 'results'))
        state.currentPage = 'game-end';
    window.observerState.cur = state;
    (0, exports.submitChanges)();
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
exports.observerRegister = void 0;
const helper_1 = __webpack_require__(/*! ./helper */ "./src/observer/helper.ts");
const observerRegister = () => {
    window.observerState = {
        cur: { currentPage: 'menu' },
        old: { currentPage: 'menu' },
    };
    window.observerSubs = [];
    document.body.addEventListener('DOMNodeInserted', (e) => (0, helper_1.updateState)(e), false);
};
exports.observerRegister = observerRegister;
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

/***/ "./src/script/index.ts":
/*!*****************************!*\
  !*** ./src/script/index.ts ***!
  \*****************************/
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

/***/ "./src/scripts.ts":
/*!************************!*\
  !*** ./src/scripts.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const script_1 = __webpack_require__(/*! ./script */ "./src/script/index.ts");
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
    init() {
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
        for (const s in this.list)
            code = this.list[s].patch(code);
        let nScr = document.createElement('script');
        nScr.setAttribute('type', 'module');
        nScr.innerHTML = code;
        document.body.appendChild(nScr);
        console.log('All Scripts was loaded!');
    }
}
exports["default"] = Scripts;


/***/ }),

/***/ "./src/styles.ts":
/*!***********************!*\
  !*** ./src/styles.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.pushStylesToDom = exports.addStyle = void 0;
let styles = [];
/**
 * Adds styles to document
 * @param css Styles
 */
function addStyle(css) {
    styles.push(css);
}
exports.addStyle = addStyle;
/**
 * Creates style node, and put all styles
 */
function pushStylesToDom() {
    const style = document.createElement('style');
    style.innerHTML = styles.join(' ');
    style.id = 'esp-styles';
    document.head.appendChild(style);
}
exports.pushStylesToDom = pushStylesToDom;


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
// @version      dev-2
// @description  Dev version of E-SP, may contain errors
// @author       @EtherCD
// @match        https://*.evades.io/*
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp-dev.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp-dev.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/favicon-dev.svg
// @run-at       document-idle
// @license      MIT License
// @grant        none
// ==/UserScript==
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dom_1 = __webpack_require__(/*! ./dom */ "./src/dom/index.ts");
const observer_1 = __webpack_require__(/*! ./observer */ "./src/observer/index.ts");
const scripts_1 = __webpack_require__(/*! ./scripts */ "./src/scripts.ts");
window.scripts = new scripts_1.default();
(0, observer_1.observerRegister)();
document.addEventListener('readystatechange', () => {
    if (window.location.href.search(/\/profile/g) === -1 && window.location.href.search(/\/account/g) === -1)
        window.scripts.init();
    const dom = new dom_1.default();
    dom.push();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhZGVzc3AtZGV2LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxhQUFhLG1CQUFPLENBQUMsNkJBQU07QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQ1hGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQixtQkFBTyxDQUFDLGtDQUFXO0FBQ3BDLGlCQUFpQixtQkFBTyxDQUFDLHVEQUFtQjtBQUM1QyxrQkFBa0IsbUJBQU8sQ0FBQyx5REFBb0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQ3pCRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUI7QUFDckIsaUJBQWlCLG1CQUFPLENBQUMscUNBQWM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGdCQUFnQixtQkFBbUIsYUFBYSxhQUFhLDBCQUEwQixZQUFZLGNBQWM7QUFDdEs7QUFDQSxDQUFDLG9CQUFvQixxQkFBcUIscUJBQXFCOzs7Ozs7Ozs7OztBQzNCbEQ7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsMEJBQTBCO0FBQzFCLGlCQUFpQixtQkFBTyxDQUFDLHFDQUFjO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLHlCQUF5QixHQUFHO0FBQ25FLGtEQUFrRCxrQkFBa0IsUUFBUSxTQUFTLCtCQUErQixzQkFBc0IsV0FBVyx1QkFBdUIsWUFBWSxnQ0FBZ0MsYUFBYSxtQkFBbUIsb0JBQW9CLG1CQUFtQixpQkFBaUIsa0JBQWtCLHFCQUFxQix1QkFBdUIsa0JBQWtCLGlCQUFpQixrQkFBa0IsZ0JBQWdCLGVBQWUsNEJBQTRCLFlBQVksNkJBQTZCLFVBQVUsZUFBZSxpQkFBaUIsWUFBWSxXQUFXLGdCQUFnQixpQkFBaUIsaUJBQWlCLGVBQWUsZ0JBQWdCLGtCQUFrQixpQkFBaUIscUJBQXFCLDBCQUEwQixnQkFBZ0IsZ0JBQWdCLHFCQUFxQixpQkFBaUIsaUJBQWlCLEtBQUssaUJBQWlCLHFCQUFxQixrQkFBa0Isa0JBQWtCLGlCQUFpQix5QkFBeUIsa0JBQWtCLFVBQVUsV0FBVyxZQUFZLG9CQUFvQix1QkFBdUIsc0JBQXNCLDBDQUEwQyx3QkFBd0IscUJBQXFCLGdCQUFnQix3Q0FBd0MsZUFBZSxTQUFTLGdEQUFnRCxVQUFVLDBCQUEwQixXQUFXLFlBQVksc0JBQXNCLHVCQUF1QixnQ0FBZ0Msa0JBQWtCLE1BQU0sT0FBTyxXQUFXLFlBQVkseUJBQXlCLGtCQUFrQixnQ0FBZ0MsV0FBVyxZQUFZLGVBQWUsa0JBQWtCLGtCQUFrQixNQUFNLE9BQU8sOEJBQThCLHNCQUFzQiw2QkFBNkIsb0JBQW9CLDhCQUE4QixrQkFBa0IsUUFBUSxTQUFTLFVBQVUsb0JBQW9CLG1DQUFtQyxZQUFZLGVBQWUscUJBQXFCLHNCQUFzQixvQkFBb0IscUJBQXFCLHNDQUFzQyw4Q0FBOEMsaUNBQWlDLHVEQUF1RCxvQkFBb0IsMEJBQTBCLElBQUksbUJBQW1CLDRKQUE0SixLQUFLLG1CQUFtQiwrTEFBK0wsNkJBQTZCLElBQUksbUJBQW1CLDRKQUE0SixLQUFLLG1CQUFtQiwrTEFBK0wsd0JBQXdCLElBQUksbUJBQW1CLDRKQUE0SixLQUFLLG1CQUFtQiwrTEFBK0wscUJBQXFCLElBQUksbUJBQW1CLDRKQUE0SixLQUFLLG1CQUFtQiwrTEFBK0w7QUFDeHdIO0FBQ0EsQ0FBQyx5QkFBeUIsMEJBQTBCLDBCQUEwQjs7Ozs7Ozs7Ozs7QUN0RWpFO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELG1CQUFtQixHQUFHLHFCQUFxQixHQUFHLG9CQUFvQixHQUFHLGNBQWM7QUFDbkY7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7QUNuQ047QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsd0JBQXdCO0FBQ3hCLGlCQUFpQixtQkFBTyxDQUFDLDBDQUFVO0FBQ25DO0FBQ0E7QUFDQSxlQUFlLHFCQUFxQjtBQUNwQyxlQUFlLHFCQUFxQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QixhQUFhLG1CQUFPLENBQUMsMENBQVU7QUFDL0IsYUFBYSxtQkFBTyxDQUFDLHdDQUFTOzs7Ozs7Ozs7OztBQzVCakI7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7Ozs7Ozs7Ozs7O0FDRGhEO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixLQUFLLEtBQUsscUNBQXFDLFVBQVUsYUFBYSxFQUFFO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNuQ0Y7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCLG1CQUFPLENBQUMsdUNBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0ZBQWtGLEtBQUs7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVJQUF1SSxFQUFFO0FBQ3pJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQ2pERjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx1QkFBdUIsR0FBRyxnQkFBZ0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7Ozs7Ozs7VUNyQnZCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7Ozs7QUN0QmE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxjQUFjLG1CQUFPLENBQUMsaUNBQU87QUFDN0IsbUJBQW1CLG1CQUFPLENBQUMsMkNBQVk7QUFDdkMsa0JBQWtCLG1CQUFPLENBQUMsbUNBQVc7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvZG9tL2luZGV4LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL2RvbS9pdS50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9kb20vbWFya2luZ3MvYnV0dG9uLnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL2RvbS9tYXJraW5ncy9zY3JpcHRzLnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL29ic2VydmVyL2hlbHBlci50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9vYnNlcnZlci9pbmRleC50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9vYnNlcnZlci90eXBlcy50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9zY3JpcHQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvc2NyaXB0cy50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9zdHlsZXMudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBpdV8xID0gcmVxdWlyZShcIi4vaXVcIik7XG5jbGFzcyBEb20ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzID0gbmV3IGl1XzEuZGVmYXVsdCgpO1xuICAgIH1cbiAgICBwdXNoKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzLnB1c2goKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBEb207XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHN0eWxlc18xID0gcmVxdWlyZShcIi4uL3N0eWxlc1wiKTtcbmNvbnN0IGJ1dHRvbl8xID0gcmVxdWlyZShcIi4vbWFya2luZ3MvYnV0dG9uXCIpO1xuY29uc3Qgc2NyaXB0c18xID0gcmVxdWlyZShcIi4vbWFya2luZ3Mvc2NyaXB0c1wiKTtcbmNsYXNzIFNldHRpbmdzRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKGJ1dHRvbl8xLkJ1dHRvbk1hcmtpbmcubWFrZUJ1dHRvbigpLCBzY3JpcHRzXzEuU2NyaXB0c01lbnVNYXJraW5nLm1ha2VTY3JpcHRzTWVudSgpKTtcbiAgICAgICAgd2luZG93Lm9ic2VydmVyU3Vicy5wdXNoKHRoaXMucGluZyk7XG4gICAgfVxuICAgIHBpbmcoc3RhdGUpIHtcbiAgICAgICAgaWYgKHN0YXRlLmN1cnJlbnRQYWdlICE9PSAnbWVudScgJiYgc3RhdGUuY3VycmVudFBhZ2UgIT09ICdzZXJ2ZXItbGlzdCcpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlc3Atc2NyaXB0cy1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VzcC1zY3JpcHRzLW1lbnUnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VzcC1zY3JpcHRzLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdXNoKCkge1xuICAgICAgICAoMCwgc3R5bGVzXzEucHVzaFN0eWxlc1RvRG9tKSgpO1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goKGUpID0+IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZSkpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNldHRpbmdzRWxlbWVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CdXR0b25NYXJraW5nID0gdm9pZCAwO1xuY29uc3Qgc3R5bGVzXzEgPSByZXF1aXJlKFwiLi4vLi4vc3R5bGVzXCIpO1xudmFyIEJ1dHRvbk1hcmtpbmc7XG4oZnVuY3Rpb24gKEJ1dHRvbk1hcmtpbmcpIHtcbiAgICBCdXR0b25NYXJraW5nLm1ha2VCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIG1ha2VTdHlsZXMoKTtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy1idXR0b24nKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZXNwLXNjcmlwdHMtYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChtYWtlQnV0dG9uSWNvbigpKTtcbiAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VzcC1zY3JpcHRzLW1lbnUnKTtcbiAgICAgICAgICAgIGUuc3R5bGUuZGlzcGxheSA9IGUuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJycgOiAnbm9uZSc7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBidXR0b247XG4gICAgfTtcbiAgICBjb25zdCBtYWtlQnV0dG9uSWNvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBidXR0b25JY29uLnNyYyA9ICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTUC9tYWluL3JlcG8vc2V0dGluZ3Muc3ZnJztcbiAgICAgICAgYnV0dG9uSWNvbi5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy1idXR0b24taWNvbicpO1xuICAgICAgICByZXR1cm4gYnV0dG9uSWNvbjtcbiAgICB9O1xuICAgIGNvbnN0IG1ha2VTdHlsZXMgPSAoKSA9PiB7XG4gICAgICAgICgwLCBzdHlsZXNfMS5hZGRTdHlsZSkoYC5lc3Atc2NyaXB0cy1idXR0b24ge2N1cnNvcjogcG9pbnRlcjtwb3NpdGlvbjogYWJzb2x1dGU7Ym90dG9tOiAxMHB4O3JpZ2h0OiAxMHB4O30uZXNwLXNjcmlwdHMtYnV0dG9uLWljb24ge3dpZHRoOiAzNnB4O2hlaWdodDogMzZweDt9YCk7XG4gICAgfTtcbn0pKEJ1dHRvbk1hcmtpbmcgfHwgKGV4cG9ydHMuQnV0dG9uTWFya2luZyA9IEJ1dHRvbk1hcmtpbmcgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNjcmlwdHNNZW51TWFya2luZyA9IHZvaWQgMDtcbmNvbnN0IHN0eWxlc18xID0gcmVxdWlyZShcIi4uLy4uL3N0eWxlc1wiKTtcbnZhciBTY3JpcHRzTWVudU1hcmtpbmc7XG4oZnVuY3Rpb24gKFNjcmlwdHNNZW51TWFya2luZykge1xuICAgIFNjcmlwdHNNZW51TWFya2luZy5tYWtlU2NyaXB0c01lbnUgPSAoKSA9PiB7XG4gICAgICAgIG1ha2VTdHlsZXMoKTtcbiAgICAgICAgcmV0dXJuIG1ha2VTY3JpcHRzTm9kZSgpO1xuICAgIH07XG4gICAgY29uc3QgbWFrZVNjcmlwdHNOb2RlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBzY3JpcHRzTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzY3JpcHRzTWVudS5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy1tZW51Jyk7XG4gICAgICAgIHNjcmlwdHNNZW51LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHNjcmlwdHNNZW51LnNldEF0dHJpYnV0ZSgnaWQnLCAnZXNwLXNjcmlwdHMtbWVudScpO1xuICAgICAgICBjb25zdCBzY3JpcHRzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNjcmlwdHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdHMtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHNwYW5OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBzcGFuTmFtZS5pbm5lckhUTUwgPSAnU2NyaXB0cyc7XG4gICAgICAgIHNwYW5OYW1lLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHRzLXRpdGxlJyk7XG4gICAgICAgIHNjcmlwdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3Bhbk5hbWUpO1xuICAgICAgICBjb25zdCBjbG9zZU1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBjbG9zZU1lbnUudHlwZSA9ICdidXR0b24nO1xuICAgICAgICBjbG9zZU1lbnUudmFsdWUgPSAneCc7XG4gICAgICAgIGNsb3NlTWVudS5vbmNsaWNrID0gKCkgPT4gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlc3Atc2NyaXB0cy1tZW51Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XG4gICAgICAgIGNsb3NlTWVudS5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy1jbG9zZS1idG4nKTtcbiAgICAgICAgc2NyaXB0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9zZU1lbnUpO1xuICAgICAgICBjb25zdCBzY3JpcHRzTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzY3JpcHRzTGlzdC5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy1saXN0Jyk7XG4gICAgICAgIHdpbmRvdy5zY3JpcHRzLmZvckVhY2goKGUpID0+IHtcbiAgICAgICAgICAgIHNjcmlwdHNMaXN0LmFwcGVuZENoaWxkKG1ha2VTY3JpcHRMYWJsZShlKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY3JpcHRzQ29udGFpbmVyLmFwcGVuZENoaWxkKHNjcmlwdHNMaXN0KTtcbiAgICAgICAgc2NyaXB0c01lbnUuYXBwZW5kQ2hpbGQoc2NyaXB0c0NvbnRhaW5lcik7XG4gICAgICAgIHJldHVybiBzY3JpcHRzTWVudTtcbiAgICB9O1xuICAgIGNvbnN0IG1ha2VTY3JpcHRMYWJsZSA9IChlKSA9PiB7XG4gICAgICAgIGNvbnN0IGxhYmVsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgbGFiZWxDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdC1sYWJsZScpO1xuICAgICAgICBjb25zdCBkaXZDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgZGl2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHQtY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IHNjcmlwdEljb25JbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgc2NyaXB0SWNvbkltZy5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0LWljb24nKTtcbiAgICAgICAgc2NyaXB0SWNvbkltZy5zcmMgPSBlLmljb247XG4gICAgICAgIC8qIEFkZHMgU2NyaXB0IEljb24gKi9cbiAgICAgICAgZGl2Q29udGFpbmVyLmFwcGVuZENoaWxkKHNjcmlwdEljb25JbWcpO1xuICAgICAgICBjb25zdCBzY3JpcHROYW1lU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc2NyaXB0TmFtZVNwYW4uY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdC1uYW1lJyk7XG4gICAgICAgIHNjcmlwdE5hbWVTcGFuLmlubmVySFRNTCA9IGUubmFtZTtcbiAgICAgICAgLyogQWRkcyBTY3JpcHQgTmFtZSAqL1xuICAgICAgICBkaXZDb250YWluZXIuYXBwZW5kQ2hpbGQoc2NyaXB0TmFtZVNwYW4pO1xuICAgICAgICBjb25zdCBzY3JpcHREZXNjcmlwdGlvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNjcmlwdERlc2NyaXB0aW9uU3Bhbi5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0LWRlc2NyaXB0aW9uJyk7XG4gICAgICAgIC8qIEFkZHMgU2NyaXB0IERlc2NyaXB0aW9uIFAgKi9cbiAgICAgICAgY29uc3Qgc2NyaXB0RGVzY3JpcHRpb25QID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBzY3JpcHREZXNjcmlwdGlvblAuaW5uZXJIVE1MID0gZS5kZXNjcmlwdGlvbjtcbiAgICAgICAgc2NyaXB0RGVzY3JpcHRpb25TcGFuLmFwcGVuZENoaWxkKHNjcmlwdERlc2NyaXB0aW9uUCk7XG4gICAgICAgIC8qIEFkZHMgU2NyaXB0IERlc2NyaXB0aW9uIFNwYW4gKi9cbiAgICAgICAgZGl2Q29udGFpbmVyLmFwcGVuZENoaWxkKHNjcmlwdERlc2NyaXB0aW9uU3Bhbik7XG4gICAgICAgIGNvbnN0IHNjcmlwdENvb29sbGxsQ2hlY2tib3hEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2NyaXB0Q29vb2xsbGxDaGVja2JveERpdi5jbGFzc0xpc3QuYWRkKCdjaGVja2JveC13cmFwcGVyLTEyJyk7XG4gICAgICAgIHNjcmlwdENvb29sbGxsQ2hlY2tib3hEaXYuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjYnhcIj48aW5wdXQgaWQ9XCJjYngtMTJcIiB0eXBlPVwiY2hlY2tib3hcIi8+PGxhYmVsIGZvcj1cImNieC0xMlwiPjwvbGFiZWw+PHN2ZyB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTRcIiB2aWV3Ym94PVwiMCAwIDE1IDE0XCIgZmlsbD1cIm5vbmVcIj48cGF0aCBkPVwiTTIgOC4zNjM2NEw2LjIzMDc3IDEyTDEzIDJcIj48L3BhdGg+PC9zdmc+PC9kaXY+PCEtLSBHb29leS0tPjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZlcnNpb249XCIxLjFcIj48ZGVmcz48ZmlsdGVyIGlkPVwiZ29vLTEyXCI+PGZlZ2F1c3NpYW5ibHVyIGluPVwiU291cmNlR3JhcGhpY1wiIHN0ZGRldmlhdGlvbj1cIjRcIiByZXN1bHQ9XCJibHVyXCI+PC9mZWdhdXNzaWFuYmx1cj48ZmVjb2xvcm1hdHJpeCBpbj1cImJsdXJcIiBtb2RlPVwibWF0cml4XCIgdmFsdWVzPVwiMSAwIDAgMCAwICAwIDEgMCAwIDAgIDAgMCAxIDAgMCAgMCAwIDAgMjIgLTdcIiByZXN1bHQ9XCJnb28tMTJcIj48L2ZlY29sb3JtYXRyaXg+PGZlYmxlbmQgaW49XCJTb3VyY2VHcmFwaGljXCIgaW4yPVwiZ29vLTEyXCI+PC9mZWJsZW5kPjwvZmlsdGVyPjwvZGVmcz48L3N2Zz5gO1xuICAgICAgICBkaXZDb250YWluZXIuYXBwZW5kQ2hpbGQoc2NyaXB0Q29vb2xsbGxDaGVja2JveERpdik7XG4gICAgICAgIGxhYmVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdkNvbnRhaW5lcik7XG4gICAgICAgIHJldHVybiBsYWJlbENvbnRhaW5lcjtcbiAgICB9O1xuICAgIGNvbnN0IG1ha2VTdHlsZXMgPSAoKSA9PiB7XG4gICAgICAgICgwLCBzdHlsZXNfMS5hZGRTdHlsZSkoYDpyb290IHtcXG4tLW1haW5Gb250OiBNb250c2VycmF0O1xcbn1gKTtcbiAgICAgICAgKDAsIHN0eWxlc18xLmFkZFN0eWxlKShgLmVzcC1zY3JpcHRzLW1lbnV7cG9zaXRpb246YWJzb2x1dGU7dG9wOjUwJTtsZWZ0OjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlKC01MCUsLTUwJSk7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2NvbG9yOiNmZmZ9LmVzcC1zY3JpcHRzLWNvbnRhaW5lcnt3aWR0aDo0NTBweDtiYWNrZ3JvdW5kLWNvbG9yOnJnYmEoMCwwLDAsLjkpO2Rpc3BsYXk6ZmxleDtib3JkZXItcmFkaXVzOjEycHg7cGFkZGluZzozMHB4IDEwcHggMH0uZXNwLXNjcmlwdHMtdGl0bGV7bWFyZ2luLXRvcDotMjNweDtwb3NpdGlvbjphYnNvbHV0ZTtsZXR0ZXItc3BhY2luZzouMDJlbX0uZXNwLXNjcmlwdHMtY2xvc2UtYnRue3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbi10b3A6LTMycHg7bWFyZ2luLWxlZnQ6NDI4cHg7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToyNXB4O2ZvbnQtZmFtaWx5OnZhcigtLW1haW5Gb250KTtib3JkZXI6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2NvbG9yOnJlZDtjdXJzb3I6cG9pbnRlcn0uZXNwLXNjcmlwdC1pY29ue2hlaWdodDozNnB4O3dpZHRoOjM2cHg7bWFyZ2luLXRvcDoxMHB4O21hcmdpbi1sZWZ0OjEwcHh9LmVzcC1zY3JpcHQtbmFtZXtmb250LXNpemU6MTZweDttYXJnaW4tdG9wOjEwcHg7cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLWxlZnQ6MTBweDtsZXR0ZXItc3BhY2luZzouMDJlbX0uZXNwLXNjcmlwdC1kZXNjcmlwdGlvbiBwe3RleHQtYWxpZ246bGVmdDttYXgtd2lkdGg6MzIwcHg7bGV0dGVyLXNwYWNpbmc6LjAyZW07bWFyZ2luLXRvcDotMTVweDttYXJnaW4tbGVmdDo1NXB4fS5jYnh7bWFyZ2luLXRvcDotMzNweH0uY2hlY2tib3gtd3JhcHBlci0xMntwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW4tbGVmdDo0MTBweDttYXJnaW4tdG9wOi00NHB4fS5jaGVja2JveC13cmFwcGVyLTEyPnN2Z3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6LTEzMCU7bGVmdDotMTcwJTt3aWR0aDoxMTBweDtwb2ludGVyLWV2ZW50czpub25lfS5jaGVja2JveC13cmFwcGVyLTEyICp7Ym94LXNpemluZzpib3JkZXItYm94fS5jaGVja2JveC13cmFwcGVyLTEyIGlucHV0W3R5cGU9Y2hlY2tib3hdey13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZTstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6dHJhbnNwYXJlbnQ7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luOjB9LmNoZWNrYm94LXdyYXBwZXItMTIgaW5wdXRbdHlwZT1jaGVja2JveF06Zm9jdXN7b3V0bGluZTowfS5jaGVja2JveC13cmFwcGVyLTEyIC5jYnh7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDt0b3A6Y2FsYyg1MHZoIC0gMTJweCk7bGVmdDpjYWxjKDUwdncgLSAxMnB4KX0uY2hlY2tib3gtd3JhcHBlci0xMiAuY2J4IGlucHV0e3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2JvcmRlcjoycHggc29saWQgI2JmYmZjMDtib3JkZXItcmFkaXVzOjUwJX0uY2hlY2tib3gtd3JhcHBlci0xMiAuY2J4IGxhYmVse3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7YmFja2dyb3VuZDowIDA7Ym9yZGVyLXJhZGl1czo1MCU7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowOy13ZWJraXQtZmlsdGVyOnVybCgnI2dvby0xMicpO2ZpbHRlcjp1cmwoJyNnb28tMTInKTt0cmFuc2Zvcm06dHJhc25sYXRlM2QoMCwwLDApO3BvaW50ZXItZXZlbnRzOm5vbmV9LmNoZWNrYm94LXdyYXBwZXItMTIgLmNieCBzdmd7cG9zaXRpb246YWJzb2x1dGU7dG9wOjVweDtsZWZ0OjRweDt6LWluZGV4OjE7cG9pbnRlci1ldmVudHM6bm9uZX0uY2hlY2tib3gtd3JhcHBlci0xMiAuY2J4IHN2ZyBwYXRoe3N0cm9rZTojZmZmO3N0cm9rZS13aWR0aDozO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtZGFzaGFycmF5OjE5O3N0cm9rZS1kYXNob2Zmc2V0OjE5O3RyYW5zaXRpb246c3Ryb2tlLWRhc2hvZmZzZXQgLjNzIDAuMnN9LmNoZWNrYm94LXdyYXBwZXItMTIgLmNieCBpbnB1dDpjaGVja2VkK2xhYmVse2FuaW1hdGlvbjouNnMgZm9yd2FyZHMgc3BsYXNoLTEyfS5jaGVja2JveC13cmFwcGVyLTEyIC5jYnggaW5wdXQ6Y2hlY2tlZCtsYWJlbCtzdmcgcGF0aHtzdHJva2UtZGFzaG9mZnNldDowfUAtbW96LWtleWZyYW1lcyBzcGxhc2gtMTJ7NDAle2JhY2tncm91bmQ6Izg2NmVmYjtib3gtc2hhZG93OjAgLTE4cHggMCAtOHB4ICM4NjZlZmIsMTZweCAtOHB4IDAgLThweCAjODY2ZWZiLDE2cHggOHB4IDAgLThweCAjODY2ZWZiLDAgMThweCAwIC04cHggIzg2NmVmYiwtMTZweCA4cHggMCAtOHB4ICM4NjZlZmIsLTE2cHggLThweCAwIC04cHggIzg2NmVmYn0xMDAle2JhY2tncm91bmQ6Izg2NmVmYjtib3gtc2hhZG93OjAgLTM2cHggMCAtMTBweCB0cmFuc3BhcmVudCwzMnB4IC0xNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMzJweCAxNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMCAzNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsLTMycHggMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LC0zMnB4IC0xNnB4IDAgLTEwcHggdHJhbnNwYXJlbnR9fUAtd2Via2l0LWtleWZyYW1lcyBzcGxhc2gtMTJ7NDAle2JhY2tncm91bmQ6Izg2NmVmYjtib3gtc2hhZG93OjAgLTE4cHggMCAtOHB4ICM4NjZlZmIsMTZweCAtOHB4IDAgLThweCAjODY2ZWZiLDE2cHggOHB4IDAgLThweCAjODY2ZWZiLDAgMThweCAwIC04cHggIzg2NmVmYiwtMTZweCA4cHggMCAtOHB4ICM4NjZlZmIsLTE2cHggLThweCAwIC04cHggIzg2NmVmYn0xMDAle2JhY2tncm91bmQ6Izg2NmVmYjtib3gtc2hhZG93OjAgLTM2cHggMCAtMTBweCB0cmFuc3BhcmVudCwzMnB4IC0xNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMzJweCAxNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMCAzNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsLTMycHggMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LC0zMnB4IC0xNnB4IDAgLTEwcHggdHJhbnNwYXJlbnR9fUAtby1rZXlmcmFtZXMgc3BsYXNoLTEyezQwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0xOHB4IDAgLThweCAjODY2ZWZiLDE2cHggLThweCAwIC04cHggIzg2NmVmYiwxNnB4IDhweCAwIC04cHggIzg2NmVmYiwwIDE4cHggMCAtOHB4ICM4NjZlZmIsLTE2cHggOHB4IDAgLThweCAjODY2ZWZiLC0xNnB4IC04cHggMCAtOHB4ICM4NjZlZmJ9MTAwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0zNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDMycHggMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDAgMzZweCAwIC0xMHB4IHRyYW5zcGFyZW50LC0zMnB4IDE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwtMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50fX1Aa2V5ZnJhbWVzIHNwbGFzaC0xMns0MCV7YmFja2dyb3VuZDojODY2ZWZiO2JveC1zaGFkb3c6MCAtMThweCAwIC04cHggIzg2NmVmYiwxNnB4IC04cHggMCAtOHB4ICM4NjZlZmIsMTZweCA4cHggMCAtOHB4ICM4NjZlZmIsMCAxOHB4IDAgLThweCAjODY2ZWZiLC0xNnB4IDhweCAwIC04cHggIzg2NmVmYiwtMTZweCAtOHB4IDAgLThweCAjODY2ZWZifTEwMCV7YmFja2dyb3VuZDojODY2ZWZiO2JveC1zaGFkb3c6MCAtMzZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDMycHggLTE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwzMnB4IDE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwwIDM2cHggMCAtMTBweCB0cmFuc3BhcmVudCwtMzJweCAxNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsLTMycHggLTE2cHggMCAtMTBweCB0cmFuc3BhcmVudH19YCk7XG4gICAgfTtcbn0pKFNjcmlwdHNNZW51TWFya2luZyB8fCAoZXhwb3J0cy5TY3JpcHRzTWVudU1hcmtpbmcgPSBTY3JpcHRzTWVudU1hcmtpbmcgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVwZGF0ZVN0YXRlID0gZXhwb3J0cy5zdWJtaXRDaGFuZ2VzID0gZXhwb3J0cy5jaGVja0NoYW5nZXMgPSBleHBvcnRzLmlzUGFnZSA9IHZvaWQgMDtcbmNvbnN0IGlzUGFnZSA9IChldmVudCwgY2xhc3NOYW1lKSA9PiBldmVudC50YXJnZXQuY2xhc3NMaXN0ID8gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpIDogZmFsc2U7XG5leHBvcnRzLmlzUGFnZSA9IGlzUGFnZTtcbmNvbnN0IGNoZWNrQ2hhbmdlcyA9ICgpID0+IHtcbiAgICBpZiAod2luZG93Lm9ic2VydmVyU3RhdGUuY3VyLmN1cnJlbnRQYWdlICE9PSB3aW5kb3cub2JzZXJ2ZXJTdGF0ZS5vbGQuY3VycmVudFBhZ2UpIHtcbiAgICAgICAgd2luZG93Lm9ic2VydmVyU3RhdGUub2xkID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh3aW5kb3cub2JzZXJ2ZXJTdGF0ZS5jdXIpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5leHBvcnRzLmNoZWNrQ2hhbmdlcyA9IGNoZWNrQ2hhbmdlcztcbmNvbnN0IHN1Ym1pdENoYW5nZXMgPSAoKSA9PiB7XG4gICAgaWYgKCgwLCBleHBvcnRzLmNoZWNrQ2hhbmdlcykoKSlcbiAgICAgICAgd2luZG93Lm9ic2VydmVyU3Vicy5mb3JFYWNoKChvcykgPT4gb3Mod2luZG93Lm9ic2VydmVyU3RhdGUuY3VyKSk7XG59O1xuZXhwb3J0cy5zdWJtaXRDaGFuZ2VzID0gc3VibWl0Q2hhbmdlcztcbmNvbnN0IHVwZGF0ZVN0YXRlID0gKGV2ZW50KSA9PiB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QgPyBldmVudC50YXJnZXQuY2xhc3NMaXN0Lmxlbmd0aCA9PT0gMCA6IHRydWUpXG4gICAgICAgIHJldHVybjtcbiAgICBsZXQgc3RhdGUgPSB3aW5kb3cub2JzZXJ2ZXJTdGF0ZS5jdXI7XG4gICAgaWYgKCgwLCBleHBvcnRzLmlzUGFnZSkoZXZlbnQsICdtZW51JykpXG4gICAgICAgIHN0YXRlLmN1cnJlbnRQYWdlID0gJ21lbnUnO1xuICAgIGlmICgoMCwgZXhwb3J0cy5pc1BhZ2UpKGV2ZW50LCAnc2VydmVyLWJyb3dzZXItYm94JykpXG4gICAgICAgIHN0YXRlLmN1cnJlbnRQYWdlID0gJ3NlcnZlci1saXN0JztcbiAgICBpZiAoKDAsIGV4cG9ydHMuaXNQYWdlKShldmVudCwgJ2xlYWRlcmJvYXJkLXRpdGxlLWJyZWFrJykpXG4gICAgICAgIHN0YXRlLmN1cnJlbnRQYWdlID0gJ2dhbWUnO1xuICAgIGlmICgoMCwgZXhwb3J0cy5pc1BhZ2UpKGV2ZW50LCAnaGVyby1zZWxlY3QnKSlcbiAgICAgICAgc3RhdGUuY3VycmVudFBhZ2UgPSAnaGVyby1zZWxlY3QnO1xuICAgIGlmICgoMCwgZXhwb3J0cy5pc1BhZ2UpKGV2ZW50LCAncmVzdWx0cycpKVxuICAgICAgICBzdGF0ZS5jdXJyZW50UGFnZSA9ICdnYW1lLWVuZCc7XG4gICAgd2luZG93Lm9ic2VydmVyU3RhdGUuY3VyID0gc3RhdGU7XG4gICAgKDAsIGV4cG9ydHMuc3VibWl0Q2hhbmdlcykoKTtcbn07XG5leHBvcnRzLnVwZGF0ZVN0YXRlID0gdXBkYXRlU3RhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vYnNlcnZlclJlZ2lzdGVyID0gdm9pZCAwO1xuY29uc3QgaGVscGVyXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJcIik7XG5jb25zdCBvYnNlcnZlclJlZ2lzdGVyID0gKCkgPT4ge1xuICAgIHdpbmRvdy5vYnNlcnZlclN0YXRlID0ge1xuICAgICAgICBjdXI6IHsgY3VycmVudFBhZ2U6ICdtZW51JyB9LFxuICAgICAgICBvbGQ6IHsgY3VycmVudFBhZ2U6ICdtZW51JyB9LFxuICAgIH07XG4gICAgd2luZG93Lm9ic2VydmVyU3VicyA9IFtdO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignRE9NTm9kZUluc2VydGVkJywgKGUpID0+ICgwLCBoZWxwZXJfMS51cGRhdGVTdGF0ZSkoZSksIGZhbHNlKTtcbn07XG5leHBvcnRzLm9ic2VydmVyUmVnaXN0ZXIgPSBvYnNlcnZlclJlZ2lzdGVyO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2hlbHBlclwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdHlwZXNcIiksIGV4cG9ydHMpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFNjcmlwdCB7XG4gICAgY29uc3RydWN0b3IoaW5mbykge1xuICAgICAgICB0aGlzLnJlcGxhY2VzID0gW107XG4gICAgICAgIHRoaXMudmFycyA9IHt9O1xuICAgICAgICB0aGlzLm5hbWUgPSBpbmZvLm5hbWU7XG4gICAgICAgIHRoaXMuaWNvbiA9IGluZm8uaWNvbiA/PyAnaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0V0aGVyQ0QvRXZhZGVzU1AvbWFpbi9yZXBvL2VtcHR5LXNjcmlwdC5zdmcnO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSBpbmZvLnZlcnNpb24gPz8gJ25vbmUnO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gaW5mby5kZXNjcmlwdGlvbiA/PyAnRGVzY3JpcHRpb24gaXMgbm90IGFkZGVkJztcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgYWRkUmVwbGFjZShhLCBiKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZXMucHVzaChbYSwgdGhpcy5mb3JtYXRSZXBsYWNlKGIpXSk7XG4gICAgfVxuICAgIGFkZFJlcGxhY2VzKC4uLnJlcGxhY2VzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYSBpbiByZXBsYWNlcylcbiAgICAgICAgICAgIHRoaXMuYWRkUmVwbGFjZShyZXBsYWNlc1thXVswXSwgcmVwbGFjZXNbYV1bMV0pO1xuICAgIH1cbiAgICBmb3JtYXRSZXBsYWNlKHYpIHtcbiAgICAgICAgcmV0dXJuIHYucmVwbGFjZSgvI1xceyhbXlxcfV0rKVxcfS9nLCAoXywgbSkgPT4gYHdpbmRvdy5zY3JpcHRzLmdldChcIiR7dGhpcy5uYW1lfVwiKS5nZXRWYXIoXCIke219XCIpYCk7XG4gICAgfVxuICAgIGFkZFZhcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFyc1trZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGdldFZhcihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFyc1trZXldO1xuICAgIH1cbiAgICBwYXRjaChjb2RlKSB7XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLnJlcGxhY2VzKVxuICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSh0aGlzLnJlcGxhY2VzW2ldWzBdLCB0aGlzLnJlcGxhY2VzW2ldWzFdKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJyB3YXMgbG9hZGVkIScpO1xuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTY3JpcHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNjcmlwdF8xID0gcmVxdWlyZShcIi4vc2NyaXB0XCIpO1xuY2xhc3MgU2NyaXB0cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMubGlzdCA9IFtdO1xuICAgIH1cbiAgICBhZGQoaW5mbykge1xuICAgICAgICB0aGlzLmxpc3QucHVzaChuZXcgc2NyaXB0XzEuZGVmYXVsdChpbmZvKSk7XG4gICAgfVxuICAgIGNyZWF0ZShpbmZvKSB7XG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IG5ldyBzY3JpcHRfMS5kZWZhdWx0KGluZm8pO1xuICAgICAgICB0aGlzLmxpc3QucHVzaChzY3JpcHQpO1xuICAgICAgICByZXR1cm4gc2NyaXB0O1xuICAgIH1cbiAgICBnZXQobmFtZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5saXN0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0W2ldLm5hbWUgPT09IG5hbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdFtpXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhuYW1lKTtcbiAgICAgICAgY29uc29sZS53YXJuKGBMb2FkaW5nIFNjcmlwdCBFcnJvcjogVHJ5aW5nIGdldCBub3QgZXhpc3RzIHNjcmlwdCwgbmFtZTogJHtuYW1lfWApO1xuICAgIH1cbiAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAoY29uc3QgZSBpbiB0aGlzLmxpc3QpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMubGlzdFtlXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy8gRnJvbSBzY3JpcHQgYnkgQElydWRpczogRXZhZGVzIEhlbHBlclxuICAgICAgICBsZXQgZWxlbSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0JykpLmZpbHRlcigoYSkgPT4gYS50eXBlID09PSAnbW9kdWxlJyAmJiBhLnNyYy5tYXRjaCgvXFwvaW5kZXhcXC5bMC05YS1mXXs4fVxcLmpzLykpWzBdO1xuICAgICAgICBpZiAoIWVsZW0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICghbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcygnRmlyZWZveCcpKVxuICAgICAgICAgICAgZWxlbS5yZW1vdmUoKTtcbiAgICAgICAgbGV0IHNyYyA9IGVsZW0uc3JjO1xuICAgICAgICBsZXQgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5vcGVuKCdHRVQnLCBzcmMsIGZhbHNlKTtcbiAgICAgICAgcmVxLnNlbmQoKTtcbiAgICAgICAgbGV0IGNvZGUgPSByZXEucmVzcG9uc2U7XG4gICAgICAgIGZvciAoY29uc3QgcyBpbiB0aGlzLmxpc3QpXG4gICAgICAgICAgICBjb2RlID0gdGhpcy5saXN0W3NdLnBhdGNoKGNvZGUpO1xuICAgICAgICBsZXQgblNjciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBuU2NyLnNldEF0dHJpYnV0ZSgndHlwZScsICdtb2R1bGUnKTtcbiAgICAgICAgblNjci5pbm5lckhUTUwgPSBjb2RlO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5TY3IpO1xuICAgICAgICBjb25zb2xlLmxvZygnQWxsIFNjcmlwdHMgd2FzIGxvYWRlZCEnKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTY3JpcHRzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnB1c2hTdHlsZXNUb0RvbSA9IGV4cG9ydHMuYWRkU3R5bGUgPSB2b2lkIDA7XG5sZXQgc3R5bGVzID0gW107XG4vKipcbiAqIEFkZHMgc3R5bGVzIHRvIGRvY3VtZW50XG4gKiBAcGFyYW0gY3NzIFN0eWxlc1xuICovXG5mdW5jdGlvbiBhZGRTdHlsZShjc3MpIHtcbiAgICBzdHlsZXMucHVzaChjc3MpO1xufVxuZXhwb3J0cy5hZGRTdHlsZSA9IGFkZFN0eWxlO1xuLyoqXG4gKiBDcmVhdGVzIHN0eWxlIG5vZGUsIGFuZCBwdXQgYWxsIHN0eWxlc1xuICovXG5mdW5jdGlvbiBwdXNoU3R5bGVzVG9Eb20oKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLmlubmVySFRNTCA9IHN0eWxlcy5qb2luKCcgJyk7XG4gICAgc3R5bGUuaWQgPSAnZXNwLXN0eWxlcyc7XG4gICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5leHBvcnRzLnB1c2hTdHlsZXNUb0RvbSA9IHB1c2hTdHlsZXNUb0RvbTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vID09VXNlclNjcmlwdD09XG4vLyBAbmFtZSAgICAgICAgIEV2YWRlcy1TUCBEZXZcbi8vIEB2ZXJzaW9uICAgICAgZGV2LTJcbi8vIEBkZXNjcmlwdGlvbiAgRGV2IHZlcnNpb24gb2YgRS1TUCwgbWF5IGNvbnRhaW4gZXJyb3JzXG4vLyBAYXV0aG9yICAgICAgIEBFdGhlckNEXG4vLyBAbWF0Y2ggICAgICAgIGh0dHBzOi8vKi5ldmFkZXMuaW8vKlxuLy8gQGRvd25sb2FkVVJMICBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTUC9tYWluL2J1aWxkL2V2YWRlc3NwLWRldi5qc1xuLy8gQHVwZGF0ZVVSTCAgICBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTUC9tYWluL2J1aWxkL2V2YWRlc3NwLWRldi5qc1xuLy8gQGljb24gICAgICAgICBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTUC9tYWluL3JlcG8vZmF2aWNvbi1kZXYuc3ZnXG4vLyBAcnVuLWF0ICAgICAgIGRvY3VtZW50LWlkbGVcbi8vIEBsaWNlbnNlICAgICAgTUlUIExpY2Vuc2Vcbi8vIEBncmFudCAgICAgICAgbm9uZVxuLy8gPT0vVXNlclNjcmlwdD09XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcbmNvbnN0IG9ic2VydmVyXzEgPSByZXF1aXJlKFwiLi9vYnNlcnZlclwiKTtcbmNvbnN0IHNjcmlwdHNfMSA9IHJlcXVpcmUoXCIuL3NjcmlwdHNcIik7XG53aW5kb3cuc2NyaXB0cyA9IG5ldyBzY3JpcHRzXzEuZGVmYXVsdCgpO1xuKDAsIG9ic2VydmVyXzEub2JzZXJ2ZXJSZWdpc3RlcikoKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNlYXJjaCgvXFwvcHJvZmlsZS9nKSA9PT0gLTEgJiYgd2luZG93LmxvY2F0aW9uLmhyZWYuc2VhcmNoKC9cXC9hY2NvdW50L2cpID09PSAtMSlcbiAgICAgICAgd2luZG93LnNjcmlwdHMuaW5pdCgpO1xuICAgIGNvbnN0IGRvbSA9IG5ldyBkb21fMS5kZWZhdWx0KCk7XG4gICAgZG9tLnB1c2goKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9