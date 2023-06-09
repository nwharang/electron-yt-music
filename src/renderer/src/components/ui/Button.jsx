import React from 'react'

const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium 
    text-gray-800 dark:text-gray-300 
    rounded-full group bg-gradient-to-br 
    from-pink-500  to-orange-400 
    dark:from-purple-600 dark:to-blue-500 
    group-hover:from-pink-500 group-hover:to-orange-400
    dark:group-hover:from-purple-600 dark:group-hover:to-blue-500
    hover:text-gray-300
    dark:hover:text-gray-800
     focus:ring-4 focus:outline-none 
    focus:ring-pink-200 
    dark:focus:ring-slate-700"
    >
      <span className="relative px-1 py-1 transition-all ease-in duration-150 bg-gray-200 dark:bg-gray-800 rounded-full group-hover:bg-opacity-0">{children}</span>
    </button>
  )
}

export default Button
