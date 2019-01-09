import React, {Component} from 'react';
import '../templatemo-style.css';

export default class Recipe extends Component {

    render() {

        return (
                <div className="tab-pane" id="1a">
                    <div className="tm-recommended-place-wrap">
                        <div className="tm-recommended-place">
                            <img src={this.props.image} alt=""/>
                            <div className="tm-recommended-description-box">
                                <h3 className="tm-recommended-title">{this.props.label}</h3>
                                <p className="tm-text-highlight">
                                    {this.props.ingredientLines}
                                </p>
                                <p className="tm-text-grey"></p>
                            </div>

                            <a href="#" className="tm-recommended-price-box">
                                <p className="tm-recommended-price">$110</p>
                                <p className="tm-recommended-price-link">Continue Reading</p>
                            </a>

                        </div>
                    </div>

                    {/*<a href="#" className="text-uppercase btn-primary tm-btn mx-auto tm-d-table">Show More Places</a>*/}
                </div>
        )
    }
}