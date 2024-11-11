import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const UserForm = ({ handlerAddUser, initialUserForm, userSelected, handlerCloseForm }) => {

    const [userForm, setUserForm] = useState(initialUserForm);

    const { id, username, password, email } = userForm;

    useEffect(() => {
        setUserForm({
            ...userSelected,
            // password: ''
        });
    }, [userSelected]);

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

        if (!username || (!password && id === 0) || !email) {
            Swal.fire({
                title: "Error de Validacion",
                text: "Completa todos los campos del formulario",
                icon: "error"
            });
            return;
        }

        console.log('Enviando el formulario');

        // Guardar el userForm en el listado de usuarios
        handlerAddUser(userForm); // envia al padre
        setUserForm(initialUserForm);

    }

    const onCloseForm = () => {
        handlerCloseForm();
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
            {id > 0 ||
                <input
                    type="password"
                    className="form-control my-3 w-75"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onInputChange} />}

            <input
                type="email"
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
            <input
                type="hidden"
                name="id"
                value={id} />
            <button
                type="submit"
                className={id > 0 ? "btn btn-warning" : "btn btn-primary"}>
                {id > 0 ? 'Editar' : 'Crear'}
            </button>
            <button
                type="button"
                className="btn btn-secondary mx-2"
                onClick={() => onCloseForm()}>
                Cerrar Formulario
            </button>
        </form>
    )
}