import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    const deleteUser = id => {
        const proceed = window.confirm('Do you really want to delete this user?');
        if (proceed) {
            const uri = `http://localhost:3000/users${id}`;
            fetch(uri, {
                'method': 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount === 1) {
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    }
                })
        }

    };

    return (
        <div>
            <h2>This is Users</h2>
            <h2>Users available: {users.length}</h2>
            <ul>
                {users.map(user => <><li key={user._id}>{user.name} :: {user.email}<Link to={`/users/update/${user._id}`}><button> Update</button></Link><button onClick={() => deleteUser(user._id)}>X</button></li></>)}
            </ul>
        </div>
    );
};

export default Users;