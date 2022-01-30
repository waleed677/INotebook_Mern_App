import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Register = (props) => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({ name:"",email: "", password: "" });

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name:credentials.name,email: credentials.email, password: credentials.password })
        })
        const data = await response.json();
        if (data['authToken']) {
            props.showAlert("Account Created Successfully!!!", "success");
            localStorage.setItem('token', data['authToken']);
            history("/");
        } else {
            props.showAlert("Please Try to Login With Valid Credentials!!!", "danger");
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <>
            <form className='my-3' onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Full Name</label>
                    <input type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp" value={credentials.name} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default Register;
