import { useReducer, useState } from "react";
import { userReducers } from "../reducers/usersReducer";
import Swal from "sweetalert2";

const initialUsers = [
    {
        id: 1,
        username: 'patino.dev',
        password: '1234',
        email: 'patino.dev@gmail.com'
    }
]

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
}

export const useUsers = () => {

    const [users, dispatch] = useReducer(userReducers, initialUsers);

    const [userSelected, setUserSelected] = useState(initialUserForm);

    const handlerAddUser = (user) => {
        console.log(user);
        let type;
        
        if (user.id === 0) {
            type = 'addUser';
        } else {
            type = 'updateUser';
        }

        dispatch({
            type: type,
            payload: user
        })

        Swal.fire(
            (user.id ===0) ? 'Usuario Creado' : 'Usuario Actualizado',
            (user.id ===0) ? 'El usuario ha sido creado con exito' : 'El usuario ha sido actualizado con exito',
            'success'
        )
    }

    const handlerRemoveUser = (id) => {
        // console.log(id);
        Swal.fire({
            title: "Esta seguro que desea eliminar?",
            text: "Cuidado, esta accion es irreversible!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'removeUser',
                    payload: id
                })
                Swal.fire({
                    title: "Usario Eliminado!",
                    text: "El usuario se ha eliminado exitosamente",
                    icon: "success"
                });
            }
        });
    }

    const handlerUserSelectedForm = (user) => {
        // console.log(user);
        setUserSelected({ ...user })
    }

    return {
        users,
        userSelected,
        initialUserForm,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm
    }
}