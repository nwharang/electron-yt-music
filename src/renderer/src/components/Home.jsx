import { MagnifyingGlassIcon, PlayIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'
import useDebounce from '@/hook/useDebounce'
import Invoke from '@/helper/invoke'

export default function Home() {
  const [PlayingSong, setPlayingSong] = useOutletContext()
  const [SearchTerm, setSearchTerm] = useState('')
  const [SearchData, setSearchData] = useState('')
  const [Loading, setLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(SearchTerm, 300)

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true)
      Invoke('search', debouncedSearchTerm).then((data) => {
        setSearchData(data)
        console.log(data)
        setLoading(false)
      })
    }
  }, [debouncedSearchTerm])

  return (
    <div className="flex-1 h-[calc(100%-5rem)] overflow-y-auto dark:bg-slate-900 bg-gray-300">
      <div className="relative h-full flex-col flex-1 flex items-center justify-between">
        {/* SearchBar Here */}
        <div className="flex w-full max-w-md mt-3 items-center">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5" />
            </div>
            <input onChange={(e) => setSearchTerm(e.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
          </div>
        </div>
        {/* Show data here */}
        <div>{Loading && 'Loading'}</div>
        <div className="flex flex-1 gap-4 flex-wrap p-3">
          {!Loading &&
            SearchData &&
            SearchData.items.map((e, k) => {
              if (e.type != 'video') return
              return (
                <div key={e.title + k + Math.random()} className="w-[calc(100%/2-0.5rem)] h-28 flex flex-row items-center bg-white border border-gray-200 rounded-lg shadow  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <img className="object-cover aspect-square h-full" src={e.bestThumbnail.url} alt="" />
                  <div className="flex flex-1 justify-between p-4 leading-normal">
                    <p className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{e.title}</p>
                  </div>
                  <Link to={'/music'} onClick={() => setPlayingSong(e)}>
                    <Button>
                      <PlayIcon className="w-9 h-9" />
                    </Button>
                  </Link>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
