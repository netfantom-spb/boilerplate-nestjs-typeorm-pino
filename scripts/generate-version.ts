/**
 * @package boilerplate-nestjs-typeorm-pino
 * @summary Generates version.json file
 * @version 1.6
 * @description Generates version.json file during build 
 */

import { version, name } from '../package.json'
import * as fs from 'fs'
import * as path from 'path'

const versionFilePath = path.join(__dirname, '../src/version.ts'),
    buildDate = new Date().toISOString(),
    gitCommitHash = null;
//  gitCommitHash = require('child_process')
//   .execSync('git rev-parse HEAD')
//   .toString().trim()
const versionFileContent =
    `export const APP_NAME = '${name}',
APP_VERSION = '${version}',
APP_BUILD_DATE = '${buildDate}',
APP_COMMIT_HASH = '${gitCommitHash || ''}';
`;

fs.writeFileSync(versionFilePath, versionFileContent);

console.log(`Version file generated at ${versionFilePath}`);