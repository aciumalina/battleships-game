import { useEffect, useState } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../hooks/authContext";
import { getUserDetails } from "../service/authService";


const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
  align-items: center;
  justify-content: center;
`;


const UserId = styled.Text`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;


const UserEmail = styled.Text`
  font-size: 18px;
  color: #333;
`;

const UserDetailsScreen = () => {
    const auth = useAuth();

    const [userData, setUserData] = useState({
        user: { id: '', email: '' },
        gamesPlayed: 0,
        gamesLost: 0,
        gamesWon: 0,
        currentlyGamesPlaying: 0,
    });

    useEffect(() => {
        const loadUserData = async () => {
            setUserData(await getUserDetails(auth.token));
        };
        loadUserData();
    }, [auth.token]);

    return (
        <Container>
            <UserId>User ID: {userData.user.id}</UserId>
            <UserEmail>Email: {userData.user.email}</UserEmail>
        </Container>
    );
};

export default UserDetailsScreen;
