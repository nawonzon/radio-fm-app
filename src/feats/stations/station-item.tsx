import styled, { keyframes } from 'styled-components'
import {
  Container,
  Image,
  StyledIcon,
  Text,
  TouchableOpacity
} from '../../components/ui'
import React from 'react'
import { HTMLMotionProps } from 'framer-motion'
import { heart, heartOutline } from 'ionicons/icons'
import { Station } from '../../models'
import useFavorites from '../../stores/favorites.store'

const rotateAnim = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
const StationContainer = styled(TouchableOpacity)<{ $isFavorite: boolean }>`
  display: flex;
  padding: 5px;

  & > ${Container} {
    margin-left: 15px;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    & > ${StyledIcon} {
      font-size: 24px;
      flex-shrink: 0;
      margin-left: 5px;
      ${(props) => props.$isFavorite && 'color: #ee0000;'}
    }

    ${Container} {
      flex-direction: column;
    }
  }
`
const StationImage = styled(Image)`
  width: 25%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 5px;
`
const AnimatedStationImage = styled(StationImage)`
  animation: ${rotateAnim} 2s linear infinite;
  border-radius: 50%;
`
const StationName = styled(Text)`
  font-size: small;
  font-weight: 600;
  text-transform: uppercase;
`
const StationTags = styled(Text)`
  font-size: small;
  opacity: 0.6;
`
interface StationItemProps extends HTMLMotionProps<'div'> {
  station: Station
  isSelected: boolean
  index: number
}

function StationItem({
  station,
  isSelected,
  index,
  ...restProps
}: StationItemProps) {
  const [alreadyAddedToFavorites] = useFavorites((state) => [
    state.alreadyAdded
  ])

  const FavIcon = isSelected ? (
    <AnimatedStationImage src={station.favicon} />
  ) : (
    <StationImage src={station.favicon} />
  )

  return (
    <StationContainer
      $isFavorite={alreadyAddedToFavorites(station.id)}
      {...restProps}
    >
      {FavIcon}
      <Container>
        <Container>
          <StationName>{station.name}</StationName>
          <StationTags>{station.tags.join('-')}</StationTags>
        </Container>
        <StyledIcon
          icon={alreadyAddedToFavorites(station.id) ? heart : heartOutline}
        />
      </Container>
    </StationContainer>
  )
}

export default StationItem
