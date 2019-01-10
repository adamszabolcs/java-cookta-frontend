import React, {Component} from 'react';
import {FilterBar} from "./FilterBar";

export class SearchBar extends Component {

    render() {
        return (
            <div className="tm-container-outer tm-banner-bg">
                <div className="container">
                    <div className="row tm-banner-row tm-banner-row-header">
                        <div className="col-xs-12">
                            <div className="tm-banner-header">
                                <h1 className="text-uppercase tm-banner-title">Let's begin</h1>
                                <p className="tm-banner-subtitle">We assist you to choose the best.</p>
                                <i className="fa fa-2x fa-angle-down tm-down-arrow"></i>
                            </div>
                        </div>
                    </div>
                    <div className="row tm-banner-row" id="tm-section-search">

                        <form onSubmit={this.props.onSubmit} method="POST" className="tm-search-form tm-section-pad-2">
                            <div className="form-row tm-search-form-row">
                                <div className="form-group tm-form-group tm-form-group-pad tm-form-group-1">
                                    <label htmlFor="inputCity">Search for recipe</label>
                                    <input name="q" type="text" className="form-control" id="inputCity"
                                           placeholder="Search for recipe..." defaultValue={this.props.searchprase} />
                                </div>
                            </div>
                            <FilterBar
                                checkboxes={this.props.checkboxes}
                                checkboxes2={this.props.checkboxes2}
                                handleCheckBoxChange={this.props.handleCheckBoxChange}
                            />
                            <div className="form-group tm-form-group tm-form-group-pad tm-form-group-1">
                                <label htmlFor="btnSubmit">&nbsp;</label>
                                <button type="submit" className="btn btn-primary tm-btn tm-btn-search text-uppercase"
                                        /*onClick={() => this.props.onSubmit(true)}*/
                                        id="btnSubmit">Submit search
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }

}