import { currentUserIdAtom } from '@/store'
import { db } from '@/utils/db'
import type { IChapterRecord } from '@/utils/db/record'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

export function useDictStats(dictID: string, isStartLoad: boolean) {
  const userId = useAtomValue(currentUserIdAtom)
  const [dictStats, setDictStats] = useState<IDictStats | null>(null)

  useEffect(() => {
    const fetchDictStats = async () => {
      const stats = await getDictStats(dictID, userId)
      setDictStats(stats)
    }

    if (isStartLoad && !dictStats) {
      fetchDictStats()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dictID, isStartLoad, userId])

  return dictStats
}

interface IDictStats {
  exercisedChapterCount: number
}

async function getDictStats(dict: string, userId: string): Promise<IDictStats> {
  const records: IChapterRecord[] = await db.chapterRecords.where('userId').equals(userId).filter((record) => record.dict === dict).toArray()
  const allChapter = records.map(({ chapter }) => chapter).filter((item) => item !== null) as number[]
  const uniqueChapter = allChapter.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
  const exercisedChapterCount = uniqueChapter.length

  return { exercisedChapterCount }
}
