import React, { Component, Fragment, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import Headers from './layout/Headers';
import DashBoard from './cafe/DashBoard';
import {Provider} from 'react-redux'
import store from '../store';

import Alerts from './layout/Alerts';
import Login from './accounts/Login';
import Register from './accounts/Register';
import { tokenLogin } from '../actions/auth';
import SalesOrders from './cafe/sales/SalesOrders';
import NewItem from './cafe/menu/NewItem';
import Profile from './accounts/Profile';
import UpdateItem from './cafe/menu/UpdateItem';
import Videos from './videos/Videos';
import DoubleDB from './videos/DoubleDB';
import { ErrorBoundary } from './layout/ErrorBoudary';
import MyLazy from './layout/MyLazy';




//Alert position

export default class App extends Component {
    constructor(props){
        super(props);
    }

    //Auto check Token
    componentDidMount(){
        store.dispatch(tokenLogin());
    }

    render(){
        return (
        
        <div className='total-width'>

            <Provider store={store}>
                <Router>
                <ErrorBoundary>
                    <Suspense fallback={<b>Loading ...</b>}>
                        <Alerts />

                        <Headers /><br />
                        
                        <Switch >

                            <Route exact path="/" component={DashBoard} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/sales" component={SalesOrders} />
                            <Route path="/newItem" component={NewItem} />
                            <Route path="/updateItem" component={UpdateItem} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/video" component={Videos} />
                            <Route path="/double" component={DoubleDB} />

                        </Switch>

                    </Suspense>
                </ErrorBoundary>
                </Router>

            </Provider>
            
            <div className='footer-container'>
                <div className='footer-frame'>
                <span>This is the Cafe store management product CopyRight by Mr.Khanh</span><br/>
                <span>Address: district 7, HCM city</span><br/>  
                <span>phone: 0703.601.738</span>
                </div>
            </div>

            </div>

        )
    }
};



ReactDOM.render(<App />, document.getElementById('app'))