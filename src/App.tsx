import React from 'react';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom';

import {Header} from './modules/Header';
import {Recipe} from './modules/Recipe';
import {RecipesList} from './modules/RecipesList';
import {LandingPage} from './modules/LandingPage';

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
            <Route exact component={Recipe} path="/admin" />
            <Route exact component={Recipe} path="/remind-password" />
            <Route exact component={Recipe} path="/sign-in" />
            <Route exact component={Recipe} path="/sign-up" />
            <Route exact component={Recipe} path="/account/:userId" />
          </Switch>
        </Layout.Content>
        <Layout.Footer>made by Natalia Borowska</Layout.Footer>
      </Layout>
    </div>
  );
}

export default App;
