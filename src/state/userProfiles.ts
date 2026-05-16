import { DISMISS_START_CARD_DATE_KEY, defaultFontSizeConfig } from '@/constants'
import { correctSoundResources, keySoundResources, wrongSoundResources } from '@/resources/soundResource'
import type {
  LoopWordTimesOption,
  PhoneticType,
  PronunciationType,
  WordDictationOpenBy,
  WordDictationType,
} from '@/typings'
import type { ReviewRecord } from '@/utils/db/record'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { RESET } from 'jotai/vanilla/utils'

export const USER_PROFILE_LIMIT = 5

export const USER_ICON_KEYS = [
  'user',
  'user-circle',
  'user-check',
  'user-hexagon',
  'user-star',
  'user-heart',
  'user-cog',
  'user-scan',
  'user-shield',
  'user-bolt',
  'user-spark',
  'user-voice',
  'user-code',
  'user-book',
  'user-pen',
  'user-briefcase',
  'user-shield-check',
  'user-pin',
  'user-radar',
  'user-question',
] as const

export type UserIconKey = (typeof USER_ICON_KEYS)[number]

export function isUserIconKey(value: unknown): value is UserIconKey {
  return typeof value === 'string' && (USER_ICON_KEYS as readonly string[]).includes(value)
}

export type UserKeySoundsConfig = {
  isOpen: boolean
  isOpenClickSound: boolean
  volume: number
  resource: string
}

export type UserHintSoundsConfig = {
  isOpen: boolean
  volume: number
  isOpenWrongSound: boolean
  isOpenCorrectSound: boolean
  wrongResource: string
  correctResource: string
}

export type UserPronunciationConfig = {
  isOpen: boolean
  volume: number
  type: PronunciationType
  name: string
  isLoop: boolean
  isTransRead: boolean
  transVolume: number
  rate: number
}

export type UserRandomConfig = {
  isOpen: boolean
}

export type UserFontSizeConfig = typeof defaultFontSizeConfig

export type UserPhoneticConfig = {
  isOpen: boolean
  type: PhoneticType
}

export type UserWordDictationConfig = {
  isOpen: boolean
  type: WordDictationType
  openBy: WordDictationOpenBy
}

export type UserReviewModeInfo = {
  isReviewMode: boolean
  reviewRecord: ReviewRecord | undefined
}

export type UserScopedData = {
  currentDictId: string
  currentChapter: number
  loopWordConfig: { times: LoopWordTimesOption }
  keySoundsConfig: UserKeySoundsConfig
  hintSoundsConfig: UserHintSoundsConfig
  pronunciationConfig: UserPronunciationConfig
  fontSizeConfig: UserFontSizeConfig
  randomConfig: UserRandomConfig
  isShowPrevAndNextWord: boolean
  isIgnoreCase: boolean
  isShowAnswerOnHover: boolean
  isTextSelectable: boolean
  isContinueOnWrongInput: boolean
  reviewModeInfo: UserReviewModeInfo
  phoneticConfig: UserPhoneticConfig
  isOpenDarkMode: boolean
  wordDictationConfig: UserWordDictationConfig
  dismissStartCardDate: string | null
  hasSeenEnhancedPromotion: boolean
}

export type UserProfile = {
  id: string
  name: string
  icon: UserIconKey
  data: UserScopedData
}

export type UserProfilesState = {
  activeUserId: string
  users: UserProfile[]
}

export const USER_PROFILE_STORAGE_KEY = 'userProfiles'

