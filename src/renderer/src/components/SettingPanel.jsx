import { UserProfile } from '@clerk/clerk-react'

const SettingPanel = ({ OpenSeting, setOpenSeting }) => {
  return (
    OpenSeting && (
      <div className="z-20 absolute w-full h-full bg-black/50 top-0 left-0">
        <div className="absolute flex flex-col z-50 w-5/6 top-[calc(100%/12)] left-[calc(100%/12)] bg-gray-200 dark:bg-gray-800 h-5/6 rounded-2xl">
          <div className="flex-1 p-5 w-full flex overflow-hidden">
            <UserProfile
              appearance={{
                elements: {
                  rootBox: 'flex-1',
                  card: 'w-full'
                }
              }}
            />
          </div>
          <div className="h-20 rounded-b-lg p-5 ">
            <div className="flex h-full justify-end items-center gap-5">
              <button className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" onClick={() => setOpenSeting(!OpenSeting)}>
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default SettingPanel
