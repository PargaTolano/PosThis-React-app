import { makeStyles }               from '@material-ui/core/styles';
import { red }                      from '@material-ui/core/colors';

export const usePostCardStyles = makeStyles((theme) => ({
    root: {
      width:            '100%',
      maxWidth:         '700px',
      marginTop:         theme.spacing( 3 ),
      backgroundColor:  '#2b387f',
      boxShadow:        'black 1px 1px 8px',
      borderRadius:     theme.spacing( 1, 1, 0, 0 ),
      [theme.breakpoints.down('sm')]:{
      }
    },
    media: {
      height: '140px',
    },
    cardBtn: {
      alignItems:     'center',
      justifyContent: 'space-around',
      color:          'white',
    },
    repostText:{
      color:    'white',
      padding:  theme.spacing(2, 4)
    },
    titleContainer:{
      display: 'flex',
      alignItems: 'flex-start',
    },
    title: {
      display:        'inline-block',
      width:          'auto',
      color:          'white',
      marginLeft:     theme.spacing(2),
      textDecoration: 'none',
      fontSize: '1em',
      '&:visited':{
        color: 'white',
      }
    },
    publisher:{
      '&:hover':{
      textDecoration: 'underline'
      }
    },
    content: {
      color:        'white',
      marginTop:    theme.spacing(2),
      marginBottom: theme.spacing(1),
      textIndent:   '0',
      whiteSpace:   'pre-line',
      fontSize:     15
    },
    contentNoMedia:{
      color:        'white',
      marginTop:    theme.spacing(2),
      marginBottom: theme.spacing(1),
      whiteSpace:   'pre-line',
      fontSize:     24,
      textIndent:   '0',
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
    likeIcon:{
      color: red[500],
    },
    commentIcon:{
      color: '#ea5970',
    },
    repostIcon:{
      color: '#f28a9a',
    },
    saveIcon:{
      color: '#33eaff',
    },
    mediaIcon:{
      color: '#ea5970'
    },
    displayTitle:{
      display: 'inline-flex'
    },
    imgPost:{
      maxWidth: '450',
    },
    contMedia:{
      display:        'flex',
      flexDirection:  'column',
      flexWrap:       'wrap'
    },
    contImg:{
      display:      'inline-block',
      flexGrow:     1,
      alignItems:   'center',
      textAlign:    'center',
    },
    mediaMask:{
      display:      'inline-block',
      position:     'relative',
      width:        '100%',
      height:       '400px',
      overflow:     'hidden',
      [theme.breakpoints.down('sm')]:{
        height: '300px'
      }
    },
    media:{
      display:    'inline-block',
      position:   'absolute',
      top:        '50%',
      left:       '50%',
      transform:  'translate( -50%, -50%)',
      width:      '100%',
    },
    usertag:{
      color: 'white',
    },
    displaybtn:{
      textAlign: 'right',
      marginTop: theme.spacing(2),
    },
    input:{
      display: 'none'
    },
    date:{
      display: 'inline-block',
      fontSize: 14,
      color:    'gray',
      display:  'block',
      margin:   0,
      '&:hover':{
        textDecoration: 'underline'
      }
    },
    grayIcon:{
      color: 'gray'
    },
    avatar:{
      width:  45,
      height: 45,
      backgroundColor: '#333333',
      border: '1px solid #f28a9a'
    },
    repostUserLink:{
      color: 'white',
      textDecoration: 'none',
      '&:visited':{
        color: 'white'
      },
      '&:hover':{
        color: '##ea5970'
      }
    },
    deleteBtn:{
      marginRight: theme.spacing(2)
    }
}));