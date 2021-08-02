import { BehaviorSubject }  from 'rxjs';
import { authTokenKey }     from '_utils';
import { handleResponse }   from '_helpers';

import { getReplies } from '_api/replies';

const replySubject = new BehaviorSubject( {} );

export const postService = {
    getPostReplies,
    reply$: replySubject.asObservable(),
};

function getPostReplies(id){
    return getReplies(id)
        .then(handleResponse)
        .then(res=>{
            const {data} = res;
            replySubject.next(data);

            return data;
        })
}