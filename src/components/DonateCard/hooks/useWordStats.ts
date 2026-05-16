import { db } from '@/utils/db'
import { currentUserIdAtom } from '@/store'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

export function useChapterNumber() {
  const [chapterNumber, setChapterNumber] = useState<number>(0)
  const userId = useAtomValue(currentUserIdAtom)

  useEffect(() => {
    const fetchChapterNumber = async () => {
      const number = await db.chapterRecords.where('userId').equals(userId).count()
      setChapterNumber(number)
    }

    fetchChapterNumber()
  }, [userId])

  return chapterNumber
}

export function useDayFromFirstWordRecord() {
  const [dayFromFirstWordRecord, setDayFromFirstWordRecord] = useState<number>(0)
  const userId = useAtomValue(currentUserIdAtom)

  useEffect(() => {
    const fetchDayFromFirstWordRecord = async () => {
      const firstWordRecord = (await db.wordRecords.where('userId').equals(userId).sortBy('timeStamp'))[0]
      const firstWordRecordTimeStamp = firstWordRecord?.timeStamp || 0
      const now = dayjs()
      const timestamp = dayjs.unix(firstWordRecordTimeStamp)
      const daysPassed = now.diff(timestamp, 'day')
      setDayFromFirstWordRecord(daysPassed)
    }

    fetchDayFromFirstWordRecord()
  }, [userId])

  return dayFromFirstWordRecord
}

export function useWordNumber() {
  const [wordNumber, setWordNumber] = useState<number>(0)
  const userId = useAtomValue(currentUserIdAtom)

  useEffect(() => {
    const fetchWordNumber = async () => {
      const number = await db.wordRecords.where('userId').equals(userId).count()
      setWordNumber(number)
    }

    fetchWordNumber()
  }, [userId])

  return wordNumber
}

export function useSumWrongCount() {
  const [sumWrongCount, setSumWrongCount] = useState<number>(0)
  const userId = useAtomValue(currentUserIdAtom)

  useEffect(() => {
    const fetchSumWrongCount = async () => {
      let totalWrongCount = 0

      await db.chapterRecords.where('userId').equals(userId).each((record) => {
        totalWrongCount += record.wrongCount || 0
      })
      setSumWrongCount(totalWrongCount)
    }

    fetchSumWrongCount()
  }, [userId])

  return sumWrongCount
}
