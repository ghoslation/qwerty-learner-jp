import DictionaryGroup from './CategoryDicts'
import DictRequest from './DictRequest'
import { LanguageTabSwitcher } from './LanguageTabSwitcher'
import Layout from '@/components/Layout'
import { dictionaries } from '@/resources/dictionary'
import { currentDictInfoAtom } from '@/store'
import type { Dictionary, LanguageCategoryType } from '@/typings'
import groupBy, { groupByDictTags } from '@/utils/groupBy'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { useAtomValue } from 'jotai'
import { createContext, useCallback, useEffect, useMemo } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useNavigate } from 'react-router-dom'
import type { Updater } from 'use-immer'
import { useImmer } from 'use-immer'
import IconInfo from '~icons/ic/outline-info'
import IconX from '~icons/tabler/x'

export type GalleryState = {
  currentLanguageTab: LanguageCategoryType
}

const initialGalleryState: GalleryState = {
  currentLanguageTab: 'en',
}

export const GalleryContext = createContext<{
  state: GalleryState
  setState: Updater<GalleryState>
} | null>(null)

export default function GalleryPage() {
  const [galleryState, setGalleryState] = useImmer<GalleryState>(initialGalleryState)
  const navigate = useNavigate()
  const currentDictInfo = useAtomValue(currentDictInfoAtom)

  const { groupedByCategoryAndTag } = useMemo(() => {
    const currentLanguageCategoryDicts = dictionaries.filter((dict) => dict.languageCategory === galleryState.currentLanguageTab)
    const groupedByCategory = Object.entries(groupBy(currentLanguageCategoryDicts, (dict) => dict.category))
    const groupedByCategoryAndTag = groupedByCategory.map(
      ([category, dicts]) => [category, groupByDictTags(dicts)] as [string, Record<string, Dictionary[]>],
    )

    return {
      groupedByCategoryAndTag,
    }
  }, [galleryState.currentLanguageTab])

  const onBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  useHotkeys('enter,esc', onBack, { preventDefault: true })

  useEffect(() => {
    if (currentDictInfo) {
      setGalleryState((state) => {
        state.currentLanguageTab = currentDictInfo.languageCategory
      })
    }
  }, [currentDictInfo, setGalleryState])

  return (
    <Layout>
      <GalleryContext.Provider value={{ state: galleryState, setState: setGalleryState }}>
        <div className="relative mb-auto mt-auto flex w-full flex-1 flex-col overflow-y-auto pl-20">
          <IconX className="absolute right-20 top-10 mr-2 h-7 w-7 cursor-pointer text-gray-400" onClick={onBack} />
          <div className="mt-20 flex w-full flex-1 flex-col items-center justify-center overflow-y-auto">
            <div className="flex h-full flex-col overflow-y-auto">
              <div className="flex h-20 w-full items-center justify-between pb-6 pr-20">
                <LanguageTabSwitcher />
                <DictRequest />
              </div>
              <ScrollArea.Root className="flex-1 overflow-y-auto">
                <ScrollArea.Viewport className="h-full w-full ">
                  <div className="mr-4 flex flex-1 flex-col items-start justify-start gap-14 overflow-y-auto">
                    {groupedByCategoryAndTag.map(([category, groupeByTag]) => (
                      <DictionaryGroup key={category} groupedDictsByTag={groupeByTag} />
                    ))}
                  </div>
                  <div className="flex items-center justify-center pb-10 pt-[20rem] text-gray-500">
                    <IconInfo className="mr-1 h-5 w-5" />
                    <p className="mr-5 w-10/12 text-xs">
                      本プロジェクトの辞書データは複数のオープンソースプロジェクトとコミュニティ貢献者によって無償提供されています。すべての貢献者の知的財産権に深く感謝し、尊重します。
                      これらのデータは個人の学習と研究のみを目的としており、商業目的での使用は固く禁じられています。データの著作権者であり、当方の使用が権利を侵害しているとお考えの場合は、サイト下部のメールアドレスまでご連絡ください。有効な著作権侵害の申し立てを受けた場合、速やかに関連コンテンツを削除するか、必要な許諾を得ます。
                      また、これらのデータを使用するすべての人が著作権者の権利を尊重し、関連するすべての法律と規則に従うことを推奨します。
                      なお、すべてのデータの合法性と正確性を確保するよう努めていますが、データの正確性、完全性、合法性、信頼性についていかなる保証も行いません。これらのデータの使用は完全にユーザー自身の責任で行ってください。
                    </p>
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="flex touch-none select-none bg-transparent " orientation="vertical"></ScrollArea.Scrollbar>
              </ScrollArea.Root>
              {/* todo: ナビゲーション追加 */}
              {/* <div className="mt-20 h-40 w-40 text-center ">
                <CategoryNavigation />
              </div> */}
            </div>
          </div>
        </div>
      </GalleryContext.Provider>
    </Layout>
  )
}
