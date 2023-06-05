import { PlayIcon, PauseIcon, BackwardIcon, ForwardIcon } from '@heroicons/react/24/outline'
import Button from '@/components/ui/Button'
import { useEffect, useRef, useState } from 'react'

const MusicControl = ({ PlayingSong }) => {
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

  const changeRange = () => {
    audioRef.current.currentTime = progressRef.current.value
    changePlayerCurrentTime()
  }

  const changePlayerCurrentTime = () => {
    setCurrentTime(progressRef.current.value)
  }

  const backThirty = () => {
    progressRef.current.value = Number(progressRef.current.value - 30)
    changeRange()
  }

  const forwardThirty = () => {
    progressRef.current.value = Number(progressRef.current.value + 30)
    changeRange()
  }

  return (
    <div className="h-20 dark:bg-slate-800 bg-gray-200 p-3 flex border-t border-gray-300 dark:border-gray-700 pr-20">
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

        <div className="w-full flex justify-center items-center">
          <div className="p-2 text-xs">{calculateTime(currentTime)}</div>
          <input type="range" ref={progressRef} defaultValue="0" className="w-full range range-xs dark:range-primary range-error" />
          <div className="p-2 text-xs">{calculateTime(Duration)}</div>
        </div>

        <div className="flex justify-center items-center">
          <Button onClick={handlePlaying}>{!Playing ? <PlayIcon className="w-9 h-9" /> : <PauseIcon className="w-9 h-9" />}</Button>
        </div>
      </div>

      <div className="flex flex-col basis-1/3 justify-evenly items-end">
        <div className="flex items-center">
          <label className="p-2 text-xs">{parseInt(Volumn * 100, 0) + '%'}</label>
          <input type="range" min="0" max="1" onChange={handleVolume} value={Volumn} step="0.01" className="max-w-[10rem] range range-xs dark:range-primary range-error" />
        </div>
      </div>
    </div>
  )
}

export default MusicControl
