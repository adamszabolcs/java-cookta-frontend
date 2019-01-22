import React, {Component} from 'react';

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
                    <div>
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
                    <div className="input-group-prepend">
                        <input type="text" name="username" placeholder="username" className="form-control m-2"/>
                        <input type="text" name="password" placeholder="password" className="form-control m-2"/>
                        <button type="submit" value="Login" className="btn btn-primary m-2">Login</button>
                    </div>}
                </div>
            </nav>
        )
    }

}