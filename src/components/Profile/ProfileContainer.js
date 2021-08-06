import React, { useState, useEffect } from 'react';

import { makeStyles }                 from '@material-ui/core/styles';

import { ProfileCard }                from 'components/Profile';
import { PostContainer }              from 'components/Feed';
import { CreatePostForm }             from 'components/Post';

import { authenticationService }      from '_services';
import { getUserFeed }                from '_api';
import { loadingState } from '_hooks';

const useStyles = makeStyles((theme) => ({
  root:{
    width:        '100%',
    maxWidth:     '1200px',
    marginLeft:   'auto',
    marginRight:  'auto'
  },
  coverPic:{
    display: 'inline-block',
    width: '100%',
    height: theme.spacing( 50 ),
    objectFit: 'cover',
    borderRadius: '0px 0px 10px 10px',
    marginBottom: theme.spacing( 3 ),
    [theme.breakpoints.down('sm')]:{
      marginBottom: theme.spacing( 33 ),
    }
  },
  column:{
    position:     'relative',
    width:        '100%',
    paddingLeft:  '30%',
    [theme.breakpoints.down('sm')]:{
      paddingLeft: '0'
    }
  }
}));

const coverPlaceholder = 
  'https://png.pngtree.com/thumb_back/fw800/background/20190220/ourmid/pngtree-blue-gradient-summer-creative-image_9270.jpg';

export const ProfileContainer = ( props ) => {
  const { user, ...rest } = props;
  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  console.log('USER DATA ', user);

  const loadFeed = async ()=>{

    loadingState.set(true);

    const {data:responseData, err} = await getUserFeed(user.id, 0, 100);

    loadingState.set(false);

    if (err !== null) 
      return;
    
    const { data } = responseData;
    setPosts( data );

  };

  useEffect(() => {
    loadFeed();
  },[user]);

  return (
      <div className={classes.root}>

        <img className={classes.coverPic} src={ user.coverPicPath || coverPlaceholder } />

        <ProfileCard user={user} {...rest}/>
        <div className={classes.column}>

          {
            ( authenticationService.currentUserValue.id === user.id ) && <CreatePostForm afterUpdate={loadFeed} {...rest}/>
          }

          <PostContainer posts={posts} {...rest}/>
        </div>
        
      </div>
  );
}
export default ProfileContainer;