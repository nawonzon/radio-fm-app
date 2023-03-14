import React from 'react'
import { Station } from '../../models'
import usePreferences from '../../stores/preferences.store'
import StationItem from './station-item'
import { StationsContainer } from './styleds/station-list.styled'

interface StationListProps {
  stations: Station[]
}

function StationList({ stations }: StationListProps) {
  const [selectedStation, setSelectedStation] = usePreferences((state) => [
    state.selectedStation,
    state.setSelectedStation
  ])

  return (
    <StationsContainer>
      {stations.map((item, index) => (
        <StationItem
          key={index}
          station={item}
          isSelected={selectedStation?.id === item.id}
          onClick={() => setSelectedStation(item)}
        />
      ))}
    </StationsContainer>
  )
}

export default StationList
