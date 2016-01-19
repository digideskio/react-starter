import React from 'react';
import {IndexRoute, Route, Router} from 'react-router';
import {createHistory} from 'history';
import {render} from 'react-dom';

class App extends React.Component {
    render() {
        return (
            <main>   
                <h1>App is online!</h1>             
                {this.props.children}
            </main>
        );
    }
}

class Dashboard extends React.Component {
    render() {
        return (
            <section>
                <p>Dashboard</p>
            </section>
        );
    }
}

render((
    <Router history={createHistory()}>
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard}/>
        </Route>
    </Router>
), document.querySelector('[data-ui-role="content"]'));