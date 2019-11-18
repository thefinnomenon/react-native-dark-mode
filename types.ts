export type ThemeMode = 'light' | 'dark';

export interface ThemeContext {
  mode: ThemeMode;
  setMode(mode: string): void;
}

export interface Theme {
  theme: {
    background: string;
    border: string;
    backgroundAlt: string;
    borderAlt: string;
    text: string;
  };
}
