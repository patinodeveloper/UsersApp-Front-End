import { useState } from "react";

export const UserForm = ({ handlerAddUser, initialUserForm }) => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const { username, password, email } = userForm;

    const onInputChange = ({ target }) => {
        // console.log(target.value);
        const { name, value } = target;
        setUserForm({
            ...userForm,
            [name]: value
        });
    }

    const onSubmit = (evt) => {
        evt.preventDefault();

        if (!username || !password || !email) {
            alert('Completa los campos del formulario');
            return;
        }

        console.log('Enviando el formulario');

        // Guardar el userForm en el listado de usuarios
        handlerAddUser(userForm); // envia al padre
        setUserForm(initialUserForm);

    }

    return (
        <form onSubmit={onSubmit}>
            <input
                type="text"
                className="form-control my-3 w-75"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onInputChange} />
            <input
                type="password"
                className="form-control my-3 w-75"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onInputChange} />
            <input
                type="email"
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
            <button
                type="submit"
                className="btn btn-primary">
                Crear
            </button>
        </form>
    )
}