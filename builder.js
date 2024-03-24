const { exec } = require('child_process');
const fs = require('fs');

const version = 'beta-1.1';

function runWebpack() {
  return new Promise((resolve, reject) => {
    exec('webpack --env mode=production', (error, stdout, stderr) => {
      if (error) {
        console.error(`Error of starting Webpack: ${error.message}`);
        reject(error);
      }
      if (stderr) {
        console.error(`Error of starting Webpack: ${stderr}`);
        reject(stderr);
      }
      console.log(stdout);
      resolve();
    });
  });
}

function patchFile(filePath, comments) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error of read file: ${err}`);
        reject(err);
      }

      let commentsBlock = '// ==UserScript==\n';
      for (const comment in comments) {
        commentsBlock += `// @${comments[comment][0]}`;
        for (let i = comments[comment][0].length - 13; i < 0; i++) commentsBlock += ` `;
        commentsBlock += `${comments[comment][1]}\n`;
      }
      commentsBlock += `// ==/UserScript==\n`;

      const patchedContent = `${commentsBlock}\n${data}`;

      fs.writeFile(filePath, patchedContent, 'utf8', (err) => {
        if (err) {
          console.error(`Error of write to file: ${err}`);
          reject(err);
        }
        resolve();
      });
    });
  });
}

async function build() {
  try {
    console.log('Starting building project...');
    await runWebpack();
    console.log('Project was builded');

    console.log('Patching builded script...');
    await patchFile('./build/evadessp.js', [
      ['name', 'Evades-SP'],
      ['version', version],
      ['description', 'Evades Scripts Paradise, common script that links other scripts'],
      ['author', '@EtherCD, styles by @duesti.'],
      ['match', 'https://*.evades.io/*'],
      ['downloadURL', 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp.js'],
      ['updateURL', 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/build/evadessp.js'],
      ['icon', 'https://raw.githubusercontent.com/EtherCD/EvadesSP/main/repo/favicon.svg'],
      ['license', 'MIT License'],
      ['run-at', 'document-idle'],
      ['grant', 'none'],
    ]);
    console.log('Script was patched');

    console.log('Building was ended');
  } catch (error) {
    console.error('Error: ', error);
  }
}

build();
