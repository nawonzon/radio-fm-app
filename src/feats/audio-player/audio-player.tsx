import { animate, useMotionValue } from 'framer-motion'
import React from 'react'
import FullScreenMode from './full-screen-mode'
import MinimizedMode from './minimized-mode'
import useAudio from './use-audio.hook'

function AudioPlayer() {

  const {toggleStreaming, isStreaming, volume, changeVolume, stopStreaming, selectedStation} = useAudio()

  const animatedValue = useMotionValue(0)

  const startAnimation = (action: 'open' | 'close') => {
    animate(animatedValue, action === 'open' ? 100 : 0, {
      type: 'tween',
      duration: 0.6
    })
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
        onCloseClick={() => startAnimation('close')}
      />
    </>
  )
}

export default AudioPlayer
