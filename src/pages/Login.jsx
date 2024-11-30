import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  const Logclik = (event) => {
    event.preventDefault();

    if (!username || !password) {
      alert('Please fill in both username and password');
    } else {
      navigate('/begin');
    }
  };


function signup(){
    console.log("done");
    navigate('/up');
}


  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Login</h1>
        <form onSubmit={Logclik}>
          <div className="inputs">
            <div className="input">
              <input 
                type="text" 
                required 
                placeholder="username"
                value={username}  
                onChange={(e) => setusername(e.target.value)} 
              />
            </div>
            <div className="input">
              <input 
                type="password" 
                required 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setpassword(e.target.value)} 
              />
            </div>
          </div>
          <div className="buttons">
            <button className="btn btn-secondary" type="button" onClick={() => signup()}>Sign Up</button>
            <button className="btn btn-primary" type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
