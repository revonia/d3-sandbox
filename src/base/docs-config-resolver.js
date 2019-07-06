const yaml = require('js-yaml')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

function readReadmeFrontMatter (dir) {
  const file = path.normalize(process.cwd() + dir + '/README.md')
  if (!fs.existsSync(file)) {
    return false
  }

  return matter(fs.readFileSync(file, 'utf-8')).data
}

const DocCategoryYamlType = new yaml.Type('!doc-category', {
  kind: 'mapping',
  construct: option => {
    const meta = readReadmeFrontMatter(option.dir)

    if (!meta) {
      return {}
    }

    let children = ['']
    if (Array.isArray(meta.docCategory)) {
      children.push.apply(children, meta.docCategory.map(d => d.link))
    }

    return {
      title: meta.docTitle,
      children,
      ...option
    }
  }
})

const DocNavItemYamlType = new yaml.Type('!doc-nav-item', {
  kind: 'mapping',
  construct: option => {
    const meta = readReadmeFrontMatter(option.dir)

    if (!meta) {
      return null
    }

    return {
      text: meta.docTitle,
      ...option
    }
  }
})

const schema = yaml.Schema.create([
  DocCategoryYamlType,
  DocNavItemYamlType
])

function resolver (file) {
  return yaml.load(
    fs.readFileSync(path.normalize(file)),
    { schema }
  )
}

module.exports = resolver
