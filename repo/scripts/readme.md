# Here examples of usage and scripts already ported to ESP

All interaction occurs through the window object

Example Script:

```js
// ==UserScript==
// @name         Example
// @version      -
// @description  Example Script
// @author       You
// @match        https://*.evades.io/*
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/icons/empty-script.svg
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(() => {
  if (!window.scripts) {
    console.log('Example is not working without EvadesSP');
    return;
  }

  const script = window.scripts.create({
    name: 'ExampleScript',
    version: 'your, version',
    description: 'Example Script',
    icon: 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/icons/empty-script.svg',
  });
})();
```

# Methods and objects:

> window.scripts
>
> > add({name, version? description?, icons?}) - Adds a script to the list (as long as the list is not used...)
>
> > create({name, version? description?, icons?}) - Adds and returns a script class
>
> > get(name) - Returns the script class, or nothing

> window.sdom - Scripts Dom
>
> > addObserverSubscriber(callback) - Automatically, after changing the state of the observer, calls a callback, passing a new state to it
> > [example of usage](#using-observer)
>
> > addHtmlElement(...elements: Array<HTMLElement\>) - Adds elements to the list, after the script patch, already adds to document
>
> > addStyle(...styles: Array<string\>) - Adds styles to the list, and after patching the script, adds them to document as one element

> class Script
>
> > addReplace(a: Regexp | string, b: string) - Adds code replacement to the queue
>
> > addReplaces(...replaces: Array<[a: Regexp | string, b: string]>) - Adds code replacement to the queue
>
> > addVar(key: string, value: any) - Adds a var to list, [example of usage](#using-vars)
>
> > getVar(key: string) - Returns value of var, or nothing

## Using Vars:

```js
script.addVar('name', 'My Name');
script.addReplace(/\'name\'/g, '#{name}'); // Automatically replace with an entry that will receive the current value of the variable
// Or just replace to `window.scripts.get('ScriptName').getVar('name')`
```

## Using Observer:

> state
>
> > currentPage = 'menu' | 'server-list' | 'hero-select' | 'game' | 'game-end'

For example, you need to track the moment of hitting the page (since the game is adding elements in real time, this will be difficult).

Solution with observer:

```js
window.sdom.addObserverSubscriber((state) => {
  if (state.currentPage === 'game') {
    // Do something
  }
});
```
