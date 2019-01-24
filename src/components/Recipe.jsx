import React, {Component} from 'react';
import '../templatemo-style.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart as fasFaHeart} from "@fortawesome/free-solid-svg-icons";

export default class Recipe extends Component {



    addFavourite = event => {
        event.target.parentElement.classList.add("added");
        console.log(this.props.label);
    };


    render() {
        return (
            <div className="tab-pane" id="1a">
                <div className="tm-recommended-place-wrap">
                    <div className="tm-recommended-place">
                        <div className="recipe-image">
                            <img src={this.props.image} alt=""/>
                            <a  onClick={(event) => this.addFavourite(event)}><FontAwesomeIcon className="favourite-icon" icon={fasFaHeart}/></a>
                        </div>
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

                        <a href={this.props.url} target="_blank" rel="noopener noreferrer"
                           className="tm-recommended-price-box">
                            <p className="tm-recommended-price">LET'S COOK</p>
                        </a>

                    </div>
                </div>

                {/*<a href="#" className="text-uppercase btn-primary tm-btn mx-auto tm-d-table">Show More Places</a>*/}
            </div>
        )
    }
}