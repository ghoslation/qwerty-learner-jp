import styles from './index.module.css'
import {
  isContinueOnWrongInputAtom,
  isIgnoreCaseAtom,
  isShowAnswerOnHoverAtom,
  isShowPrevAndNextWordAtom,
  isTextSelectableAtom,
  randomConfigAtom,
} from '@/store'
import { Switch } from '@headlessui/react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import classNames from 'classnames'
import { useAtom } from 'jotai'
import { useCallback } from 'react'

export default function AdvancedSetting() {
  const [randomConfig, setRandomConfig] = useAtom(randomConfigAtom)
  const [isShowPrevAndNextWord, setIsShowPrevAndNextWord] = useAtom(isShowPrevAndNextWordAtom)
  const [isIgnoreCase, setIsIgnoreCase] = useAtom(isIgnoreCaseAtom)
  const [isTextSelectable, setIsTextSelectable] = useAtom(isTextSelectableAtom)
  const [isShowAnswerOnHover, setIsShowAnswerOnHover] = useAtom(isShowAnswerOnHoverAtom)
  const [isContinueOnWrongInput, setIsContinueOnWrongInput] = useAtom(isContinueOnWrongInputAtom)

  const onToggleRandom = useCallback(
    (checked: boolean) => {
      setRandomConfig((prev) => ({
        ...prev,
        isOpen: checked,
      }))
    },
    [setRandomConfig],
  )

  const onToggleLastAndNextWord = useCallback(
    (checked: boolean) => {
      setIsShowPrevAndNextWord(checked)
    },
    [setIsShowPrevAndNextWord],
  )

  const onToggleIgnoreCase = useCallback(
    (checked: boolean) => {
      setIsIgnoreCase(checked)
    },
    [setIsIgnoreCase],
  )

  const onToggleTextSelectable = useCallback(
    (checked: boolean) => {
      setIsTextSelectable(checked)
    },
    [setIsTextSelectable],
  )
  const onToggleShowAnswerOnHover = useCallback(
    (checked: boolean) => {
      setIsShowAnswerOnHover(checked)
    },
    [setIsShowAnswerOnHover],
  )

  const onToggleContinueOnWrongInput = useCallback(
    (checked: boolean) => {
      setIsContinueOnWrongInput(checked)
    },
    [setIsContinueOnWrongInput],
  )

  return (
    <ScrollArea.Root className="flex-1 select-none overflow-y-auto ">
      <ScrollArea.Viewport className="h-full w-full px-3">
        <div className={styles.tabContent}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>章内の単語をランダムに出題</span>
            <span className={styles.sectionDescription}>
              オンにすると、章内の単語が練習ごとにランダムな順番で表示されます。次の章から有効になります。
            </span>
            <div className={styles.switchBlock}>
              <Switch checked={randomConfig.isOpen} onChange={onToggleRandom} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{`ランダム出題${
                randomConfig.isOpen ? 'オン' : 'オフ'
              }`}</span>
            </div>
          </div>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>前後の単語を表示</span>
            <span className={styles.sectionDescription}>オンにすると、練習中に画面上部へ前後の単語が表示されます。</span>
            <div className={styles.switchBlock}>
              <Switch checked={isShowPrevAndNextWord} onChange={onToggleLastAndNextWord} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{`単語表示${
                isShowPrevAndNextWord ? 'オン' : 'オフ'
              }`}</span>
            </div>
          </div>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>大文字と小文字を区別しない</span>
            <span className={styles.sectionDescription}>
              オンにすると、大文字と小文字の違いを無視します。例: "hello" も "Hello" も正解になります。
            </span>
            <div className={styles.switchBlock}>
              <Switch checked={isIgnoreCase} onChange={onToggleIgnoreCase} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{`大小文字を無視${
                isIgnoreCase ? 'オン' : 'オフ'
              }`}</span>
            </div>
          </div>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>テキスト選択を許可</span>
            <span className={styles.sectionDescription}>オンにすると、マウスでテキストを選択できます。</span>
            <div className={styles.switchBlock}>
              <Switch checked={isTextSelectable} onChange={onToggleTextSelectable} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{`テキスト選択${
                isTextSelectable ? 'オン' : 'オフ'
              }`}</span>
            </div>
          </div>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>書き取りモードで正解を表示</span>
            <span className={styles.sectionDescription}>オンにすると、単語にマウスカーソルを重ねたときに正解が表示されます。</span>
            <div className={styles.switchBlock}>
              <Switch checked={isShowAnswerOnHover} onChange={onToggleShowAnswerOnHover} className="switch-root">
                <span aria-hidden="true" className="switch-thumb" />
              </Switch>
              <span className="text-right text-xs font-normal leading-tight text-gray-600">{`ヒント表示${
                isShowAnswerOnHover ? 'オン' : 'オフ'
              }`}</span>
            </div>
          </div>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>ミス時の入力方法</span>
            <span className={styles.sectionDescription}>
              ミスした文字を次の文字として進めるか、正解するまで同じ位置で止めるかを選べます。
            </span>
            <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-700">
              <button
                type="button"
                onClick={() => onToggleContinueOnWrongInput(true)}
                className={classNames(
                  'flex min-h-20 flex-col rounded-lg px-3 py-2 text-left transition-colors',
                  isContinueOnWrongInput
                    ? 'bg-white shadow-sm dark:bg-gray-800'
                    : 'text-gray-500 hover:bg-white/70 dark:text-gray-300 dark:hover:bg-gray-800/60',
                )}
                aria-pressed={isContinueOnWrongInput}
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-100">ミスしても進める</span>
                <span className="mt-1 text-xs leading-tight text-gray-500 dark:text-gray-400">
                  間違えた文字も1文字として扱い、そのまま次へ進みます。
                </span>
              </button>
              <button
                type="button"
                onClick={() => onToggleContinueOnWrongInput(false)}
                className={classNames(
                  'flex min-h-20 flex-col rounded-lg px-3 py-2 text-left transition-colors',
                  !isContinueOnWrongInput
                    ? 'bg-white shadow-sm dark:bg-gray-800'
                    : 'text-gray-500 hover:bg-white/70 dark:text-gray-300 dark:hover:bg-gray-800/60',
                )}
                aria-pressed={!isContinueOnWrongInput}
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-100">正解まで止める</span>
                <span className="mt-1 text-xs leading-tight text-gray-500 dark:text-gray-400">
                  正しい文字を入れるまで、同じ位置で入力を続けます。
                </span>
              </button>
            </div>
          </div>
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent " orientation="vertical"></ScrollArea.Scrollbar>
    </ScrollArea.Root>
  )
}
