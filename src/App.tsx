import {
  IonApp,
  IonButtons,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { Container, StyledIcon } from './components/ui'
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { COLORS } from './constants'
import Home from './pages/home.page'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Favorites from './pages/favorites.page'
import { chevronBack } from 'ionicons/icons'
import { AudioPlayer } from './feats/audio-player'

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
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>

            <AudioPlayer />
          </BaseContainer>
        </IonContent>
      </IonPage>
    </IonApp>
  )
}

export default App
