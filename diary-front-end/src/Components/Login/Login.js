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
                        <button className="login_button">Login</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;