import React from 'react';

import modules from './LandingPage.module.scss';

export const LandingPage: React.FC = () => (
  <div className={modules.landingPage}>
    <span>this is a landing page</span>
    <p>Sources:</p>
    <p>{'https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial'}</p>
    <p>{'https://www.robinwieruch.de/firebase-tutorial'}</p>
    <p>{'https://github.com/facebook/create-react-app/issues/6054'}</p>
    <p>{'https://firebase.google.com/docs/reference/js/firebase.database.Database#ref'}</p>
    <p>{'https://www.bennadel.com/blog/3320-using-firebase-4-with-typescript-type-declarations-and-npm.htm'}</p>
    <p>{'https://redux.js.org/recipes/usage-with-typescript'}</p>
    <p>About strinct null checks, answer of Rick Love {'https://stackoverflow.com/questions/12787781/type-definition-in-object-literal-in-typescript'}</p>
  </div>
);
