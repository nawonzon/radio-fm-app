import React from 'react'
import styled from 'styled-components'
import useFavorites from '../stores/favorites.store'
import { Container, Text } from '../components/ui'
import { StationList } from '../feats/stations'

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

function Favorites() {
  const [stations] = useFavorites((state) => [state.stations])

  return (
    <BaseContainer>
      <Text color="primary">Favorites</Text>
      <StationList stations={stations} />
    </BaseContainer>
  )
}

export default Favorites
