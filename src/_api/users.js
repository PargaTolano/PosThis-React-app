import {  getURL  }                 from '_config';
import { arrayToCSV }               from '_utils';
import { authHeader }               from '_helpers';
import { authenticationService }    from '_services';

import { SignUpModel, LogInModel, SearchRequestModel, UpdateUserViewModel} from '_model';

const getUsers = async () => {

    let headers= authHeader();

    let options ={
        headers
    };

    return fetch( await getURL( 'api/users-get' ), options );
}

const getUser = async ( id ) => {

    let headers= authHeader();

    let options ={
        headers
    };
    
    return fetch( await getURL( `api/user/${id}` ), options );
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
        headers
    };

    return fetch( await getURL( `api/users-create` ), options );
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
        headers
    };

    return fetch( await getURL( `api/login` ), options );
};

const logOut = async ( model ) => {

    const headers = authHeader();

    const options = {
        method: 'POST'
    };

    return fetch( await getURL( `api/logout` ), options );
};

/**
 * @param {Number} id 
 * @param {UpdateUserViewModel} model
 */
const updateUser = async ( id, model ) =>{

    const headers = authHeader();

    let body = new FormData();
    body.append('username'    , model.userName    );
    body.append('tag'         , model.tag         );
    body.append('email'       , model.email       );
    body.append('profilePic'  , model.profilePic  );
    body.append('coverPic'    , model.coverPic    );

    const options = {
        method: 'PUT',
        body,
        headers
    };

    return fetch( await getURL( `api/users-update/${id}` ), options );
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
    
    return fetch( await getURL( `api/users-delete/${id}` ), options );
};

export{
    getUsers,
    getUser,
    createUser,
    logIn,
    logOut,
    updateUser,
    deleteUser
}