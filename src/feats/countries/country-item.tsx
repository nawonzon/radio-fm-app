import { Text } from '../../components/ui'
import { Country } from '../../models'
import { CountryContainer, CountryImage } from './styleds/country-item.styled'

interface CountryItemProps {
  country: Country
  onClick: () => void
}

function CountryItem({ country, onClick }: CountryItemProps) {
  return (
    <CountryContainer onClick={onClick}>
      <CountryImage src={country.flag} />
      <Text>{country.name}</Text>
    </CountryContainer>
  )
}

export default CountryItem
