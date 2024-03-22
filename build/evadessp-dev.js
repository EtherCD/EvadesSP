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
        button.style.cursor = 'pointer';
        button.style.position = 'absolute';
        button.style.bottom = '10px';
        button.style.right = '10px';
        button.innerHTML = `<img width="32" height="32" src="https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/settings.svg"/>`;
        let menu = document.createElement('div');
        this.button = button;
        this.menu = menu;
    }
    push() {
        document.body.appendChild(this.button);
    }
}
exports["default"] = SettingsElement;


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
        this.icon = info.icon ?? '';
        this.version = info.version ?? 'none';
        this.description = info.description ?? 'none';
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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
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
// @version      dev
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
const scripts_1 = __webpack_require__(/*! ./scripts */ "./src/scripts.ts");
window.scripts = new scripts_1.default();
const dom = new dom_1.default();
document.addEventListener('readystatechange', () => {
    if (!(window.location.href.search(/\/profile/g) || window.location.href.search(/\/account/g)))
        window.scripts.init();
    dom.push();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhZGVzc3AtZGV2LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxtQkFBbUIsbUJBQU8sQ0FBQyx5Q0FBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBZTs7Ozs7Ozs7Ozs7QUNmRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7Ozs7OztBQ2xCRjtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsS0FBSyxLQUFLLHFDQUFxQyxVQUFVLGFBQWEsRUFBRTtBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDbkNGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQixtQkFBTyxDQUFDLHVDQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUlBQXVJLEVBQUU7QUFDekk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7VUN0Q2Y7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGNBQWMsbUJBQU8sQ0FBQyxpQ0FBTztBQUM3QixrQkFBa0IsbUJBQU8sQ0FBQyxtQ0FBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvZG9tL2luZGV4LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL2RvbS9zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9zY3JpcHQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvc2NyaXB0cy50cyIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zY3JpcHRzLXdpdGgtdHlwZXNjcmlwdC8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNldHRpbmdzXzEgPSByZXF1aXJlKFwiLi9zZXR0aW5nc1wiKTtcbmNsYXNzIERvbSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IG5ldyBzZXR0aW5nc18xLmRlZmF1bHQoKTtcbiAgICB9XG4gICAgYWRkKGVsZW0pIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW0pO1xuICAgIH1cbiAgICBwdXNoKCkge1xuICAgICAgICB0aGlzLnNldHRpbmdzLnB1c2goKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBEb207XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNsYXNzIFNldHRpbmdzRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGxldCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYnV0dG9uLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgYnV0dG9uLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgYnV0dG9uLnN0eWxlLmJvdHRvbSA9ICcxMHB4JztcbiAgICAgICAgYnV0dG9uLnN0eWxlLnJpZ2h0ID0gJzEwcHgnO1xuICAgICAgICBidXR0b24uaW5uZXJIVE1MID0gYDxpbWcgd2lkdGg9XCIzMlwiIGhlaWdodD1cIjMyXCIgc3JjPVwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0V0aGVyQ0QvRXZhZGVzU1AvbWFpbi9yZXBvL3NldHRpbmdzLnN2Z1wiLz5gO1xuICAgICAgICBsZXQgbWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcbiAgICAgICAgdGhpcy5tZW51ID0gbWVudTtcbiAgICB9XG4gICAgcHVzaCgpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmJ1dHRvbik7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2V0dGluZ3NFbGVtZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBTY3JpcHQge1xuICAgIGNvbnN0cnVjdG9yKGluZm8pIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlcyA9IFtdO1xuICAgICAgICB0aGlzLnZhcnMgPSB7fTtcbiAgICAgICAgdGhpcy5uYW1lID0gaW5mby5uYW1lO1xuICAgICAgICB0aGlzLmljb24gPSBpbmZvLmljb24gPz8gJyc7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IGluZm8udmVyc2lvbiA/PyAnbm9uZSc7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBpbmZvLmRlc2NyaXB0aW9uID8/ICdub25lJztcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgYWRkUmVwbGFjZShhLCBiKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZXMucHVzaChbYSwgdGhpcy5mb3JtYXRSZXBsYWNlKGIpXSk7XG4gICAgfVxuICAgIGFkZFJlcGxhY2VzKC4uLnJlcGxhY2VzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYSBpbiByZXBsYWNlcylcbiAgICAgICAgICAgIHRoaXMuYWRkUmVwbGFjZShyZXBsYWNlc1thXVswXSwgcmVwbGFjZXNbYV1bMV0pO1xuICAgIH1cbiAgICBmb3JtYXRSZXBsYWNlKHYpIHtcbiAgICAgICAgcmV0dXJuIHYucmVwbGFjZSgvI1xceyhbXlxcfV0rKVxcfS9nLCAoXywgbSkgPT4gYHdpbmRvdy5zY3JpcHRzLmdldChcIiR7dGhpcy5uYW1lfVwiKS5nZXRWYXIoXCIke219XCIpYCk7XG4gICAgfVxuICAgIGFkZFZhcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFyc1trZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGdldFZhcihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFyc1trZXldO1xuICAgIH1cbiAgICBwYXRjaChjb2RlKSB7XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLnJlcGxhY2VzKVxuICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZSh0aGlzLnJlcGxhY2VzW2ldWzBdLCB0aGlzLnJlcGxhY2VzW2ldWzFdKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5uYW1lICsgJyB3YXMgbG9hZGVkIScpO1xuICAgICAgICByZXR1cm4gY29kZTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTY3JpcHQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHNjcmlwdF8xID0gcmVxdWlyZShcIi4vc2NyaXB0XCIpO1xuY2xhc3MgU2NyaXB0cyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2NyaXB0cyA9IFtdO1xuICAgIH1cbiAgICBhZGQoaW5mbykge1xuICAgICAgICB0aGlzLnNjcmlwdHMucHVzaChuZXcgc2NyaXB0XzEuZGVmYXVsdChpbmZvKSk7XG4gICAgfVxuICAgIGdldChuYW1lKSB7XG4gICAgICAgIGZvciAoY29uc3QgaSBpbiB0aGlzLnNjcmlwdHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcmlwdHNbaV0ubmFtZSA9PT0gbmFtZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zY3JpcHRzW2ldO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU2NyaXB0IGlzIG5vdCBmb3VuZCEnKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgLy8gRnJvbSBzY3JpcHQgYnkgQElydWRpczogRXZhZGVzIEhlbHBlclxuICAgICAgICBsZXQgZWxlbSA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2NyaXB0JykpLmZpbHRlcigoYSkgPT4gYS50eXBlID09PSAnbW9kdWxlJyAmJiBhLnNyYy5tYXRjaCgvXFwvaW5kZXhcXC5bMC05YS1mXXs4fVxcLmpzLykpWzBdO1xuICAgICAgICBpZiAoIWVsZW0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICghbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmNsdWRlcygnRmlyZWZveCcpKVxuICAgICAgICAgICAgZWxlbS5yZW1vdmUoKTtcbiAgICAgICAgbGV0IHNyYyA9IGVsZW0uc3JjO1xuICAgICAgICBsZXQgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5vcGVuKCdHRVQnLCBzcmMsIGZhbHNlKTtcbiAgICAgICAgcmVxLnNlbmQoKTtcbiAgICAgICAgbGV0IGNvZGUgPSByZXEucmVzcG9uc2U7XG4gICAgICAgIGZvciAoY29uc3QgcyBpbiB0aGlzLnNjcmlwdHMpXG4gICAgICAgICAgICBjb2RlID0gdGhpcy5zY3JpcHRzW3NdLnBhdGNoKGNvZGUpO1xuICAgICAgICBsZXQgblNjciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBuU2NyLnNldEF0dHJpYnV0ZSgndHlwZScsICdtb2R1bGUnKTtcbiAgICAgICAgblNjci5pbm5lckhUTUwgPSBjb2RlO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG5TY3IpO1xuICAgICAgICBjb25zb2xlLmxvZygnQWxsIFNjcmlwdHMgd2FzIGxvYWRlZCEnKTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBTY3JpcHRzO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gPT1Vc2VyU2NyaXB0PT1cbi8vIEBuYW1lICAgICAgICAgRXZhZGVzLVNQIERldlxuLy8gQHZlcnNpb24gICAgICBkZXZcbi8vIEBkZXNjcmlwdGlvbiAgRGV2IHZlcnNpb24gb2YgRS1TUCwgbWF5IGNvbnRhaW4gZXJyb3JzXG4vLyBAYXV0aG9yICAgICAgIEBFdGhlckNEXG4vLyBAbWF0Y2ggICAgICAgIGh0dHBzOi8vKi5ldmFkZXMuaW8vKlxuLy8gQGRvd25sb2FkVVJMICBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTcC9tYWluL2J1aWxkL2V2YWRlc3NwLWRldi5qc1xuLy8gQHVwZGF0ZVVSTCAgICBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTcC9tYWluL2J1aWxkL2V2YWRlc3NwLWRldi5qc1xuLy8gQGljb24gICAgICAgICBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vRXRoZXJDRC9FdmFkZXNTUC9tYWluL3JlcG8vZmF2aWNvbi1kZXYuc3ZnXG4vLyBAcnVuLWF0ICAgICAgIGRvY3VtZW50LWlkbGVcbi8vIEBsaWNlbnNlICAgICAgTUlUIExpY2Vuc2Vcbi8vIEBncmFudCAgICAgICAgbm9uZVxuLy8gPT0vVXNlclNjcmlwdD09XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkb21fMSA9IHJlcXVpcmUoXCIuL2RvbVwiKTtcbmNvbnN0IHNjcmlwdHNfMSA9IHJlcXVpcmUoXCIuL3NjcmlwdHNcIik7XG53aW5kb3cuc2NyaXB0cyA9IG5ldyBzY3JpcHRzXzEuZGVmYXVsdCgpO1xuY29uc3QgZG9tID0gbmV3IGRvbV8xLmRlZmF1bHQoKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XG4gICAgaWYgKCEod2luZG93LmxvY2F0aW9uLmhyZWYuc2VhcmNoKC9cXC9wcm9maWxlL2cpIHx8IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnNlYXJjaCgvXFwvYWNjb3VudC9nKSkpXG4gICAgICAgIHdpbmRvdy5zY3JpcHRzLmluaXQoKTtcbiAgICBkb20ucHVzaCgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=