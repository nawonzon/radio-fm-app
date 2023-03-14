import styled from "styled-components";
import { Container } from "../../../components/ui";

export const BaseContainer = styled(Container)`
  flex-direction: column;
  padding: 20px;
  overflow-y: scroll;
  height: 68%;

  &::-webkit-scrollbar {
    display: none;
  }
`
