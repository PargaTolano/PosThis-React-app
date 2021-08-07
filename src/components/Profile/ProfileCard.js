import React from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from '@material-ui/core';

import { makeStyles }   from '@material-ui/core/styles';

import { DialogEditInfo, EditInfo }   from 'components/EditProfile';

import { createFollow, deleteFollow } from '_api';
import { handleResponse }             from '_helpers';
import { authenticationService}       from '_services';
import { FollowViewModel }            from '_model';

import profilePicPlaceholder from 'assets/avatar-placeholder.svg';

import styles from '_styles/ProfileCard.module.css';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  cardBtn: {
    padding:        '0',
    margin:         '0',
    alignItems:     'center',
    justifyContent: 'space-between',
    color:          'white',
  },
  title: {
    color:    'white',
    fontSize: '1.1rem'
  },
  secondaryTitle: {
    color:    'white',
    fontSize: '0.8rem'
    
  },
  content: {
    color:          'white',
    marginLeft:     theme.spacing(7),
    marginBottom:   theme.spacing(1),
  },
  layTitle:{
    display: 'inline-flex'
  },
  profilePicture:{
    width:        150,
    height:       150,
    objectFit:    'cover',
    borderRadius: '50%',
    backgroundColor: '#333333'
  },
  contImg:{
    alignItems: 'center',
    textAlign:  'center',
  },
  followNum:{
    alignItems: 'center',
    textAlign:  'center',
  }
}));

export const ProfileCard = ( props ) => {
  const { user, setUser } = props;
  const classes = useStyles();

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

        {
          (authenticationService.currentUserValue.id === user.id) 
          &&
          <DialogEditInfo color={'primary'}>
            <EditInfo user={user} setUser={setUser}/>
          </DialogEditInfo>
        }
      </div>
    </div>
  );
}

export default ProfileCard;
