import React, {Component} from 'react';

export class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08"
                        aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {(!this.props.isLogin) ?
                    <div className="collapse navbar-collapse justify-content-md-center">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Register<span
                                    className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => this.props.showLoginField()}>Login</a>
                            </li>
                        </ul>
                    </div>
                    :
                    <div className="loginfield">
                        <input type="text" name="username" placeholder="username"/>
                        <input type="text" name="password" placeholder="password"/>
                        <button type="submit" value="Login"/>
                    </div>}
            </nav>
        )
    }

}