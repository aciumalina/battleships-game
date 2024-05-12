import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { login, register, getUserDetails } from './service/authService';
import React from 'react';
import { AuthContextProvider } from './hooks/authContext';
import Router from './routes';
import { useNavigation } from '@react-navigation/native';
import { AuthRouteNames } from './routes/route-names';


// const handleLoginPress = async (email: string, password: string) => {
//   const response = await getUserDetails();
//   console.log(response)
// }

const handleRegisterPress = async (email: string, password: string) => {
  const response = await register(email, password);
  console.log(response)
}



export default function App() {


  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>

    // <View style={styles.container}>
    //   <Text>zuzuzu1</Text>
    //   <StatusBar style="auto" />
    //   {/* <Button title='login' onPress={() => handleLoginPress('tuxi puxi', 'parola')}></Button>
    //   <Button title='register' onPress={() => handleRegisterPress('tuxi puxi4', 'parola')}></Button> */}
    // </View>
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