const defaultUserData = (): UserScopedData => ({
  currentDictId: 'cet4',
  currentChapter: 0,
  loopWordConfig: { times: 1 },
  keySoundsConfig: {
    isOpen: true,
    isOpenClickSound: true,
    volume: 1,
    resource: keySoundResources[0],
  },
  hintSoundsConfig: {
    isOpen: true,
    volume: 1,
    isOpenWrongSound: true,
    isOpenCorrectSound: true,
    wrongResource: wrongSoundResources[0],
    correctResource: correctSoundResources[0],
  },
  pronunciationConfig: {
    isOpen: true,
    volume: 1,
    type: 'us',
    name: 'アメリカ英語',
    isLoop: false,
    isTransRead: false,
    transVolume: 1,
    rate: 1,
  },
  fontSizeConfig: defaultFontSizeConfig,
  randomConfig: {
    isOpen: false,
  },
  isShowPrevAndNextWord: true,
  isIgnoreCase: true,
  isShowAnswerOnHover: true,
  isTextSelectable: false,
  isContinueOnWrongInput: false,
  reviewModeInfo: {
    isReviewMode: false,
    reviewRecord: undefined,
  },
  phoneticConfig: {
    isOpen: true,
    type: 'us',
  },
  isOpenDarkMode: getDefaultDarkMode(),
  wordDictationConfig: {
    isOpen: false,
    type: 'hideAll',
    openBy: 'auto',
  },
  dismissStartCardDate: null,
  hasSeenEnhancedPromotion: false,
})

function getDefaultDarkMode() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getDefaultUserProfiles(): UserProfilesState {
  const users: UserProfile[] = Array.from({ length: USER_PROFILE_LIMIT }, (_, index) => ({
    id: `user-${index + 1}`,
    name: `ユーザー${index + 1}`,
    icon: USER_ICON_KEYS[index],
    data: defaultUserData(),
  }))
  users[0].icon = USER_ICON_KEYS[19]

  const legacyState = readLegacyUserData()
  users[0] = {
    ...users[0],
    name: legacyState.name ?? users[0].name,
    icon: legacyState.icon ?? users[0].icon,
    data: {
      ...users[0].data,
      ...legacyState.data,
    },
  }

  return {
    activeUserId: users[0].id,
    users,
  }
}

function readLegacyUserData(): Partial<UserProfile> {
  if (typeof window === 'undefined') {
    return {}
  }

  const readJson = <T,>(key: string, fallback: T): T => {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    try {
      return JSON.parse(raw) as T
    } catch {
      return fallback
    }
  }

  return {
    name: 'ユーザー1',
    icon: 'user',
    data: {
      currentDictId: readJson('currentDict', 'cet4'),
      currentChapter: readJson('currentChapter', 0),
      loopWordConfig: readJson('loopWordConfig', { times: 1 }),
      keySoundsConfig: readJson('keySoundsConfig', defaultUserData().keySoundsConfig),
      hintSoundsConfig: readJson('hintSoundsConfig', defaultUserData().hintSoundsConfig),
      pronunciationConfig: readJson('pronunciation', defaultUserData().pronunciationConfig),
      fontSizeConfig: readJson('fontsize', defaultUserData().fontSizeConfig),
      randomConfig: readJson('randomConfig', defaultUserData().randomConfig),
      isShowPrevAndNextWord: readJson('isShowPrevAndNextWord', true),
      isIgnoreCase: readJson('isIgnoreCase', true),
      isShowAnswerOnHover: readJson('isShowAnswerOnHover', true),
      isTextSelectable: readJson('isTextSelectable', false),
      isContinueOnWrongInput: readJson('isContinueOnWrongInput', false),
      reviewModeInfo: readJson('reviewModeInfo', defaultUserData().reviewModeInfo),
      phoneticConfig: readJson('phoneticConfig', defaultUserData().phoneticConfig),
      isOpenDarkMode: readJson('isOpenDarkModeAtom', getDefaultDarkMode()),
      wordDictationConfig: readJson('wordDictationConfig', defaultUserData().wordDictationConfig),
      dismissStartCardDate: window.localStorage.getItem(DISMISS_START_CARD_DATE_KEY),
      hasSeenEnhancedPromotion: readJson('hasSeenEnhancedPromotion', false),
    } as UserScopedData,
  }
}

function normalizeUserProfile(profile: Partial<UserProfile>, index: number): UserProfile {
  const fallbackProfiles = getDefaultUserProfiles()
  const fallback = fallbackProfiles.users[index]
  return {
    id: profile.id ?? fallback.id,
    name: profile.name ?? fallback.name,
    icon: isUserIconKey(profile.icon) ? profile.icon : fallback.icon,
    data: {
      ...fallback.data,
      ...(profile.data ?? {}),
    },
  }
}

