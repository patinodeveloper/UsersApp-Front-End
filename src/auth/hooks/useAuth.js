import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authService";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined
}

export const useAuth = () => {

    const [login, dispatch] = useReducer(loginReducer, initialLogin);

    const handlerLogin = () => {
        const isLogin = loginUser({ username, password });
        
        if (isLogin) {
            const user = { username: 'admin' }

            dispatch({
                type: 'login',
                payload: user
            });

            sessionStorage.setItem('login', JSON.stringify({
                isAuth: true,
                user: user
            }));

        } else {
            Swal.fire({
                title: "Error Login",
                icon: "error",
                text: "Username o Password invalidos!"
            });
        }
    }

    const handlerLogout = () => {
        dispatch({
            type: 'logout'
        });
        sessionStorage.removeItem('login');
    }

    return {
        login,
        
        handlerLogin,
        handlerLogout
    }
}