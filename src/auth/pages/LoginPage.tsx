import { useEffect } from 'react';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
    email: '',
    password: '',
}
 console.log('En loginpage')

export const LoginPage = () => {
    const { startLogin, errorMessage } = useAuthStore();

    const { email, password, onInputChange } = useForm( loginFormFields );

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: email, password: password });
    };

    useEffect(() => {
      if( errorMessage !== undefined ){
        Swal.fire('Error en la autenticación', errorMessage, 'error')
      }
    }, [errorMessage])
    
    return (
        <div className="container login-container">
            <div className="row">
                <div className="login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='email'
                                value={ email }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='password'
                                value={ password }
                                onChange={ onInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}