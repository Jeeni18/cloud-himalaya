import type { CollectionBeforeChangeHook } from 'payload'

const WORDS_PER_MINUTE = 200

type LexicalNode = {
  type?: string
  text?: string
  children?: LexicalNode[]
}

function extractText(node: LexicalNode): string {
  if (typeof node.text === 'string') return node.text
  if (!node.children) return ''
  return node.children.map(extractText).join(' ')
}

function countWords(root: unknown): number {
  if (!root || typeof root !== 'object') return 0
  const text = extractText((root as { root?: LexicalNode }).root ?? {})
  const words = text.trim().split(/\s+/).filter(Boolean)
  return words.length
}

// Posts' readingTime is optional -- if an editor leaves it blank, this
// fills it in from the rich text word count (at a standard 200wpm
// reading speed) rather than showing nothing.
export const computeReadingTime: CollectionBeforeChangeHook = ({ data }) => {
  if (data && (data.readingTime === undefined || data.readingTime === null) && data.content) {
    const words = countWords(data.content)
    data.readingTime = Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))
  }
  return data
}
