import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../hooks/authContext";
import { TouchableOpacity, Text } from "react-native";
import { useEffect, useState } from "react";
import { listGames, createGame, joinGame } from "../service/gameService";
import GameListItem from "../components/gameListItem";
import styled from "styled-components/native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameRouteNames } from "../routes/route-names";

const Container = styled(SafeAreaView)`
  display: flex;
  flex: 1;
  padding: 0 8px;
`;

const GameList = styled.ScrollView``;

const LobbyScreen = () => {
    const auth = useAuth();
    const [games, setGames] = useState<any[]>([]);
    const navigation = useNavigation<any>();

    useEffect(() => {
        async function loadGames() {
            const gamesList = await listGames(auth.token);
            setGames(gamesList.games);
        }
        loadGames();
    }, []);

    const handleCreateGame = async () => {
        await createGame(auth.token);
    };

    const handleJoinGame = async (gameId: string, gameStatus: string) => {
        if (gameStatus !== "CREATED") {
            alert("Can't join this game!");
            return;
        }

        const result = await joinGame(auth.token, gameId);
        if (result.status !== 200)
            alert("there was a problem joining this game! Status code " + result.status);
        else
            navigation.navigate(GameRouteNames.GAME, { gameId: gameId });
    };

    const handleNavigateToUserDetails = () => {
        navigation.navigate(GameRouteNames.DETAILS);
    };

    return (
        <Container>
            <TouchableOpacity onPress={handleCreateGame} style={{ marginBottom: 10 }}>
                <Text>Create Game</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigateToUserDetails} style={{ marginBottom: 10 }}>
                <Text>User Details</Text>
            </TouchableOpacity>
            <GameList>
                {games.map(game => (
                    <GameListItem
                        no_of_players={game.player2Id === null ? 1 : 2}
                        status={game.status}
                        id={game.id}
                        key={game.id}
                        onPress={() => handleJoinGame(game.id, game.status)}
                    />
                ))}
            </GameList>
        </Container>
    );
};

export default LobbyScreen;
