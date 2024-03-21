// ==UserScript==
// @name         Evades-SP
// @version      exp-5
// @description  Evades Scripts Paradise
// @author       EtherCD
// @match        https://*.evades.io/*
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSp/main/build/evadessp.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSp/main/build/evadessp.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/favicon.svg
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(()=>{"use strict";var e={290:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=class{constructor(e){this.replaces=[],this.vars={},this.name=e.name,this.icon=e.icon??"",this.version=e.version??"none",this.description=e.description??"none",this.enabled=!0}addReplace(e,t){this.replaces.push([e,this.formatReplace(t)])}addReplaces(...e){for(const t in e)this.addReplace(e[t][0],e[t][1])}formatReplace(e){return e.replace(/#\{([^\}]+)\}/g,((e,t)=>`window.scripts.get("${this.name}").getVar("${t}")`))}addVar(e,t){this.vars[e]=t}getVar(e){return this.vars[e]}init(e){for(const t in this.replaces)e=e.replace(this.replaces[t][0],this.replaces[t][1]);return console.log(this.name+" was loaded!"),e}}},272:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(290);t.default=class{constructor(){this.scripts=[]}add(e){this.scripts.push(new r.default(e))}get(e){for(const t in this.scripts)if(this.scripts[t].name===e)return this.scripts[t];throw new Error("Script is not found!")}init(){let e=Array.from(document.querySelectorAll("script")).filter((e=>"module"===e.type&&e.src.match(/\/index\.[0-9a-f]{8}\.js/)))[0];if(!e)return;navigator.userAgent.includes("Firefox")||e.remove();let t=e.src,s=new XMLHttpRequest;s.open("GET",t,!1),s.send();let r=s.response;for(const e in this.scripts)r=this.scripts[e].init(r);let i=document.createElement("script");i.setAttribute("type","module"),i.innerHTML=r,document.body.appendChild(i),console.log("All Scripts was loaded!")}}}},t={};function s(r){var i=t[r];if(void 0!==i)return i.exports;var n=t[r]={exports:{}};return e[r](n,n.exports,s),n.exports}(()=>{const e=s(272);window.scripts=new e.default,document.addEventListener("readystatechange",(()=>{window.scripts.init()}))})()})();