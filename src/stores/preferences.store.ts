import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Country, Station } from '../models'

interface PreferencesStore {
  selectedCountry: Country
  setSelectedCountry: (country: Country) => void
  selectedStation?: Station
  setSelectedStation: (station: Station | undefined) => void
}

const usePreferences = create<PreferencesStore>()(
  persist(
    (set) => ({
      selectedCountry: {
        name: 'Guinea',
        alpha2Code: 'GN',
        flag: 'https://flagcdn.com/gn.svg'
      },

      selectedStation: undefined,

      setSelectedCountry: (selectedCountry) => set({ selectedCountry }),

      setSelectedStation: (selectedStation) => set({ selectedStation })
    }),
    { name: 'preferences-store' }
  )
)

export default usePreferences
