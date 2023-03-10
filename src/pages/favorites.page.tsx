import React from 'react'
import styled from 'styled-components'
import { Station } from '../models'
import useFavorites from '../stores/favorites.store'
import StationItem from '../components/StationItem'
import { Container, StationsContainer, Text } from '../components/ui'

const BaseContainer = styled(Container)`
  flex-direction: column;
  overflow-y: hidden;
  padding: 0 20px;
  flex-grow: 1;

  & > ${Text} {
    font-weight: 700;
    font-size: large;
    margin: 20px 10px;
  }
`

interface FavoritesProps {
  selectedStation?: Station
  onStationClick: (station: Station) => void
}

function Favorites({ selectedStation, onStationClick }: FavoritesProps) {
  const [stations] = useFavorites((state) => [state.stations])

  return (
    <BaseContainer>
      <Text color="primary">Favorites</Text>

      <StationsContainer>
        {stations.map((item, index) => (
          <StationItem
            key={index}
            station={item}
            isSelected={selectedStation?.id === item.id}
            index={index}
            onClick={() => onStationClick(item)}
          />
        ))}
      </StationsContainer>
    </BaseContainer>
  )
}

export default Favorites
