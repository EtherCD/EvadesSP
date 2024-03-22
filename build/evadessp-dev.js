/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom/index.ts":
/*!**************************!*\
  !*** ./src/dom/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const settings_1 = __webpack_require__(/*! ./settings */ "./src/dom/settings.ts");
class Dom {
    constructor() {
        this.elements = [];
        this.settings = new settings_1.default();
    }
    add(elem) {
        this.elements.push(elem);
    }
    push() {
        this.settings.push();
    }
}
exports["default"] = Dom;


/***/ }),

/***/ "./src/dom/settings.ts":
/*!*****************************!*\
  !*** ./src/dom/settings.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class SettingsElement {
    constructor() {
        let button = document.createElement('div');
        button.setAttribute('id', 'esp-button');
        button.style.cursor = 'pointer';
        button.style.position = 'absolute';
        button.style.bottom = '10px';
        button.style.right = '10px';
        button.innerHTML = `<img width="32" height="32" src="https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/settings.svg"/>`;
        let menu = document.createElement('div');
        menu.setAttribute('id', 'esp-menu');
        menu.classList.add('settings');
        button.onclick = () => {
            const e = document.getElementById('esp-menu');
            e.style.display = e.style.display === 'none' ? '' : 'none';
        };
        this.button = button;
        this.menu = menu;
        window.observerSubs.push(this.ping);
    }
    ping(state) {
        if (state.currentPage !== 'menu' && state.currentPage !== 'server-list') {
            document.getElementById('esp-button').style.display = 'none';
            document.getElementById('esp-menu').style.display = 'none';
        }
        else {
            document.getElementById('esp-button').style.display = '';
        }
    }
    updateMenu() {
        this.menu.innerHTML = `
    <span class="settings-title">Scripts</span>
    <input type="button" class="settings-exit" value="X" onclick="document.getElementById('esp-menu').style.display = 'none'">
    <div class="settings-container">
    ${(() => {
            let e = '';
            for (const i in window.scripts.scripts) {
                const script = window.scripts.scripts[i];
                e += `<label class="settings-label">
        <div class="settings-setting">
          <img src='${script.icon}' width='36'/>
          <span style='position:absolute;'>${script.name}</span>
          <span style='color: #ffffff77'>${script.description}</span>
          <input style="float: right;" type="checkbox" disabled ${script.enabled ? 'checked' : ''}/>
          </div>
        </label>`;
            }
            return e;
        })()}
    </div>
    `;
    }
    push() {
        document.body.appendChild(this.button);
        this.updateMenu();
        document.body.appendChild(this.menu);
    }
}
exports["default"] = SettingsElement;


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
        this.scripts = [];
    }
    add(info) {
        this.scripts.push(new script_1.default(info));
    }
    get(name) {
        for (const i in this.scripts) {
            if (this.scripts[i].name === name)
                return this.scripts[i];
        }
        throw new Error('Script is not found!');
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
        for (const s in this.scripts)
            code = this.scripts[s].patch(code);
        let nScr = document.createElement('script');
        nScr.setAttribute('type', 'module');
        nScr.innerHTML = code;
        document.body.appendChild(nScr);
        console.log('All Scripts was loaded!');
    }
}
exports["default"] = Scripts;


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
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSp/main/build/evadessp-dev.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSp/main/build/evadessp-dev.js
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
const dom = new dom_1.default();
document.addEventListener('readystatechange', () => {
    if (window.location.href.search(/\/profile/g) === -1 && window.location.href.search(/\/account/g) === -1)
        window.scripts.init();
    dom.push();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2Y7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWMsbUJBQU8sQ0FBQyxpQ0FBTztBQUM3QixtQkFBbUIsbUJBQU8sQ0FBQywyQ0FBWTtBQUN2QyxrQkFBa0IsbUJBQU8sQ0FBQyxtQ0FBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9kb20vaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvZG9tL3NldHRpbmdzLnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL29ic2VydmVyL2hlbHBlci50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9vYnNlcnZlci9pbmRleC50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9vYnNlcnZlci90eXBlcy50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9zY3JpcHQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvc2NyaXB0cy50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNldHRpbmdzXzEgPSByZXF1aXJlKFwiLi9zZXR0aW5nc1wiKTtcbmNsYXNzIERvbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IG5ldyBzZXR0aW5nc18xLmRlZmF1bHQoKTtcbiAgICB9XG4gICAgYWRkKGVsZW0pIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW0pO1xuICAgIH1cbiAgICBwdXNoKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzLnB1c2goKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBEb207XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFNldHRpbmdzRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnZXNwLWJ1dHRvbicpO1xuICAgICAgICBidXR0b24uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICBidXR0b24uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgICBidXR0b24uc3R5bGUuYm90dG9tID0gJzEwcHgnO1xuICAgICAgICBidXR0b24uc3R5bGUucmlnaHQgPSAnMTBweCc7XG4gICAgICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBgPGltZyB3aWR0aD1cIjMyXCIgaGVpZ2h0PVwiMzJcIiBzcmM9XCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTUC9tYWluL3JlcG8vc2V0dGluZ3Muc3ZnXCIvPmA7XG4gICAgICAgIGxldCBtZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCdpZCcsICdlc3AtbWVudScpO1xuICAgICAgICBtZW51LmNsYXNzTGlzdC5hZGQoJ3NldHRpbmdzJyk7XG4gICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlc3AtbWVudScpO1xuICAgICAgICAgICAgZS5zdHlsZS5kaXNwbGF5ID0gZS5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScgPyAnJyA6ICdub25lJztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5idXR0b24gPSBidXR0b247XG4gICAgICAgIHRoaXMubWVudSA9IG1lbnU7XG4gICAgICAgIHdpbmRvdy5vYnNlcnZlclN1YnMucHVzaCh0aGlzLnBpbmcpO1xuICAgIH1cbiAgICBwaW5nKHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZS5jdXJyZW50UGFnZSAhPT0gJ21lbnUnICYmIHN0YXRlLmN1cnJlbnRQYWdlICE9PSAnc2VydmVyLWxpc3QnKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXNwLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXNwLW1lbnUnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VzcC1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXBkYXRlTWVudSgpIHtcbiAgICAgICAgdGhpcy5tZW51LmlubmVySFRNTCA9IGBcbiAgICA8c3BhbiBjbGFzcz1cInNldHRpbmdzLXRpdGxlXCI+U2NyaXB0czwvc3Bhbj5cbiAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2V0dGluZ3MtZXhpdFwiIHZhbHVlPVwiWFwiIG9uY2xpY2s9XCJkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXNwLW1lbnUnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXCI+XG4gICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLWNvbnRhaW5lclwiPlxuICAgICR7KCgpID0+IHtcbiAgICAgICAgICAgIGxldCBlID0gJyc7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gd2luZG93LnNjcmlwdHMuc2NyaXB0cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNjcmlwdCA9IHdpbmRvdy5zY3JpcHRzLnNjcmlwdHNbaV07XG4gICAgICAgICAgICAgICAgZSArPSBgPGxhYmVsIGNsYXNzPVwic2V0dGluZ3MtbGFiZWxcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNldHRpbmdzLXNldHRpbmdcIj5cbiAgICAgICAgICA8aW1nIHNyYz0nJHtzY3JpcHQuaWNvbn0nIHdpZHRoPSczNicvPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPSdwb3NpdGlvbjphYnNvbHV0ZTsnPiR7c2NyaXB0Lm5hbWV9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPSdjb2xvcjogI2ZmZmZmZjc3Jz4ke3NjcmlwdC5kZXNjcmlwdGlvbn08L3NwYW4+XG4gICAgICAgICAgPGlucHV0IHN0eWxlPVwiZmxvYXQ6IHJpZ2h0O1wiIHR5cGU9XCJjaGVja2JveFwiIGRpc2FibGVkICR7c2NyaXB0LmVuYWJsZWQgPyAnY2hlY2tlZCcgOiAnJ30vPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2xhYmVsPmA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZTtcbiAgICAgICAgfSkoKX1cbiAgICA8L2Rpdj5cbiAgICBgO1xuICAgIH1cbiAgICBwdXNoKCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuYnV0dG9uKTtcbiAgICAgICAgdGhpcy51cGRhdGVNZW51KCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5tZW51KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTZXR0aW5nc0VsZW1lbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudXBkYXRlU3RhdGUgPSBleHBvcnRzLnN1Ym1pdENoYW5nZXMgPSBleHBvcnRzLmNoZWNrQ2hhbmdlcyA9IGV4cG9ydHMuaXNQYWdlID0gdm9pZCAwO1xuY29uc3QgaXNQYWdlID0gKGV2ZW50LCBjbGFzc05hbWUpID0+IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QgPyBldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkgOiBmYWxzZTtcbmV4cG9ydHMuaXNQYWdlID0gaXNQYWdlO1xuY29uc3QgY2hlY2tDaGFuZ2VzID0gKCkgPT4ge1xuICAgIGlmICh3aW5kb3cub2JzZXJ2ZXJTdGF0ZS5jdXIuY3VycmVudFBhZ2UgIT09IHdpbmRvdy5vYnNlcnZlclN0YXRlLm9sZC5jdXJyZW50UGFnZSkge1xuICAgICAgICB3aW5kb3cub2JzZXJ2ZXJTdGF0ZS5vbGQgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHdpbmRvdy5vYnNlcnZlclN0YXRlLmN1cikpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufTtcbmV4cG9ydHMuY2hlY2tDaGFuZ2VzID0gY2hlY2tDaGFuZ2VzO1xuY29uc3Qgc3VibWl0Q2hhbmdlcyA9ICgpID0+IHtcbiAgICBpZiAoKDAsIGV4cG9ydHMuY2hlY2tDaGFuZ2VzKSgpKVxuICAgICAgICB3aW5kb3cub2JzZXJ2ZXJTdWJzLmZvckVhY2goKG9zKSA9PiBvcyh3aW5kb3cub2JzZXJ2ZXJTdGF0ZS5jdXIpKTtcbn07XG5leHBvcnRzLnN1Ym1pdENoYW5nZXMgPSBzdWJtaXRDaGFuZ2VzO1xuY29uc3QgdXBkYXRlU3RhdGUgPSAoZXZlbnQpID0+IHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdCA/IGV2ZW50LnRhcmdldC5jbGFzc0xpc3QubGVuZ3RoID09PSAwIDogdHJ1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGxldCBzdGF0ZSA9IHdpbmRvdy5vYnNlcnZlclN0YXRlLmN1cjtcbiAgICBpZiAoKDAsIGV4cG9ydHMuaXNQYWdlKShldmVudCwgJ21lbnUnKSlcbiAgICAgICAgc3RhdGUuY3VycmVudFBhZ2UgPSAnbWVudSc7XG4gICAgaWYgKCgwLCBleHBvcnRzLmlzUGFnZSkoZXZlbnQsICdzZXJ2ZXItYnJvd3Nlci1ib3gnKSlcbiAgICAgICAgc3RhdGUuY3VycmVudFBhZ2UgPSAnc2VydmVyLWxpc3QnO1xuICAgIGlmICgoMCwgZXhwb3J0cy5pc1BhZ2UpKGV2ZW50LCAnbGVhZGVyYm9hcmQtdGl0bGUtYnJlYWsnKSlcbiAgICAgICAgc3RhdGUuY3VycmVudFBhZ2UgPSAnZ2FtZSc7XG4gICAgaWYgKCgwLCBleHBvcnRzLmlzUGFnZSkoZXZlbnQsICdoZXJvLXNlbGVjdCcpKVxuICAgICAgICBzdGF0ZS5jdXJyZW50UGFnZSA9ICdoZXJvLXNlbGVjdCc7XG4gICAgaWYgKCgwLCBleHBvcnRzLmlzUGFnZSkoZXZlbnQsICdyZXN1bHRzJykpXG4gICAgICAgIHN0YXRlLmN1cnJlbnRQYWdlID0gJ2dhbWUtZW5kJztcbiAgICB3aW5kb3cub2JzZXJ2ZXJTdGF0ZS5jdXIgPSBzdGF0ZTtcbiAgICAoMCwgZXhwb3J0cy5zdWJtaXRDaGFuZ2VzKSgpO1xufTtcbmV4cG9ydHMudXBkYXRlU3RhdGUgPSB1cGRhdGVTdGF0ZTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX2V4cG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9fZXhwb3J0U3RhcikgfHwgZnVuY3Rpb24obSwgZXhwb3J0cykge1xuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZXhwb3J0cywgcCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm9ic2VydmVyUmVnaXN0ZXIgPSB2b2lkIDA7XG5jb25zdCBoZWxwZXJfMSA9IHJlcXVpcmUoXCIuL2hlbHBlclwiKTtcbmNvbnN0IG9ic2VydmVyUmVnaXN0ZXIgPSAoKSA9PiB7XG4gICAgd2luZG93Lm9ic2VydmVyU3RhdGUgPSB7XG4gICAgICAgIGN1cjogeyBjdXJyZW50UGFnZTogJ21lbnUnIH0sXG4gICAgICAgIG9sZDogeyBjdXJyZW50UGFnZTogJ21lbnUnIH0sXG4gICAgfTtcbiAgICB3aW5kb3cub2JzZXJ2ZXJTdWJzID0gW107XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlSW5zZXJ0ZWQnLCAoZSkgPT4gKDAsIGhlbHBlcl8xLnVwZGF0ZVN0YXRlKShlKSwgZmFsc2UpO1xufTtcbmV4cG9ydHMub2JzZXJ2ZXJSZWdpc3RlciA9IG9ic2VydmVyUmVnaXN0ZXI7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vaGVscGVyXCIpLCBleHBvcnRzKTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi90eXBlc1wiKSwgZXhwb3J0cyk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgU2NyaXB0IHtcbiAgICBjb25zdHJ1Y3RvcihpbmZvKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZXMgPSBbXTtcbiAgICAgICAgdGhpcy52YXJzID0ge307XG4gICAgICAgIHRoaXMubmFtZSA9IGluZm8ubmFtZTtcbiAgICAgICAgdGhpcy5pY29uID0gaW5mby5pY29uID8/ICdodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTUC9tYWluL3JlcG8vZW1wdHktc2NyaXB0LnN2Zyc7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IGluZm8udmVyc2lvbiA/PyAnbm9uZSc7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBpbmZvLmRlc2NyaXB0aW9uID8/ICdEZXNjcmlwdGlvbiBpcyBub3QgYWRkZWQnO1xuICAgICAgICB0aGlzLmVuYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICBhZGRSZXBsYWNlKGEsIGIpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlcy5wdXNoKFthLCB0aGlzLmZvcm1hdFJlcGxhY2UoYildKTtcbiAgICB9XG4gICAgYWRkUmVwbGFjZXMoLi4ucmVwbGFjZXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBhIGluIHJlcGxhY2VzKVxuICAgICAgICAgICAgdGhpcy5hZGRSZXBsYWNlKHJlcGxhY2VzW2FdWzBdLCByZXBsYWNlc1thXVsxXSk7XG4gICAgfVxuICAgIGZvcm1hdFJlcGxhY2Uodikge1xuICAgICAgICByZXR1cm4gdi5yZXBsYWNlKC8jXFx7KFteXFx9XSspXFx9L2csIChfLCBtKSA9PiBgd2luZG93LnNjcmlwdHMuZ2V0KFwiJHt0aGlzLm5hbWV9XCIpLmdldFZhcihcIiR7bX1cIilgKTtcbiAgICB9XG4gICAgYWRkVmFyKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdGhpcy52YXJzW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgZ2V0VmFyKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YXJzW2tleV07XG4gICAgfVxuICAgIHBhdGNoKGNvZGUpIHtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMucmVwbGFjZXMpXG4gICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHRoaXMucmVwbGFjZXNbaV1bMF0sIHRoaXMucmVwbGFjZXNbaV1bMV0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIHdhcyBsb2FkZWQhJyk7XG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNjcmlwdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2NyaXB0XzEgPSByZXF1aXJlKFwiLi9zY3JpcHRcIik7XG5jbGFzcyBTY3JpcHRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zY3JpcHRzID0gW107XG4gICAgfVxuICAgIGFkZChpbmZvKSB7XG4gICAgICAgIHRoaXMuc2NyaXB0cy5wdXNoKG5ldyBzY3JpcHRfMS5kZWZhdWx0KGluZm8pKTtcbiAgICB9XG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuc2NyaXB0cykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NyaXB0c1tpXS5uYW1lID09PSBuYW1lKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjcmlwdHNbaV07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY3JpcHQgaXMgbm90IGZvdW5kIScpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICAvLyBGcm9tIHNjcmlwdCBieSBASXJ1ZGlzOiBFdmFkZXMgSGVscGVyXG4gICAgICAgIGxldCBlbGVtID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHQnKSkuZmlsdGVyKChhKSA9PiBhLnR5cGUgPT09ICdtb2R1bGUnICYmIGEuc3JjLm1hdGNoKC9cXC9pbmRleFxcLlswLTlhLWZdezh9XFwuanMvKSlbMF07XG4gICAgICAgIGlmICghZWxlbSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKCFuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKCdGaXJlZm94JykpXG4gICAgICAgICAgICBlbGVtLnJlbW92ZSgpO1xuICAgICAgICBsZXQgc3JjID0gZWxlbS5zcmM7XG4gICAgICAgIGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxLm9wZW4oJ0dFVCcsIHNyYywgZmFsc2UpO1xuICAgICAgICByZXEuc2VuZCgpO1xuICAgICAgICBsZXQgY29kZSA9IHJlcS5yZXNwb25zZTtcbiAgICAgICAgZm9yIChjb25zdCBzIGluIHRoaXMuc2NyaXB0cylcbiAgICAgICAgICAgIGNvZGUgPSB0aGlzLnNjcmlwdHNbc10ucGF0Y2goY29kZSk7XG4gICAgICAgIGxldCBuU2NyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIG5TY3Iuc2V0QXR0cmlidXRlKCd0eXBlJywgJ21vZHVsZScpO1xuICAgICAgICBuU2NyLmlubmVySFRNTCA9IGNvZGU7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoblNjcik7XG4gICAgICAgIGNvbnNvbGUubG9nKCdBbGwgU2NyaXB0cyB3YXMgbG9hZGVkIScpO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNjcmlwdHM7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyA9PVVzZXJTY3JpcHQ9PVxuLy8gQG5hbWUgICAgICAgICBFdmFkZXMtU1AgRGV2XG4vLyBAdmVyc2lvbiAgICAgIGRldi0yXG4vLyBAZGVzY3JpcHRpb24gIERldiB2ZXJzaW9uIG9mIEUtU1AsIG1heSBjb250YWluIGVycm9yc1xuLy8gQGF1dGhvciAgICAgICBARXRoZXJDRFxuLy8gQG1hdGNoICAgICAgICBodHRwczovLyouZXZhZGVzLmlvLypcbi8vIEBkb3dubG9hZFVSTCAgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0V0aGVyQ0QvRXZhZGVzU3AvbWFpbi9idWlsZC9ldmFkZXNzcC1kZXYuanNcbi8vIEB1cGRhdGVVUkwgICAgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0V0aGVyQ0QvRXZhZGVzU3AvbWFpbi9idWlsZC9ldmFkZXNzcC1kZXYuanNcbi8vIEBpY29uICAgICAgICAgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0V0aGVyQ0QvRXZhZGVzU1AvbWFpbi9yZXBvL2Zhdmljb24tZGV2LnN2Z1xuLy8gQHJ1bi1hdCAgICAgICBkb2N1bWVudC1pZGxlXG4vLyBAbGljZW5zZSAgICAgIE1JVCBMaWNlbnNlXG4vLyBAZ3JhbnQgICAgICAgIG5vbmVcbi8vID09L1VzZXJTY3JpcHQ9PVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZG9tXzEgPSByZXF1aXJlKFwiLi9kb21cIik7XG5jb25zdCBvYnNlcnZlcl8xID0gcmVxdWlyZShcIi4vb2JzZXJ2ZXJcIik7XG5jb25zdCBzY3JpcHRzXzEgPSByZXF1aXJlKFwiLi9zY3JpcHRzXCIpO1xud2luZG93LnNjcmlwdHMgPSBuZXcgc2NyaXB0c18xLmRlZmF1bHQoKTtcbigwLCBvYnNlcnZlcl8xLm9ic2VydmVyUmVnaXN0ZXIpKCk7XG5jb25zdCBkb20gPSBuZXcgZG9tXzEuZGVmYXVsdCgpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsICgpID0+IHtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhyZWYuc2VhcmNoKC9cXC9wcm9maWxlL2cpID09PSAtMSAmJiB3aW5kb3cubG9jYXRpb24uaHJlZi5zZWFyY2goL1xcL2FjY291bnQvZykgPT09IC0xKVxuICAgICAgICB3aW5kb3cuc2NyaXB0cy5pbml0KCk7XG4gICAgZG9tLnB1c2goKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9