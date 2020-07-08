import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.changePageToLogin = this.changePageToLogin.bind(this);
        this.sendRegisterRequest = this.sendRegisterRequest.bind(this);
    }

    changePageToLogin() {
        this.props.changePage('login');
    }

    async sendRegisterRequest() {
        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const result = await this.validateCredentials(username, password);
        if(result != 'validation successful') {
            alert(result);
            return;
        }

        const uuid = await fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(result => result.json())
        .then(data => data.result);

        sessionStorage.setItem('User_Key',uuid);

        this.props.changePage('main');
    }

    async validateCredentials(username, password) {
        if(username.length < 4) {
            return 'Username is too short. Must be at least 4 symbols';
        }

        if(password.length < 6) {
            return 'Password is too short. Must be at least 6 symbols.';
        }

        let isUsernameTaken = await fetch('http://localhost:5000/checkUsername',{
            method: 'POST',
            headers: {
                'Content-type':'Application/json'
            },
            body: JSON.stringify({
                'username': username
            })
        })
        .then(response => response.json())
        .then(data => !data.usernameUnique);

        if(isUsernameTaken) {
            return 'This username is already taken!';
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
                <div className="register_form">
                    <h1>Register</h1>
                    <div className="register_input">
                        <p>Username:</p>
                        <input type="text" name="username" id="registerUsername" autoComplete="off"/>
                        <p>Password:</p>
                        <input type="password" name="password" id="registerPassword" />
                        <br />
                        <button className="register_button" onClick={this.sendRegisterRequest}>Register</button>
                        <p className="login_link" onClick={this.changePageToLogin}>Already have account? Login</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;