import { MotionValue, useTransform } from 'framer-motion'
import {
  closeOutline,
  heart,
  heartOutline,
  pauseOutline,
  playOutline,
  volumeHighOutline
} from 'ionicons/icons'
import { Station } from '../../models'
import useFavorites from '../../stores/favorites.store'
import { Image, StyledIcon, Text, TouchableOpacity } from '../../components/ui'
import {
  BaseContainer,
  Content,
  StationTags,
  TopContainer,
  Volume,
  VolumeContainer
} from './styleds/full-screen-mode.styled'

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

  const HeartIcon = alreadyAddedToFavorites(station.id) ? (
    <StyledIcon icon={heart} onClick={() => removeToFavorites(station.id)} />
  ) : (
    <StyledIcon icon={heartOutline} onClick={() => addToFavorites(station)} />
  )

  return (
    <BaseContainer style={{ clipPath }}>
      <TopContainer>
        <TouchableOpacity>{HeartIcon}</TouchableOpacity>

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
            onIonChange={({ detail }) =>
              changeVolume(parseInt(detail.value.toLocaleString()) / 100)
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
