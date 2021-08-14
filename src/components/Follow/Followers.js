import React from 'react';

import {
    CssBaseline,
    Container,
    CircularProgress
}from  '@material-ui/core';

import { FollowCard } from 'components/Follow';

import styles from '_styles/Follow.module.css';

export const Followers = ( {loading, users} ) => {
    
    return (
        <Container 
            className = { styles.root }
            component = 'div' 
            maxWidth  = 'xs'
        >
            <CssBaseline />
            
            <div className={ loading ? `${styles.paper} ${styles.loading}` : styles.paper}>
                {
                    loading 
                    ?
                        <CircularProgress color='primary'/>
                    :
                        users?.map((v,i)=><FollowCard key={v.id} user={v}/>)
                }
            </div>    
        </Container>
    );
  }
  
  export default  Followers;