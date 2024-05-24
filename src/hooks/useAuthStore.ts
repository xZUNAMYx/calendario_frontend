import { useDispatch, useSelector } from "react-redux"
import {calendarApi} from '../../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../stores";

export const useAuthStore = () => {
    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await calendarApi.post('/auth', {email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch(onLogin( {name: data.name, uid: data.uid}) );

        } catch (error) {
            dispatch( onLogout('Credenciales incorrectas2') );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    };

    const startRegister = async({ name, email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await calendarApi.post('/auth/register', { name, email, password});
            localStorage.setItem('token', data.token);
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch(onLogin( {name: data.name, uid: data.uid}) );

        } catch (error) {
            console.log(error);
            dispatch( onLogout( error.response.data?.msg || 'X' ) );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 10);
        }
    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {
            const {data} = await calendarApi.get('auth/renew');
            console.log({data});
            localStorage.setItem('token', data.token);
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch(onLogin( {name: data.name, uid: data.uid}) );
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout('Error ya que su tiempo de sesión terminó') );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }

    return {
        // Propiedades
        status, 
        user, 
        errorMessage,

        // Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}