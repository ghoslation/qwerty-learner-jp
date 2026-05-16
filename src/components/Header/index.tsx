import logo from '@/assets/logo.svg'
import UserSwitcher from '@/components/UserSwitcher.tsx'
import type { PropsWithChildren } from 'react'
import type React from 'react'
import { NavLink } from 'react-router-dom'

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="container z-20 mx-auto w-full px-10 py-6">
      <div className="flex w-full flex-col items-center gap-3 lg:flex-row lg:items-center">
        <NavLink
          className="flex items-center text-2xl font-bold text-indigo-500 no-underline hover:no-underline lg:text-4xl"
          to="/"
        >
          <img src={logo} className="mr-3 h-16 w-16" alt="Qwerty Learner JP Logo" />
          <h1>Qwerty Learner JP</h1>
        </NavLink>
        <nav className="my-card on element flex w-auto content-center items-center justify-end space-x-3 rounded-xl bg-white p-4 transition-colors duration-300 dark:bg-gray-800 lg:ml-auto">
          {children}
        </nav>
      </div>
      <div className="fixed right-4 top-8 z-30 lg:right-10 lg:top-10">
        <UserSwitcher />
      </div>
    </header>
  )
}

export default Header
