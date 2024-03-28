/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/init.ts":
/*!*********************!*\
  !*** ./src/init.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.init = void 0;
const observer = __webpack_require__(/*! ./observer */ "./src/observer/index.ts");
const sdom = __webpack_require__(/*! ./sdom */ "./src/sdom/index.ts");
const ui_1 = __webpack_require__(/*! ./ui */ "./src/ui/index.ts");
const patchDom = (code) => {
    const styles = Array.from(document.head.querySelectorAll('style'));
    let tsModStyles = styles.filter((e) => e.innerHTML.match(/#version-warning/g) !== null)[0];
    // From script by @Zirolio: E-UI-Zond
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://evades.io', true);
    xhr.onload = () => {
        const html = xhr.responseText.replace(/(type="module" src=")(\/index\.[0-9a-zA-Z]+\.js)/g, (_, a) => a + '/ ');
        document.documentElement.innerHTML = html;
        observer.init();
        let script = document.createElement('script');
        script.setAttribute('type', 'module');
        script.innerHTML = code;
        document.body.appendChild(script);
        if (tsModStyles)
            document.head.appendChild(tsModStyles);
        ui_1.default.init();
        sdom.init();
        console.log('EvadesSP was loaded normal.');
    };
    xhr.send();
};
const patchScript = () => {
    // From script by @Irudis: Evades Helper
    let elem = Array.from(document.querySelectorAll('script')).filter((a) => a.type === 'module' && a.src.match(/\/index\.[0-9a-f]{8}\.js/))[0];
    if (!elem)
        return;
    let req = new XMLHttpRequest();
    req.open('GET', elem.src, false);
    req.onload = () => {
        let code = req.response;
        for (const s in window.scripts.list)
            code = window.scripts.list[s].patch(code);
        patchDom(code);
    };
    req.send();
};
const init = (_, o) => {
    setTimeout(() => {
        patchScript();
    }, 100);
    o.disconnect();
};
exports.init = init;


/***/ }),

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
        if (!this.includes(info.name))
            this.list.push(new script_1.default(info));
    }
    create(info) {
        const script = new script_1.default(info);
        this.list.push(script);
        return script;
    }
    includes(name) {
        for (const i in this.list) {
            if (this.list[i].name === name)
                return true;
        }
        return false;
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
// @version      dev-5
// @description  Dev version of E-SP, may contain errors
// @author       @EtherCD, styles by @duesti.
// @match        https://*.evades.io/*
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp-dev.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp-dev.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/favicon-dev.svg
// @run-at       document-start
// @license      MIT License
// @grant        none
// ==/UserScript==
Object.defineProperty(exports, "__esModule", ({ value: true }));
const init_1 = __webpack_require__(/*! ./init */ "./src/init.ts");
const scripts = __webpack_require__(/*! ./scripts */ "./src/scripts/index.ts");
const sdom = __webpack_require__(/*! ./sdom */ "./src/sdom/index.ts");
(() => {
    if (window.scripts)
        return;
    window.scripts = new scripts.Scripts();
    window.sdom = new sdom.SDom();
    if (window.location.href.search(/\/profile/g) === -1 && window.location.href.search(/\/account/g) === -1)
        new MutationObserver(init_1.init).observe(document, { childList: true, subtree: true });
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O0FDdEJhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsZUFBZSxtQkFBTyxDQUFDLDZCQUFRO0FBQy9CLGdCQUFnQixtQkFBTyxDQUFDLHlDQUFXO0FBQ25DLGFBQWEsbUJBQU8sQ0FBQyxtQ0FBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsZ0NBQWdDO0FBQzlGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9pbml0LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL29ic2VydmVyL2hlbHBlci50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9vYnNlcnZlci9pbmRleC50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9vYnNlcnZlci90eXBlcy50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9zY3JpcHRzL2luZGV4LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3NjcmlwdHMvc2NyaXB0LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3NjcmlwdHMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvc2RvbS9pbmRleC50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9zZG9tL2luaXQudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvc2RvbS9zdHlsZXMudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvdWkvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvdWkvbWFya2luZ3MvYnV0dG9uLnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3VpL21hcmtpbmdzL3NjcmlwdHMudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmluaXQgPSB2b2lkIDA7XG5jb25zdCBvYnNlcnZlciA9IHJlcXVpcmUoXCIuL29ic2VydmVyXCIpO1xuY29uc3Qgc2RvbSA9IHJlcXVpcmUoXCIuL3Nkb21cIik7XG5jb25zdCB1aV8xID0gcmVxdWlyZShcIi4vdWlcIik7XG5jb25zdCBwYXRjaERvbSA9IChjb2RlKSA9PiB7XG4gICAgY29uc3Qgc3R5bGVzID0gQXJyYXkuZnJvbShkb2N1bWVudC5oZWFkLnF1ZXJ5U2VsZWN0b3JBbGwoJ3N0eWxlJykpO1xuICAgIGxldCB0c01vZFN0eWxlcyA9IHN0eWxlcy5maWx0ZXIoKGUpID0+IGUuaW5uZXJIVE1MLm1hdGNoKC8jdmVyc2lvbi13YXJuaW5nL2cpICE9PSBudWxsKVswXTtcbiAgICAvLyBGcm9tIHNjcmlwdCBieSBAWmlyb2xpbzogRS1VSS1ab25kXG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL2V2YWRlcy5pbycsIHRydWUpO1xuICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGh0bWwgPSB4aHIucmVzcG9uc2VUZXh0LnJlcGxhY2UoLyh0eXBlPVwibW9kdWxlXCIgc3JjPVwiKShcXC9pbmRleFxcLlswLTlhLXpBLVpdK1xcLmpzKS9nLCAoXywgYSkgPT4gYSArICcvICcpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgb2JzZXJ2ZXIuaW5pdCgpO1xuICAgICAgICBsZXQgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnbW9kdWxlJyk7XG4gICAgICAgIHNjcmlwdC5pbm5lckhUTUwgPSBjb2RlO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIGlmICh0c01vZFN0eWxlcylcbiAgICAgICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQodHNNb2RTdHlsZXMpO1xuICAgICAgICB1aV8xLmRlZmF1bHQuaW5pdCgpO1xuICAgICAgICBzZG9tLmluaXQoKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0V2YWRlc1NQIHdhcyBsb2FkZWQgbm9ybWFsLicpO1xuICAgIH07XG4gICAgeGhyLnNlbmQoKTtcbn07XG5jb25zdCBwYXRjaFNjcmlwdCA9ICgpID0+IHtcbiAgICAvLyBGcm9tIHNjcmlwdCBieSBASXJ1ZGlzOiBFdmFkZXMgSGVscGVyXG4gICAgbGV0IGVsZW0gPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3NjcmlwdCcpKS5maWx0ZXIoKGEpID0+IGEudHlwZSA9PT0gJ21vZHVsZScgJiYgYS5zcmMubWF0Y2goL1xcL2luZGV4XFwuWzAtOWEtZl17OH1cXC5qcy8pKVswXTtcbiAgICBpZiAoIWVsZW0pXG4gICAgICAgIHJldHVybjtcbiAgICBsZXQgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgcmVxLm9wZW4oJ0dFVCcsIGVsZW0uc3JjLCBmYWxzZSk7XG4gICAgcmVxLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgbGV0IGNvZGUgPSByZXEucmVzcG9uc2U7XG4gICAgICAgIGZvciAoY29uc3QgcyBpbiB3aW5kb3cuc2NyaXB0cy5saXN0KVxuICAgICAgICAgICAgY29kZSA9IHdpbmRvdy5zY3JpcHRzLmxpc3Rbc10ucGF0Y2goY29kZSk7XG4gICAgICAgIHBhdGNoRG9tKGNvZGUpO1xuICAgIH07XG4gICAgcmVxLnNlbmQoKTtcbn07XG5jb25zdCBpbml0ID0gKF8sIG8pID0+IHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcGF0Y2hTY3JpcHQoKTtcbiAgICB9LCAxMDApO1xuICAgIG8uZGlzY29ubmVjdCgpO1xufTtcbmV4cG9ydHMuaW5pdCA9IGluaXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudXBkYXRlU3RhdGUgPSBleHBvcnRzLnBpbmdBbGxMaXN0ZW5lcnMgPSBleHBvcnRzLmNoZWNrQ2hhbmdlcyA9IGV4cG9ydHMuaXNFbGVtZW50SWQgPSBleHBvcnRzLmlzRWxlbWVudCA9IHZvaWQgMDtcbmxldCBjdXJTdGF0ZSA9IHsgY3VycmVudFBhZ2U6ICdtZW51JyB9O1xubGV0IG9sZFN0YXRlID0geyBjdXJyZW50UGFnZTogJ21lbnUnIH07XG5jb25zdCBpc0VsZW1lbnQgPSAoZXZlbnQsIGNsYXNzTmFtZSkgPT4gZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCA/IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSA6IGZhbHNlO1xuZXhwb3J0cy5pc0VsZW1lbnQgPSBpc0VsZW1lbnQ7XG5jb25zdCBpc0VsZW1lbnRJZCA9IChldmVudCwgaWQpID0+IGV2ZW50LnRhcmdldC5pZCA/IGV2ZW50LnRhcmdldC5pZCA9PT0gaWQgOiBmYWxzZTtcbmV4cG9ydHMuaXNFbGVtZW50SWQgPSBpc0VsZW1lbnRJZDtcbmNvbnN0IGNoZWNrQ2hhbmdlcyA9ICgpID0+IHtcbiAgICBpZiAoY3VyU3RhdGUuY3VycmVudFBhZ2UgIT09IG9sZFN0YXRlLmN1cnJlbnRQYWdlKSB7XG4gICAgICAgIG9sZFN0YXRlID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjdXJTdGF0ZSkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbmV4cG9ydHMuY2hlY2tDaGFuZ2VzID0gY2hlY2tDaGFuZ2VzO1xuY29uc3QgcGluZ0FsbExpc3RlbmVycyA9IChzdWJzLCBldmVudHMpID0+IHtcbiAgICBmb3IgKGNvbnN0IGUgaW4gZXZlbnRzKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRzW2VdO1xuICAgICAgICBpZiAoZXZlbnQuc3RhdGVtZW50KSB7XG4gICAgICAgICAgICBsZXQgb2JzZXJ2ZXJFdmVudCA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBldmVudC50eXBlLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGV2ZW50LnZhbHVlID8gKG9ic2VydmVyRXZlbnQudmFsdWUgPSBldmVudC52YWx1ZSkgOiAnbm9uZSc7XG4gICAgICAgICAgICBldmVudC50YXJnZXQgPyAob2JzZXJ2ZXJFdmVudC50YXJnZXQgPSBldmVudC50YXJnZXQpIDogJ25vbmUnO1xuICAgICAgICAgICAgc3Vicy5mb3JFYWNoKCh2KSA9PiB2KG9ic2VydmVyRXZlbnQpKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnRzLnBpbmdBbGxMaXN0ZW5lcnMgPSBwaW5nQWxsTGlzdGVuZXJzO1xuY29uc3QgdXBkYXRlU3RhdGUgPSAoZXZlbnQsIHN1YnMpID0+IHtcbiAgICBpZiAoISgoZXZlbnQudGFyZ2V0LmlkID8gZXZlbnQudGFyZ2V0LmlkLmxlbmd0aCAhPT0gMCA6IGZhbHNlKSB8fFxuICAgICAgICAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCA/IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QubGVuZ3RoICE9PSAwIDogZmFsc2UpKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmICgoMCwgZXhwb3J0cy5pc0VsZW1lbnQpKGV2ZW50LCAnbWVudScpKVxuICAgICAgICBjdXJTdGF0ZS5jdXJyZW50UGFnZSA9ICdtZW51JztcbiAgICBpZiAoKDAsIGV4cG9ydHMuaXNFbGVtZW50KShldmVudCwgJ3NlcnZlci1icm93c2VyLWJveCcpKVxuICAgICAgICBjdXJTdGF0ZS5jdXJyZW50UGFnZSA9ICdzZXJ2ZXItbGlzdCc7XG4gICAgaWYgKCgwLCBleHBvcnRzLmlzRWxlbWVudCkoZXZlbnQsICdsZWFkZXJib2FyZC10aXRsZS1icmVhaycpKVxuICAgICAgICBjdXJTdGF0ZS5jdXJyZW50UGFnZSA9ICdnYW1lJztcbiAgICBpZiAoKDAsIGV4cG9ydHMuaXNFbGVtZW50KShldmVudCwgJ2hlcm8tc2VsZWN0JykpXG4gICAgICAgIGN1clN0YXRlLmN1cnJlbnRQYWdlID0gJ2hlcm8tc2VsZWN0JztcbiAgICBpZiAoKDAsIGV4cG9ydHMuaXNFbGVtZW50KShldmVudCwgJ3Jlc3VsdHMnKSlcbiAgICAgICAgY3VyU3RhdGUuY3VycmVudFBhZ2UgPSAnZ2FtZS1lbmQnO1xuICAgIGNvbnN0IGV2ZW50c09iamVjdCA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NoYW5nZS1wYWdlJyxcbiAgICAgICAgICAgIHN0YXRlbWVudDogb2xkU3RhdGUuY3VycmVudFBhZ2UgIT09IGN1clN0YXRlLmN1cnJlbnRQYWdlLFxuICAgICAgICAgICAgdmFsdWU6IGN1clN0YXRlLmN1cnJlbnRQYWdlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY2hhdC1tZXNzYWdlJyxcbiAgICAgICAgICAgIHN0YXRlbWVudDogKDAsIGV4cG9ydHMuaXNFbGVtZW50KShldmVudCwgJ2NoYXQtbWVzc2FnZScpLFxuICAgICAgICAgICAgdGFyZ2V0OiBldmVudC50YXJnZXQsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdjaGF0LXdpbmRvdy1hZGRlZCcsXG4gICAgICAgICAgICBzdGF0ZW1lbnQ6ICgwLCBleHBvcnRzLmlzRWxlbWVudElkKShldmVudCwgJ2NoYXQtd2luZG93JyksXG4gICAgICAgICAgICB0YXJnZXQ6IGV2ZW50LnRhcmdldCxcbiAgICAgICAgfSxcbiAgICBdO1xuICAgICgwLCBleHBvcnRzLnBpbmdBbGxMaXN0ZW5lcnMpKHN1YnMsIGV2ZW50c09iamVjdCk7XG4gICAgb2xkU3RhdGUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGN1clN0YXRlKSk7XG59O1xuZXhwb3J0cy51cGRhdGVTdGF0ZSA9IHVwZGF0ZVN0YXRlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobSwgayk7XG4gICAgaWYgKCFkZXNjIHx8IChcImdldFwiIGluIGRlc2MgPyAhbS5fX2VzTW9kdWxlIDogZGVzYy53cml0YWJsZSB8fCBkZXNjLmNvbmZpZ3VyYWJsZSkpIHtcbiAgICAgIGRlc2MgPSB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtW2tdOyB9IH07XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgZGVzYyk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChleHBvcnRzLCBwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYWRkU3Vic2NyaWJlciA9IGV4cG9ydHMuaW5pdCA9IHZvaWQgMDtcbmNvbnN0IGhlbHBlcl8xID0gcmVxdWlyZShcIi4vaGVscGVyXCIpO1xubGV0IHN1YnNjcmliZXJzID0gW107XG5jb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignRE9NTm9kZUluc2VydGVkJywgKGUpID0+ICgwLCBoZWxwZXJfMS51cGRhdGVTdGF0ZSkoZSwgc3Vic2NyaWJlcnMpLCBmYWxzZSk7XG59O1xuZXhwb3J0cy5pbml0ID0gaW5pdDtcbmNvbnN0IGFkZFN1YnNjcmliZXIgPSAoY2FsbGJhY2spID0+IHtcbiAgICBzdWJzY3JpYmVycy5wdXNoKGNhbGxiYWNrKTtcbn07XG5leHBvcnRzLmFkZFN1YnNjcmliZXIgPSBhZGRTdWJzY3JpYmVyO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL2hlbHBlclwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdHlwZXNcIiksIGV4cG9ydHMpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TY3JpcHRzID0gdm9pZCAwO1xuY29uc3Qgc2NyaXB0XzEgPSByZXF1aXJlKFwiLi9zY3JpcHRcIik7XG5jbGFzcyBTY3JpcHRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5saXN0ID0gW107XG4gICAgfVxuICAgIGFkZChpbmZvKSB7XG4gICAgICAgIGlmICghdGhpcy5pbmNsdWRlcyhpbmZvLm5hbWUpKVxuICAgICAgICAgICAgdGhpcy5saXN0LnB1c2gobmV3IHNjcmlwdF8xLmRlZmF1bHQoaW5mbykpO1xuICAgIH1cbiAgICBjcmVhdGUoaW5mbykge1xuICAgICAgICBjb25zdCBzY3JpcHQgPSBuZXcgc2NyaXB0XzEuZGVmYXVsdChpbmZvKTtcbiAgICAgICAgdGhpcy5saXN0LnB1c2goc2NyaXB0KTtcbiAgICAgICAgcmV0dXJuIHNjcmlwdDtcbiAgICB9XG4gICAgaW5jbHVkZXMobmFtZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5saXN0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0W2ldLm5hbWUgPT09IG5hbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQobmFtZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5saXN0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5saXN0W2ldLm5hbWUgPT09IG5hbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGlzdFtpXTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZyhuYW1lKTtcbiAgICAgICAgY29uc29sZS53YXJuKGBMb2FkaW5nIFNjcmlwdCBFcnJvcjogVHJ5aW5nIGdldCBub3QgZXhpc3RzIHNjcmlwdCwgbmFtZTogJHtuYW1lfWApO1xuICAgIH1cbiAgICBmb3JFYWNoKGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAoY29uc3QgZSBpbiB0aGlzLmxpc3QpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMubGlzdFtlXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLlNjcmlwdHMgPSBTY3JpcHRzO1xuX19leHBvcnRTdGFyKHJlcXVpcmUoXCIuL3NjcmlwdFwiKSwgZXhwb3J0cyk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vdHlwZXNcIiksIGV4cG9ydHMpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBTY3JpcHQge1xuICAgIGNvbnN0cnVjdG9yKGluZm8pIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlcyA9IFtdO1xuICAgICAgICB0aGlzLnZhcnMgPSB7fTtcbiAgICAgICAgdGhpcy5uYW1lID0gaW5mby5uYW1lO1xuICAgICAgICB0aGlzLmljb24gPSBpbmZvLmljb24gPz8gJ2h0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9FdGhlckNEL0V2YWRlc1NQL21haW4vcmVwby9lbXB0eS1zY3JpcHQuc3ZnJztcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gaW5mby52ZXJzaW9uID8/ICdub25lJztcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGluZm8uZGVzY3JpcHRpb24gPz8gJ0Rlc2NyaXB0aW9uIGlzIG5vdCBhZGRlZCc7XG4gICAgICAgIHRoaXMuZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGFkZFJlcGxhY2UoYSwgYikge1xuICAgICAgICB0aGlzLnJlcGxhY2VzLnB1c2goW2EsIHRoaXMuZm9ybWF0UmVwbGFjZShiKV0pO1xuICAgIH1cbiAgICBhZGRSZXBsYWNlcyguLi5yZXBsYWNlcykge1xuICAgICAgICBmb3IgKGNvbnN0IGEgaW4gcmVwbGFjZXMpXG4gICAgICAgICAgICB0aGlzLmFkZFJlcGxhY2UocmVwbGFjZXNbYV1bMF0sIHJlcGxhY2VzW2FdWzFdKTtcbiAgICB9XG4gICAgZm9ybWF0UmVwbGFjZSh2KSB7XG4gICAgICAgIHJldHVybiB2LnJlcGxhY2UoLyNcXHsoW15cXH1dKylcXH0vZywgKF8sIG0pID0+IGB3aW5kb3cuc2NyaXB0cy5nZXQoXCIke3RoaXMubmFtZX1cIikuZ2V0VmFyKFwiJHttfVwiKWApO1xuICAgIH1cbiAgICBhZGRWYXIoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnZhcnNba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBnZXRWYXIoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhcnNba2V5XTtcbiAgICB9XG4gICAgcGF0Y2goY29kZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGkgaW4gdGhpcy5yZXBsYWNlcylcbiAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UodGhpcy5yZXBsYWNlc1tpXVswXSwgdGhpcy5yZXBsYWNlc1tpXVsxXSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMubmFtZSArICcgd2FzIGxvYWRlZCEnKTtcbiAgICAgICAgcmV0dXJuIGNvZGU7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2NyaXB0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihtLCBrKTtcbiAgICBpZiAoIWRlc2MgfHwgKFwiZ2V0XCIgaW4gZGVzYyA/ICFtLl9fZXNNb2R1bGUgOiBkZXNjLndyaXRhYmxlIHx8IGRlc2MuY29uZmlndXJhYmxlKSkge1xuICAgICAgZGVzYyA9IHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIGsyLCBkZXNjKTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGV4cG9ydHMsIHApKSBfX2NyZWF0ZUJpbmRpbmcoZXhwb3J0cywgbSwgcCk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TRG9tID0gdm9pZCAwO1xuY29uc3Qgc3R5bGVzXzEgPSByZXF1aXJlKFwiLi9zdHlsZXNcIik7XG5jb25zdCBPYnNlcnZlciA9IHJlcXVpcmUoXCIuLi9vYnNlcnZlclwiKTtcbi8qXG4gKiBTY3JpcHRzIERvbVxuICovXG5jbGFzcyBTRG9tIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgIH1cbiAgICBhZGRPYnNlcnZlclN1YnNjcmliZXIoY2FsbGJhY2spIHtcbiAgICAgICAgT2JzZXJ2ZXIuYWRkU3Vic2NyaWJlcihjYWxsYmFjayk7XG4gICAgfVxuICAgIGFkZEh0bWxFbGVtZW50KC4uLmVsZW1lbnRzKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMucHVzaCguLi5lbGVtZW50cyk7XG4gICAgfVxuICAgIGFkZFN0eWxlKC4uLnN0eWxlcykge1xuICAgICAgICBzdHlsZXNfMS5TY3JpcHRTdHlsZXMucHVzaCguLi5zdHlsZXMpO1xuICAgIH1cbn1cbmV4cG9ydHMuU0RvbSA9IFNEb207XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vaW5pdFwiKSwgZXhwb3J0cyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuaW5pdCA9IHZvaWQgMDtcbmNvbnN0IHN0eWxlc18xID0gcmVxdWlyZShcIi4vc3R5bGVzXCIpO1xuY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBzdHlsZXNfMS5TY3JpcHRTdHlsZXMucGF0Y2goKTtcbiAgICB3aW5kb3cuc2RvbS5lbGVtZW50cy5mb3JFYWNoKChlKSA9PiBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGUpKTtcbn07XG5leHBvcnRzLmluaXQgPSBpbml0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlNjcmlwdFN0eWxlcyA9IHZvaWQgMDtcbnZhciBTY3JpcHRTdHlsZXM7XG4oZnVuY3Rpb24gKFNjcmlwdFN0eWxlcykge1xuICAgIGxldCBzdHlsZXMgPSBbXTtcbiAgICBTY3JpcHRTdHlsZXMucHVzaCA9ICguLi5zdHlsZSkgPT4ge1xuICAgICAgICBzdHlsZXMucHVzaCguLi5zdHlsZSk7XG4gICAgfTtcbiAgICBTY3JpcHRTdHlsZXMucGF0Y2ggPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgc3R5bGUuaW5uZXJIVE1MID0gc3R5bGVzLmpvaW4oJyAnKTtcbiAgICAgICAgc3R5bGUuaWQgPSAnZXNwLXN0eWxlcyc7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH07XG59KShTY3JpcHRTdHlsZXMgfHwgKGV4cG9ydHMuU2NyaXB0U3R5bGVzID0gU2NyaXB0U3R5bGVzID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYnV0dG9uXzEgPSByZXF1aXJlKFwiLi9tYXJraW5ncy9idXR0b25cIik7XG5jb25zdCBzY3JpcHRzXzEgPSByZXF1aXJlKFwiLi9tYXJraW5ncy9zY3JpcHRzXCIpO1xudmFyIElVO1xuKGZ1bmN0aW9uIChJVSkge1xuICAgIElVLmluaXQgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5zZG9tLmFkZEh0bWxFbGVtZW50KGJ1dHRvbl8xLkJ1dHRvbk1hcmtpbmcubWFrZUJ1dHRvbigpLCBzY3JpcHRzXzEuU2NyaXB0c01lbnVNYXJraW5nLm1ha2VTY3JpcHRzTWVudSgpKTtcbiAgICAgICAgd2luZG93LnNkb20uYWRkT2JzZXJ2ZXJTdWJzY3JpYmVyKChzKSA9PiB7XG4gICAgICAgICAgICBpZiAocy50eXBlID09PSAnY2hhbmdlLXBhZ2UnICYmIHMudmFsdWUgIT09ICdtZW51JyAmJiBzLnZhbHVlICE9PSAnc2VydmVyLWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VzcC1zY3JpcHRzLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VzcC1zY3JpcHRzLW1lbnUnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocy50eXBlID09PSAnY2hhbmdlLXBhZ2UnKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VzcC1zY3JpcHRzLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn0pKElVIHx8IChJVSA9IHt9KSk7XG5leHBvcnRzLmRlZmF1bHQgPSBJVTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5CdXR0b25NYXJraW5nID0gdm9pZCAwO1xudmFyIEJ1dHRvbk1hcmtpbmc7XG4oZnVuY3Rpb24gKEJ1dHRvbk1hcmtpbmcpIHtcbiAgICBCdXR0b25NYXJraW5nLm1ha2VCdXR0b24gPSAoKSA9PiB7XG4gICAgICAgIG1ha2VTdHlsZXMoKTtcbiAgICAgICAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy1idXR0b24nKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZXNwLXNjcmlwdHMtYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChtYWtlQnV0dG9uSWNvbigpKTtcbiAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VzcC1zY3JpcHRzLW1lbnUnKTtcbiAgICAgICAgICAgIGUuc3R5bGUuZGlzcGxheSA9IGUuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnID8gJycgOiAnbm9uZSc7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBidXR0b247XG4gICAgfTtcbiAgICBjb25zdCBtYWtlQnV0dG9uSWNvbiA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgYnV0dG9uSWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICBidXR0b25JY29uLnNyYyA9ICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTUC9tYWluL3JlcG8vc2V0dGluZ3Muc3ZnJztcbiAgICAgICAgYnV0dG9uSWNvbi5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy1idXR0b24taWNvbicpO1xuICAgICAgICByZXR1cm4gYnV0dG9uSWNvbjtcbiAgICB9O1xuICAgIGNvbnN0IG1ha2VTdHlsZXMgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5zZG9tLmFkZFN0eWxlKGAuZXNwLXNjcmlwdHMtYnV0dG9uIHtjdXJzb3I6IHBvaW50ZXI7cG9zaXRpb246IGFic29sdXRlO2JvdHRvbTogMTBweDtyaWdodDogMTBweDt9LmVzcC1zY3JpcHRzLWJ1dHRvbi1pY29uIHt3aWR0aDogMzZweDtoZWlnaHQ6IDM2cHg7fWApO1xuICAgIH07XG59KShCdXR0b25NYXJraW5nIHx8IChleHBvcnRzLkJ1dHRvbk1hcmtpbmcgPSBCdXR0b25NYXJraW5nID0ge30pKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5TY3JpcHRzTWVudU1hcmtpbmcgPSB2b2lkIDA7XG52YXIgU2NyaXB0c01lbnVNYXJraW5nO1xuKGZ1bmN0aW9uIChTY3JpcHRzTWVudU1hcmtpbmcpIHtcbiAgICBTY3JpcHRzTWVudU1hcmtpbmcubWFrZVNjcmlwdHNNZW51ID0gKCkgPT4ge1xuICAgICAgICBtYWtlU3R5bGVzKCk7XG4gICAgICAgIHJldHVybiBtYWtlU2NyaXB0c05vZGUoKTtcbiAgICB9O1xuICAgIGNvbnN0IG1ha2VTY3JpcHRzTm9kZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2NyaXB0c01lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2NyaXB0c01lbnUuY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdHMtbWVudScpO1xuICAgICAgICBzY3JpcHRzTWVudS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBzY3JpcHRzTWVudS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2VzcC1zY3JpcHRzLW1lbnUnKTtcbiAgICAgICAgY29uc3Qgc2NyaXB0c0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzY3JpcHRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHRzLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBzcGFuTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgc3Bhbk5hbWUuaW5uZXJIVE1MID0gJ1NjcmlwdHMnO1xuICAgICAgICBzcGFuTmFtZS5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0cy10aXRsZScpO1xuICAgICAgICBzY3JpcHRzQ29udGFpbmVyLmFwcGVuZENoaWxkKHNwYW5OYW1lKTtcbiAgICAgICAgY29uc3QgY2xvc2VNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY2xvc2VNZW51LnR5cGUgPSAnYnV0dG9uJztcbiAgICAgICAgY2xvc2VNZW51LnZhbHVlID0gJ3gnO1xuICAgICAgICBjbG9zZU1lbnUub25jbGljayA9ICgpID0+IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXNwLXNjcmlwdHMtbWVudScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xuICAgICAgICBjbG9zZU1lbnUuY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdHMtY2xvc2UtYnRuJyk7XG4gICAgICAgIHNjcmlwdHNDb250YWluZXIuYXBwZW5kQ2hpbGQoY2xvc2VNZW51KTtcbiAgICAgICAgY29uc3Qgc2NyaXB0c0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2NyaXB0c0xpc3QuY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdHMtbGlzdCcpO1xuICAgICAgICB3aW5kb3cuc2NyaXB0cy5mb3JFYWNoKChlKSA9PiB7XG4gICAgICAgICAgICBzY3JpcHRzTGlzdC5hcHBlbmRDaGlsZChtYWtlU2NyaXB0TGFibGUoZSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2NyaXB0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChzY3JpcHRzTGlzdCk7XG4gICAgICAgIHNjcmlwdHNNZW51LmFwcGVuZENoaWxkKHNjcmlwdHNDb250YWluZXIpO1xuICAgICAgICByZXR1cm4gc2NyaXB0c01lbnU7XG4gICAgfTtcbiAgICBjb25zdCBtYWtlU2NyaXB0TGFibGUgPSAoZSkgPT4ge1xuICAgICAgICBjb25zdCBsYWJlbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxhYmVsQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHQtbGFibGUnKTtcbiAgICAgICAgY29uc3QgZGl2Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0LWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCBzY3JpcHRJY29uSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHNjcmlwdEljb25JbWcuY2xhc3NMaXN0LmFkZCgnZXNwLXNjcmlwdC1pY29uJyk7XG4gICAgICAgIHNjcmlwdEljb25JbWcuc3JjID0gZS5pY29uO1xuICAgICAgICAvKiBBZGRzIFNjcmlwdCBJY29uICovXG4gICAgICAgIGRpdkNvbnRhaW5lci5hcHBlbmRDaGlsZChzY3JpcHRJY29uSW1nKTtcbiAgICAgICAgY29uc3Qgc2NyaXB0TmFtZVNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNjcmlwdE5hbWVTcGFuLmNsYXNzTGlzdC5hZGQoJ2VzcC1zY3JpcHQtbmFtZScpO1xuICAgICAgICBzY3JpcHROYW1lU3Bhbi5pbm5lckhUTUwgPSBlLm5hbWUgKyAnIC0gJyArIGUudmVyc2lvbjtcbiAgICAgICAgLyogQWRkcyBTY3JpcHQgTmFtZSAqL1xuICAgICAgICBkaXZDb250YWluZXIuYXBwZW5kQ2hpbGQoc2NyaXB0TmFtZVNwYW4pO1xuICAgICAgICBjb25zdCBzY3JpcHREZXNjcmlwdGlvblNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgIHNjcmlwdERlc2NyaXB0aW9uU3Bhbi5jbGFzc0xpc3QuYWRkKCdlc3Atc2NyaXB0LWRlc2NyaXB0aW9uJyk7XG4gICAgICAgIC8qIEFkZHMgU2NyaXB0IERlc2NyaXB0aW9uIFAgKi9cbiAgICAgICAgY29uc3Qgc2NyaXB0RGVzY3JpcHRpb25QID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBzY3JpcHREZXNjcmlwdGlvblAuaW5uZXJIVE1MID0gZS5kZXNjcmlwdGlvbjtcbiAgICAgICAgc2NyaXB0RGVzY3JpcHRpb25TcGFuLmFwcGVuZENoaWxkKHNjcmlwdERlc2NyaXB0aW9uUCk7XG4gICAgICAgIC8qIEFkZHMgU2NyaXB0IERlc2NyaXB0aW9uIFNwYW4gKi9cbiAgICAgICAgZGl2Q29udGFpbmVyLmFwcGVuZENoaWxkKHNjcmlwdERlc2NyaXB0aW9uU3Bhbik7XG4gICAgICAgIGNvbnN0IHNjcmlwdENvb29sbGxsQ2hlY2tib3hEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2NyaXB0Q29vb2xsbGxDaGVja2JveERpdi5jbGFzc0xpc3QuYWRkKCdjaGVja2JveC13cmFwcGVyLTEyJyk7XG4gICAgICAgIHNjcmlwdENvb29sbGxsQ2hlY2tib3hEaXYuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJjYnhcIj48aW5wdXQgaWQ9XCJjYngtMTJcIiB0eXBlPVwiY2hlY2tib3hcIi8+PGxhYmVsIGZvcj1cImNieC0xMlwiPjwvbGFiZWw+PHN2ZyB3aWR0aD1cIjE1XCIgaGVpZ2h0PVwiMTRcIiB2aWV3Ym94PVwiMCAwIDE1IDE0XCIgZmlsbD1cIm5vbmVcIj48cGF0aCBkPVwiTTIgOC4zNjM2NEw2LjIzMDc3IDEyTDEzIDJcIj48L3BhdGg+PC9zdmc+PC9kaXY+PCEtLSBHb29leS0tPjxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZlcnNpb249XCIxLjFcIj48ZGVmcz48ZmlsdGVyIGlkPVwiZ29vLTEyXCI+PGZlZ2F1c3NpYW5ibHVyIGluPVwiU291cmNlR3JhcGhpY1wiIHN0ZGRldmlhdGlvbj1cIjRcIiByZXN1bHQ9XCJibHVyXCI+PC9mZWdhdXNzaWFuYmx1cj48ZmVjb2xvcm1hdHJpeCBpbj1cImJsdXJcIiBtb2RlPVwibWF0cml4XCIgdmFsdWVzPVwiMSAwIDAgMCAwICAwIDEgMCAwIDAgIDAgMCAxIDAgMCAgMCAwIDAgMjIgLTdcIiByZXN1bHQ9XCJnb28tMTJcIj48L2ZlY29sb3JtYXRyaXg+PGZlYmxlbmQgaW49XCJTb3VyY2VHcmFwaGljXCIgaW4yPVwiZ29vLTEyXCI+PC9mZWJsZW5kPjwvZmlsdGVyPjwvZGVmcz48L3N2Zz5gO1xuICAgICAgICBkaXZDb250YWluZXIuYXBwZW5kQ2hpbGQoc2NyaXB0Q29vb2xsbGxDaGVja2JveERpdik7XG4gICAgICAgIGxhYmVsQ29udGFpbmVyLmFwcGVuZENoaWxkKGRpdkNvbnRhaW5lcik7XG4gICAgICAgIHJldHVybiBsYWJlbENvbnRhaW5lcjtcbiAgICB9O1xuICAgIGNvbnN0IG1ha2VTdHlsZXMgPSAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5zZG9tLmFkZFN0eWxlKGA6cm9vdCB7XFxuLS1tYWluRm9udDogTW9udHNlcnJhdDtcXG59YCk7XG4gICAgICAgIHdpbmRvdy5zZG9tLmFkZFN0eWxlKGAuZXNwLXNjcmlwdHMtbWVudXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6NTAlO2xlZnQ6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGUoLTUwJSwtNTAlKTtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Y29sb3I6I2ZmZn0uZXNwLXNjcmlwdHMtY29udGFpbmVye3dpZHRoOjQ1MHB4O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwuOSk7ZGlzcGxheTpmbGV4O2JvcmRlci1yYWRpdXM6MTJweDtwYWRkaW5nOjMwcHggMTBweCAwfS5lc3Atc2NyaXB0cy10aXRsZXttYXJnaW4tdG9wOi0yM3B4O3Bvc2l0aW9uOmFic29sdXRlO2xldHRlci1zcGFjaW5nOi4wMmVtfS5lc3Atc2NyaXB0cy1jbG9zZS1idG57cG9zaXRpb246YWJzb2x1dGU7bWFyZ2luLXRvcDotMzJweDttYXJnaW4tbGVmdDo0MjhweDtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjI1cHg7Zm9udC1mYW1pbHk6dmFyKC0tbWFpbkZvbnQpO2JvcmRlcjpub25lO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Y29sb3I6cmVkO2N1cnNvcjpwb2ludGVyfS5lc3Atc2NyaXB0LWljb257aGVpZ2h0OjM2cHg7d2lkdGg6MzZweDttYXJnaW4tdG9wOjEwcHg7bWFyZ2luLWxlZnQ6MTBweH0uZXNwLXNjcmlwdC1uYW1le2ZvbnQtc2l6ZToxNnB4O21hcmdpbi10b3A6MTBweDtwb3NpdGlvbjphYnNvbHV0ZTttYXJnaW4tbGVmdDoxMHB4O2xldHRlci1zcGFjaW5nOi4wMmVtfS5lc3Atc2NyaXB0LWRlc2NyaXB0aW9uIHB7dGV4dC1hbGlnbjpsZWZ0O21heC13aWR0aDozMjBweDtsZXR0ZXItc3BhY2luZzouMDJlbTttYXJnaW4tdG9wOi0xNXB4O21hcmdpbi1sZWZ0OjU1cHh9LmNieHttYXJnaW4tdG9wOi0zM3B4fS5jaGVja2JveC13cmFwcGVyLTEye3Bvc2l0aW9uOmFic29sdXRlO21hcmdpbi1sZWZ0OjQxMHB4O21hcmdpbi10b3A6LTQ0cHh9LmNoZWNrYm94LXdyYXBwZXItMTI+c3Zne3Bvc2l0aW9uOmFic29sdXRlO3RvcDotMTMwJTtsZWZ0Oi0xNzAlO3dpZHRoOjExMHB4O3BvaW50ZXItZXZlbnRzOm5vbmV9LmNoZWNrYm94LXdyYXBwZXItMTIgKntib3gtc2l6aW5nOmJvcmRlci1ib3h9LmNoZWNrYm94LXdyYXBwZXItMTIgaW5wdXRbdHlwZT1jaGVja2JveF17LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7YXBwZWFyYW5jZTpub25lOy13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjp0cmFuc3BhcmVudDtjdXJzb3I6cG9pbnRlcjttYXJnaW46MH0uY2hlY2tib3gtd3JhcHBlci0xMiBpbnB1dFt0eXBlPWNoZWNrYm94XTpmb2N1c3tvdXRsaW5lOjB9LmNoZWNrYm94LXdyYXBwZXItMTIgLmNieHt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O3RvcDpjYWxjKDUwdmggLSAxMnB4KTtsZWZ0OmNhbGMoNTB2dyAtIDEycHgpfS5jaGVja2JveC13cmFwcGVyLTEyIC5jYnggaW5wdXR7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDowO3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7Ym9yZGVyOjJweCBzb2xpZCAjYmZiZmMwO2JvcmRlci1yYWRpdXM6NTAlfS5jaGVja2JveC13cmFwcGVyLTEyIC5jYnggbGFiZWx7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtiYWNrZ3JvdW5kOjAgMDtib3JkZXItcmFkaXVzOjUwJTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7LXdlYmtpdC1maWx0ZXI6dXJsKCcjZ29vLTEyJyk7ZmlsdGVyOnVybCgnI2dvby0xMicpO3RyYW5zZm9ybTp0cmFzbmxhdGUzZCgwLDAsMCk7cG9pbnRlci1ldmVudHM6bm9uZX0uY2hlY2tib3gtd3JhcHBlci0xMiAuY2J4IHN2Z3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6NXB4O2xlZnQ6NHB4O3otaW5kZXg6MTtwb2ludGVyLWV2ZW50czpub25lfS5jaGVja2JveC13cmFwcGVyLTEyIC5jYnggc3ZnIHBhdGh7c3Ryb2tlOiNmZmY7c3Ryb2tlLXdpZHRoOjM7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1kYXNoYXJyYXk6MTk7c3Ryb2tlLWRhc2hvZmZzZXQ6MTk7dHJhbnNpdGlvbjpzdHJva2UtZGFzaG9mZnNldCAuM3MgMC4yc30uY2hlY2tib3gtd3JhcHBlci0xMiAuY2J4IGlucHV0OmNoZWNrZWQrbGFiZWx7YW5pbWF0aW9uOi42cyBmb3J3YXJkcyBzcGxhc2gtMTJ9LmNoZWNrYm94LXdyYXBwZXItMTIgLmNieCBpbnB1dDpjaGVja2VkK2xhYmVsK3N2ZyBwYXRoe3N0cm9rZS1kYXNob2Zmc2V0OjB9QC1tb3ota2V5ZnJhbWVzIHNwbGFzaC0xMns0MCV7YmFja2dyb3VuZDojODY2ZWZiO2JveC1zaGFkb3c6MCAtMThweCAwIC04cHggIzg2NmVmYiwxNnB4IC04cHggMCAtOHB4ICM4NjZlZmIsMTZweCA4cHggMCAtOHB4ICM4NjZlZmIsMCAxOHB4IDAgLThweCAjODY2ZWZiLC0xNnB4IDhweCAwIC04cHggIzg2NmVmYiwtMTZweCAtOHB4IDAgLThweCAjODY2ZWZifTEwMCV7YmFja2dyb3VuZDojODY2ZWZiO2JveC1zaGFkb3c6MCAtMzZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDMycHggLTE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwzMnB4IDE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwwIDM2cHggMCAtMTBweCB0cmFuc3BhcmVudCwtMzJweCAxNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsLTMycHggLTE2cHggMCAtMTBweCB0cmFuc3BhcmVudH19QC13ZWJraXQta2V5ZnJhbWVzIHNwbGFzaC0xMns0MCV7YmFja2dyb3VuZDojODY2ZWZiO2JveC1zaGFkb3c6MCAtMThweCAwIC04cHggIzg2NmVmYiwxNnB4IC04cHggMCAtOHB4ICM4NjZlZmIsMTZweCA4cHggMCAtOHB4ICM4NjZlZmIsMCAxOHB4IDAgLThweCAjODY2ZWZiLC0xNnB4IDhweCAwIC04cHggIzg2NmVmYiwtMTZweCAtOHB4IDAgLThweCAjODY2ZWZifTEwMCV7YmFja2dyb3VuZDojODY2ZWZiO2JveC1zaGFkb3c6MCAtMzZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDMycHggLTE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwzMnB4IDE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwwIDM2cHggMCAtMTBweCB0cmFuc3BhcmVudCwtMzJweCAxNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsLTMycHggLTE2cHggMCAtMTBweCB0cmFuc3BhcmVudH19QC1vLWtleWZyYW1lcyBzcGxhc2gtMTJ7NDAle2JhY2tncm91bmQ6Izg2NmVmYjtib3gtc2hhZG93OjAgLTE4cHggMCAtOHB4ICM4NjZlZmIsMTZweCAtOHB4IDAgLThweCAjODY2ZWZiLDE2cHggOHB4IDAgLThweCAjODY2ZWZiLDAgMThweCAwIC04cHggIzg2NmVmYiwtMTZweCA4cHggMCAtOHB4ICM4NjZlZmIsLTE2cHggLThweCAwIC04cHggIzg2NmVmYn0xMDAle2JhY2tncm91bmQ6Izg2NmVmYjtib3gtc2hhZG93OjAgLTM2cHggMCAtMTBweCB0cmFuc3BhcmVudCwzMnB4IC0xNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMzJweCAxNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMCAzNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsLTMycHggMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LC0zMnB4IC0xNnB4IDAgLTEwcHggdHJhbnNwYXJlbnR9fUBrZXlmcmFtZXMgc3BsYXNoLTEyezQwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0xOHB4IDAgLThweCAjODY2ZWZiLDE2cHggLThweCAwIC04cHggIzg2NmVmYiwxNnB4IDhweCAwIC04cHggIzg2NmVmYiwwIDE4cHggMCAtOHB4ICM4NjZlZmIsLTE2cHggOHB4IDAgLThweCAjODY2ZWZiLC0xNnB4IC04cHggMCAtOHB4ICM4NjZlZmJ9MTAwJXtiYWNrZ3JvdW5kOiM4NjZlZmI7Ym94LXNoYWRvdzowIC0zNnB4IDAgLTEwcHggdHJhbnNwYXJlbnQsMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDMycHggMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50LDAgMzZweCAwIC0xMHB4IHRyYW5zcGFyZW50LC0zMnB4IDE2cHggMCAtMTBweCB0cmFuc3BhcmVudCwtMzJweCAtMTZweCAwIC0xMHB4IHRyYW5zcGFyZW50fX1gKTtcbiAgICB9O1xufSkoU2NyaXB0c01lbnVNYXJraW5nIHx8IChleHBvcnRzLlNjcmlwdHNNZW51TWFya2luZyA9IFNjcmlwdHNNZW51TWFya2luZyA9IHt9KSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyA9PVVzZXJTY3JpcHQ9PVxuLy8gQG5hbWUgICAgICAgICBFdmFkZXMtU1AgRGV2XG4vLyBAdmVyc2lvbiAgICAgIGRldi01XG4vLyBAZGVzY3JpcHRpb24gIERldiB2ZXJzaW9uIG9mIEUtU1AsIG1heSBjb250YWluIGVycm9yc1xuLy8gQGF1dGhvciAgICAgICBARXRoZXJDRCwgc3R5bGVzIGJ5IEBkdWVzdGkuXG4vLyBAbWF0Y2ggICAgICAgIGh0dHBzOi8vKi5ldmFkZXMuaW8vKlxuLy8gQGRvd25sb2FkVVJMICBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTUC9tYWluL2J1aWxkL2V2YWRlc3NwLWRldi5qc1xuLy8gQHVwZGF0ZVVSTCAgICBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTUC9tYWluL2J1aWxkL2V2YWRlc3NwLWRldi5qc1xuLy8gQGljb24gICAgICAgICBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTUC9tYWluL3JlcG8vZmF2aWNvbi1kZXYuc3ZnXG4vLyBAcnVuLWF0ICAgICAgIGRvY3VtZW50LXN0YXJ0XG4vLyBAbGljZW5zZSAgICAgIE1JVCBMaWNlbnNlXG4vLyBAZ3JhbnQgICAgICAgIG5vbmVcbi8vID09L1VzZXJTY3JpcHQ9PVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgaW5pdF8xID0gcmVxdWlyZShcIi4vaW5pdFwiKTtcbmNvbnN0IHNjcmlwdHMgPSByZXF1aXJlKFwiLi9zY3JpcHRzXCIpO1xuY29uc3Qgc2RvbSA9IHJlcXVpcmUoXCIuL3Nkb21cIik7XG4oKCkgPT4ge1xuICAgIGlmICh3aW5kb3cuc2NyaXB0cylcbiAgICAgICAgcmV0dXJuO1xuICAgIHdpbmRvdy5zY3JpcHRzID0gbmV3IHNjcmlwdHMuU2NyaXB0cygpO1xuICAgIHdpbmRvdy5zZG9tID0gbmV3IHNkb20uU0RvbSgpO1xuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaHJlZi5zZWFyY2goL1xcL3Byb2ZpbGUvZykgPT09IC0xICYmIHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNlYXJjaCgvXFwvYWNjb3VudC9nKSA9PT0gLTEpXG4gICAgICAgIG5ldyBNdXRhdGlvbk9ic2VydmVyKGluaXRfMS5pbml0KS5vYnNlcnZlKGRvY3VtZW50LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KTtcbn0pKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=