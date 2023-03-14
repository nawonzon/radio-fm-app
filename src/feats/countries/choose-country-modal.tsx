import { useRef } from 'react'
import { IonContent, IonModal } from '@ionic/react'
import { Country } from '../../models'
import useCountries from './use-countries.hook'
import CountryItem from './country-item'
import { BaseContainer } from './styleds/choose-country-modal.styled'

interface ChooseCountryModalProps {
  trigger: string
  onChooseCountry: (country: Country) => void
}

function ChooseCountryModal({
  trigger,
  onChooseCountry
}: ChooseCountryModalProps) {
  const { countries } = useCountries()

  const modalRef = useRef<HTMLIonModalElement>(null)

  const handleChoosedCountry = (country: Country) => {
    onChooseCountry(country)
    modalRef.current?.dismiss()
  }

  return (
    <IonModal
      ref={modalRef}
      isOpen={false}
      trigger={trigger}
      breakpoints={[0.7]}
      initialBreakpoint={0.7}
    >
      <IonContent scrollY={false}>
        <BaseContainer>
          {countries.map((country) => (
            <CountryItem
              key={country.alpha2Code}
              country={country}
              onClick={() => handleChoosedCountry(country)}
            />
          ))}
        </BaseContainer>
      </IonContent>
    </IonModal>
  )
}

export default ChooseCountryModal
