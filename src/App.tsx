import React from 'react';
import { NavigationProvider } from './contexts/NavigationContext';
import AppWithHeader from './components/AppWithHeader';

function App() {
  return (
    <NavigationProvider>
      <AppWithHeader />
    </NavigationProvider>
  );
}

export default App;
