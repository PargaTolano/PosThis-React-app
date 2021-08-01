import {  getURL  }     from '_config';
import { authHeader } from '_helpers';

import LikeViewModel from '_model/LikeViewModel';

/**
 * @param   {Number} id
 */
const getLikes= async ( id ) => {
    let res = await fetch( await getURL( `api/likes/${id}` ) );
    return res.json();
};

/**
 * @param {Number | string} userId
 * @param {Number | string} postId
 * @returns
 */
const createLike = async ( userId, postId ) => {

    const headers = authHeader();

    const options = {
        method: 'POST',
        headers
    };

    return fetch( await getURL( `api/likes-create/${userId}/${postId}` ), options );
};

/**
 * @param {Number | string} id
 */
 const deleteLike = async ( id ) => {

    const headers = authHeader();

    const options = {
        method: 'DELETE',
        headers
    };

    return fetch( await getURL( `api/likes-delete/${id}` ), options );
};

export{
    getLikes,
    createLike,
    deleteLike
}