import React                    from 'react';
import { Redirect }             from 'react-router-dom';

import { makeStyles }           from '@material-ui/core/styles';

import { NavBar }               from 'components/Feed';
import { ProfileContainer }     from 'components/Profile';

import { routes }               from '_utils';
import { useGetUserProfile }    from '_hooks';

import styles from '_styles/ProfileDetail.module.css';
export const ProfileDetail = (props) => {

  const { match, ...rest } = props;
  const { id }             = match.params;

  const [[ready, user], setUser] = useGetUserProfile( id || '' );

  if( id == 'undefined' || id === undefined || id === null || id === ''|| (ready && user === null ) ){
    return (<Redirect to={routes.feed}/>);
  }

  return (
      <div className = { styles.root }>
        <NavBar {...rest}/>
        {
          ready && <ProfileContainer user={user} setUser={setUser} {...rest}/>
        }
      </div>
  );
};

export default ProfileDetail;
