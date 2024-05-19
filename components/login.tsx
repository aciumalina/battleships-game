import React, { useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff;
  font-size: 16px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  border-radius: 8px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #007bff;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export interface ILogin {
    onSubmit: (email: string, password: string) => void;
    goToRegister: () => void;
}

const Login: React.FC<ILogin> = ({ onSubmit, goToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => onSubmit(email, password);

    return (
        <Container>
            <Input
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={setEmail}
            />
            <Input
                placeholder="Password"
                secureTextEntry
                onChangeText={setPassword}
            />
            <Button onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
            </Button>
            <Button onPress={goToRegister}>
                <ButtonText>Go to Register</ButtonText>
            </Button>
        </Container>
    );
};

export default Login;
