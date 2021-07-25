import {  getURL  }              from '_config';
import { authHeader }            from '_helpers';
import { authenticationService } from '_services';

const getPosts = async () => {
    const url = await getURL( 'api/post/Get' );
    return fetch( url );
}

const getPost = async ( id ) => {

    const headers = {
        ...authHeader(),
        'UserID': authenticationService.currentUserValue.id
    }

    const options = { 
        headers
    };

    return fetch( await getURL( `api/post/Get/${id}` ), options );
};

/**
 * @param {CPostModel} model
 */
const createPost = async ( model ) => {

    const headers = {
        ...authHeader()
    };

    let fd = new FormData();
    
    fd.append( 'userID',  model.userID  );
    fd.append( 'Content', model.content );
    for( let file of model.files ){
        fd.append('Files', file );
    };

    const options = {
        method: 'POST',
        body: fd,
        headers
    };

    return fetch( await getURL( `api/post/Create` ), options );
};

/**
 * @param {Number} id 
 * @param {Object} model
 */
const updatePost = async ( id, model ) =>{

    const headers = {
        ...authHeader()
    };

    let fd = new FormData();

    fd.append('Content', model.content);

    for( let id of model.deleted){
        fd.append('Deleted', id);
    }

    for( let file of model.files){
        fd.append('Files', file);   
    }

    const options = {
        method: 'PUT',
        body: fd,
        headers: headers
    };

    return fetch( await getURL( `api/post/Update/${id}` ), options );
};

/**
 * @param   {Number} id
 */
const deletePost = async ( id ) =>{
    const options = {
        method: 'DELETE',
        headers: authHeader()
    };
    
    return fetch( await getURL( `api/post/Delete/${id}` ), options );
};

export{
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}