import React,{ Children, cloneElement } from 'react';

import { withStyles } from '@material-ui/core/styles';

import {
  Dialog,
  DialogContent as MuiDialogContent,
} from '@material-ui/core';

import styles from '_styles/DialogFollow.module.css';

const DialogContent = withStyles((theme) => ({
  root: {
    width:    '100%',
    padding:  theme.spacing(2),
  },
}))(MuiDialogContent);

export const DialogFollow = ({children, open, title, onClose}) => {
  const childrenWithProps = Children.map(children, (child, index) => {
    return cloneElement(child, {
      onClose,
    });
  });

  return (
    <Dialog             
        style               =   { { zIndex: 10001 } } 
        onClose             =   { onClose }
        aria-labelledby     =   ''
        open                =   { open }
    >
        <DialogContent dividers>
            <h3 className={styles.title}>
                {title}
            </h3>
            {childrenWithProps}
        </DialogContent>
    </Dialog>
  );
};

export default DialogFollow;