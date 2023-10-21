/* eslint-disable @typescript-eslint/no-var-requires */
const pkg = require('./package.json')

/** @type {import('typedoc').TypeDocOptions} */
module.exports = {
  entryPoints: ['./src/lib/*.ts', './src/types/*'],
  out: `docs/${pkg.version}`,
  plugin: ['@terwer/typedoc-plugin-markdown', 'typedoc-plugin-merge-modules', 'typedoc-plugin-replace-text'],
  mergeModulesRenameDefaults: true, // NEW option of TypeDoc added by this plugin
  mergeModulesMergeMode: 'project',
  outputFileStrategy: 'members',
  hidePageHeader: 'true',
  hideInPageTOC: 'true',
  propertiesFormat: 'list',
  enumMembersFormat: 'list',
  typeDeclarationFormat: 'list',
  replaceText: {
    inCodeCommentText: true,
    inCodeCommentTags: true,
    inIncludedFiles: true,
    replacements: [
      {
        pattern: '`T`',
        flags: 'gi',
        replace: '`TYPE`',
      },
    ],
  },
}
