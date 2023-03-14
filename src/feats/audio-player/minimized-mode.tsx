import React from 'react'
import { MotionValue, useTransform } from 'framer-motion'
import { powerOutline } from 'ionicons/icons'
import { StyledIcon, Text, TouchableOpacity } from '../../components/ui'
import { Station } from '../../models'
import {
  BaseContainer,
  InfosContainer,
  StationImage
} from './styleds/minimized-mode.styled'

interface MinimizedModeProps {
  station: Station
  animatedValue: MotionValue<number>
  onStop: () => void
  onClick: () => void
  isStreaming: boolean
}

function MinimizedMode({
  station,
  onStop,
  onClick,
  animatedValue,
  isStreaming
}: MinimizedModeProps) {
  const scale = useTransform(animatedValue, [0, 20], [1, 0])

  return (
    <BaseContainer style={{ scale }} onClick={() => isStreaming && onClick()}>
      <InfosContainer>
        <StationImage src={station.favicon} />
        <Text>{station.name}</Text>
      </InfosContainer>

      <TouchableOpacity onClick={onStop}>
        <StyledIcon icon={powerOutline} />
      </TouchableOpacity>
    </BaseContainer>
  )
}

export default MinimizedMode
