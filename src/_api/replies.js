import {  getURL  }     from '_config';
import { authHeader }   from '_helpers';

import { CReplyModel, UReplyModel } from '_model';

/**
 * @param   {Number} id
 */
const getReplies= async ( ) => {

    const headers = {
        ...authHeader(),
    }

    const options = {
        headers
    };

    return fetch( await getURL( `api/replies/Get` ), options );
};

/**
 * @param   {Number} id
 */
 const getReply = async ( id ) => {

    const headers = {
        ...authHeader(),
    }

    const options = {
        headers
    };

    return fetch( await getURL( `api/replies/Get/${id}` ), options );
};

/**
 * @param {CReplyModel} model
 */
const createReply = async ( model ) => {

    const headers = {
        ...authHeader(),
    }

    let fd = new FormData();
    fd.append('UserID', model.userID    );
    fd.append('PostID', model.postID    );
    fd.append('Content', model.content  );

    for( let f of model.files ){
        fd.append('Files', f );
    }

    const options = {
        method: 'POST',
        body: fd,
        headers
    };

    return fetch( await getURL( `api/replies/Create` ), options );
};

/**
 * @param {Number}      id
 * @param {UReplyModel} model
 */
 const updateReply = async ( id, model ) => {

    const headers = {
        ...authHeader()
    }

    let fd = new FormData();
    fd.append('Content', model.content  );

    for( let did of model.deleted ){
        fd.append('Deleted', did );
    }

    for( let f of model.files ){
        fd.append('Files', f );
    }

    const options = {
        method: 'PUT',
        body: fd,
        headers
    };

    return fetch( await getURL( `api/replies/Update/${id}` ), options );
};

/**
 * @param {Number} id
 */
 const deleteReply = async ( id ) => {

    const headers = {
        ...authHeader()
    };

    const options = {
        method: 'DELETE',
        headers
    };

    return fetch( await getURL( `api/replies/Delete/${id}` ), options );
};

export{
    getReplies,
    getReply,
    createReply,
    updateReply,
    deleteReply
}