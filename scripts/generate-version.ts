/**
 * Generate 
 */
import { version } from '../package.json'
import * as fs from 'fs'
import * as path from 'path'

const versionFilePath = path.join(__dirname, '../src/version.ts'),
    buildDate = new Date().toISOString(),
    gitCommitHash = null;
//  gitCommitHash = require('child_process')
//   .execSync('git rev-parse HEAD')
//   .toString().trim()

const versionFileContent =
    `export const APP_VERSION = '${version}';\n
export const BUILD_DATE = '${buildDate}';\n
export const COMMIT_HASH = '${gitCommitHash || '' }';\n
`;

fs.writeFileSync(versionFilePath, versionFileContent);

console.log(`Version file generated at ${versionFilePath}`);