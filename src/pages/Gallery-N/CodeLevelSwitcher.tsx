import { GalleryContext } from '.'
import { codeLevelOptions } from './codeLevel'
import type { CodeLevelType } from '@/typings'
import { RadioGroup } from '@headlessui/react'
import { useCallback, useContext } from 'react'

export function CodeLevelSwitcher() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { state, setState } = useContext(GalleryContext)!

  const onChangeLevel = useCallback(
    (level: string) => {
      setState((draft) => {
        draft.currentCodeLevel = level as CodeLevelType
      })
    },
    [setState],
  )

  return (
    <RadioGroup value={state.currentCodeLevel} onChange={onChangeLevel}>
      <RadioGroup.Label className="sr-only">Code辞書のカテゴリ</RadioGroup.Label>
      <div className="flex flex-wrap items-center gap-2">
        {codeLevelOptions.map((option) => (
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
