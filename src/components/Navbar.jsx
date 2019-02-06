import React, {Component} from 'react';
import Link from "react-router-dom/es/Link";

export class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08"
                        aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {(!this.props.isLoggedIn) ?
                    <div className="collapse navbar-collapse justify-content-md-center">
                        {(!this.props.isLoginVisible) ?
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="#"
                                       onClick={() => this.props.loginUser()}>Sign In / Sign up</a>
                                </li>
                            </ul> : <span></span>
                            }
                    </div>
                    :
                    <div className="collapse navbar-collapse justify-content-md-center">
                        <Link to="/profile">{this.props.userData.username}</Link>
                        <Link to="/">
                            <button className="btn-primary logoutButton" onClick={() => this.props.logoutUser()}>
                                Logout
                            </button>
                        </Link>
                    </div>
                }
            </nav>
        )
    }

}