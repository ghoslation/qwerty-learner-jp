import { db } from '.'
import { getCurrentDate, recordDataAction } from '..'
import { currentUserIdAtom, userProfilesAtom } from '@/store'
import { getDefaultStore } from 'jotai/vanilla'

export type ExportProgress = {
  totalRows?: number
  completedRows: number
  done: boolean
}

export type ImportProgress = {
  totalRows?: number
  completedRows: number
  done: boolean
}

type UserDataExportPayload = {
  version: 1
  userId: string
  profile: unknown
  wordRecords: unknown[]
  chapterRecords: unknown[]
  reviewRecords: unknown[]
}

function getActiveUserId() {
  const store = getDefaultStore()
  try {
    return store.get(currentUserIdAtom)
  } catch {
    return 'user-1'
  }
}

function getActiveProfile() {
  const store = getDefaultStore()
  try {
    return store.get(userProfilesAtom).users.find((user) => user.id === store.get(currentUserIdAtom))
  } catch {
    return undefined
  }
}

export async function exportDatabase(callback: (exportProgress: ExportProgress) => boolean) {
  const [pako, { saveAs }] = await Promise.all([import('pako'), import('file-saver')])
  const userId = getActiveUserId()
  const profile = getActiveProfile()

  const [wordRecords, chapterRecords, reviewRecords] = await Promise.all([
    db.wordRecords.where('userId').equals(userId).toArray(),
    db.chapterRecords.where('userId').equals(userId).toArray(),
    db.reviewRecords.where('userId').equals(userId).toArray(),
  ])

  const payload: UserDataExportPayload = {
    version: 1,
    userId,
    profile,
    wordRecords,
    chapterRecords,
    reviewRecords,
  }

  const json = JSON.stringify(payload)
  const totalRows = wordRecords.length + chapterRecords.length + reviewRecords.length
  callback({ totalRows, completedRows: totalRows, done: false })

  const compressed = pako.gzip(json)
  const compressedBlob = new Blob([compressed])
  const currentDate = getCurrentDate()
  saveAs(compressedBlob, `Qwerty-Learner-User-${userId}-${currentDate}.json.gz`)
  recordDataAction({ type: 'export', size: compressedBlob.size, wordCount: wordRecords.length, chapterCount: chapterRecords.length })
  callback({ totalRows, completedRows: totalRows, done: true })
}

export async function importDatabase(onStart: () => void, callback: (importProgress: ImportProgress) => boolean) {
  const [pako] = await Promise.all([import('pako')])

  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'application/gzip,.json.gz'
  input.addEventListener('change', async () => {
    const file = input.files?.[0]
    if (!file) return

    onStart()

    const compressed = await file.arrayBuffer()
    const json = pako.ungzip(compressed, { to: 'string' })
    const payload = JSON.parse(json) as UserDataExportPayload
    const userId = getActiveUserId()
    const store = getDefaultStore()

    const totalRows = (payload.wordRecords?.length ?? 0) + (payload.chapterRecords?.length ?? 0) + (payload.reviewRecords?.length ?? 0)
    let completedRows = 0

    await db.transaction('rw', db.wordRecords, db.chapterRecords, db.reviewRecords, async () => {
      await db.wordRecords.where('userId').equals(userId).delete()
      await db.chapterRecords.where('userId').equals(userId).delete()
      await db.reviewRecords.where('userId').equals(userId).delete()

      if (Array.isArray(payload.wordRecords) && payload.wordRecords.length > 0) {
        await db.wordRecords.bulkAdd(
          payload.wordRecords.map((record) => {
            const { id: _id, ...rest } = record as Record<string, unknown>
            return { ...rest, userId }
          }),
        )
        completedRows += payload.wordRecords.length
        callback({ totalRows, completedRows, done: false })
      }
      if (Array.isArray(payload.chapterRecords) && payload.chapterRecords.length > 0) {
        await db.chapterRecords.bulkAdd(
          payload.chapterRecords.map((record) => {
            const { id: _id, ...rest } = record as Record<string, unknown>
            return { ...rest, userId }
          }),
        )
        completedRows += payload.chapterRecords.length
        callback({ totalRows, completedRows, done: false })
      }
      if (Array.isArray(payload.reviewRecords) && payload.reviewRecords.length > 0) {
        await db.reviewRecords.bulkAdd(
          payload.reviewRecords.map((record) => {
            const { id: _id, ...rest } = record as Record<string, unknown>
            return { ...rest, userId }
          }),
        )
        completedRows += payload.reviewRecords.length
        callback({ totalRows, completedRows, done: false })
      }
    })

    if (payload.profile) {
      store.set(userProfilesAtom, (prev) => {
        const nextUsers = prev.users.map((user) => (user.id === userId ? { ...(payload.profile as object), id: userId } : user))
        return {
          ...prev,
          users: nextUsers,
          activeUserId: userId,
        }
      })
    }

    const [wordCount, chapterCount] = await Promise.all([
      db.wordRecords.where('userId').equals(userId).count(),
      db.chapterRecords.where('userId').equals(userId).count(),
    ])
    recordDataAction({ type: 'import', size: file.size, wordCount, chapterCount })
    callback({ totalRows, completedRows: totalRows, done: true })
  })

  input.click()
}
