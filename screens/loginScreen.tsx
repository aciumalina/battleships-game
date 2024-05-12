import { NavigationProp, useNavigation } from "@react-navigation/native"
import Login from "../components/login"
import { AuthRouteNames } from "../routes/route-names"
import { useAuth } from "../hooks/authContext"

const LoginScreen = () => {
    const navigation = useNavigation<any>()
    const handleGoToRegister = () => {
        navigation.navigate(AuthRouteNames.REGISTER)
    }
    const auth = useAuth()
    return <Login onSubmit={auth.login} goToRegister={handleGoToRegister} />
}

export default LoginScreen