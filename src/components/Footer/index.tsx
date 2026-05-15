import { DonatingCard } from '../DonatingCard'
import { StickerButton } from '../DonatingCard/components/StickerButton'
import redBookCode from '@/assets/redBook-code.jpg'
import InfoPanel from '@/components/InfoPanel'
import Tooltip from '@/components/Tooltip'
import { infoPanelStateAtom } from '@/store'
import type { InfoPanelType } from '@/typings'
import { recordOpenInfoPanelAction } from '@/utils'
import { useAtom } from 'jotai'
import type React from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import IconMail from '~icons/material-symbols/mail'
import IconCoffee2 from '~icons/mdi/coffee'
import IconXiaoHongShu from '~icons/my-icons/xiaohongshu'
import RiLinksLine from '~icons/ri/links-line'
import IconTwitter from '~icons/ri/twitter-fill'
import IconGithub from '~icons/simple-icons/github'
import IconVisualstudiocode from '~icons/simple-icons/visualstudiocode'
import IconWechat2 from '~icons/simple-icons/wechat'
import IconWechat from '~icons/tabler/brand-wechat'
import IconCoffee from '~icons/tabler/coffee'
import IconTerminal2 from '~icons/tabler/terminal-2'
import IconFlagChina from '~icons/twemoji/flag-china'

