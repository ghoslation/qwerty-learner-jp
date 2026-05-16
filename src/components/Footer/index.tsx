import Tooltip from '@/components/Tooltip'
import type React from 'react'
import packageJson from '../../../package.json'
import IconGithub from '~icons/simple-icons/github'

const Footer: React.FC = () => {
  return (
    <div className="mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
      <Tooltip content="このプロジェクト GitHub">
        <a href="https://github.com/Kaiyiwing/qwerty-learner" target="_blank" rel="noreferrer" aria-label="このプロジェクト GitHub">
          <IconGithub fontSize={14} className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200" />
        </a>
      </Tooltip>
      <Tooltip content="Fork 元 GitHub">
        <a href="https://github.com/RealKai42/qwerty-learner" target="_blank" rel="noreferrer" aria-label="Fork 元 GitHub">
          <IconGithub fontSize={14} className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300" />
        </a>
      </Tooltip>
      <a href="https://qwerty.kaiyi.cool/" target="_blank" rel="noreferrer" className="text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
        Fork元サイト
      </a>
      <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noreferrer" className="hover:text-gray-800 dark:hover:text-gray-200">
        License: GPL-3.0
      </a>
      <span>Version: {packageJson.version}</span>
    </div>
  )
}

export default Footer
