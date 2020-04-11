import React from 'react';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom';

import {Header} from './modules/Header';
import {Recipe} from './modules/Recipe';
import {RecipesList} from './modules/RecipesList';
import {LandingPage} from './modules/LandingPage';
import {Admin} from './modules/Admin';
import {RemindPassword} from './modules/RemindPassword';
import {SignIn} from './modules/SignIn';
import {SignUp} from './modules/SignUp';
import {Account} from './modules/Account';

import modules from './App.module.scss';

function App() {
  return (
    <div className={modules.app}>
      <Layout>
        <Layout.Header><Header /></Layout.Header>
        <Layout.Content style={{padding: '50px'}}>
          <Switch>
            <Route exact component={LandingPage} path="/" />
            <Route exact component={RecipesList} path="/recipes" />
            <Route exact component={Recipe} path="/recipes/:recipeId" />
            <Route exact component={Admin} path="/admin" />
            <Route exact component={RemindPassword} path="/remind-password" />
            <Route exact component={SignIn} path="/sign-in" />
            <Route exact component={SignUp} path="/sign-up" />
            <Route exact component={Account} path="/account/:userId" />
          </Switch>
        </Layout.Content>
        <Layout.Footer>made by Natalia Borowska</Layout.Footer>
      </Layout>
    </div>
  );
}

export default App;
