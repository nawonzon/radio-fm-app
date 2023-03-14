import { useEffect, useState } from 'react'
import { Country } from '../../models'
import { getCountries } from './countries.service'

function useCountries() {
  const [countries, setCountries] = useState<Country[]>([])

  const loadCountries = async () => {
    const { data } = await getCountries()

    setCountries(
      data.map((country) => ({
        name: country.name,
        alpha2Code: country.alpha2Code,
        flag: country.flag
      }))
    )
  }

  useEffect(() => {
    loadCountries()
  }, [])

  return { countries }
}

export default useCountries
