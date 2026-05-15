import type { CodeLevelType, Dictionary } from '@/typings'

export type CodeLevelOption = {
  id: CodeLevelType
  name: string
}

export const codeLevelOptions: CodeLevelOption[] = [
  { id: 'kids', name: '子供向け' },
  { id: 'other', name: 'その他' },
]

export function getCodeDictionaryLevel(dict: Dictionary): CodeLevelType {
  const text = `${dict.id} ${dict.name} ${dict.description} ${dict.tags.join(' ')}`.toLowerCase()

  if (text.includes('子供向け') || text.includes('少儿') || text.includes('child')) {
    return 'kids'
  }

  return 'other'
}
