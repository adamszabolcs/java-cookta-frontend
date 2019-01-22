import React, {Component} from 'react';

export default class Registration extends Component {

    state = {}

    render() {
        return (
            <div>
                <div id="registerContainer">
                    <form id="registerForm">
                        <input className='username' type="text" placeholder="Username"/>
                        <button id='submit'>Register</button>
                    </form>
                </div>
            </div>
        )
    }
}