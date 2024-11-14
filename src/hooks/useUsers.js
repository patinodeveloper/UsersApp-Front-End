import { useReducer, useState } from "react";
import { userReducers } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";

const initialUsers = []

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: ''
}

export const useUsers = () => {

    const [users, dispatch] = useReducer(userReducers, initialUsers);

    const [userSelected, setUserSelected] = useState(initialUserForm);

    const [visibleForm, setVisibleForm] = useState(false);
    const navigate = useNavigate();

    const getUsers = async () => {
        const result = await findAll();
        dispatch({
            type: 'loadUsers',
            payload: result.data
        })
    }

    const handlerAddUser = async (user) => {
        console.log(user);
        const type = (user.id === 0) ? 'addUser' : 'updateUser';
        let response;

        if (user.id === 0) {
            response = await save(user);
        } else {
            response = await update(user);
        }

        dispatch({
            type: type,
            payload: response.data
        })

        Swal.fire(
            (user.id ===0) ? 'Usuario Creado' : 'Usuario Actualizado',
            (user.id ===0) ? 'El usuario ha sido creado con exito' : 'El usuario ha sido actualizado con exito',
            'success'
        )
        navigate("/users");
        handlerCloseForm();
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
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                remove(id); // elimina el usuario
                
                dispatch({
                    type: 'removeUser',
                    payload: id
                })
                Swal.fire({
                    title: "Usuario Eliminado!",
                    text: "El usuario se ha eliminado exitosamente",
                    icon: "success"
                });
            }
        });
    }

    const handlerUserSelectedForm = (user) => {
        // console.log(user);
        setVisibleForm(true);
        setUserSelected({ ...user });
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
    }

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,

        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers
    }
}