import { UserForm } from "./components/UserForm"
import { UsersList } from "./components/UserList"

export const UsersApp = () => {

    const initialUsers = [
        {
            id: 1,
            username: 'patino.dev',
            password: '1234',
            email: 'patino.dev@gmail.com'
        }
    ]

    return (
        <div className="container my-4">
            <h2>Users App</h2>
            <div className="row">
                <div className="col">
                    <UserForm />
                </div>

                <div className="col">
                    <UsersList users={initialUsers} />
                </div>
            </div>
        </div>
    )
}