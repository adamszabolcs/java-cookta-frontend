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
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Centered nav only <span
                                className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }

}