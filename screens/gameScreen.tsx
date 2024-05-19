import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../hooks/authContext';
import { Picker } from '@react-native-picker/picker';
import { sendConfiguration } from '../service/gameService';


const GameBoard = (gameId: any) => {
    const [selectedOption, setSelectedOption] = useState('HORIZONTAL');
    const [selectedLength, setSelectedLength] = useState('2');
    const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
    const [planesList, setPlanesList] = useState<{ x: string | undefined; y: string | undefined; size: string; direction: string }[]>([])
    const [coloredCells, setColoredCells] = useState<any[]>([]);
    const auth = useAuth();



    const generateCellId = (row: number, col: number) => {
        const rowName = String.fromCharCode(65 + col);
        return `${rowName}${row + 1}`;
    };



    const rows = 10;
    const cols = 10;


    const handleCellPress = (row: number, col: number) => {
        const cellId = generateCellId(row, col);
        setSelectedCell({ row, col });
    };


    const shouldColorCell = (row: number, col: number) => {
        if (coloredCells.some(cell => cell.i === row && cell.j === col))
            return true

        if (!selectedCell) return false;

        const { row: selectedRow, col: selectedCol } = selectedCell;
        const length = parseInt(selectedLength, 10);

        // Verificare pentru orientare
        if (selectedOption === 'HORIZONTAL') {
            return row === selectedRow && col >= selectedCol && col < selectedCol + length;
        } else if (selectedOption === 'VERTICAL') {
            return col === selectedCol && row >= selectedRow && row < selectedRow + length;
        }

        return false;
    };
    const handleSavePlane = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (shouldColorCell(i, j))
                    setColoredCells(prevColoredCells => prevColoredCells.concat({ i, j }))

            }
        }

        const cellName = generateCellId(selectedCell!.row, selectedCell!.col)
        setPlanesList(prevPlanesList => prevPlanesList.concat({ "x": cellName[0], "y": cellName.substring(1), "size": selectedLength, "direction": selectedOption }));

    }

    const handleSubmitConfiguration = async () => {
        await sendConfiguration(auth.token, gameId, planesList)
    }

    const handleResetConfiguration = async () => {
        setPlanesList([])
        setColoredCells([])
    }
    const renderCells = () => {
        const cells = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cellId = generateCellId(i, j);
                cells.push(
                    <TouchableOpacity
                        key={cellId}
                        onPress={() => handleCellPress(i, j)}
                        style={[styles.cell, shouldColorCell(i, j) && styles.selectedCell]}
                    >
                        <Text>{cellId}</Text>
                    </TouchableOpacity>
                );
            }
        }
        return cells;
    };

    return (
        <View >

            <View style={styles.board}>
                {renderCells()}
            </View>
            <View >
                <Text>Select orientation:</Text>
                <Picker
                    selectedValue={selectedOption}
                    onValueChange={(itemValue) => {
                        setSelectedOption(itemValue);
                    }
                    }
                >
                    <Picker.Item label="Horizontal" value="HORIZONTAL" />
                    <Picker.Item label="Vertical" value="VERTICAL" />
                </Picker>
                <Text>Select length:</Text>
                <Picker
                    selectedValue={selectedLength}
                    onValueChange={(itemValue) => {
                        setSelectedLength(itemValue);
                    }
                    }
                >
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                <Button title='Add plane' onPress={handleSavePlane}>

                </Button>
                <Button title='Submit Configuration' onPress={handleSubmitConfiguration}></Button>
                <Button title='Reset Configuration' onPress={handleResetConfiguration}></Button>
            </View>
        </View>
    );
};

const GameScreen = () => {
    const route = useRoute<any>()


    return (
        <SafeAreaView>
            <Text>Game</Text>
            <GameBoard gameId={route.params.gameId} />
        </SafeAreaView>
    );
};

export default GameScreen;

const styles = StyleSheet.create({

    optionsContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    board: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cell: {
        width: '10%',
        aspectRatio: 1,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedCell: {
        backgroundColor: 'green',
    },
});