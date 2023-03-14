import React from 'react'
import styled from 'styled-components'
import { Container, StyledIcon, Text, TouchableOpacity } from '../components/ui'
import { chevronForwardOutline, heartOutline } from 'ionicons/icons'
import ChooseCountryModal from '../feats/countries/choose-country-modal'
import usePreferences from '../stores/preferences.store'
import { useNavigate } from 'react-router-dom'
import { StationList, useStations } from '../feats/stations'

const TopSection = styled(Container)`
  flex-direction: column;
`
const Option = styled(Container)`
  border-bottom: 1px solid #4444;

  & > ${TouchableOpacity} {
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  ${StyledIcon} {
    font-size: 24px;
  }
`
const OptionImage = styled.img`
  width: 7%;
`
const StationsSection = styled(Container)`
  flex-direction: column;
  overflow-y: hidden;
  padding: 20px;
  padding-bottom: 0;
  flex-grow: 1;

  & > ${Text} {
    font-weight: 700;
    font-size: large;
    margin: 20px 10px;
  }
`

function Home() {
  const [country, setSelectedCountry] = usePreferences((state) => [
    state.selectedCountry,
    state.setSelectedCountry
  ])

  const { stations } = useStations(country)

  const navigate = useNavigate()

  return (
    <>
      <TopSection>
        <Option>
          <TouchableOpacity id="chooseContryModal">
            <OptionImage src={country.flag} />
            <Text>Change selected contry</Text>
            <StyledIcon icon={chevronForwardOutline} />
          </TouchableOpacity>
        </Option>
        <Option>
          <TouchableOpacity onClick={() => navigate('/favorites')}>
            <StyledIcon icon={heartOutline} />
            <Text>Favorite Stations</Text>
            <StyledIcon icon={chevronForwardOutline} />
          </TouchableOpacity>
        </Option>
      </TopSection>

      <StationsSection>
        <Text color="primary">Stations</Text>
        <StationList stations={stations} />
      </StationsSection>

      <ChooseCountryModal
        trigger="chooseContryModal"
        onChooseCountry={(choosedCountry) => setSelectedCountry(choosedCountry)}
      />
    </>
  )
}

export default Home
