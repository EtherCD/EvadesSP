/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    init(code) {
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
            code = this.scripts[s].init(code);
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
// @grant        none
// ==/UserScript==
Object.defineProperty(exports, "__esModule", ({ value: true }));
const scripts_1 = __webpack_require__(/*! ./scripts */ "./src/scripts.ts");
window.scripts = new scripts_1.default();
document.addEventListener('readystatechange', () => {
    window.scripts.init();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhZGVzc3AtZGV2LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsS0FBSyxLQUFLLHFDQUFxQyxVQUFVLGFBQWEsRUFBRTtBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7Ozs7O0FDbkNGO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELGlCQUFpQixtQkFBTyxDQUFDLHVDQUFVO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUlBQXVJLEVBQUU7QUFDekk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWU7Ozs7Ozs7VUN0Q2Y7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7OztBQ3RCYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxrQkFBa0IsbUJBQU8sQ0FBQyxtQ0FBVztBQUNyQztBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvc2NyaXB0L2luZGV4LnRzIiwid2VicGFjazovL3NjcmlwdHMtd2l0aC10eXBlc2NyaXB0Ly4vc3JjL3NjcmlwdHMudHMiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc2NyaXB0cy13aXRoLXR5cGVzY3JpcHQvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jbGFzcyBTY3JpcHQge1xuICAgIGNvbnN0cnVjdG9yKGluZm8pIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlcyA9IFtdO1xuICAgICAgICB0aGlzLnZhcnMgPSB7fTtcbiAgICAgICAgdGhpcy5uYW1lID0gaW5mby5uYW1lO1xuICAgICAgICB0aGlzLmljb24gPSBpbmZvLmljb24gPz8gJyc7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IGluZm8udmVyc2lvbiA/PyAnbm9uZSc7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBpbmZvLmRlc2NyaXB0aW9uID8/ICdub25lJztcbiAgICAgICAgdGhpcy5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgYWRkUmVwbGFjZShhLCBiKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZXMucHVzaChbYSwgdGhpcy5mb3JtYXRSZXBsYWNlKGIpXSk7XG4gICAgfVxuICAgIGFkZFJlcGxhY2VzKC4uLnJlcGxhY2VzKSB7XG4gICAgICAgIGZvciAoY29uc3QgYSBpbiByZXBsYWNlcylcbiAgICAgICAgICAgIHRoaXMuYWRkUmVwbGFjZShyZXBsYWNlc1thXVswXSwgcmVwbGFjZXNbYV1bMV0pO1xuICAgIH1cbiAgICBmb3JtYXRSZXBsYWNlKHYpIHtcbiAgICAgICAgcmV0dXJuIHYucmVwbGFjZSgvI1xceyhbXlxcfV0rKVxcfS9nLCAoXywgbSkgPT4gYHdpbmRvdy5zY3JpcHRzLmdldChcIiR7dGhpcy5uYW1lfVwiKS5nZXRWYXIoXCIke219XCIpYCk7XG4gICAgfVxuICAgIGFkZFZhcihrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFyc1trZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGdldFZhcihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFyc1trZXldO1xuICAgIH1cbiAgICBpbml0KGNvZGUpIHtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMucmVwbGFjZXMpXG4gICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHRoaXMucmVwbGFjZXNbaV1bMF0sIHRoaXMucmVwbGFjZXNbaV1bMV0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm5hbWUgKyAnIHdhcyBsb2FkZWQhJyk7XG4gICAgICAgIHJldHVybiBjb2RlO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFNjcmlwdDtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2NyaXB0XzEgPSByZXF1aXJlKFwiLi9zY3JpcHRcIik7XG5jbGFzcyBTY3JpcHRzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5zY3JpcHRzID0gW107XG4gICAgfVxuICAgIGFkZChpbmZvKSB7XG4gICAgICAgIHRoaXMuc2NyaXB0cy5wdXNoKG5ldyBzY3JpcHRfMS5kZWZhdWx0KGluZm8pKTtcbiAgICB9XG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgZm9yIChjb25zdCBpIGluIHRoaXMuc2NyaXB0cykge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NyaXB0c1tpXS5uYW1lID09PSBuYW1lKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNjcmlwdHNbaV07XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTY3JpcHQgaXMgbm90IGZvdW5kIScpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICAvLyBGcm9tIHNjcmlwdCBieSBASXJ1ZGlzOiBFdmFkZXMgSGVscGVyXG4gICAgICAgIGxldCBlbGVtID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdzY3JpcHQnKSkuZmlsdGVyKChhKSA9PiBhLnR5cGUgPT09ICdtb2R1bGUnICYmIGEuc3JjLm1hdGNoKC9cXC9pbmRleFxcLlswLTlhLWZdezh9XFwuanMvKSlbMF07XG4gICAgICAgIGlmICghZWxlbSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKCFuYXZpZ2F0b3IudXNlckFnZW50LmluY2x1ZGVzKCdGaXJlZm94JykpXG4gICAgICAgICAgICBlbGVtLnJlbW92ZSgpO1xuICAgICAgICBsZXQgc3JjID0gZWxlbS5zcmM7XG4gICAgICAgIGxldCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgcmVxLm9wZW4oJ0dFVCcsIHNyYywgZmFsc2UpO1xuICAgICAgICByZXEuc2VuZCgpO1xuICAgICAgICBsZXQgY29kZSA9IHJlcS5yZXNwb25zZTtcbiAgICAgICAgZm9yIChjb25zdCBzIGluIHRoaXMuc2NyaXB0cylcbiAgICAgICAgICAgIGNvZGUgPSB0aGlzLnNjcmlwdHNbc10uaW5pdChjb2RlKTtcbiAgICAgICAgbGV0IG5TY3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgblNjci5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnbW9kdWxlJyk7XG4gICAgICAgIG5TY3IuaW5uZXJIVE1MID0gY29kZTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChuU2NyKTtcbiAgICAgICAgY29uc29sZS5sb2coJ0FsbCBTY3JpcHRzIHdhcyBsb2FkZWQhJyk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gU2NyaXB0cztcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vID09VXNlclNjcmlwdD09XG4vLyBAbmFtZSAgICAgICAgIEV2YWRlcy1TUCBEZXZcbi8vIEB2ZXJzaW9uICAgICAgZGV2XG4vLyBAZGVzY3JpcHRpb24gIERldiB2ZXJzaW9uIG9mIEUtU1AsIG1heSBjb250YWluIGVycm9yc1xuLy8gQGF1dGhvciAgICAgICBARXRoZXJDRFxuLy8gQG1hdGNoICAgICAgICBodHRwczovLyouZXZhZGVzLmlvLypcbi8vIEBkb3dubG9hZFVSTCAgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0V0aGVyQ0QvRXZhZGVzU3AvbWFpbi9idWlsZC9ldmFkZXNzcC1kZXYuanNcbi8vIEB1cGRhdGVVUkwgICAgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0V0aGVyQ0QvRXZhZGVzU3AvbWFpbi9idWlsZC9ldmFkZXNzcC1kZXYuanNcbi8vIEBpY29uICAgICAgICAgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0V0aGVyQ0QvRXZhZGVzU1AvbWFpbi9yZXBvL2Zhdmljb24tZGV2LnN2Z1xuLy8gQHJ1bi1hdCAgICAgICBkb2N1bWVudC1pZGxlXG4vLyBAZ3JhbnQgICAgICAgIG5vbmVcbi8vID09L1VzZXJTY3JpcHQ9PVxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgc2NyaXB0c18xID0gcmVxdWlyZShcIi4vc2NyaXB0c1wiKTtcbndpbmRvdy5zY3JpcHRzID0gbmV3IHNjcmlwdHNfMS5kZWZhdWx0KCk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKCkgPT4ge1xuICAgIHdpbmRvdy5zY3JpcHRzLmluaXQoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9