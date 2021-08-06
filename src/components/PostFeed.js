import React, { useState, useEffect } from 'react';

import { makeStyles }                 from '@material-ui/core/styles';
import { CircularProgress }           from '@material-ui/core';

import { NavBar, PostContainer }      from 'components/Feed';

import { CreatePostForm }             from 'components/Post';

import { PaginationElement }          from 'components/Common';

import { getFeed }                    from '_api';

import { loadingState }               from '_hooks';

import backapp3                       from 'assets/backapp3.png';

const useStyles = makeStyles((theme) => ({
  Background: {
    backgroundImage: `url('${backapp3}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  },
  titleBegin:{
    color: 'white',
    fontFamily: 'Arial',
    fontStyle: 'normal',
    fontSize: 30,
    width: '100%',
    marginTop: '24px',
    paddingBottom: theme.spacing(3),
    textAlign: 'center',
    flexDirection:'column',
  },
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

const limit = 5;

export const Feed = (props) => {

  const { history } = props;
  
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [last, setLast]   = useState(0);
  const [hasFetched, setHasFetched] = useState(false);

  const loadFeed = ()=>{

    getFeed(last, limit)
    .then( ({data:responseData, err}) =>{

      if ( err !== null )
        return;

      const { data } = responseData;

      setHasFetched(true);

      if ( data !== null)
        setPosts([...posts,...data]);
    });
  };

  useEffect(() => {
    loadFeed();
  },[]);

  const onSrolledToBottom = ()=>{
    getFeed(last, limit)
    .then( ({data:responseData, err}) =>{
      
      loadingState.set(false);
      if ( err !== null )
        return;

      const { data } = responseData;
      
      if ( data === null) return;

      setLast(data.length);
      setTotal(total + data.length);
      setPosts([...posts,...data]);
    });
  };

  return (
    <div className={classes.Background}>
      <NavBar history={history}/>
      <div component='h4' variant='h2' className={classes.titleBegin}>
        <strong>Crear Post</strong>
      </div>
      <CreatePostForm afterUpdate={loadFeed}/>
      {
        (posts?.length !== 0) && <PostContainer posts={posts} history={history}/>
      }
      <PaginationElement
        name            = 'posts'
        hasFetched      = {hasFetched}
        total           = {total}
        last            = {last}
        limit           = {limit}
        onIntersection  = {onSrolledToBottom}
      />
    </div>
  );
};

export default Feed;
