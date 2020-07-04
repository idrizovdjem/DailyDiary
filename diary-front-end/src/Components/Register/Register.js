import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.changePageToLogin = this.changePageToLogin.bind(this);
    }

    changePageToLogin() {
        this.props.changePage('login');
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
                        <button className="register_button">Register</button>
                        <p className="login_link" onClick={this.changePageToLogin}>Already have account? Login</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Register;