import { GalleryContext } from '.'
import { englishLevelOptions } from './englishLevel'
import type { EnglishLevelType } from '@/typings'
import { RadioGroup } from '@headlessui/react'
import { useCallback, useContext } from 'react'

export function EnglishLevelSwitcher() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { state, setState } = useContext(GalleryContext)!

  const onChangeLevel = useCallback(
    (level: string) => {
      setState((draft) => {
        draft.currentEnglishLevel = level as EnglishLevelType
      })
    },
    [setState],
  )

  return (
    <RadioGroup value={state.currentEnglishLevel} onChange={onChangeLevel}>
      <RadioGroup.Label className="sr-only">英語辞書のレベル</RadioGroup.Label>
      <div className="flex flex-wrap items-center gap-2">
        {englishLevelOptions.map((option) => (
          <RadioGroup.Option
            key={option.id}
            value={option.id}
            className={({ checked }) =>
              `cursor-pointer whitespace-nowrap rounded-lg border px-3 py-1.5 text-sm font-medium ${
                checked
                  ? 'border-indigo-500 bg-indigo-500 text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-indigo-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`
            }
          >
            {option.name}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  )
}
