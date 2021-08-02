import { makeStyles }   from '@material-ui/core/styles';

const useMediaGrid = makeStyles((theme)=>({
    grid: {
      display:        'flex',
      flexFlow:       'row wrap',
      justifyContent: 'flex-start',
      alignItems:     'center',
      height:         '400px',
      overflow:       'hidden',
      borderRadius:   theme.spacing(1)
    },
}));

const useMediaContainer = makeStyles((theme) => ({
    mediaContainer:{
      position:         'relative',
      display:          'inline-block',
      flex:             '1 1 auto',
      height:           '400px',
      overflow:         'hidden',
      width:            '100%',
      backgroundColor:  '#333333',
      [
        `&:first-child:nth-last-child(2)    ,
         &:first-child:nth-last-child(2) ~ &`
      ]: {
        flex:             '0 0 50%',
        height:           '400px',
      },
      '&:first-child:nth-last-child(3)':{  
        flex:             '0 0 100%',
        height:           '200px',
      },
      [
       `&:first-child:nth-last-child(3) ~ &,
        &:first-child:nth-last-child(4)    ,
        &:first-child:nth-last-child(4) ~ &`
      ]: {
        flex:             '0 0 50%',
        height:           '200px',
      },
      [
        `&:first-child:nth-last-child(3)     > $mediaFit,
         &:first-child:nth-last-child(3) ~ & > $mediaFit,
         &:first-child:nth-last-child(4)     > $mediaFit,
         &:first-child:nth-last-child(4) ~ & > $mediaFit`
       ]: {
        height:           '200px',
      },
    },
    mediaFit: {
      display:    'inline-block',
      width:      '100%',
      height:     '100%',
      maxHeight:  'inherit',
      objectFit:  'cover'
    },
    deleteIcon:{
      position: 'absolute',
      top:      0,
      right:    0,
      color:    'red',
      '&:hover': {
        color: 'white'
      },
      
    }
}));

export const useMediaGridStyles = ()=>{

    const mgClasses = useMediaGrid(), mcClasses = useMediaContainer();

    const classes = {...mgClasses, ...mcClasses};

    return classes;
}