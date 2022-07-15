import React from 'react'
import styled from 'styled-components'
import { Container, Image, StyledIcon, Text, TouchableOpacity } from './ui'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { powerOutline } from 'ionicons/icons'
import { Station } from '../models'

const BaseContainer = styled(motion.div)`
  padding: 20px;
  background-color: var(--ion-color-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px 15px 0 0;
  color: #fff;
  height: ${window.innerHeight * 0.07}px;

  ${StyledIcon} {
    font-size: 24px;
  }
`
const InfosContainer = styled(Container)`
  flex: 1;
  align-items: center;
  margin-right: 10px;
`
const StationImage = styled(Image)`
  width: 15%;
  aspect-ratio: cover;
  margin-right: 15px;
`

interface AudioPlayerProps {
  station: Station
  audio: HTMLAudioElement
  animatedValue: MotionValue<number>
  onStop: () => void
  onClick: () => void
}

function AudioPlayer({
  station,
  onStop,
  audio,
  onClick,
  animatedValue
}: AudioPlayerProps) {
  const [canPlay, setCanPlay] = React.useState(false)

  const scale = useTransform(animatedValue, [0, 20], [1, 0])

  const stopStreaming = () => {
    audio.pause()
    onStop()
  }

  const startStreaming = React.useCallback(
    () => {
      setCanPlay(true)
      audio.play()
    },
    // eslint-disable-next-line
    []
  )

  React.useEffect(() => {
    setCanPlay(false)

    audio.src = station.url
    audio.load()

    // eslint-disable-next-line
  }, [station])

  React.useEffect(() => {
    audio.addEventListener('canplay', startStreaming)

    return () => audio.removeEventListener('canplay', startStreaming)
    // eslint-disable-next-line
  }, [])

  return (
    <BaseContainer style={{ scale }} onClick={() => canPlay && onClick()}>
      <InfosContainer>
        <StationImage src={station.favicon} />
        <Text>{station.name}</Text>
      </InfosContainer>

      <TouchableOpacity onClick={stopStreaming}>
        <StyledIcon icon={powerOutline} />
      </TouchableOpacity>
    </BaseContainer>
  )
}

export default AudioPlayer
