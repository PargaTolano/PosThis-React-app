import React, { useState, useRef}  from 'react';
import { Link }                    from 'react-router-dom';

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
  Edit           as EditIcon,
  Delete         as DeleteIcon,
  Cancel         as CancelIcon,
} from '@material-ui/icons';

import { MediaGrid }                from 'components/Media';

import { authenticationService, replyService }    from '_services';
import { handleResponse, history }  from '_helpers';
import { fileToBase64, routes }     from '_utils';
import { updateReply, deleteReply } from '_api';
import { UReplyModel }              from '_model';

import styles from '_styles/ReplyCard.module.css';

export const ReplyCard = ( props ) => {

  const { id , reply } = props;
  const inputFileRef = useRef();

  const [ state, setState ] = useState({
    editMode:         false,
    content:          reply.content,
    originalContent:  reply.content,
    medias:           reply.medias,
    originalmedias:   reply.medias,
    deleted:         [],
    newmedias:        []
  });

  const temp = { state, setState};

  const dateString = new Date( Date.parse( reply.date ) ).toLocaleString();

  const onClickSave = ()=>{

    let model = new UReplyModel({
      content: state.content.trim(),
      deleted: state.deleted,
      files:   state.newmedias });

    updateReply( reply.replyID, model)
      .then( handleResponse )
      .then(()=>replyService.getPostReplies(id))
      .catch(console.warn);
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

    const mediasInfo    = [];
    const newmediasFiles = [];
    for ( let i = 0; i < files.length; i++ ){
      let file = files[i];
      let preview = await fileToBase64( file );
      
      const mediasViewModel = {
        mediasID:  null,
        mime:     file.type,
        path:     preview,
        isVideo:  file.type.includes('video')
      };

      mediasInfo     .push( mediasViewModel );
      newmediasFiles .push( file );
    }

    setState( x=>{
      let copy = {...x};
      copy.medias = [...copy.medias, ...mediasInfo];
      copy.newmedias = [...copy.newmedias, ...newmediasFiles];
      return copy;
    });
  };

  const onClickFileOpen = ()=>inputFileRef.current?.click();

  const onToggleEditMode = ()=>{
    setState( x =>{
      let copy = {...x};
      copy.editMode = !copy.editMode;

      if( copy.editMode === false ){
        if (copy.originalmedias)
          copy.medias     = [...copy.originalmedias];
        if (copy.originalmedias)
          copy.medias     = [...copy.originalmedias];
        copy.content    = copy.originalContent;
        copy.deleted    = [];
        copy.newmedias  = [];
      }
      return copy;
    })
  };

  const onClickDelete = ()=>{
    if(window.confirm('Seguro que quiere borrar la respuesta')){
      deleteReply(reply.replyID)
      .then(handleResponse)
      .then(()=>replyService.getPostReplies(id))
      .catch(console.warn);
    }
  };

  return (

    <div className={styles.root}>
      <div className={styles.rooter}>
        <div className={styles.uproot}></div>
        <div className={styles.sideroot}></div>
        <div className={styles.downroot}></div>
      </div>
      <div className={styles.container}>
        <CardContent>

          <div className={styles.displayTitle}>
            <Link to={routes.getProfile(reply.publisherID)} className={styles.avatarContainer}>
              <img src={reply.publisherProfilePic} className={styles.avatar}/>
            </Link>
            <Link to={routes.getProfile(reply.publisherID)} className={styles.titleContainer}>
              <Typography variant='h6' component='h2' className={styles.title}>
                <strong className={styles.publisher}>{reply.publisherUserName} {'@'+reply.publisherTag}</strong>
                <p className={styles.date}>{ dateString.slice( 0, dateString.length - 6 ) } { dateString.slice(dateString.length-3) }</p>
              </Typography>
            </Link>
            <div  className={styles.displaybtn}>
              {
                (authenticationService.currentUserValue.id === reply.publisherID)
                && 
                <>
                  <IconButton 
                    variant='contained' 
                    color='secondary' 
                    onClick={onToggleEditMode}
                  >
                    { state.editMode ?  <CancelIcon className={styles.cancelIcon}/> : <EditIcon className={styles.saveIcon}/>  }
                  </IconButton>
                  { 
                    state.editMode 
                    
                    ?

                    <IconButton onClick={onClickSave}>
                        <SaveIcon className={styles.saveIcon}/>
                    </IconButton>
                    
                    :
                    
                    <IconButton 
                      variant='contained' 
                      color='secondary' 
                      onClick={onClickDelete}
                      className={styles.deleteBtn}
                    >
                      <DeleteIcon className={styles.cancelIcon}/> 
                    </IconButton>
                  }
                </>
              }
            </div>
          </div>

          {
            state.editMode ? 
            (<textarea className={styles.contentEdit} value={state.content} onChange={onChangeContent}></textarea>)
            :
            (<Typography variant='body2' component='p' className={state.medias?.length !== 0 ? styles.content : styles.contentNomedia} >{state.originalContent}</Typography>)
          }
          
          {
            state.editMode &&
            <>
            <input accept='image/*' className={styles.input} type='file' multiple ref={inputFileRef} onChange={onChangeImages}/>
              <IconButton onClick={onClickFileOpen}>
                <ImageIcon className={styles.mediaIcon}/>
              </IconButton>
            </>
          }

          <div className={styles.contmedias}>
            <MediaGrid medias={ state.medias } {...temp}/>
          </div>

        </CardContent>
    </div>
    </div>
    
  );
};

export default ReplyCard;