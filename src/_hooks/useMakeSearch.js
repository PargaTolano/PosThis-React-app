import { useState, useEffect }  from 'react';
import { getSearch }            from '_api';
import { handleResponse }       from '_helpers';

import { SearchRequestModel }   from '_model';
import { loadingState }         from '_hooks';

export const useMakeSearch = ( query ) =>{

    const [ state, setState ] = 
        useState([
            false,
            null
        ]);
        
        
        useEffect( () => {

            loadingState.set(true);

            getSearch( query, true, true, 0, 5, 0, 5)
                .then ( handleResponse )
                .then ( res => setState( [true, res.data] ) )
                .catch( err => setState( [true, err] ) )
                .then( ()   => loadingState.set(false) );
        }, [ query ]);

    return state;
};

export default useMakeSearch;