import { motion } from "framer-motion"
import styled from "styled-components"
import { Container, Image, StyledIcon } from "../../../components/ui"

export const BaseContainer = styled(motion.div)`
  padding: 20px;
  background-color: var(--ion-color-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px 15px 0 0;
  color: #fff;
  height: ${window.innerHeight * 0.07}px;

  ${StyledIcon} {
    font-size: 24px;
  }
`
export const InfosContainer = styled(Container)`
  flex: 1;
  align-items: center;
  margin-right: 10px;
`
export const StationImage = styled(Image)`
  width: 15%;
  aspect-ratio: cover;
  margin-right: 15px;
`