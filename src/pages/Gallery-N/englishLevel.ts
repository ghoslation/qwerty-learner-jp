import type { Dictionary, EnglishLevelType } from '@/typings'

export type EnglishLevelOption = {
  id: EnglishLevelType
  name: string
}

export const englishLevelOptions: EnglishLevelOption[] = [
  { id: 'elementaryLower', name: '小学生 1〜3年' },
  { id: 'elementaryUpper', name: '小学生 4〜6年' },
  { id: 'junior', name: '中学生' },
  { id: 'high', name: '高校生' },
  { id: 'college', name: '大学生以上' },
]

const hasAny = (text: string, words: string[]) => words.some((word) => text.includes(word))

const getDictionaryText = (dict: Dictionary) =>
  `${dict.id} ${dict.name} ${dict.description} ${dict.category} ${dict.tags.join(' ')} ${dict.url}`.toLowerCase()

function getRazLevel(dict: Dictionary): EnglishLevelType | null {
  const match = dict.id.match(/^raz-([a-z]+|z[12]|all)$/i)

  if (!match) return null

  const level = match[1].toUpperCase()

  if (level === 'ALL' || level === 'AA') return 'elementaryLower'
  if (/^[A-E]$/.test(level)) return 'elementaryLower'
  if (/^[F-J]$/.test(level)) return 'elementaryUpper'
  if (/^[K-T]$/.test(level)) return 'junior'

  return 'high'
}

function getEfLevel(dict: Dictionary): EnglishLevelType | null {
  const match = dict.id.match(/^eflevel(\d+)$/)

  if (!match) return null

  const level = Number(match[1])

  if (level <= 3) return 'elementaryLower'
  if (level <= 6) return 'elementaryUpper'
  if (level <= 10) return 'junior'
  if (level <= 13) return 'high'

  return 'college'
}

export function getEnglishDictionaryLevel(dict: Dictionary): EnglishLevelType {
  const razLevel = getRazLevel(dict)
  if (razLevel) return razLevel

  const efLevel = getEfLevel(dict)
  if (efLevel) return efLevel

  const text = getDictionaryText(dict)

  if (dict.category === 'コード練習' || dict.category === '専門語彙') return 'college'

  if (
    hasAny(text, [
      '大学院',
      '大学英語',
      '専攻',
      '専門',
      'gmat',
      'gre',
      'ielts',
      'toefl',
      'toeic',
      'bec',
      'pte',
      'c1',
      'c2',
      'oxford5000',
      'macmillan7000',
      'coca_20000',
      'word roots',
      'suffix word',
    ])
  ) {
    return 'college'
  }

  if (
    hasAny(text, [
      '高考',
      '高中',
      '高校',
      'gaokao',
      'gaozhong',
      'sat',
      'fce',
      'b1',
      'b2',
      'oxford3000',
      'voa',
      'nce3',
      'nce4',
      'reading explorer',
      'top 2000',
      'longman communication 3000',
      'frequently_used_words03',
    ])
  ) {
    return 'high'
  }

  if (
    hasAny(text, [
      '中考',
      '中学校',
      '初中',
      'chuzhong',
      'junior',
      '七年级',
      '八年级',
      '九年级',
      '7年级',
      '8年级',
      '9年级',
      'ket',
      'pet',
      'nce1',
      'nce2',
      'top 1000',
      'top 1500',
      'frequently_used_words01',
    ])
  ) {
    return 'junior'
  }

  if (hasAny(text, ['四年级', '五年级', '六年级', '4年级', '5年级', '6年级', 'top 500', 'join in'])) {
    return 'elementaryUpper'
  }

  if (
    hasAny(text, [
      '小学校',
      '小学生',
      '小学',
      'xiaoxue',
      '一年级',
      '二年级',
      '三年级',
      '1年级',
      '2年级',
      '3年级',
      'top 50',
      'top 60',
      'top 250',
    ])
  ) {
    return 'elementaryLower'
  }

  return 'college'
}