const Footer: React.FC = () => {
  const [infoPanelState, setInfoPanelState] = useAtom(infoPanelStateAtom)
  const navigate = useNavigate()

  const handleOpenInfoPanel = useCallback(
    (modalType: InfoPanelType) => {
      recordOpenInfoPanelAction(modalType, 'footer')
      setInfoPanelState((state) => ({ ...state, [modalType]: true }))
    },
    [setInfoPanelState],
  )

  const handleCloseInfoPanel = useCallback(
    (modalType: InfoPanelType) => {
      setInfoPanelState((state) => ({ ...state, [modalType]: false }))
    },
    [setInfoPanelState],
  )

  return (
    <>
      <InfoPanel
        openState={infoPanelState.donate}
        title="Buy us a coffee"
        icon={IconCoffee}
        buttonClassName="bg-amber-500 hover:bg-amber-400"
        iconClassName="text-amber-500 bg-amber-100 dark:text-amber-300 dark:bg-amber-500"
        onClose={() => handleCloseInfoPanel('donate')}
      >
        <p className="indent-4 text-sm text-gray-500 dark:text-gray-300">
          Qwerty Learner をご利用いただきありがとうございます。現在このサイトは余暇時間でメンテナンスされています。今後も高品質なサービスを提供し続けるために、皆様のご支援が必要です！
          <br />
          ご寄付はサイトの運営コストの支払い、機能やデザインの改善、ユーザー体験の向上に役立てられます。
          <br />
        </p>
        <br />
        <p className="indent-4 text-sm text-gray-700 dark:text-gray-200">
          共に努力することで Qwerty Learner をより良い学習プラットフォームにできると信じています。また、皆様のご支援が私たちの前進の原動力となります。ご支援に感謝いたします！
        </p>
        <br />
        <p className="indent-4 text-sm text-gray-700 dark:text-gray-200">
          ご厚意に感謝して、1回50元以上のご寄付には Qwerty 特製ステッカー5枚をプレゼントいたします<span className="text-xs">（中国大陸のみ）</span>
          ぜひご友人とお楽しみを共有してください
        </p>
        <div className="flex items-center justify-center py-2">
          <StickerButton className="" />
        </div>

        <DonatingCard />
      </InfoPanel>

      <InfoPanel
        openState={infoPanelState.vsc}
        title="VSCode ながら学習プラグイン"
        icon={IconTerminal2}
        buttonClassName="bg-sky-500 hover:bg-sky-400"
        iconClassName="text-sky-500 bg-sky-100 dark:text-sky-300 dark:bg-sky-500"
        onClose={() => handleCloseInfoPanel('vsc')}
      >
        <p className="text-sm text-gray-500  dark:text-gray-400">
          皆様のご要望に基づき VSCode プラグインを開発しました。ワンクリックで起動し、いつでも単語学習を始められます。任意のファイルでワンクリック起動でき、起動後は単語がステータスバーに表示され、プラグインがユーザーの入力を受け付けるため元のドキュメントに影響しません。
        </p>
        <br /> <br />
        <a className="mr-5 underline dark:text-gray-300" href="https://github.com/Kaiyiwing/qwerty-learner-vscode">
          GitHub プロジェクト
        </a>
        <a className="underline dark:text-gray-300" href="https://marketplace.visualstudio.com/items?itemName=Kaiyi.qwerty-learner">
          VSCode プラグインリンク
        </a>
        <br />
      </InfoPanel>

      <InfoPanel
        openState={infoPanelState.community}
        title="ユーザーフィードバックコミュニティ"
        icon={IconWechat}
        buttonClassName="bg-green-500 hover:bg-green-400"
        iconClassName="text-green-500 bg-green-100 dark:text-green-300 dark:bg-green-500"
        onClose={() => handleCloseInfoPanel('community')}
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Qwerty Learner はオープンソースプロジェクトで、高品質で信頼性の高いタイピング練習ツールを提供することを目指しています。
          <br />
          ユーザーコミュニティに参加すると、開発チームとコミュニケーションを取り、使用体験や提案を共有して製品改善に貢献できるほか、最新情報やアップデート内容をいち早く知ることができます。
          <br />
          <br />
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          ユーザーとの良好な交流とフィードバックが私たちの前進と向上を促す重要な要素だと確信しています。ぜひコミュニティに参加して、より良い
          「Qwerty Learner」！
        </p>
        <br />
        <p className="text-sm text-gray-500  dark:text-gray-400">改めてご支援とご注目に感謝いたします！</p>
        <br />
        <img className="ml-1 w-2/6 " src="https://qwerty.kaiyi.cool/weChat-group.png" alt="weChat-group" />
        <br />
      </InfoPanel>

      <InfoPanel
        openState={infoPanelState.redBook}
        title="小紅書コミュニティ"
        icon={IconXiaoHongShu}
        buttonClassName="bg-red-500 hover:bg-red-400"
        iconClassName="text-red-500 bg-red-100 dark:text-red-600 dark:bg-red-500"
        onClose={() => handleCloseInfoPanel('redBook')}
      >
        <p className="text-sm text-gray-500  dark:text-gray-400">
          Qwerty Learner はオープンソースプロジェクトで、高品質で信頼性の高いタイピング練習ツールを提供することを目指しています。
          <br />
          小紅書をフォローすると、開発チームの最新情報やアップデート内容を入手でき、使用体験や提案をフィードバックして製品改善に貢献できます。
          <br />
          <br />
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-200">
          ユーザーとの良好な交流とフィードバックが私たちの前進と向上を促す重要な要素だと確信しています。ぜひ小紅書アカウントをフォローして、より良い
          「Qwerty Learner」！
        </p>
        <br />
        <img className="ml-1 w-5/12 " src={redBookCode} alt="redBook" />
        <p className="text-sm text-gray-500 dark:text-gray-400">ヒント: 小紅書の「我」の左上にある「三」をタップして「スキャン」を見つけてください</p>
        <br />
      </InfoPanel>

      <footer className="mb-1 mt-4 flex w-full items-center justify-center gap-2.5 text-sm ease-in" onClick={(e) => e.currentTarget.blur()}>
        <a href="https://github.com/Kaiyiwing/qwerty-learner" target="_blank" rel="noreferrer" aria-label="GitHub プロジェクトページへ">
          <IconGithub fontSize={15} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100" />
        </a>

        <button
          className="cursor-pointer"
          type="button"
          onClick={(e) => {
            handleOpenInfoPanel('redBook')
            e.currentTarget.blur()
          }}
          aria-label="小紅書コミュニティに参加"
        >
          <IconXiaoHongShu fontSize={14} className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500" />
        </button>

        <button
          className="cursor-pointer focus:outline-none"
          type="button"
          onClick={(e) => {
            handleOpenInfoPanel('community')
            e.currentTarget.blur()
          }}
          aria-label="WeChat ユーザーグループに参加"
        >
          <IconWechat2 fontSize={16} className="text-gray-500 hover:text-green-500 dark:text-gray-400 dark:hover:text-green-500" />
        </button>

        <a href="https://twitter.com/real_kai42" target="_blank" title="x" rel="noreferrer">
          <IconTwitter fontSize={16} className="text-gray-500 hover:text-[#1DA1F2] dark:text-gray-400 dark:hover:text-[#1DA1F2]" />
        </a>
        <button
          className="cursor-pointer focus:outline-none "
          type="button"
          onClick={(e) => {
            handleOpenInfoPanel('donate')
            e.currentTarget.blur()
          }}
          aria-label="寄付をご検討ください"
        >
          <IconCoffee2 fontSize={16} className="text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500" />
        </button>

        <button
          className="cursor-pointer focus:outline-none"
          type="button"
          onClick={(e) => {
            handleOpenInfoPanel('vsc')
            e.currentTarget.blur()
          }}
          aria-label="Visual Studio Code プラグイン版 Qwerty Learner を使用"
        >
          <IconVisualstudiocode fontSize={14} className="text-gray-500 hover:text-sky-500 dark:text-gray-400 dark:hover:text-sky-500" />
        </button>

        <a
          href="mailto:me@kaiyi.cool"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.currentTarget.blur()}
          aria-label="me@kaiyi.cool にメールを送信"
        >
          <IconMail fontSize={16} className="text-gray-500 hover:text-indigo-400 dark:text-gray-400 dark:hover:text-indigo-400" />
        </a>
        <a rel="noreferrer" className="cursor-pointer focus:outline-none" onClick={() => navigate('/friend-links')} aria-label="相互リンクを見る">
          <RiLinksLine fontSize={14} className="text-gray-500 hover:text-indigo-400 dark:text-gray-400 dark:hover:text-indigo-400" />
        </a>

        <Tooltip content="中国大陸ミラー">
          <a href="https://kaiyiwing.gitee.io/qwerty-learner" target="_self" title="中国大陸ミラーへ">
            <IconFlagChina fontSize={16} />
          </a>
        </Tooltip>

        <button
          className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          type="button"
          onClick={(e) => {
            handleOpenInfoPanel('donate')
            e.currentTarget.blur()
          }}
        >
          @ Qwerty Learner
        </button>

        <a
          className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noreferrer"
        >
          鲁ICP备2022030649号
        </a>
        <span className="select-none rounded bg-slate-200 px-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400">
          Build <span className="select-all">{LATEST_COMMIT_HASH}</span>
        </span>
      </footer>
    </>
  )
}

export default Footer
