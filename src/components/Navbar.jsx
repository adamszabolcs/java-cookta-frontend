import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08"
                        aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-md-center">
                    {(!this.props.isLogin) ?
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" href="/registration">Register<span
                                    className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => this.props.showLoginField()}>Login</a>
                            </li>
                        </ul>
                    :
                    <form className="input-group-prepend" onSubmit={this.props.submitLogin} method="POST">
                        <input type="text" name="username" placeholder="username" className="form-control m-2" defaultValue={this.props.username} onChange={this.props.handleUsernameInput}/>
                        <input type="password" name="password" placeholder="password" className="form-control m-2" defaultValue={this.props.password} onChange={this.props.handlePasswordInput}/>
                        <button type="submit" value="Login" className="btn btn-primary m-2">Login</button>
                        <a className="nav-link text-white" onClick={() => this.props.hideLoginField()}><FontAwesomeIcon icon="undo"/></a>
                    </form>}
                </div>
            </nav>
        )
    }

}