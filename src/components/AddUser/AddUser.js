import React, {useRef} from 'react';

const AddUser = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const handleSubmit = e => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({name, email})
        })
        .then(res => res.json())
        .then(data => {
            if (data.insertedId) {
                console.log('your info was stored');
                e.target.reset();
            }
        });
        e.preventDefault();
    };

    return (
        <div>
            <h2>This is Add User</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" id="" ref={nameRef}/> <br/>
                <input type="text" name="" id="" ref={emailRef}/> <br/>
                <input type="submit" value="Add User" />
            </form>
        </div>
    );
};

export default AddUser;