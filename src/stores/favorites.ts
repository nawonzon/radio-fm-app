import create from 'zustand'
import { persist } from 'zustand/middleware'
import { Station } from '../models'

interface FavoritesStore {
  stations: Station[]
  addStation: (station: Station) => void
  removeStation: (stationId: string) => void
  alreadyAdded: (stationId: string) => boolean
}

const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      stations: [],

      addStation: (station) => set({ stations: [station, ...get().stations] }),

      removeStation: (stationId) => {
        const stations = get().stations.filter(
          (station) => station.id !== stationId
        )

        set({ stations })
      },

      alreadyAdded: (stationId) =>
        get().stations.some((station) => station.id === stationId)
    }),
    { name: 'favorites-store' }
  )
)

export default useFavorites
