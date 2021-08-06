import React from 'react';

import { CircularProgress } from '@material-ui/core';

import { usePagination }          from '_hooks';

import styles from '_styles/PaginationElement.module.css';

export const PaginationElement = ({name, hasFetched, total, last, limit, onIntersection}) => {

    const more = usePagination(hasFetched, total, last, limit, onIntersection);

    return (
        <div className={styles.loading}>

            {
                more ?
                    <CircularProgress color='primary'/>

                :
                    <h3 className={styles.unavailable}>Sorry, no more {name} are available right now :(</h3>

            }
        </div>
    );
}

export default PaginationElement;