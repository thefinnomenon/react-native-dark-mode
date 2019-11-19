import React from 'react';
import {Theme} from './types';
import styled from 'styled-components/native';
import ThemeManager, {useTheme} from './contexts/ManageThemeContext';
import {Switch} from 'react-native';

const Home = () => {
  // Helper function => useContext(ManageThemeContext)
  const theme = useTheme();
  return (
    <Container>
      <Switch
        value={theme.mode === 'dark'}
        onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
      />
    </Container>
  );
};

// Get the background color from the theme object
const Container = styled.View<Theme>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.background};
`;

// Wrap Home in the ThemeManager so it can access the current theme and
// the function to update it
const App = () => (
  <ThemeManager>
    <Home />
  </ThemeManager>
);

export default App;
