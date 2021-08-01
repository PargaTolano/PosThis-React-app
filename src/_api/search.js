import {  getURL  }                 from '_config';
import { arrayToCSV }               from '_utils';
import { authHeader }               from '_helpers';
import { authenticationService }    from '_services';

import { SearchRequestModel }       from '_model';

/**
 * @param {SearchRequestModel} model 
 */
const getSearch = async (
    query, 
    searchPosts, 
    searchUsers, 
    offsetPost, 
    limitPost, 
    offsetUser, 
    limitUser) => {

    let headers= authHeader();

    let options ={
        headers
    };

    let url = new URL( await getURL( `api/search/${offsetPost}/${limitPost}/${offsetUser}/${limitUser}`));

    url.searchParams.set( 'search-posts', searchPosts );
    url.searchParams.set( 'search-users', searchUsers );
    url.searchParams.set( 'query', query );

    return fetch( url.href, options );
}

export{ getSearch }