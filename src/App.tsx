import React from 'react';
import TaxiSimulator from './components/TaxiSimulator';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <TaxiSimulator />
    </ThemeProvider>
  );
}
