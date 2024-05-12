import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import { AuthRouteNames } from './route-names';
import { Text } from 'react-native'
import UserDetailsScreen from '../screens/userDetailsScreen';

const AuthStack = createNativeStackNavigator()

const authRoutes = (
    <AuthStack.Navigator initialRouteName='Login'>
        <AuthStack.Screen name={AuthRouteNames.LOGIN} component={LoginScreen} options={{
            headerTitle: (props) => <Text {...props}>Login</Text>
        }} />
        <AuthStack.Screen name={AuthRouteNames.REGISTER} component={RegisterScreen} options={{
            headerTitle: (props) => <Text {...props}>Register</Text>
        }} />



    </AuthStack.Navigator>
)

export default authRoutes;