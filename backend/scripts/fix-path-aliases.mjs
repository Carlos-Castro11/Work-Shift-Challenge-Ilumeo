import fs from 'fs'
import path from 'path'

const distDir = path.resolve('dist')

const replaceAlias = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      replaceAlias(fullPath)
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf8')

      content = content.replace(/require\(["']@\/(.*?)["']\)/g, (match, p1) => {
        const importPath = path.relative(path.dirname(fullPath), path.join(distDir, p1))
        const normalized = importPath.startsWith('.') ? importPath : `./${importPath}`
        return `require('${normalized.replace(/\\/g, '/')}')`
      })

      content = content.replace(/from ['"]@\/(.*?)['"]/g, (match, p1) => {
        const importPath = path.relative(path.dirname(fullPath), path.join(distDir, p1))
        const normalized = importPath.startsWith('.') ? importPath : `./${importPath}`
        return `from '${normalized.replace(/\\/g, '/')}'`
      })

      fs.writeFileSync(fullPath, content)
    }
  }
}

replaceAlias(distDir)
