import { NavigationProp, useNavigation } from "@react-navigation/native"
import Login from "../components/login"
import { AuthRouteNames } from "../routes/route-names"
import { useAuth } from "../hooks/authContext"
import { Text } from "react-native";
import { getUserDetails } from "../service/authService";
import { useEffect, useState } from "react";



const UserDetailsScreen = () => {
    const auth = useAuth()

    const [userData, setUserData] = useState({ user: { id: '', email: '' }, gamesPlayed: 0, gamesLost: 0, gamesWon: 0, currentlyGamesPlaying: 0 })

    useEffect(() => {
        const loadUserData = async () => {
            setUserData(await getUserDetails(auth.token))
        }
        loadUserData();

    }, [])

    return (
        <Text>{userData.user.id}, {userData.user.email}</Text>
    )
}

export default UserDetailsScreen