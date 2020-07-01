import React from 'react';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.changePageToRegister = this.changePageToRegister.bind(this);
    }

    changePageToRegister() {
        this.props.changePage('register');
    }

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
                    <p className="register_link" onClick={this.changePageToRegister}>No account? Register</p>
                </div>
            </div>
        );
    }
}

export default Login;