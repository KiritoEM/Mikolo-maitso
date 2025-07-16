import React from 'react';

import AppNavigator from './navigation/appNavigator';
import {AuthProvider} from './context/authContext';

export default function App() {
  return (
  <AuthProvider>
  
      <AppNavigator />
   
  </AuthProvider>
    
  );
}
