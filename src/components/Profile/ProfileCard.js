import React from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';

import { makeStyles }   from '@material-ui/core/styles';

import { createFollow, deleteFollow } from '_api';
import { handleResponse }             from '_helpers';
import { authenticationService}       from '_services';
import { FollowViewModel }            from '_model';

import profilePicPlaceholder from 'assets/avatar-placeholder.svg';

import styles from '_styles/ProfileCard.module.css';

export const ProfileCard = ( props ) => {
  const { user, setUser } = props;

  const OnClickFollowButton = async ()=>{
    const model = new FollowViewModel({
      followedID: user.id,
      followerID: authenticationService.currentUserValue.id });
    
    if( user.isFollowed ){
      const {data:responseData, err} = await deleteFollow( user.id );

      if ( err !== null ) return;

      const {data} = responseData;
      setUser(data);
    }else{
      const {data:responseData, err} = await createFollow( user.id );

      if ( err !== null ) return;

      const {data} = responseData;
      setUser(data);
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
          
        <div className={styles.contImg}>
          <img className={styles.profilePicture} src={ user.profilePicPath || profilePicPlaceholder }/>
          <h2 className={styles.username}>
            {user.username}
          </h2>
          <h4 className={styles.tag}>
            {`@${user.tag}`}
          </h4>
          <div className={styles.follows}>
            <span className={styles.followLink}>{user.followerCount} Followers</span>
            <span className={styles.followLink}>{user.followingCount} Following</span>
          </div>
        </div>

        {
          (authenticationService.currentUserValue.id !== user.id) 
          &&
          <div className={styles.followBtnContainer}>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              className={styles.followBtn}
              onClick={OnClickFollowButton}
            >
              { user.isFollowed ? 'Unfollow' : 'Follow'}
            </Button>
          </div>
        }

       
      </div>
    </div>
  );
}

export default ProfileCard;
