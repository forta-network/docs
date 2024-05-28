const fs = require('fs')
const path = require('path')
const yaml = require('yamljs')
const { globSync } = require('glob')

function exploreMarkdownFilesFromConfig (nav, markdownList, mediaList, visited) {
  if (Array.isArray(nav)) {
    nav.forEach(item => exploreMarkdownFilesFromConfig(item, markdownList, mediaList, visited))
  } else if (typeof nav === 'object') {
    Object.values(nav).forEach(value => {
      if (typeof value === 'string') {
        processFile(path.join(docsDir, value), markdownList, mediaList, visited)
      } else {
        exploreMarkdownFilesFromConfig(value, markdownList, mediaList, visited)
      }
    })
  }
}

function exploreFilesFromFile (filePath, markdownLinks, mediaLinks, visited) {
  let absolutePath = path.resolve(filePath)

  if (visited.has(absolutePath)) {
    return
  }

  visited.add(absolutePath)

  if (absolutePath.includes('https:') || absolutePath.includes('http:')) {
    return
  }

  let content
  try {
    content = fs.readFileSync(absolutePath, 'utf8')
  } catch (error) {
    console.error(`Error reading file ${absolutePath}: ${error}`)
    return
  }

  const markdownLinkRegex = /\[.*?\]\((\S+\.[a-zA-Z-]+)(?:#[a-zA-Z-\d]+)?(?:\s+".+")?\s*\)/gi
  const linkRegex = /docs\.forta\.network\/en\/latest\/([a-zA-Z-/\d\.]+)(?:#[a-zA-Z-\d]+)?/gi
  const imgTagRegex = /<img.*\s+src="(.*?)"/gi
  const videoTagRegex = /<video.*\s+src="(.*?)"/gi

  let match
  // Process markdown links
  while ((match = markdownLinkRegex.exec(content)) !== null) {
    processMarkdownLink(match[1], absolutePath, markdownLinks, mediaLinks, visited)
  }

  // Process site links
  while ((match = linkRegex.exec(content)) !== null) {
    processSiteLink(match[1], markdownLinks, mediaLinks, visited)
  }

  // folder/page-name.md -> folder/page-name/
  const pagePath = getPagePath(absolutePath)

  // Process HTML img tags
  while ((match = imgTagRegex.exec(content)) !== null) {
    processMediaLink(match[1], pagePath, markdownLinks, mediaLinks, visited)
  }

  // Process HTML video tags
  while ((match = videoTagRegex.exec(content)) !== null) {
    processMediaLink(match[1], pagePath, markdownLinks, mediaLinks, visited)
  }
}

// path/docs/readme-file.md => path/docs/readme-file/
function getPagePath (absolutePath) {
  const parsedPath = path.parse(absolutePath)

  const folderPath = parsedPath.dir
  const fileName = parsedPath.name // no ext
  const pagePath = folderPath + '/' + fileName + '/'

  return pagePath
}

function processFile (fullPath, markdownLinks, mediaLinks, visited) {
  const fullPathLowerCase = fullPath.toLowerCase()

  if (fullPathLowerCase.endsWith('.md')) {
    markdownLinks.add(fullPath)
    exploreFilesFromFile(fullPath, markdownLinks, mediaLinks, visited)
  } else if (/\.(png|jpg|jpeg|gif|bmp|svg|mp4|avi|mov|webm|pdf|csv)$/i.test(fullPathLowerCase)) {
    mediaLinks.add(fullPath)
  }
}

function processSiteLink (linkPath, markdownLinks, mediaLinks, visited) {
  if(!(/\S+\.\S+/.test(linkPath))) {
    linkPath = linkPath.replace(/\/$/, "") + '.md';
  }

  let absolutePath = path.resolve(docsDir, linkPath)

  processFile(absolutePath, markdownLinks, mediaLinks, visited)
}

function processMarkdownLink (link, currentPath, markdownLinks, mediaLinks, visited) {
  const fullPath = path.resolve(path.dirname(currentPath), link)
  processFile(fullPath, markdownLinks, mediaLinks, visited)
}

function processMediaLink (link, currentPath, markdownLinks, mediaLinks, visited) {
  const fullPath = path.resolve(currentPath, link)
  processFile(fullPath, markdownLinks, mediaLinks, visited)
}

// Here we start execution
// ------------

const SHOULD_REMOVE = false;
const SHOULD_LOG = true;

const EXCLUDE_FOLDERS = ['forta-api-reference', 'stylesheets', 'contracts'];
const INCLUDE_DOC_FILES = ['scam-detector-bot.md', 'attack-detector-bot.md'];

// Load and parse the mkdocs config
const docsDir = path.resolve(__dirname, '../docs')

const mkdocsConfig = yaml.load('mkdocs.yml')

const usedMarkdownFileSet = new Set()
const usedMediaFileSet = new Set()
const visitedFileSet = new Set()

for(const docFile of INCLUDE_DOC_FILES) {
  processFile(path.resolve(docsDir, docFile), usedMarkdownFileSet, usedMediaFileSet, visitedFileSet)
}

// Parse mkdocs config
exploreMarkdownFilesFromConfig(mkdocsConfig.nav, usedMarkdownFileSet, usedMediaFileSet, visitedFileSet)
exploreMarkdownFilesFromConfig(mkdocsConfig.theme, usedMarkdownFileSet, usedMediaFileSet, visitedFileSet)
// Parse meta tags
exploreFilesFromFile(path.resolve(docsDir, '../overrides', 'main.html'), usedMarkdownFileSet, usedMediaFileSet, visitedFileSet)

// Recursively find all related files referenced within each file
for (const filePath of [...usedMarkdownFileSet]) {
  exploreFilesFromFile(filePath, usedMarkdownFileSet, usedMediaFileSet, visitedFileSet)
}

const allMarkdownFiles = globSync(`${docsDir}/**/*.md`, { ignore: 'node_modules/**', absolute: true })
const allMediaFiles = globSync(`${docsDir}/**/*.{png,jpg,jpeg,gif,bmp,svg,mp4,avi,mov,webm,pdf,csv}`, {
  ignore: 'node_modules/**',
  absolute: true
})

const canBeRemovedMarkdownFiles = new Set(allMarkdownFiles.filter(file => !usedMarkdownFileSet.has(file) && !file.includes('index.md')))
const canBeRemovedMediaFiles = new Set(allMediaFiles.filter(file => !usedMediaFileSet.has(file)))

for(const folder of EXCLUDE_FOLDERS) {
  const folderPath = path.resolve(docsDir, folder)

  for(const filePath of canBeRemovedMarkdownFiles) {
    if(filePath.includes(folderPath)) {
      canBeRemovedMarkdownFiles.delete(filePath)
    }
  }

  for(const filePath of canBeRemovedMediaFiles) {
    if(filePath.includes(folderPath)) {
      canBeRemovedMediaFiles.delete(filePath)
    }
  }
}

console.log()
console.log('-----------------------------')
console.log(`Used markdown files: ${usedMarkdownFileSet.size}`)
console.log(`Unused markdown files: ${canBeRemovedMarkdownFiles.size}`)
console.log(`Used media files: ${usedMediaFileSet.size}`)
console.log(`Unused media files: ${canBeRemovedMediaFiles.size}`)
console.log('-----------------------------')
console.log()

if(SHOULD_LOG) {
  for (const file of usedMarkdownFileSet) {
    console.log(`[IN USE]: ${file}`)
  }

  console.log('--------------------')

  for (const file of canBeRemovedMarkdownFiles) {
    console.log(`[REMOVE]: ${file}`)
  }

  console.log('--------------------')

  for (const file of usedMediaFileSet) {
    console.log(`[IN USE]: ${file}`)
  }

  console.log('--------------------')

  for (const file of canBeRemovedMediaFiles) {
    console.log(`[REMOVE]: ${file}`)
  }
}

if(SHOULD_REMOVE) {
  for (const file of canBeRemovedMarkdownFiles) {
    fs.unlinkSync(file);
  }
  for (const file of canBeRemovedMediaFiles) {
    fs.unlinkSync(file);
  }
}
