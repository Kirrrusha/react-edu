import React, {Component} from 'react';
import UserForm from './components/user-form';
import Filter from './components/filters';
import Counter from './counter';
import {Route, NavLink} from "react-router-dom";
import ArticlesPage from "./components/routes/articles";
import {Switch} from "react-router-dom";

class App extends Component {

  render() {
    return (
      <div>
        <UserForm/>
        <div>
          <div>
            <NavLink to="/counter" activeStyle={{color: 'red'}}>counter</NavLink>
          </div>

          <div>
            <NavLink to="/filters" activeStyle={{color: 'red'}}>filters</NavLink>
          </div>

          <div>
            <NavLink to="/articles" activeStyle={{color: 'red'}}>articles</NavLink>
          </div>
        </div>
        <Switch>
          <Route path="/counter" component={Counter} exact/>
          <Route path="/filters" component={Filter}/>
          <Route path="/articles" component={ArticlesPage}/>
        </Switch>
      </div>
    )
  }
}

export default App
