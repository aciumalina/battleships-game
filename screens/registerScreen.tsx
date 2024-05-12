import { useNavigation } from "@react-navigation/native";
import Register from "../components/register"
import { useAuth } from "../hooks/authContext"
import { AuthRouteNames } from "../routes/route-names";
import { register } from "../service/authService";




const RegisterScreen = () => {
    const auth = useAuth()
    const navigation = useNavigation<any>();

    const handleRegister = async (email: string, password: string) => {
        try {
            const result = await register(email, password);
            console.log('register: ', result)
            if (result.email !== undefined) {
                alert("Account created successfully! You can login now using the same credentials!")

                navigation.navigate(AuthRouteNames.LOGIN)
            }
        } catch (error) {
            console.log(error)
        }
    };


    return <Register onSubmit={handleRegister} />
}

export default RegisterScreen