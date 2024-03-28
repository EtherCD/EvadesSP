// ==UserScript==
// @name         EvadesME
// @version      r3b2
// @description  Evades More Experience
// @author       @EtherCD
// @match        https://*.evades.io/*
// @downloadURL  https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/examples/evadesme.js
// @updateURL    https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/examples/evadesme.js
// @icon         https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/empty-script.svg
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  if (!window.scripts) return;

  const script = window.scripts.create({
    name: 'EvadesME',
    version: 'r3b1',
    description: 'Adds background fill to the region style',
    icon: 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/empty-script.svg',
  });

  const worlds = {
    'Central Core': ['#425a6d', 0.1],
    'Catastrophic Core': ['#B00B1E', 0.1, () => Math.abs(Math.sin(Date.now() / 1000) * 0.15)],
    'Haunted Halls': ['#664B00', 0.1],
    'Peculiar Pyramid': ['#666600', 0.1],
    'Wacky Wonderland': ['#870080', 0.1],
    'Glacial Gorge': ['#005668', 0.1],
    'Vicious Valley': ['#4d6b40', 0.1],
    'Humongous Hollow': ['#663900', 0.1],
    'Elite Expanse': ['#2a3b4f', 0.1],
    'Endless Echo': ['#4168c4', 0.1],
    'Dangerous District': ['#680000', 0.1],
    'Quiet Quarry': ['#425a6d', 0.1],
    'Monumental Migration': ['#470066', 0.1],
    'Ominous Occult': ['#63838e', 0.1],
    'Frozen Fjord': ['#27494f', 0.1],
    'Restless Ridge': ['#a88b64', 0.1],
    'Toxic Territory': ['#5c5c5c', 0.1],
    'Magnetic Monopole': ['#bf00ff', 0.1],
    'Burning Bunker': ['#cc0000', 0.1],
    'Grand Garden': ['#6a9c49', 0.1],
    'Mysterious Mansion': ['#9c0ec7', 0.1],
    'Cyber Castle': ['#21bad9', 0.1],
    'Shifting Sands': ['#c88241', 0.1],
    'Infinite Inferno': ['#9b0606', 0.1],
    'Coupled Corridors': ['#bcad59', 0.1],
    'Withering Wasteland': ['#c45945', 0.1],
    'Dusty Depths': ['#825B37', 0.1],
  };

  script.addVar('worlds', worlds);
  script.addVar('keys', Object.keys(worlds));
  script.addReplaces([
    /prepareCanvas\(\w\)\{[\w\d\$="'.,;#?:\s\(\)]+\}/,
    `prepareCanvas(e) {
      this.chat.style.visibility = 'visible';
      this.leaderboard.style.visibility = 'visible';
      this.context.fillStyle = '#333';
      this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
      if (#{keys}.includes(e.area.regionName)) {
        this.context.fillStyle = #{worlds}[e.area.regionName][0];
        this.context.globalAlpha = #{worlds}[e.area.regionName][2]
          ? #{worlds}[e.area.regionName][2]()
          : #{worlds}[e.area.regionName][1];
        this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.globalAlpha = 1;
      }
      this.camera.centerOn(e.self.entity);
    }`,
  ]);
})();
