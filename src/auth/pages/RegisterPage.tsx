import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import { useEffect } from 'react';

const registerFormFields = {
    name: '',
    email: '',
    password: '',
    password2: ''
}

export const RegisterPage = () => {
    const { startRegister, errorMessage } = useAuthStore();

    const { name, email, password, password2, onInputChange } = useForm( registerFormFields );

    const registerSumit = (event) => {
        event.preventDefault();
        if( password !== password2 ){
            Swal.fire('Error en el registro.', 'Las contraseñas tienen que coninsidir', 'error');
            return;
        }
        startRegister( { name: name, email: email, password: password } );
    }

    useEffect(() => {
        if( errorMessage !== undefined ){
          Swal.fire('Error en la autenticación', errorMessage, 'error')
        }
      }, [errorMessage])

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSumit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='name'
                                value={ name }
                                onChange={ onInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
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
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='password2'
                                value={ password2 }
                                onChange={ onInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}