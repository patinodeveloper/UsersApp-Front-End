import { useState } from "react";

const initialUserForm = {
    username: '',
    password: '',
    email: ''
}

export const UserForm = () => {

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

    return (
        <form>
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