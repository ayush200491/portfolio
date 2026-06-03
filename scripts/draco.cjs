const fs = require('fs');
const path = require('path');

const src = 'node_modules/three/examples/jsm/libs/draco/gltf';
const output = 'public/draco';

fs.mkdirSync(output, { recursive: true });

const files = ['draco_decoder.wasm', 'draco_wasm_wrapper.js'];

for (const file of files) {
  const sourcePath = path.join(src, file);
  const destinationPath = path.join(output, file);

  try {
    fs.copyFileSync(sourcePath, destinationPath);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

