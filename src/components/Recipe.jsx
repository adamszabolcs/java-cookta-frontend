import React, {Component} from 'react';
import '../templatemo-style.css';

export class Recipe extends Component {
    render() {
        return (
                <div className="tab-pane fade" id="1a">
                    <div className="tm-recommended-place-wrap">
                        <div className="tm-recommended-place">
                            {/*<img src="img/tm-img-06.jpg" alt="Image" className="img-fluid tm-recommended-img"/>*/}
                            <div className="tm-recommended-description-box">
                                <h3 className="tm-recommended-title">North Garden Resort</h3>
                                <p className="tm-text-highlight">One North</p>
                                <p className="tm-text-gray">Sed egestas, odio nec bibendum mattis, quam odio hendrerit
                                    risus, eu varius eros lacus sit amet lectus. Donec blandit luctus dictum...</p>
                            </div>
{/*
                            <a href="#" className="tm-recommended-price-box">
                                <p className="tm-recommended-price">$110</p>
                                <p className="tm-recommended-price-link">Continue Reading</p>
                            </a>
*/}
                        </div>

                        <div className="tm-recommended-place">
                            {/*<img src="img/tm-img-07.jpg" alt="Image" className="img-fluid tm-recommended-img"/>*/}
                            <div className="tm-recommended-description-box">
                                <h3 className="tm-recommended-title">Felis nec dignissim</h3>
                                <p className="tm-text-highlight">Two North</p>
                                <p className="tm-text-gray">Sed egestas, odio nec bibendum mattis, quam odio hendrerit
                                    risus, eu varius eros lacus sit amet lectus. Donec blandit luctus dictum...</p>
                            </div>
                            <div id="preload-hover-img"></div>
{/*
                            <a href="#" className="tm-recommended-price-box">
                                <p className="tm-recommended-price">$120</p>
                                <p className="tm-recommended-price-link">Continue Reading</p>
                            </a>
*/}
                        </div>

                        <div className="tm-recommended-place">
                            {/*<img src="img/tm-img-05.jpg" alt="Image" className="img-fluid tm-recommended-img"/>*/}
                            <div className="tm-recommended-description-box">
                                <h3 className="tm-recommended-title">Sed fermentum justo</h3>
                                <p className="tm-text-highlight">Three North</p>
                                <p className="tm-text-gray">Sed egestas, odio nec bibendum mattis, quam odio hendrerit
                                    risus, eu varius eros lacus sit amet lectus. Donec blandit luctus dictum...</p>
                            </div>
{/*
                            <a href="#" className="tm-recommended-price-box">
                                <p className="tm-recommended-price">$130</p>
                                <p className="tm-recommended-price-link">Continue Reading</p>
                            </a>
*/}
                        </div>

                        <div className="tm-recommended-place">
                            {/*<img src="img/tm-img-04.jpg" alt="Image" className="img-fluid tm-recommended-img"/>*/}
                            <div className="tm-recommended-description-box">
                                <h3 className="tm-recommended-title">Maecenas ultricies neque</h3>
                                <p className="tm-text-highlight">Four North</p>
                                <p className="tm-text-gray">Sed egestas, odio nec bibendum mattis, quam odio hendrerit
                                    risus, eu varius eros lacus sit amet lectus. Donec blandit luctus dictum...</p>
                            </div>
{/*
                            <a href="#" className="tm-recommended-price-box">
                                <p className="tm-recommended-price">$140</p>
                                <p className="tm-recommended-price-link">Continue Reading</p>
                            </a>
*/}
                        </div>
                    </div>

                    {/*<a href="#" className="text-uppercase btn-primary tm-btn mx-auto tm-d-table">Show More Places</a>*/}
                </div>
        )
    }
}