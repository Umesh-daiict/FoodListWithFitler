import React, { useContext } from 'react';
import Auth from './components/Auth';
import AuthContext from './components/context/auth-context';

import Ingredients from './components/Ingredients/Ingredients';

const App = props => {
  const authCtx= useContext(AuthContext);
  let content=<Auth />
  if(authCtx.isAuth){
    content=<Ingredients />
  }
 // return <Ingredients />;
return content
};

export default App;
