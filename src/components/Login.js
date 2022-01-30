import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
    let history = useNavigate();
    const [credentials, setCredentials] = useState({email:"", password:""});
    const handleClick = async (e) => {
            e.preventDefault();
            const response =  await fetch(`http://localhost:5000/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email:credentials.email, password: credentials.password})
            })
            const data = await response.json();
            console.log(data['authToken']);
            if(data['authToken']){
                    history("/");
            }else{
                alert("wrong Credentials");
            }
    }
    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    return (
        <>
            <form className='my-3' onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password"  name='password' value={credentials.password} onChange={onChange}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
};

export default Login;
