import { makeStyles }     from '@material-ui/core/styles';

export const useReplyCardStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '600px',
      marginTop: theme.spacing(0),
      borderBottomStyle: 'solid',
      borderBottomColor: 'white',
      borderBottomWidth: theme.spacing(0.3),
      backgroundColor: '#1b2452',
      borderRadius: theme.spacing( 0 ),
      boxShadow:        'black 1px 1px 8px',
    },
    rootFirst:{
      width: '100%',
      maxWidth: '600px',
      marginTop: theme.spacing(0),
      borderBottomStyle: 'solid',
      borderBottomColor: 'white',
      borderBottomWidth: theme.spacing(0.3),
      backgroundColor: '#1b2452',
      borderRadius: theme.spacing( 1, 1, 0, 0 ),
      boxShadow:        'black 1px 1px 8px',
    },
    rootLast:{
      width: '100%',
      maxWidth: '600px',
      marginTop: theme.spacing(0),
      borderBottomStyle: 'solid',
      borderBottomColor: 'white',
      borderBottomWidth: theme.spacing(0),
      backgroundColor: '#1b2452',
      borderRadius: theme.spacing( 0, 0, 1, 1 ),
      boxShadow:        'black 1px 1px 8px',
    },
    media: {
      height: 140,
    },
    title: {
      color: 'white',
      marginLeft: theme.spacing(2),
    },
    content: {
      color: 'white',
      marginLeft: theme.spacing(7),
      marginBottom: theme.spacing(1),
    },
    contentNoMedia:{
      color:        'white',
      marginLeft:   theme.spacing(7),
      marginBottom: theme.spacing(1),
      fontSize:     '1.3rem',
      textIndent:   '0',
      whiteSpace:   'pre-wrap'
    },
    contentEdit: {
      color:          'white',
      marginBottom:   theme.spacing(1),
      background:     'transparent',
      outline:        'none',
      width:          '100%',
      height:         '70px',
      resize:         'none',
      textDecoration: 'underline',
      boxSizing:      'border-box',
      whiteSpace:     'pre-wrap'
    },
    input:{
      display: 'none'
    },
    displayTitle:{
      display: 'inline-flex'
    },
    displaybtn:{
      textAlign: 'right',
      marginTop: theme.spacing(2),
    },
    imgPost:{
      maxWidth: 450,
    },
    contImg:{
      alignItems: 'center',
      textAlign: 'center',
      marginBottom: theme.spacing(1),
    },
    contMedia:{
      display:        'flex',
      flexDirection:  'column',
      flexWrap:       'wrap'
    },
    date:{
      fontSize: '0.7rem',
      color:    'gray',
      display:  'block'
    },
    avatar:{
      backgroundColor: '#333333',
      border: '1px solid #f28a9a'
    },
    cardBtn: {
      alignItems:     'center',
      justifyContent: 'space-around',
      color:          'white',
    },
    saveIcon:{
      color: '#33eaff',
    },
    mediaIcon:{
      color: '#ea5970'
    },
    deleteBtn:{
      marginRight: theme.spacing(2)
    }
}));