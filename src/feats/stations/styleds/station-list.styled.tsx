import styled from "styled-components";
import { Container } from "../../../components/ui";

export const StationsContainer = styled(Container)`
  flex-direction: column;
  overflow-y: scroll;
  gap: 10px;

  &::-webkit-scrollbar {
    display: none;
  }
`