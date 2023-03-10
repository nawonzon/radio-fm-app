import { IonRange } from '@ionic/react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import {
  closeOutline,
  heart,
  heartOutline,
  pauseOutline,
  playOutline,
  volumeHighOutline
} from 'ionicons/icons'
import styled from 'styled-components'
import { Station } from '../../models'
import useFavorites from '../../stores/favorites.store'
import { Container, Image, StyledIcon, Text, TouchableOpacity } from '../../components/ui'

const BaseContainer = styled(motion.div)`
  position: fixed;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--ion-color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 10;
`
const Content = styled(Container)`
  flex-direction: column;
  align-items: center;
  width: 70%;

  & > ${Image} {
    width: 100%;
    margin-bottom: 20px;
  }

  & > ${TouchableOpacity} {
    font-size: 54px;
  }
`
const StationTags = styled(Text)`
  opacity: 0.5;
`
const VolumeContainer = styled(Container)`
  width: 100%;
  align-items: center;

  & > ${StyledIcon} {
    font-size: 34px;
  }
`
const Volume = styled(IonRange)`
  --bar-background-active: #fff;
  margin: 20px 10px 20px 0;
`
const TopContainer = styled(Container)`
  font-size: 34px;
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 20px);
  justify-content: space-between;
  padding: 10px;
`

interface FullScreenModeProps {
  station: Station
  animatedValue: MotionValue<number>
  onCloseClick: () => void
  toggleStreaming: () => void
  isStreaming: boolean
  volume: number
  changeVolume: (volume: number) => void
}

function FullScreenMode({
  station,
  animatedValue,
  onCloseClick,
  toggleStreaming,
  isStreaming,
  changeVolume,
  volume
}: FullScreenModeProps) {
  const [addToFavorites, removeToFavorites, alreadyAddedToFavorites] =
    useFavorites((state) => [
      state.addStation,
      state.removeStation,
      state.alreadyAdded
    ])

  const clipPath = useTransform(
    animatedValue,
    [20, 100],
    [
      'polygon(50% 100%, 50% 100%, 50% 100%, 50% 100%)',
      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
    ]
  )

  return (
    <BaseContainer style={{ clipPath }}>
      <TopContainer>
        <TouchableOpacity>
          {alreadyAddedToFavorites(station.id) ? (
            <StyledIcon
              icon={heart}
              onClick={() => removeToFavorites(station.id)}
            />
          ) : (
            <StyledIcon
              icon={heartOutline}
              onClick={() => addToFavorites(station)}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity onClick={onCloseClick}>
          <StyledIcon icon={closeOutline} />
        </TouchableOpacity>
      </TopContainer>

      <Content>
        <Image src={station.favicon} />
        <Text>{station.name}</Text>
        <StationTags>{station.tags.join(' - ')}</StationTags>

        <VolumeContainer>
          <Volume
            value={volume}
            onIonChange={({ detail }) => changeVolume(parseInt(detail.value.toLocaleString()) / 100)
            }
          />
          <StyledIcon icon={volumeHighOutline} />
        </VolumeContainer>

        <TouchableOpacity onClick={toggleStreaming}>
          <StyledIcon icon={isStreaming ? pauseOutline : playOutline} />
        </TouchableOpacity>
      </Content>
    </BaseContainer>
  )
}

export default FullScreenMode
