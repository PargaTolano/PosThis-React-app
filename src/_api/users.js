import {  getURL  }                 from '_config';
import { arrayToCSV }               from '_utils';
import { authHeader }               from '_helpers';
import { authenticationService }    from '_services';

import { SignUpModel, LogInModel, SearchRequestModel, UpdateUserViewModel} from '_model';

const getUsers = async () => {

    let headers= {
        ...authHeader()
    };

    let options ={
        headers
    };

    return fetch( await getURL( 'api/users/Get' ), options );
}

const getUser = async ( id ) => {

    let headers= {
        ...authHeader(),
        'UserID': authenticationService.currentUserValue.id
    };

    let options ={
        headers
    };
    
    return fetch( await getURL( `api/users/Get/${id}` ), options );
};

/**
 * @param {SearchRequestModel} model 
 */
const getSearch = async ( model ) =>{

    let headers= {
        ...authHeader()
    };

    let options ={
        headers
    };

    let url = new URL( await getURL( 'api/users/GetSearch'));

    url.searchParams.set( 'UserID', authenticationService.currentUserValue.id );
    url.searchParams.set( 'SearchPosts', model.searchPosts );
    url.searchParams.set( 'SearchUsers', model.searchUsers );
    url.searchParams.set( 'Query', model.query );
    url.searchParams.set( 'Hashtags', arrayToCSV( model.hashtags ) );

    return fetch( url.href, options );
};

/**
 * @param {Number} id id del usuario en sesion
 */
const getFeed = async ( id ) =>{
    let headers= {
        ...authHeader()
    };

    let options ={
        headers
    };

    return fetch( await getURL( `api/users/GetFeed/${id}` ), options );
};

/**
 * @param {Number} id id del usuario en sesion
 */
 const getUserFeed = async ( id ) =>{
    let headers= {
        ...authHeader(),
        'UserID': authenticationService.currentUserValue.id  
    };

    let options ={
        headers
    };

    return fetch( await getURL( `api/users/GetUserPosts/${id}` ), options );
};

/**
 * @param {SignUpModel} model
 */
const createUser = async ( model ) => {

    const headers = {
        'Content-Type': 'application/json'
    };

    const options = {
        method: 'POST',
        body: JSON.stringify( model ),
        headers: headers
    };

    return fetch( await getURL( `api/security/CreateUser` ), options );
};

/**
 * @param {LogInModel} model
 */
const logIn = async ( model ) => {

    const headers = {
        'Content-Type': 'application/json'
    };

    const options = {
        method: 'POST',
        body: JSON.stringify( model ),
        headers: headers
    };

    return fetch( await getURL( `api/security/Login` ), options );
};

/**
 * @param {Number} id 
 * @param {UpdateUserViewModel} model
 */
const updateUser = async ( id, model ) =>{

    const headers = {
        ...authHeader()
    };

    let fd = new FormData();
    fd.append('UserName'    , model.userName    );
    fd.append('Tag'         , model.tag         );
    fd.append('Email'       , model.email       );
    fd.append('ProfilePic'  , model.profilePic  );
    fd.append('CoverPic'    , model.coverPic    );

    const options = {
        method: 'PUT',
        body: fd,
        headers
    };

    return fetch( await getURL( `api/users/Update/${id}` ), options );
};

/**
 * @param   {Number} id
 */
const deleteUser = async ( id ) =>{
    const headers = {
        'Content-Type': 'application/json',
        ...authHeader()
    };

    const options = {
        method: 'DELETE',
        headers
    };
    
    return fetch( await getURL( `api/users/Delete/${id}` ), options );
};

export{
    getUsers,
    getUser,
    getSearch,
    getFeed,
    getUserFeed,
    createUser,
    logIn,
    updateUser,
    deleteUser
}