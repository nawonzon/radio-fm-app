import React from 'react'
import styled from 'styled-components'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { powerOutline } from 'ionicons/icons'
import { Container, Image, StyledIcon, Text, TouchableOpacity } from '../../components/ui'
import { Station } from '../../models'

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
