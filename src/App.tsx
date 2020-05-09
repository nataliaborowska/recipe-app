import React from 'react';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom';

import {Account} from './modules/Account';
import {Admin} from './modules/Admin';
import {AppRoutesEnum} from './utils/AppRoutesEnum';
import {ChangePassword} from './modules/ChangePassword';
import {CreateRecipe} from './modules/CreateRecipe';
import {EditRecipe} from './modules/EditRecipe';
import {Header} from './modules/Header';
import {LandingPage} from './modules/LandingPage';
import {Recipe} from './modules/Recipe';
import {RecipesList} from './modules/RecipesList';
import {ResetPassword} from './modules/ResetPassword';
import {SignIn} from './modules/SignIn';
import {SignUp} from './modules/SignUp';

import modules from './App.module.scss';

function App() {
  return (
    <div className={modules.app}>
      <Layout>
        <Layout.Header><Header /></Layout.Header>
        <Layout.Content style={{padding: '50px'}}>
          <Switch>
            <Route exact component={LandingPage} path={AppRoutesEnum.LANDING_PAGE} />
            <Route exact component={RecipesList} path={AppRoutesEnum.RECIPES_LIST} />
            <Route exact component={Recipe} path={`${AppRoutesEnum.RECIPE}/:recipeId`} />
            <Route exact component={Admin} path={AppRoutesEnum.ADMIN} />
            <Route exact component={ChangePassword} path={AppRoutesEnum.CHANGE_PASSWORD} />
            <Route exact component={CreateRecipe} path={AppRoutesEnum.CREATE_RECIPE} />
            <Route exact component={EditRecipe} path={`${AppRoutesEnum.EDIT_RECIPE}/:recipeId`} />
            <Route exact component={ResetPassword} path={AppRoutesEnum.RESET_PASSWORD} />
            <Route exact component={SignIn} path={AppRoutesEnum.SIGN_IN} />
            <Route exact component={SignUp} path={AppRoutesEnum.SIGN_UP} />
            <Route exact component={Account} path={`${AppRoutesEnum.ACCOUNT}/:userId`} />
          </Switch>
        </Layout.Content>
        <Layout.Footer>made by Natalia Borowska</Layout.Footer>
      </Layout>
    </div>
  );
}

export default App;
