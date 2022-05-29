import styled, { createGlobalStyle } from "styled-components";
import { Menu } from "./Menu/Menu";
import { Content } from "./Content/Content";

const AppContainer = styled.div`
  background-color: #221c35;
  width: 1440px;
  height: 810px;
  display: flex;
  flex-direction: row;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    display: none;
  }
`;

function App() {
  return (
    <AppContainer>
      <GlobalStyle />
      <Menu focusKey="MENU" />
      <Content />
    </AppContainer>
  );
}

export default App;
