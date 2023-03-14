import { RadioBrowserApi } from 'radio-browser-api'
import { useCallback, useEffect, useState } from 'react'
import { Country, Station } from '../../models'

function useStations(country: Country) {
  const [stations, setStations] = useState<Station[]>([])

  const getStations = useCallback(async () => {
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

  useEffect(() => {
    getStations()
  }, [getStations])

  return {
    stations
  }
}

export default useStations
