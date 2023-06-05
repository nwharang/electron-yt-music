import React, { useState } from 'react'
import Logo from '@/assets/logo.png'
import LogoDark from '@/assets/logo_dark.png'
import { HomeIcon, MusicalNoteIcon, ChevronLeftIcon, ChevronRightIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'

const classNameCombine = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

let NavItem = {
  first: [
    {
      icon: <HomeIcon className="w-full h-full" />,
      text: 'Home',
      url: '/'
    }
  ],
  second: [
    {
      icon: <MusicalNoteIcon className="w-full h-full" />,
      text: 'Help',
      url: '/music'
    }
  ]
}

// let linkActive =

const sidebar = {
  true: {
    width: '16rem'
  },
  false: {
    width: '4.2rem'
  }
}
const sidebarText = {
  true: {
    display: 'block',
    opacity: '100%',
    marginLeft: '1rem',
    transition: {
      delay: 0.3
    }
  },
  false: {
    marginLeft: '0',
    display: 'none',
    opacity: '0%'
  }
}

const SideBar = ({ theme, OpenSeting, setOpenSeting }) => {
  const [OpenSideBar, setOpenSideBar] = useState(false)
  return (
    <motion.aside
      variants={sidebar}
      animate={`${OpenSideBar}`}
      transition={{
        duration: 0.6,
        type: 'linear'
      }}
      className="relative w-[4.2rem] top-0 left-0 z-10 h-full border-r border-gray-300 dark:border-slate-700 animate-bounce"
    >
      {/* open sidebar button */}
      <div className="absolute top-1/2 -right-3 bg-gray-200 dark:bg-gray-800 py-3 border border-gray-300 dark:border-slate-700 rounded-lg flex justify-center items-center">
        <button type="button" onClick={() => setOpenSideBar(!OpenSideBar)}>
          {OpenSideBar ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
        </button>
      </div>
      {/* sidebar container */}
      <div className="flex flex-col h-full pt-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">
        {/* sidebar logo */}
        <div className="flex items-center justify-center mb-3">
          <div className="rounded-full">{theme == 'dark' ? <img src={LogoDark} className="h-10" alt="Wharang Logo" /> : <img src={Logo} className="h-10" alt="Wharang Logo" />}</div>
        </div>
        {/* sidebar item */}
        <div className="flex-1 px-3">
          <ul className="space-y-2 font-medium">
            {NavItem.first.map((e, k) => (
              <li key={e.text + 'frist' + k}>
                <NavLink to={e.url} className={({ isActive, isPending }) => (isPending ? 'animate-bounce' : isActive ? 'bg-white dark:bg-gray-700' : '') + ` flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-white dark:hover:bg-gray-700`}>
                  <div className="w-7 h-7 flex justify-center items-center">{e.icon}</div>
                  <motion.span animate={`${OpenSideBar}`} variants={sidebarText} className="font-bold">
                    {e.text}
                  </motion.span>
                </NavLink>
              </li>
            ))}
          </ul>
          <ul className="pt-2 mt-2 space-y-2 font-medium border-t border-gray-300 dark:border-gray-700">
            {NavItem.second.map((e, k) => (
              <li key={e.text + 'second' + k}>
                <NavLink to={e.url} className={({ isActive, isPending }) => (isPending ? 'animate-bounce' : isActive ? 'bg-white dark:bg-gray-700' : '') + ` flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-white dark:hover:bg-gray-700`}>
                  <div className="w-7 h-7 flex justify-center items-center">{e.icon}</div>
                  <motion.span animate={`${OpenSideBar}`} variants={sidebarText} className="font-bold">
                    {e.text}
                  </motion.span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* sidebar option */}
        <div className="flex py-5 px-3 justify-end items-center border-t border-gray-300 dark:border-gray-700 gap-2">
          <button className="w-10 h-10 justify-center flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={() => setOpenSeting(!OpenSeting)}>
            <Cog6ToothIcon className="w-full h-full" />
          </button>
        </div>
      </div>
    </motion.aside>
  )
}

export default SideBar
