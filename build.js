const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const platform = process.argv[3] || '';
const buildType = process.argv[2] || '';

const buildScript = `npm run build:${buildType}`;

const loader = (text) => {
  process.stdout.write(text);
  return () => process.stdout.write('... Done!\n');
};

try {
  const finishLoading = loader('🚀 Step 1/2: Preparing for the Build');
  execSync(buildScript);
  finishLoading();

  let electronBuilderCommand = platform === 'mac' ? 'electron-builder -m' : 'electron-builder -w';
  electronBuilderCommand = electronBuilderCommand + ' -c.extraMetadata.main=build/electron.js';

  const finishBuild = loader(`🔌 Step 2/2: Setting up Electron Build for ${platform} platform`);
  execSync(electronBuilderCommand);
  finishBuild();
} catch (error) {
  console.error(`😢 Oops, something went wrong: ${error}`);
  process.exit(1);
}