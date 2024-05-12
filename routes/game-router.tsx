import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GameRouteNames } from './route-names';
import { Text, Button } from 'react-native';
import UserDetailsScreen from '../screens/userDetailsScreen';
import LobbyScreen from '../screens/lobbyScreen';
import GameScreen from '../screens/gameScreen';
// import TableScreen from '../screens/game/Table.screen';

const GameStack = createNativeStackNavigator()

const gameRoutes = (

    <GameStack.Navigator>
        <GameStack.Screen name={GameRouteNames.LOBBY} component={LobbyScreen} options={{
            headerTitle: 'Lobby',
        }} />
        <GameStack.Screen name={GameRouteNames.GAME} component={GameScreen} options={{
            headerTitle: 'GAME',
        }} />
        <GameStack.Screen name={GameRouteNames.DETAILS} component={UserDetailsScreen} options={{
            headerTitle: (props) => <Text {...props}>Details Screen</Text>
        }} />
    </GameStack.Navigator>
)

export default gameRoutes;