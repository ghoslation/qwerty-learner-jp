import { currentUserIdAtom } from '@/store'
import { db } from '@/utils/db'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

export function useRevisionWordCount(dictID: string) {
  const userId = useAtomValue(currentUserIdAtom)
  const [wordCount, setWordCount] = useState<number>(0)

  useEffect(() => {
    const fetchWordCount = async () => {
      const count = await getRevisionWordCount(dictID, userId)
      setWordCount(count)
    }

    if (dictID) {
      fetchWordCount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictID, userId])

  return wordCount
}

async function getRevisionWordCount(dict: string, userId: string): Promise<number> {
  const wordCount = await db.wordRecords
    .where('userId')
    .equals(userId)
    .filter((wordRecord) => wordRecord.dict === dict && wordRecord.wrongCount > 0)
    .toArray()
    .then((wordRecords) => {
      const res = new Map()
      const reducedRecords = wordRecords.filter((item) => !res.has(item['word'] + item['dict']) && res.set(item['word'] + item['dict'], 1))
      return reducedRecords.length
    })
  return wordCount
}
