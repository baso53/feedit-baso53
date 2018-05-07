import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import Login from './components/Login'
import Home from './components/Home/Home'
import AddArticle from './components/Home/AddArticle';
import registerServiceWorker from './registerServiceWorker';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            props.location.state && props.location.state.isAuthenticated ? (
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

ReactDOM.render((
    <BrowserRouter>
        <div>
            <Switch>
                <PrivateRoute exact path="/home" component={Home} />
                <Route exact path='/login' component={Login} />
                <Route path='/' component={App} />
            </Switch>
        </div>
    </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
