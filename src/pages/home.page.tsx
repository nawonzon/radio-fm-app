import React from 'react'
import styled from 'styled-components'
import {
  Container,
  StationsContainer,
  StyledIcon,
  Text,
  TouchableOpacity
} from '../components/ui'
import { chevronForwardOutline, heartOutline } from 'ionicons/icons'
import { RadioBrowserApi } from 'radio-browser-api'
import { IonModal } from '@ionic/react'
import ChooseCountryModal from '../components/ChooseCountryModal'
import usePreferences from '../stores/preferences.store'
import StationItem from '../components/StationItem'
import { useNavigate } from 'react-router-dom'
import { Station } from '../models'

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

interface HomeProps {
  onStationClick: (station: Station) => void
  selectedStation?: Station
}

function Home({ onStationClick, selectedStation }: HomeProps) {
  const [stations, setStations] = React.useState<Station[]>([])

  const [country, setCountry] = usePreferences((state) => [
    state.selectedCountry,
    state.setSelectedCountry
  ])

  const countryModalRef = React.useRef<HTMLIonModalElement>(null)

  const navigate = useNavigate()

  const getStations = React.useCallback(async () => {
    const api = new RadioBrowserApi('Radio App')

    const data = await api.searchStations({
      countryCode: country.alpha2Code,
      limit: 100
    })

    setStations(
      data.map((item) => ({
        id: item.id,
        name: item.name,
        tags: item.tags,
        url: item.url,
        favicon: item.favicon
      }))
    )
  }, [country])

  React.useEffect(() => {
    getStations()
  }, [getStations])

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
      </StationsSection>

      <IonModal
        ref={countryModalRef}
        isOpen={false}
        trigger="chooseContryModal"
        breakpoints={[0.7]}
        initialBreakpoint={0.7}
      >
        <ChooseCountryModal
          onChange={(country) => {
            setCountry(country)
            countryModalRef.current?.dismiss()
          }}
        />
      </IonModal>
    </>
  )
}

export default Home
