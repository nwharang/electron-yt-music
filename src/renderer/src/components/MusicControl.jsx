import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import { useEffect, useRef, useState } from 'react'
import { useMatch } from 'react-router-dom'
import { motion } from 'framer-motion'
import Spectrum from '@/components/ui/Spectrum'
const MusicControl = ({ PlayingSong }) => {
  let match = Boolean(useMatch('/music/'))
  const [Playing, setPlaying] = useState(false)
  const [Volumn, setVolumn] = useState(0.5)
  const [currentTime, setCurrentTime] = useState(0)
  const [Duration, setDuration] = useState(0)

  const audioRef = useRef(null)
  const progressRef = useRef(null)
  const animationRef = useRef()

  useEffect(() => {
    progressRef.current.max = Duration
  }, [Duration])

  function calculateTime(secs) {
    let minutes = Math.floor(secs / 60)
    let returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    let seconds = Math.floor(secs % 60)
    let returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes}:${returnedSeconds}`
  }

  function handlePlaying() {
    if (!audioRef?.current?.src) return
    if (Playing) {
      audioRef?.current?.pause()
      setPlaying(false)
      cancelAnimationFrame(animationRef.current)
    } else {
      audioRef?.current?.play()
      setPlaying(true)
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }

  function handleVolume(e) {
    const volume = Number(e?.target?.value || Volumn)
    setVolumn(volume)
    if (audioRef?.current) audioRef.current.volume = volume
  }

  const whilePlaying = () => {
    progressRef.current.value = audioRef.current.currentTime
    changePlayerCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const changeRange = (e) => {
    audioRef.current.currentTime = progressRef.current.value
    changePlayerCurrentTime()
  }

  const changePlayerCurrentTime = () => {
    setCurrentTime(progressRef.current.value)
  }

  return (
    <motion.div
      variants={{
        true: {
          flexBasis: '100%'
        },
        false: {
          flexBasis: '5rem'
        }
      }}
      animate={`${match}`}
      transition={{ duration: 0 }}
      className="bg-gray-200/50 dark:bg-gray-800/50 flex flex-col justify-end "
    >
      <div animate={`${match}`} className="absolute z-0 h-full flex-1" transition={{ duration: 0 }}>
        <Spectrum currentSong={PlayingSong} currentColor={0} audioRef={audioRef} isPlaying={Playing} />
      </div>
      <div className="z-10 flex p-3 h-20 pr-20 border-t border-gray-300 dark:border-slate-700 bg-gray-200/50 dark:bg-gray-800/50">
        <div className="basis-1/3 text-center font-bold">{PlayingSong?.title}</div>
        <div className="flex basis-1/3 justify-center items-center flex-col">
          {PlayingSong && (
            <audio
              ref={audioRef}
              onPlay={() => {
                animationRef.current = requestAnimationFrame(whilePlaying)
                setPlaying(true)
                handleVolume()
                const seconds = Math.floor(audioRef?.current?.duration)
                setDuration(seconds || 0)
              }}
              onPause={() => setPlaying(false)}
              autoPlay
              src={`http://localhost:5174/video/${PlayingSong.id}`}
            />
          )}
          <div className="flex justify-center items-center">
            <Button onClick={handlePlaying}>{!Playing ? <PlayIcon className="w-6 h-6" /> : <PauseIcon className="w-6 h-6" />}</Button>
          </div>
          <div className="w-full flex justify-center items-center">
            <div className="p-2 text-xs">{calculateTime(currentTime)}</div>
            <input type="range" ref={progressRef} onChange={changeRange} defaultValue="0" className="w-full range range-xs dark:range-primary range-error" />
            <div className="p-2 text-xs">{calculateTime(Duration)}</div>
          </div>
        </div>
        <div className="flex flex-col basis-1/3 justify-evenly items-end">
          <div className="flex items-center">
            <label className="p-2 text-xs">{parseInt(Volumn * 100, 0) + '%'}</label>
            <input type="range" min="0" max="1" onChange={handleVolume} value={Volumn} step="0.01" className="max-w-[10rem] range range-xs dark:range-primary range-error" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MusicControl
