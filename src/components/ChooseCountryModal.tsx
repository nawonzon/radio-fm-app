import React from 'react'
import axios from 'axios'
import { IonContent } from '@ionic/react'
import styled from 'styled-components'
import { Container, Text, TouchableOpacity } from './ui'
import { Country } from '../models'

const BaseContainer = styled(Container)`
  flex-direction: column;
  padding: 20px;
  overflow-y: scroll;
  height: 68%;
  
  &::-webkit-scrollbar {
    display: none;
  }
`
const CountryContainer = styled(TouchableOpacity)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const CountryImage = styled.img`
  width: 10%;
  margin-right: 20px;
`

interface ChooseCountryModalProps {
  onChange: (country: Country) => void
}

function ChooseCountryModal({onChange}: ChooseCountryModalProps) {
  const [countries, setCountries] = React.useState<Country[]>([])

  const getContries = async () => {
    const {data} = await axios.get('https://restcountries.com/v2/all')

    setCountries(data.map((country: Country) => ({name: country.name, alpha2Code: country.alpha2Code, flag: country.flag})))
  }

  React.useEffect(() => {
    getContries()
  }, [])

  return (
    <IonContent scrollY={false}>
      <BaseContainer>
        {countries.map((country, index) => (
          <CountryContainer key={index} onClick={() => onChange(country)}>
            <CountryImage src={country.flag} />
            <Text>{country.name}</Text>
          </CountryContainer>
        ))}
      </BaseContainer>
    </IonContent>
  )
}

export default ChooseCountryModal
