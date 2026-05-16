import { TypingContext, TypingStateActionType } from '../../store'
import AnalysisButton from '../AnalysisButton'
import ErrorBookButton from '../ErrorBookButton'
import HandPositionIllustration from '../HandPositionIllustration'
import LoopWordSwitcher from '../LoopWordSwitcher'
import Setting from '../Setting'
import SoundSwitcher from '../SoundSwitcher'
import WordDictationSwitcher from '../WordDictationSwitcher'
import Tooltip from '@/components/Tooltip'
import { isOpenDarkModeAtom } from '@/store'
import { CTRL } from '@/utils'
import { useAtom } from 'jotai'
import { useContext } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import IconMoon from '~icons/heroicons/moon-solid'
import IconSun from '~icons/heroicons/sun-solid'
import IconLanguage from '~icons/tabler/language'
import IconLanguageOff from '~icons/tabler/language-off'

export default function Switcher() {
  const [isOpenDarkMode, setIsOpenDarkMode] = useAtom(isOpenDarkModeAtom)
  const { state, dispatch } = useContext(TypingContext) ?? {}

  const changeDarkModeState = () => {
    setIsOpenDarkMode((old) => !old)
  }

  const changeTransVisibleState = () => {
    if (dispatch) {
      dispatch({ type: TypingStateActionType.TOGGLE_TRANS_VISIBLE })
    }
  }

  useHotkeys(
    'ctrl+shift+v',
    () => {
      changeTransVisibleState()
    },
    { enableOnFormTags: true, preventDefault: true },
    [],
  )

  return (
    <div className="flex items-center justify-center gap-2">
      <Tooltip content="サウンド設定" placement="bottom">
        <SoundSwitcher />
      </Tooltip>

      <Tooltip className="h-7 w-7" content="リピート設定" placement="bottom">
        <LoopWordSwitcher />
      </Tooltip>

      <Tooltip className="h-7 w-7" content={`書き取りモード切替（${CTRL} + V）`} placement="bottom">
        <WordDictationSwitcher />
      </Tooltip>
      <Tooltip className="h-7 w-7" content={`翻訳表示（${CTRL} + Shift + V）`} placement="bottom">
        <button
          className={`p-[2px] ${state?.isTransVisible ? 'text-indigo-500' : 'text-gray-500'} text-lg focus:outline-none`}
          type="button"
          onClick={(e) => {
            changeTransVisibleState()
            e.currentTarget.blur()
          }}
          aria-label={`翻訳表示（${CTRL} + Shift + V）`}
        >
          {state?.isTransVisible ? <IconLanguage /> : <IconLanguageOff />}
        </button>
      </Tooltip>

      <Tooltip content="復習ノート" placement="bottom">
        <ErrorBookButton />
      </Tooltip>

      <Tooltip className="h-7 w-7" content="統計" placement="bottom">
        <AnalysisButton />
      </Tooltip>

      <Tooltip className="h-7 w-7" content="ダークモードを切り替え" placement="bottom">
        <button
          className={`p-[2px] text-lg text-indigo-500 focus:outline-none`}
          type="button"
          onClick={(e) => {
            changeDarkModeState()
            e.currentTarget.blur()
          }}
          aria-label="ダークモード"
        >
          {isOpenDarkMode ? <IconMoon className="icon" /> : <IconSun className="icon" />}
        </button>
      </Tooltip>
      <Tooltip className="h-7 w-7" content="おすすめの指使い" placement="bottom">
        <HandPositionIllustration></HandPositionIllustration>
      </Tooltip>
      <Tooltip content="設定" placement="bottom">
        <Setting />
      </Tooltip>
    </div>
  )
}
