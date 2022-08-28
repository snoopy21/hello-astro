import lunr from 'lunr'

const postImportResult = import.meta.glob('./blog/*.{md,mdx}', { eager: true })
const posts = Object.values(postImportResult).filter(post => !post.frontmatter.draft)
const documents = posts.map(post => ({
  url: post.url,
  title: post.frontmatter.title,
  description: post.frontmatter.description,
  author: post.frontmatter.author,
  content: post.rawContent(),
}))

const idx = lunr(function () {
  this.ref('url')
  this.field('title')
  this.field('description')
  this.field('author')
  this.field('content')

  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
})

export async function get() {
    const body = JSON.stringify(idx)
    return {
      body
    }
  }