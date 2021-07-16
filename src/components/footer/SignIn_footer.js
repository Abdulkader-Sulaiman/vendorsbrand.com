import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import '../../css/SignIn_footer.css';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" style={{textAlign:'center', color:'#8a8d91'}}>
      {'Copyright © '}
      <Link style={{color:'#8a8d91', textAlign:'center'}}  href="/">
      Vendorsbrand
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '22.1rem',
  },
  main: {
    marginTop: theme.spacing(55),
    marginBottom: theme.spacing(50),
  },
  
  footer: {
    padding: theme.spacing(3, 4),
    marginTop: 'auto',
     backgroundColor:'white',
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
     
      <footer className={classes.footer} >
        <Container maxWidth="sm">
          <Copyright/>
        </Container>
      </footer>
    </div>
  );
}