import Icon from '@/assets/favicon.ico'
import Invoke from '@/helper/Invoke'
import { useEffect, useState } from 'react'
const Toolbar = ({ title = 'Wharang Music App' }) => {
  const [UserInfo, setUserInfo] = useState(null)
  useEffect(() => {
    Invoke('userInfo').then((data) => setUserInfo(data))
  }, [])
  return (
    <div className="relative bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 dark:from-blue-500 dark:to-purple-600 ">
      <div className=" windows-move-drag h-8 flex justify-center items-center shadow ">
        <p className="text-xs font-bold text-gray-300">{`${title} [${UserInfo?.username || 'Loading...'}]`}</p>
        <div className="h-full"></div>
      </div>
      <div className="windows-no-drag absolute top-0 right-0 h-full flex gap-5 mr-3 text-gray-300">
        <button onClick={() => Invoke('minimize')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
          </svg>
        </button>
        <button onClick={() => Invoke('maximize')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M 11.4 11.4 M 5.7 19.2 h 11.4 A 2.1 2.1 90 0 0 19 17.1 V 5.7 A 2.1 2.1 90 0 0 17.1 3.8 H 5.7 A 2.1 2.1 90 0 0 3.8 5.7 v 11.4 A 2.1 2.1 90 0 0 5.7 19.2 z" />
          </svg>
        </button>
        <button onClick={() => Invoke('exit')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Toolbar
