import { useRef, useState, useEffect }  from 'react';

export const usePagination = ( hasFetched, total, last, limit, onIntersection) =>{

    const [ more, setMore ] = useState( true );
        
    const ref = useRef();  

    useEffect( () => {
        if ( last < limit ){
            setMore(!hasFetched);
        }
    }, [ hasFetched, total, last, limit ]);

    useEffect( () =>{
        let observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach( entry =>{
                    if (!entry.isIntersecting) onIntersection(); 
                });
            },
            {
                root: ref.current,
                threshold: 0.5,
            });

        return () => observer.disconnect();
    },[]);

    return more;
};

export default usePagination;