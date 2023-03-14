import { Container, StyledIcon } from '../../components/ui'
import React from 'react'
import { HTMLMotionProps } from 'framer-motion'
import { heart, heartOutline } from 'ionicons/icons'
import { Station } from '../../models'
import useFavorites from '../../stores/favorites.store'
import {
  AnimatedStationImage,
  StationContainer,
  StationImage,
  StationName,
  StationTags
} from './styleds/station-item.styled'

interface StationItemProps extends HTMLMotionProps<'div'> {
  station: Station
  isSelected: boolean
}

function StationItem({ station, isSelected, ...restProps }: StationItemProps) {
  const [alreadyAddedToFavorites] = useFavorites((state) => [
    state.alreadyAdded
  ])

  const StationFavIcon = isSelected ? (
    <AnimatedStationImage src={station.favicon} />
  ) : (
    <StationImage src={station.favicon} />
  )

  return (
    <StationContainer
      $isFavorite={alreadyAddedToFavorites(station.id)}
      {...restProps}
    >
      {StationFavIcon}
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
