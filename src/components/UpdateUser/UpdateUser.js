import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const UpdateUser = () => {
    const [user, setUser] = useState({name: '', email: ''});
    const { id } = useParams();

    useEffect(() => {
        const uri = `http://localhost:3000/users/${id}`;
        fetch(uri)
            .then(res => res.json())
            .then(data => setUser(data));
    }, [id]);

    const handleSubmit = e => {
        const uri = `http://localhost:3000/users/${id}`;
        fetch(uri, {
            method: 'PUT', 
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => console.log(data))
        
        e.preventDefault();
    };

    const handleNameChange = e => {
        const updatedName = e.target.value;
        const updatedUser = {...user, name: updatedName};
        setUser(updatedUser);
    };

    const handleEmailChange = e => {
        const updatedEmail = e.target.value;
        const updatedUser = {...user, email: updatedEmail};
        setUser(updatedUser);
    };

    return (
        <div>
            <h2>This is Update User</h2>
            {user.name && <>
                <h3>User name is: {user.name}</h3>
                <h4>User email is: {user.email}</h4> 
            </>
            }
            <form onSubmit= {handleSubmit}>
                <input type="text" value= {user.name} onChange={handleNameChange} /> <br/>
                <input type="email" value={user.email} onChange={handleEmailChange} /> <br/>
                <input type="submit" value="UpdateUser" />
            </form>
        </div>
    );
};

export default UpdateUser;