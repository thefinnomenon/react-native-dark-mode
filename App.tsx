import React, {useContext} from 'react';
import {Theme} from './types';
import styled from 'styled-components/native';
import ThemeManager, {ManageThemeContext} from './contexts/ManageThemeContext';
import {Switch} from 'react-native';

const Home = () => {
  const theme = useContext(ManageThemeContext);
  return (
    <Container>
      <Switch
        value={theme.mode === 'dark'}
        onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
      />
    </Container>
  );
};

const Container = styled.View<Theme>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.background};
`;

const App = () => (
  <ThemeManager>
    <Home />
  </ThemeManager>
);

export default App;
