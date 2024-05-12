import React from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBan } from '@fortawesome/free-solid-svg-icons'

const Container = styled.TouchableOpacity<{ color: string }>`
    padding: 8px;
    background-color: ${props => props.color};
    border-radius: 4px;
    margin-bottom: 4px;
`

export interface IGameListItem {
    id: number;
    onPress?: () => void;
    status: string
    no_of_players: number
}

const GameListItem: React.FC<IGameListItem> = ({ status, no_of_players, onPress }) => {
    const isCreated = status === "CREATED";

    const backgroundColor = isCreated ? "#bbed8c" : "#caccc8";


    return (
        <Container color={backgroundColor} onPress={onPress}>
            <Text>Game status: {status} | No. of players: {no_of_players}    {!isCreated && (
                <FontAwesome name="close" size={12} color="red" />
            )}</Text>

        </Container>
    )
}
export default GameListItem;