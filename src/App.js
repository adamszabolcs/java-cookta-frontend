import React, {Component} from 'react';
import './App.css';
import './templatemo-style.css';
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";

import { library } from '@fortawesome/fontawesome-svg-core'
import {faUndo} from '@fortawesome/free-solid-svg-icons'
library.add(faUndo);

class App extends Component {



    render() {

        return (
            <BrowserRouter>
                <div>

                    <Route exact={true} path='/' render={() =>
                        <div className="App">
                            <Home/>
                        </div>
                    }/>
                    <Route exact={true} path='/registration' render={() => (
                        <div className="App">
                            <Registration />
                        </div>
                    )}
                    />
                </div>

            </BrowserRouter>

        );
    }
}

export default App;
