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
                                <div className="tm-text-highlight">
                                    <ul>
                                        {this.props.ingredientLines.map(ingredient => <li key={ingredient}>
                                            {ingredient}
                                        </li>)}
                                    </ul>

                                </div>
                                <p className="tm-text-grey"></p>
                            </div>

                            <a href={this.props.url} target="_blank" className="tm-recommended-price-box">
                                <p className="tm-recommended-price">LET'S COOK</p>
                            </a>

                        </div>
                    </div>

                    {/*<a href="#" className="text-uppercase btn-primary tm-btn mx-auto tm-d-table">Show More Places</a>*/}
                </div>
        )
    }
}