import React from 'react'
import FullScreenMode from './full-screen-mode'
import MinimizedMode from './minimized-mode'
import useAudio from './hooks/use-audio.hook'
import useOpenCloseAnimation from './hooks/use-open-close-animation.hook'

function AudioPlayer() {
  const {
    toggleStreaming,
    isStreaming,
    volume,
    changeVolume,
    stopStreaming,
    selectedStation
  } = useAudio()

  const { animatedValue, startAnimation } = useOpenCloseAnimation()

  const handleFullScreenModeClosing = () => {
    if (!isStreaming) stopStreaming() 
    startAnimation('close')
  }

  if (!selectedStation) return null

  return (
    <>
      <MinimizedMode
        station={selectedStation}
        isStreaming={isStreaming}
        animatedValue={animatedValue}
        onStop={stopStreaming}
        onClick={() => startAnimation('open')}
      />
      <FullScreenMode
        station={selectedStation}
        volume={volume}
        changeVolume={changeVolume}
        toggleStreaming={toggleStreaming}
        isStreaming={isStreaming}
        animatedValue={animatedValue}
        onCloseClick={handleFullScreenModeClosing}
      />
    </>
  )
}

export default AudioPlayer
