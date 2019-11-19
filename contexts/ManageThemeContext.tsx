import React, {createContext, useState, FC, useEffect} from 'react';
import {ThemeMode, ThemeContext} from '../types';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components/native';
// @ts-ignore
import {Appearance, AppearanceProvider} from 'react-native-appearance';
import lightTheme from '../themes/light';
import darkTheme from '../themes/dark';

// Get OS default mode or default to 'light'
const defaultMode = Appearance.getColorScheme() || 'light';

// Create ManageThemeContext which will hold the current mode and a function to change it
const ManageThemeContext = createContext<ThemeContext>({
  mode: defaultMode,
  setMode: mode => console.log(mode),
});

// Export a helper function to easily use the Context
export const useTheme = () => React.useContext(ManageThemeContext);

// Create  the Provider
const ManageThemeProvider: FC = ({children}) => {
  const [themeState, setThemeState] = useState(defaultMode);

  const setMode = (mode: ThemeMode) => {
    setThemeState(mode);
  };

  // Subscribe to OS mode changes
  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({colorScheme}: {colorScheme: ThemeMode}) => {
        setThemeState(colorScheme);
      },
    );
    return () => subscription.remove();
  }, []);

  // Return a component which wraps its children in a styled-component ThemeProvider,
  // sets the status bar color, and injects the current mode and a function to change it
  return (
    <ManageThemeContext.Provider
      value={{mode: themeState as ThemeMode, setMode}}>
      <ThemeProvider
        theme={themeState === 'dark' ? darkTheme.theme : lightTheme.theme}>
        <>
          <StatusBar
            barStyle={themeState === 'dark' ? 'light-content' : 'dark-content'}
          />
          {children}
        </>
      </ThemeProvider>
    </ManageThemeContext.Provider>
  );
};

// This wrapper is needed to add the ability to subscribe to OS mode changes
const ManageThemeProviderWrapper: FC = ({children}) => (
  <AppearanceProvider>
    <ManageThemeProvider>{children}</ManageThemeProvider>
  </AppearanceProvider>
);

export default ManageThemeProviderWrapper;
