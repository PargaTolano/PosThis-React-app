import React, { useState, useEffect }                         from 'react';
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';

import { 
  Feed, 
  Login, 
  NotFound, 
  PostDetail, 
  ProfileDetail, 
  SearchResult 
} from 'components';

import { PrivateRoute, PublicRoute }              from 'components/Routing';

import { routes }                                 from '_utils';
import { history }                                from '_helpers';
import { authenticationService }                  from '_services';

import { makeStyles }                             from '@material-ui/core/styles';
import { CircularProgress }                       from '@material-ui/core';

import { loadingState, useLoadingState }          from '_hooks';

const useStyles = makeStyles((theme) => ({
  loading:{
    position:       'fixed',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'center',
    top:            '0',
    left:           '0',
    width:          '100vw',
    height:         '100vh',
    zIndex:         '2000',
    backgroundColor: '#00000055',
  }
}));

function App() {

  useLoadingState();

  const [ user, setUser ] = useState(null);

  const classes = useStyles();

  useEffect(()=>{
    authenticationService
              .currentUser
              .subscribe(x=>setUser(x));
  },[]);
  
  const temp = { history, user };

  return (
    <div className= 'App'>
      {
        loadingState.get &&
        <div className={classes.loading}>
          <CircularProgress color='primary'/>
        </div>
      }
      <Router>
        <Switch>
          <PrivateRoute exact path={routes.feed}          component={Feed}            {...temp}   />
          <PrivateRoute exact path={routes.postDetail}    component={PostDetail}      {...temp}   />
          <PrivateRoute       path={routes.searchResult}  component={SearchResult}    {...temp}   />
          <PrivateRoute exact path={routes.profile}       component={ProfileDetail}   {...temp}   />
          <PublicRoute  exact path={routes.login}         component={Login}           {...temp}   />
          <Route        exact path={'*'}                  component={NotFound}        {...temp}   />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
