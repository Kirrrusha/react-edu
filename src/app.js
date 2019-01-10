import React, {Component} from 'react';
import UserForm from './components/user-form';
import Filter from './components/filters';
import Counter from './counter';
import {Route, NavLink, Redirect} from "react-router-dom";
import ArticlesPage from "./components/routes/articles";
import CommentsPage from "./components/routes/comments-page";
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

          <div>
            <NavLink to="/comments/1" activeStyle={{ color: 'red' }}>
              comments
            </NavLink>
          </div>
        </div>
        <Switch>
          <Redirect from="/" to="/articles" />
          <Route path="/counter" component={Counter} exact/>
          <Route path="/filters" component={Filter}/>
          <Route path="/articles" component={ArticlesPage}/>
          <Route path="/comments" component={CommentsPage}/>
          <Route path="*" render={() => <h1>Not Found Page</h1>}/>
        </Switch>
      </div>
    )
  }
}

export default App