function normalizeUserProfiles(raw: unknown): UserProfilesState {
  const fallback = getDefaultUserProfiles()
  if (!raw || typeof raw !== 'object') {
    return fallback
  }

  const maybeState = raw as Partial<UserProfilesState>
  const users = Array.isArray(maybeState.users)
    ? maybeState.users.slice(0, USER_PROFILE_LIMIT).map((profile, index) => normalizeUserProfile(profile as Partial<UserProfile>, index))
    : fallback.users

  while (users.length < USER_PROFILE_LIMIT) {
    const index = users.length
    users.push(normalizeUserProfile({}, index))
  }

  const activeUserId = users.find((user) => user.id === maybeState.activeUserId)?.id ?? users[0].id

  return {
    activeUserId,
    users,
  }
}

const rawUserProfilesAtom = atomWithStorage<UserProfilesState>(USER_PROFILE_STORAGE_KEY, getDefaultUserProfiles())

export const userProfilesAtom = atom(
  (get) => normalizeUserProfiles(get(rawUserProfilesAtom)),
  (get, set, updater: UserProfilesState | ((prev: UserProfilesState) => UserProfilesState)) => {
    const prevState = normalizeUserProfiles(get(rawUserProfilesAtom))
    const nextState = typeof updater === 'function' ? updater(prevState) : updater
    set(rawUserProfilesAtom, normalizeUserProfiles(nextState))
  },
)

export const currentUserIdAtom = atom(
  (get) => get(userProfilesAtom).activeUserId,
  (get, set, nextUserId: string) => {
    set(userProfilesAtom, (prev) => ({
      ...prev,
      activeUserId: prev.users.some((user) => user.id === nextUserId) ? nextUserId : prev.users[0].id,
    }))
  },
)

export const currentUserAtom = atom((get) => {
  const state = get(userProfilesAtom)
  return state.users.find((user) => user.id === state.activeUserId) ?? state.users[0]
})

export function getStoredActiveUserId() {
  if (typeof window === 'undefined') {
    return 'user-1'
  }

  const raw = window.localStorage.getItem(USER_PROFILE_STORAGE_KEY)
  if (!raw) {
    return 'user-1'
  }

  try {
    const parsed = JSON.parse(raw) as Partial<UserProfilesState>
    return typeof parsed.activeUserId === 'string' && parsed.activeUserId ? parsed.activeUserId : 'user-1'
  } catch {
    return 'user-1'
  }
}

type SetStateActionWithReset<Value> = Value | typeof RESET | ((prev: Value) => Value | typeof RESET)

function mergeDefaultValue<T>(value: T, defaultValue: T): T {
  if (value === null || value === undefined) return defaultValue
  if (typeof value !== 'object' || typeof defaultValue !== 'object') return value
  if (Array.isArray(value) || Array.isArray(defaultValue)) return value
  return { ...defaultValue, ...value }
}

export function createUserScopedAtom<T>(field: string, defaultValue: T) {
  return atom(
    (get) => {
      const user = get(currentUserAtom)
      return mergeDefaultValue((user.data as Record<string, T>)[field], defaultValue)
    },
    (get, set, updater: SetStateActionWithReset<T>) => {
      const state = get(userProfilesAtom)
      const activeUserId = state.activeUserId
      const currentUser = state.users.find((user) => user.id === activeUserId) ?? state.users[0]
      const currentValue = mergeDefaultValue((currentUser.data as Record<string, T>)[field], defaultValue)
      const nextValue = resolveSetStateAction(currentValue, updater, defaultValue)

      set(userProfilesAtom, {
        ...state,
        users: state.users.map((user) =>
          user.id === activeUserId
            ? {
                ...user,
                data: {
                  ...user.data,
                  [field]: nextValue,
                },
              }
            : user,
        ),
      })
    },
  )
}

function resolveSetStateAction<T>(currentValue: T, updater: SetStateActionWithReset<T>, defaultValue: T): T {
  if (updater === RESET) {
    return defaultValue
  }

  if (typeof updater === 'function') {
    const nextValue = (updater as (prev: T) => T | typeof RESET)(currentValue)
    return nextValue === RESET ? defaultValue : nextValue
  }

  return updater
}
