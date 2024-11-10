import { UserRow } from "./UserRow"

export const UsersList = ({ users }) => {

    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Update</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(({ id, username, email }) => (
                        <UserRow key={id} id={id} username={username} email={email} />
                    ))
                }
            </tbody>
        </table>
    )
}