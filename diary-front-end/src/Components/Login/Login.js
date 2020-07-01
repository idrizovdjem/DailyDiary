import React from 'react';
import './Login.css';

class Login extends React.Component {

    render() {
        return(
            <div className='login_page'>
                <h1>Welcome back :)</h1>
                
                <div className="login_form">
                    <p>Username:</p>
                    <input type="text" name="username" id="login-username" autoComplete="disable"
                    className="login_input" />

                    <p>Password:</p>
                    <input type="password" name="password" id="login-password" className="login_input"/>
                    <br />
                    <button className="login_button">Login</button>
                </div>
            </div>
        );
    }
}

export default Login;