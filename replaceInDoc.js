#!/usr/bin/env node
import dotenv from 'dotenv'
import { replaceInFiles } from 'nreplacer'

dotenv.config()

await replaceInFiles(`./docs/${process.env.VERSION}/index.md`, '- `T`', '- `Type`', true)
await replaceInFiles(`./docs/${process.env.VERSION}/index.md`, '- `F`', '- `Func`', true)
await replaceInFiles('./README.md', /Docs (\d+\.\d+\.\d+)/, `Docs ${process.env.VERSION}`, true)
await replaceInFiles('./README.md', /docs\/\d+\.\d+\.\d+/, `docs/${process.env.VERSION}`, true)
