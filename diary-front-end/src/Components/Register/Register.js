import React from 'react';
import './Register.css';

class Register extends React.Component {

    render() {
        return(
            <div className="register_page">
                <h1>Join us :)</h1>
                <div className="register_form">
                    <p>Username:</p>
                    <input type="text" name="username" id="registerUsername" autoComplete="disable"/>
                </div>
            </div>
        );
    }
}

export default Register;