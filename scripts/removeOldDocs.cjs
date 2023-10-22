/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra')
const path = require('path')

const docsDirectory = 'docs/'

async function cleanOldPatchVersions() {
  const { version } = require('../package.json')
  const [major, minor] = version.split('.').slice(0, 2)

  const directories = await fs.readdir(docsDirectory)

  const outdatedDirs = directories.filter((dir) => {
    const [dirMajor, dirMinor, dirPatch] = dir.split('.')
    return dirMajor === major && dirMinor === minor && parseInt(dirPatch, 10) < parseInt(version.split('.')[2], 10)
  })

  for (const dir of outdatedDirs) {
    await fs.remove(path.join(docsDirectory, dir))
    console.log(`Removed outdated version directory: ${dir}`)
  }
}

cleanOldPatchVersions().catch((err) => {
  console.error('Failed to clean old documentation versions:', err)
})
