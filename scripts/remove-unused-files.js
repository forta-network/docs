const { globSync } = require('glob')
const yaml = require('yamljs')
const fs = require('fs')
const path = require('path')

// Load and parse the mkdocs config
const mkdocsConfig = yaml.load('mkdocs.yml')
const docsDir = '../docs'

function extractFilePaths(nav, fileList) {
  if (Array.isArray(nav)) {
    nav.forEach(item => extractFilePaths(item, fileList));
  } else if (typeof nav === 'object') {
    Object.values(nav).forEach(value => {
      if (typeof value === 'string') {
        // Check if it's a local file (not a URL)
        if (value.endsWith('.md') || value.endsWith('.html')) {
          const fullPath = path.join(docsDir, value);
          fileList.add(fullPath);
        }
      } else {
        extractFilePaths(value, fileList);
      }
    });
  }
}

const mkdocsFiles = new Set()
extractFilePaths(mkdocsConfig.nav, mkdocsFiles)

// List of markdown files from mkdocs.yml
for (const page of mkdocsConfig.nav) {
  if (typeof page === 'string') {
    mkdocsFiles.add(page)
  } else if (typeof page === 'object') {
    Object.values(page).forEach((file) => {
      if (typeof file === 'string') {
        mkdocsFiles.add(file)
      }
    })
  }
}

console.log(`Markdown files: ${mkdocsFiles.size}`)
for (const file of mkdocsFiles) {
  console.log('- ' + file)
}

// Find all .md files in the project
const allMarkdownFiles = globSync(`${docsDir}/**/*.md`)
const notUsedMarkdownFiles = allMarkdownFiles.filter((file) => {
  const relativeFile = path.relative(docsDir, file)
  return !mkdocsFiles.has(relativeFile)
})

console.log(`-----------`)

console.log('Removing unused markdown files...')
for (const file of notUsedMarkdownFiles) {
  console.log('- ' + file)
  fs.unlinkSync(file)
}

// Find and remove unused media files
const mediaExtensions = ['png', 'jpg', 'jpeg', 'gif', 'svg', 'mp4', 'avi', 'pdf', 'csv']
const mediaFiles = globSync(`${docsDir}/**/*.{${mediaExtensions.join(',')}}`)

console.log(`-----------`)
console.log(`Media files: ${mediaFiles.length}`)
console.log('Removing unused media files...')
for (const mediaFile of mediaFiles) {
  const isUsed = [...mkdocsFiles].some(file => {
    const content = fs.readFileSync(file, 'utf-8')
    return content.includes(path.basename(mediaFile))
  })

  if (!isUsed) {
    console.log('- ' + mediaFile)
    fs.unlinkSync(mediaFile)
  }
}
