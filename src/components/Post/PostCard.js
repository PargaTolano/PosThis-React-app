import React, { useState, useRef }  from 'react';
import { Link }                     from 'react-router-dom';


import {
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Button,
  Avatar,
} from '@material-ui/core';

import {
  Favorite as FavoriteIcon,
  QuestionAnswer as QuestionAnswerIcon,
  ReplyAll       as ReplyAllIcon,
  Save           as SaveIcon,
  Image          as ImageIcon,

} from '@material-ui/icons';

import { MediaGrid }                from 'components/Media';

import { handleResponse }  from '_helpers';
import { authenticationService }    from '_services';
import { routes, fileToBase64 }     from '_utils';

import { 
  updatePost,
  deletePost,
  createLike,
  deleteLike,
  createRepost,
  deleteRepost
} from '_api';

import{
  UPostModel,
  LikeViewModel,
  RepostViewModel
} from '_model';

export const PostCard = ( props ) => {

  const { classes, history } = props;

  const [ post, setPost ] = useState( props.post );

  const [ state, setState ] = useState({
    editMode:         false,
    content:          post.content,
    originalContent:  post.content,
    medias:           post.medias,
    originalMedias:   post.medias,
    deleted:          [],
    newMedias:        []
  });

  const inputFileRef = useRef();

  const temp = { state, setState };

  const onClickSave = ()=>{
    updatePost( post.postID,  new UPostModel({content: state.content, deleted: state.deleted, files: state.newMedias}))
      .then( handleResponse )
      .then( res =>{

        let { data } = res;

        setState(x=>{
          let copy              = {...x};
          copy.editMode         = false;
          copy.originalContent  = copy.content;
          copy.medias           = data.medias;
          copy.originalMedias   = data.medias;
          return copy;
        });
      })
      .catch( res =>{
        console.log('err',res)
      });
  };
  
  const onChangeContent = e=>{
      setState( x =>{
        let copy = {...x};
        copy.content = e.target.value;
        return copy;
      });
  };

  const onChangeImages = async e=>{
    let {files} = e.target;

    if( state.medias.length + files.length > 4 )
      return;

    const mediaInfo    = [];
    const newMediaFiles = [];
    for ( let i = 0; i < files.length; i++ ){
      let file = files[i];
      let preview = await fileToBase64( file );

      const mediaViewModel = {
        mediaID:  null,
        mime:     file.type,
        path:     preview,
        isVideo:  file.type.includes('video')
      };

      mediaInfo     .push( mediaViewModel );
      newMediaFiles .push( file );
    }

    setState( x=>{
      let copy = {...x};
      copy.medias = [...copy.medias, ...mediaInfo];
      copy.newMedias = [...copy.newMedias, ...newMediaFiles];
      return copy;
    });
  };

  const onClickFileOpen = ()=>inputFileRef.current?.click();

  const onClickLike = ()=>{

    const model = new LikeViewModel({
      postID: post.postID, 
      userID: authenticationService.currentUserValue.id 
     });

    if( post.isLiked ){
      deleteLike(model)
       .then(handleResponse)
       .then( res =>{
          const { data } = res;
          setPost( data );
          setState( x=>{
            let copy = {...x};
            copy.content         = data.content;
            copy.originalContent = data.content;
            copy.medias          = data.medias;
            copy.originalMedias  = data.medias;
            return copy;
          });
       })
       .catch(console.warn)
    }
    else{
      createLike(model)
        .then(handleResponse)
        .then(res=>{
          const { data } = res;
          setPost( data );
          setState( x=>{
            let copy = {...x};
            copy.content         = data.content;
            copy.originalContent = data.content;
            copy.medias          = data.medias;
            copy.originalMedias  = data.medias;
            return copy;
          });
        })
        .catch(console.warn);
    }
  };

  const onClickRepost = ()=>{

    const model = new RepostViewModel({
      postID: post.postID, 
      userID: authenticationService.currentUserValue.id 
     });

    if( post.isReposted){
      deleteRepost(model)
      .then(handleResponse)
      .then ( res =>{
        const { data } = res;
        setPost( data );
        setState( x=>{
          let copy = {...x};
          copy.content         = data.content;
          copy.originalContent = data.content;
          copy.medias          = data.medias;
          copy.originalMedias  = data.medias;
          return copy;
        });
      })
      .catch(console.warn);
    }
    else{
      createRepost(model)
      .then(handleResponse)
      .then ( res =>{
        const { data } = res;
        setPost( data );
        setState( x=>{
          let copy = {...x};
          copy.content         = data.content;
          copy.originalContent = data.content;
          copy.medias          = data.medias;
          copy.originalMedias  = data.medias;
          return copy;
        });
      })
      .catch(console.warn);
    }
  };

  const onToggleEditMode = ()=>{
    setState( x =>{
      let copy = {...x};
      copy.editMode = !copy.editMode;

      if( copy.editMode === false ){
        copy.medias     = [...copy.originalMedias];
        copy.content    = copy.originalContent;
        copy.deleted    = [];
        copy.newMedias  = [];
      }
      return copy;
    })
  };

  const onClickDelete = ()=>{
    if(window.confirm('Seguro que quiere borrar el post')){
      deletePost(post.postID)
      .then(handleResponse)
      .then(res=>{
        history.replace(routes.feed);
      })
      .catch(console.warn);
    }
  };

  const dateString = new Date(Date.parse( post.date )).toLocaleString();

  return (
    <Card className={classes.root}>
      {
        (post.isRepost !== 0) &&
        <Typography variant='body2' className={classes.repostText}>
          <Link to={routes.getProfile(post.publisherID)} className={classes.repostUserLink}>{post.reposterUserName}</Link> reposted this!
        </Typography>
      }
      <CardContent>
          <div className={classes.displayTitle}>
            <Link to={routes.getProfile(post.publisherID)}>
              <Avatar src={post.publisherProfilePic} className={classes.avatar}/>
            </Link>
            <Link to={routes.getProfile(post.publisherID)}>
              <Typography variant='h6' component='h2' className={classes.title}>
                <strong>{post.publisherUserName} {'@'+post.publisherTag}</strong>
              </Typography>
            </Link>
          </div>
          <p className={classes.date}>{ dateString.slice( 0, dateString.length - 6 ) } { dateString.slice(dateString.length-3) }</p>
          
          {
            state.editMode ? 
            (<textarea className={classes.contentEdit} value={state.content} onChange={onChangeContent}></textarea>)
            :
            (<Typography variant='body2' component='p' className={state.medias.length !== 0 ? classes.content : classes.contentNoMedia} >{state.originalContent}</Typography>)
          }
          
          {
            state.editMode &&
            <>
            <input accept='image/*' className={classes.input} type='file' multiple ref={inputFileRef} onChange={onChangeImages}/>
              <IconButton onClick={onClickFileOpen}>
                <ImageIcon className={classes.mediaIcon}/>
              </IconButton>
            </>
          }
          <div className={classes.contMedia}>
            <MediaGrid media={ state.editMode ? state.medias : state.originalMedias } {...temp}/>
          </div>

          <div  className={classes.displaybtn}>
          {
            (authenticationService.currentUserValue.id === post.publisherID)
            && 
            <>
              <Button 
                variant='contained' 
                color='secondary' 
                onClick={onClickDelete}
                className={classes.deleteBtn}
              >
                  Eliminar
              </Button>
              <Button 
                variant='contained' 
                color='secondary' 
                onClick={onToggleEditMode}
              >
                { state.editMode ? 'Cancelar' : 'Editar' }
              </Button>
            </>
          }
          </div>
        </CardContent>

      <CardActions disableSpacing className={classes.cardBtn}>

        {
          (!state.editMode)
          && 
          <div>
            <IconButton onClick={onClickLike}>
              <FavoriteIcon className={ post.isLiked ? classes.likeIcon : classes.grayIcon }/>
            </IconButton>
            {post.likeCount}
          </div>
        }
        
        {
          (!state.editMode)
          && 
          <div>
            <Link to={routes.getPost(post.postID || 1)}>
              <IconButton>
                <QuestionAnswerIcon className={classes.commentIcon}/>
              </IconButton>
            </Link>
            {post.replyCount}
          </div>
        }
        
        {
          (!state.editMode)
          && 
          <div>
            <IconButton onClick={onClickRepost}>
              <ReplyAllIcon className={ post.isReposted ? classes.repostIcon : classes.grayIcon }/>
            </IconButton>
            {post.repostCount}
          </div>
        }

        {
          (authenticationService.currentUserValue.id === post.publisherID && state.editMode)
          && 
          <div>
            <IconButton onClick={onClickSave}>
              <SaveIcon className={classes.saveIcon}/>
            </IconButton>
          </div>
        }

      </CardActions>
    </Card>
  );
}

export default PostCard;