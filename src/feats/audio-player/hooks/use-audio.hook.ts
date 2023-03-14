import React from 'react'
import usePreferences from '../../../stores/preferences.store'

function useAudio() {
  const audio = React.useRef<HTMLAudioElement>(new Audio()).current

  const [selectedStation, setSelectedStation] = usePreferences((state) => [
    state.selectedStation,
    state.setSelectedStation
  ])

  const [isStreaming, setIsStreaming] = React.useState(false)

  const toggleStreaming = () => {
    if (isStreaming) audio.pause()
    else audio.play()
  }

  const stopStreaming = () => {
    audio.pause()
    setSelectedStation(undefined)
  }

  const changeVolume = (volume: number) => (audio.volume = volume)

  const startStreaming = () => {
    setIsStreaming(true)
    audio.play()
  }

  const onPaused = () => setIsStreaming(false)

  React.useEffect(() => {
    audio.addEventListener('play', startStreaming)
    audio.addEventListener('pause', onPaused)
    audio.addEventListener('canplay', startStreaming)

    return () => {
      audio.removeEventListener('play', startStreaming)
      audio.removeEventListener('pause', onPaused)
      audio.removeEventListener('canplay', startStreaming)
    }
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    setIsStreaming(false)

    if (selectedStation) {
      audio.src = selectedStation.url
      audio.load()
    }

    // eslint-disable-next-line
  }, [selectedStation])

  return {
    toggleStreaming,
    isStreaming,
    changeVolume,
    volume: audio.volume * 100,
    selectedStation,
    stopStreaming
  }
}

export default useAudio
