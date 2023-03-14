import { IonRange } from "@ionic/react"
import { motion } from "framer-motion"
import styled from "styled-components"
import { Container, Image, StyledIcon, Text, TouchableOpacity } from "../../../components/ui"

export const BaseContainer = styled(motion.div)`
  position: fixed;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--ion-color-primary);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  z-index: 10;
`
export const Content = styled(Container)`
  flex-direction: column;
  align-items: center;
  width: 70%;

  & > ${Image} {
    width: 100%;
    margin-bottom: 20px;
  }

  & > ${TouchableOpacity} {
    font-size: 54px;
  }
`
export const StationTags = styled(Text)`
  opacity: 0.5;
`
export const VolumeContainer = styled(Container)`
  width: 100%;
  align-items: center;

  & > ${StyledIcon} {
    font-size: 34px;
  }
`
export const Volume = styled(IonRange)`
  --bar-background-active: #fff;
  margin: 20px 10px 20px 0;
`
export const TopContainer = styled(Container)`
  font-size: 34px;
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 20px);
  justify-content: space-between;
  padding: 10px;
`