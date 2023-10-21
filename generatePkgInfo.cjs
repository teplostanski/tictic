/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const packageJson = require('./package.json')
const version = packageJson.version
const description = packageJson.description
const funding = packageJson.funding

const envContent = `VERSION=${version}\nDESCRIPTION=${description}\nFUNDING=${funding}\n`
fs.writeFileSync('./.env', envContent)
