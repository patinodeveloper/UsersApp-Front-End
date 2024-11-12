import { useState } from "react"
import Swal from "sweetalert2";

const initialLoginForm = {
    username: '',
    password: '',
}

export const LoginPage = () => {

    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [name]: value
        });
        console.log(value);
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        if (!username || !password) {
            Swal.fire({
                title: "Error de validacion",
                icon: "error",
                text: "Completa todos los campos"
            });
        }

        // Implementar login!
        if (username === "admin" && password === "root") {
            // handlerLogin()
        } else {
            Swal.fire({
                title: "Error Login",
                icon: "error",
                text: "Username o Password invalidos!"
            });
        }
        setLoginForm(initialLoginForm);
    }

    return (
        <div className="modal" style={{ display: "block" }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login</h5>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <input
                                className="form-control my-3 w-75"
                                placeholder="Username"
                                type="text"
                                name="username"
                                value={username}
                                onChange={onInputChange} />

                            <input className="form-control my-3 w-75"
                                placeholder="Password"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onInputChange} />
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}