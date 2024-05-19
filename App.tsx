
import { StyleSheet } from 'react-native';
import React from 'react';
import { AuthContextProvider } from './hooks/authContext';
import Router from './routes';


export default function App() {


  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
