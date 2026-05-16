import { currentUserIdAtom, isUserIconKey, userProfilesAtom, USER_ICON_KEYS, type UserIconKey } from '@/state/userProfiles'
import { TypingContext, TypingStateActionType } from '@/pages/Typing/store'
import { setTypingInputSuspended } from '@/pages/Typing/utils/inputSuspension'
import { Dialog, Transition } from '@headlessui/react'
import { useAtom, useSetAtom } from 'jotai'
import { Fragment, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import Tooltip from '@/components/Tooltip'
import IconArtistPalette from '~icons/twemoji/artist-palette'
import IconBaby from '~icons/twemoji/baby'
import IconBear from '~icons/twemoji/bear'
import IconBoy from '~icons/twemoji/boy'
import IconBooks from '~icons/twemoji/books'
import IconBookmarkTabs from '~icons/twemoji/bookmark-tabs'
import IconCrown from '~icons/twemoji/crown'
import IconDetective from '~icons/twemoji/detective'
import IconAlien from '~icons/twemoji/alien'
import IconFox from '~icons/twemoji/fox'
import IconMonocle from '~icons/twemoji/face-with-monocle'
import IconGhost from '~icons/twemoji/ghost'
import IconStarStruck from '~icons/twemoji/star-struck'
import IconRocket from '~icons/twemoji/rocket'
import IconSunglasses from '~icons/twemoji/smiling-face-with-sunglasses'
import IconBird from '~icons/twemoji/bird'
import IconCat from '~icons/twemoji/cat'
import IconDog from '~icons/twemoji/dog'
import IconGirl from '~icons/twemoji/girl'
import IconMan from '~icons/twemoji/man'
import IconRabbit from '~icons/twemoji/rabbit'
import IconRobot from '~icons/twemoji/robot'
import IconCamera from '~icons/twemoji/camera'
import IconWoman from '~icons/twemoji/woman'
import IconCheck from '~icons/tabler/check'
import IconX from '~icons/tabler/x'

const USER_ICON_COMPONENTS: Record<UserIconKey, ComponentType<{ className?: string }>> = {
  user: IconArtistPalette,
  'user-circle': IconFox,
  'user-check': IconStarStruck,
  'user-hexagon': IconGirl,
  'user-star': IconDetective,
  'user-heart': IconRocket,
  'user-cog': IconBooks,
  'user-scan': IconBookmarkTabs,
  'user-shield': IconBaby,
  'user-bolt': IconBoy,
  'user-spark': IconCamera,
  'user-voice': IconGhost,
  'user-code': IconMan,
  'user-book': IconCrown,
  'user-pen': IconWoman,
  'user-briefcase': IconBear,
  'user-shield-check': IconBird,
  'user-pin': IconCat,
  'user-radar': IconDog,
  'user-question': IconRobot,
}

export default function UserSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [userProfiles, setUserProfiles] = useAtom(userProfilesAtom)
  const setCurrentUserId = useSetAtom(currentUserIdAtom)
  const typingContext = useContext(TypingContext)
  const [pendingUserId, setPendingUserId] = useState<string | null>(null)
  const pausedTypingRef = useRef<boolean | null>(null)
  const activeUser = useMemo(
    () => userProfiles.users.find((user) => user.id === userProfiles.activeUserId) ?? userProfiles.users[0],
    [userProfiles],
  )

  const ActiveIcon = isUserIconKey(activeUser.icon) ? USER_ICON_COMPONENTS[activeUser.icon] : IconUser

  const switchUser = (userId: string) => {
    setCurrentUserId(userId)
    setIsOpen(false)
  }

  const pauseTyping = () => {
    if (!typingContext) return
    if (pausedTypingRef.current !== null) return
    pausedTypingRef.current = typingContext.state.isTyping
    typingContext.dispatch({ type: TypingStateActionType.SET_IS_TYPING, payload: false })
    setTypingInputSuspended(true)
  }

  const restoreTyping = () => {
    if (!typingContext) return
    if (pausedTypingRef.current === null) return
    typingContext.dispatch({ type: TypingStateActionType.SET_IS_TYPING, payload: pausedTypingRef.current })
    pausedTypingRef.current = null
    setTypingInputSuspended(false)
  }

  const selectUser = (userId: string) => {
    setPendingUserId(userId)
  }

  useEffect(() => {
    if (isOpen) {
      pauseTyping()
      const activeElement = document.activeElement
      if (activeElement instanceof HTMLElement) {
        activeElement.blur()
      }
      return
    }

    restoreTyping()
  }, [isOpen])

  const setUserName = (userId: string, name: string) => {
    setUserProfiles((prev) => ({
      ...prev,
      users: prev.users.map((user) => (user.id === userId ? { ...user, name } : user)),
    }))
  }

  const setUserIcon = (userId: string, icon: UserIconKey) => {
    setUserProfiles((prev) => ({
      ...prev,
      users: prev.users.map((user) => (user.id === userId ? { ...user, icon } : user)),
    }))
  }

  return (
    <>
      <Tooltip content={activeUser.name} placement="bottom">
        <button
          type="button"
          onClick={() => {
            setPendingUserId(activeUser.id)
            pauseTyping()
            setIsOpen(true)
          }}
          className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-2 text-gray-900 hover:bg-indigo-100 focus:outline-none dark:bg-indigo-900 dark:text-gray-100 dark:hover:bg-indigo-800"
          aria-label={activeUser.name}
          title={activeUser.name}
        >
          <ActiveIcon className="h-6 w-6" />
          <span className="max-w-24 truncate text-sm font-medium">{activeUser.name}</span>
        </button>
      </Tooltip>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => {
            restoreTyping()
            setIsOpen(false)
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-[56rem] max-w-[95vw] flex-col overflow-hidden rounded-2xl bg-white p-0 shadow-xl dark:bg-gray-800">
                    <div className="flex items-center justify-between border-b border-neutral-100 bg-stone-50 px-6 py-4 dark:border-neutral-700 dark:bg-gray-900">
                      <span className="text-2xl font-bold text-gray-600 dark:text-gray-100">ユーザー</span>
                      <button
                        type="button"
                        onClick={() => {
                          restoreTyping()
                          setIsOpen(false)
                        }}
                        title="閉じる"
                      >
                        <IconX className="h-5 w-5 cursor-pointer text-gray-400" />
                      </button>
                    </div>

                  <div className="grid grid-cols-[1.3fr_1fr] gap-4 p-5">
                    <div className="flex flex-col gap-3">
                      {userProfiles.users.map((user) => {
                        const Icon = isUserIconKey(user.icon) ? USER_ICON_COMPONENTS[user.icon] : IconUser
                        const isSelected = user.id === (pendingUserId ?? activeUser.id)

                        return (
                          <div
                            key={user.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => selectUser(user.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                selectUser(user.id)
                              }
                            }}
                            className={`flex items-center gap-3 rounded-xl border px-3 py-3 ${
                              isSelected ? 'border-indigo-300 bg-indigo-50 dark:border-indigo-500 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700'
                            }`}
                          >
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-full ${
                                isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                              <input
                                value={user.name}
                                onFocus={() => selectUser(user.id)}
                                onClick={() => selectUser(user.id)}
                                onChange={(e) => setUserName(user.id, e.target.value)}
                              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-indigo-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            />
                              <span className="text-xs text-gray-500">ユーザー {user.id.split('-')[1]}</span>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200">
                          <ActiveIcon className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-lg font-semibold text-gray-700 dark:text-gray-100">{activeUser.name}</div>
                          <div className="text-xs text-gray-400">アイコンを選択してください</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-5 gap-2">
                        {USER_ICON_KEYS.map((iconKey) => {
                          const Icon = USER_ICON_COMPONENTS[iconKey]
                          const selected = activeUser.icon === iconKey
                          return (
                            <button
                              key={iconKey}
                              type="button"
                              onClick={() => setUserIcon(activeUser.id, iconKey)}
                              className={`flex h-12 items-center justify-center rounded-xl border transition-colors ${
                                selected
                                  ? 'border-indigo-400 bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-200'
                                  : 'border-gray-200 bg-white text-gray-500 hover:border-indigo-200 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-indigo-500'
                              }`}
                              aria-label={iconKey}
                            >
                              <Icon className="h-6 w-6" />
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 border-t border-neutral-100 bg-stone-50 px-6 py-4 dark:border-neutral-700 dark:bg-gray-900">
                    <button
                      type="button"
                      onClick={() => {
                        restoreTyping()
                        setIsOpen(false)
                      }}
                      className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      キャンセル
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (pendingUserId) {
                          switchUser(pendingUserId)
                        }
                        restoreTyping()
                      }}
                      className="inline-flex items-center gap-1 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
                    >
                      <IconCheck className="h-4 w-4" />
                      <span>適用</span>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
