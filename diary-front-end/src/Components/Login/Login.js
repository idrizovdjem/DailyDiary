import React from 'react';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.changePageToRegister = this.changePageToRegister.bind(this);
        this.sendLoginRequest = this.sendLoginRequest.bind(this);
    }

    changePageToRegister() {
        this.props.changePage('register');
    }

    async sendLoginRequest() {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const result = await this.validateCredentials(username, password);
        if(result !== 'validation successful') {
            alert(result);
            return;
        }

        const uuid = await fetch('http://localhost:5000/login',{
            method: 'POST',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(response => response.json())
        .then(data => data.key);

        alert(uuid);
    }

    // validate the input
    async validateCredentials(username, password) {
        if(username.length < 4) {
            return 'Username is too short. Must be at least 4 symbols';
        }

        if(password.length < 6) {
            return 'Password is too short. Must be at least 6 symbols.';
        }

        return 'validation successful';
    }

    render() {
        return(
            <div className='login_page'>
                <div className="side">
                    <div className="description">
                        <h1>Daily Diary</h1>
                        <h3>
                            Daliy Diary let's you save the best moments in your daily life.
                            Save your emotion during the day, save important and fun notes and 
                            review old notes. Get review of your emotions for the month and more ;)
                        </h3>
                    </div>
                </div>
                <div className="login_form">
                    <h1>Login</h1>
                    <div className="login_input">
                        <p>Username:</p>
                        <input type="text" name="username" id="loginUsername" autoComplete="off"/>
                        <p>Password:</p>
                        <input type="password" name="password" id="loginPassword" />
                        <br />
                        <button className="login_button" onClick={this.sendLoginRequest}>Login</button>
                        <p className="register_link" onClick={this.changePageToRegister}>No account? register</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;