import React, {Component} from 'react';

export class UserInfoBox extends Component {

    render() {

        return (
            <div className="tm-container-outer tm-banner-bg p-3">
                <div className="container">
                    <div className="card w-50 mx-auto">
                        <div className="card-header">
                            Hello Elek!
                        </div>
                        <div className="card-body">
                            <p className="card-text">Saved intolerances: Éc, Lego</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}