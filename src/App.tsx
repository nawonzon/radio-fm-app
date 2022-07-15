import {
  IonApp,
  IonButtons,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { Container, StyledIcon } from './components/ui'
import { animate, useMotionValue } from 'framer-motion'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { COLORS } from './constants'
import AudioPlayer from './components/AudioPlayer'
import FullScreenModeModal from './components/FullScreenModeModal'
import Home from './components/Home'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Favorites from './components/Favorites'
import { chevronBack } from 'ionicons/icons'
import usePreferences from './stores/preferences'

const BaseContainer = styled(Container)`
  flex-direction: column;
  height: 100%;
`
const BackIcon = styled(StyledIcon)`
  font-size: 24px;
  opacity: 0.5;
`
const GlobalStyles = createGlobalStyle`
  :root {
    --ion-color-primary: ${COLORS.primary};
    --ion-color-secondary: ${COLORS.secondary}
  }
`

function App() {
  const animatedValue = useMotionValue(0)

  const startAnimation = (action: 'open' | 'close') => {
    animate(animatedValue, action === 'open' ? 100 : 0, {
      type: 'tween',
      duration: 0.6
    })
  }

  const audio = React.useRef<HTMLAudioElement>(new Audio()).current

  const [selectedStation, setSelectedStation] = usePreferences((state) => [
    state.selectedStation,
    state.setSelectedStation
  ])

  const location = useLocation()

  const navigate = useNavigate()

  return (
    <IonApp>
      <GlobalStyles />

      <IonPage>
        <IonToolbar>
          <IonButtons slot="start">
            {location.pathname !== '/' && (
              <BackIcon icon={chevronBack} onClick={() => navigate('/')} />
            )}
          </IonButtons>
          <IonTitle>Radio fm</IonTitle>
        </IonToolbar>

        <IonContent scrollY={false}>
          <BaseContainer>
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    onStationClick={(station) => setSelectedStation(station)}
                    selectedStation={selectedStation}
                  />
                }
              />
              <Route
                path="/favorites"
                element={
                  <Favorites
                    onStationClick={(station) => setSelectedStation(station)}
                    selectedStation={selectedStation}
                  />
                }
              />
            </Routes>

            {selectedStation && (
              <>
                <AudioPlayer
                  station={selectedStation}
                  audio={audio}
                  animatedValue={animatedValue}
                  onStop={() => setSelectedStation(undefined)}
                  onClick={() => startAnimation('open')}
                />
                <FullScreenModeModal
                  station={selectedStation}
                  audio={audio}
                  animatedValue={animatedValue}
                  onCloseClick={() => startAnimation('close')}
                />
              </>
            )}
          </BaseContainer>
        </IonContent>
      </IonPage>
    </IonApp>
  )
}

export default App
