/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs-extra')
const path = require('path')

/**
 * Retrieves the current version from the package.json.
 * @param {string} directoryPath - The path to the directory containing package.json.
 * @returns {Array<number>} - An array containing the major, minor, and patch version numbers.
 * @example
 * getCurrentVersion('./') // might return [1, 2, 3] for version "1.2.3"
 */
async function getCurrentVersion(directoryPath) {
  const { version } = require(path.join(directoryPath, 'package.json'))
  return version.split('.').map(Number)
}

/**
 * Lists all directories in the given path.
 * @param {string} directoryPath - The path to list directories from.
 * @returns {Array<string>} - An array of directory names.
 * @example
 * getDirectories('./docs/') // might return ['0.2.1', '0.2.2', '0.2.3']
 */
async function getDirectories(directoryPath) {
  return await fs.readdir(directoryPath)
}

/**
 * Identifies outdated directories based on current version and whether to consider minor versions.
 * @param {Array<string>} directories - A list of directory names.
 * @param {Array<number>} currentVersion - The current version as [major, minor, patch].
 * @param {boolean} cleanMinor - Whether to consider cleaning minor versions.
 * @returns {Array<string>} - A list of outdated directories.
 * @example
 * getOutdatedDirectories(['0.2.1', '0.2.2', '0.3.0'], [0, 2, 3], false) // returns ['0.2.1', '0.2.2']
 */
function getOutdatedDirectories(directories, currentVersion, cleanMinor) {
  const [major, minor] = currentVersion

  return directories.filter((dir) => {
    const [dirMajor, dirMinor, dirPatch] = dir.split('.').map(Number)

    if (cleanMinor) {
      return dirMajor === major && (dirMinor < minor || (dirMinor === minor && dirPatch < currentVersion[2]))
    }

    return dirMajor === major && dirMinor === minor && dirPatch < currentVersion[2]
  })
}

/**
 * Removes specified directories from the given path.
 * @param {string} directoryPath - Base path of the directories.
 * @param {Array<string>} dirsToRemove - List of directories to be removed.
 * @example
 * removeDirectories('./docs/', ['0.2.1', '0.2.2']) // removes directories './docs/0.2.1/' and './docs/0.2.2/'
 */
async function removeDirectories(directoryPath, dirsToRemove) {
  for (const dir of dirsToRemove) {
    await fs.remove(path.join(directoryPath, dir))
    console.log(`Removed outdated version directory: ${dir}`)
  }
}

/**
 * Main function to manage the cleaning process based on command line arguments.
 * @example
 * node scriptName.js --clean-minor // cleans outdated patch and minor versions under default 'docs/' directory
 * node scriptName.js ./customPath/ --clean-minor // cleans outdated patch and minor versions under specified directory
 */
async function main() {
  const args = process.argv.slice(2)
  const directoryPath = args.find((arg) => !arg.startsWith('--')) || 'docs/'
  const cleanMinor = args.includes('--clean-minor')

  const currentVersion = await getCurrentVersion(directoryPath)
  const directories = await getDirectories(directoryPath)
  const outdatedDirs = getOutdatedDirectories(directories, currentVersion, cleanMinor)

  await removeDirectories(directoryPath, outdatedDirs)
}

main().catch((err) => {
  console.error('Failed to clean old documentation versions:', err)
})
