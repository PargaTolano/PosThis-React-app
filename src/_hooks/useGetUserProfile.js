import {useState, useEffect} from 'react';

import { getUser }           from '_api';
import { handleResponse }    from '_helpers';

import { loadingState }     from '_hooks';

export const useGetUserProfile = ( id ) =>{

    const [ state, setState ] =  useState([false, null]);

    useEffect(()=>{
        loadingState.set( true );

        getUser( id )
        .then ( ({data:responseData, err})=> {

            loadingState.set( false );
            if ( err !== null){
                setState( [ true, null ] );
                return;
            }

            const {data} = responseData;
            
            setState( [ true, data ] );
        })
    }, [id]);

    const setUser = ( user )=>{
        setState( [true, user ]);
    };

    return [ state, setUser ];
};

export default useGetUserProfile;