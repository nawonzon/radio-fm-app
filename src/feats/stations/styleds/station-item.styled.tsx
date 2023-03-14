import styled, { keyframes } from "styled-components"
import { Container, Image, StyledIcon, Text, TouchableOpacity } from "../../../components/ui"

const rotateAnim = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`
export const StationContainer = styled(TouchableOpacity)<{ $isFavorite: boolean }>`
  display: flex;
  padding: 5px;

  & > ${Container} {
    margin-left: 15px;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    & > ${StyledIcon} {
      font-size: 24px;
      flex-shrink: 0;
      margin-left: 5px;
      ${(props) => props.$isFavorite && 'color: #ee0000;'}
    }

    ${Container} {
      flex-direction: column;
    }
  }
`
export const StationImage = styled(Image)`
  width: 25%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 5px;
`
export const AnimatedStationImage = styled(StationImage)`
  animation: ${rotateAnim} 2s linear infinite;
  border-radius: 50%;
`
export const StationName = styled(Text)`
  font-size: small;
  font-weight: 600;
  text-transform: uppercase;
`
export const StationTags = styled(Text)`
  font-size: small;
  opacity: 0.6;
`