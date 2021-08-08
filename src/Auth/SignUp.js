import React, { useRef, useState } from "react"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { Form, Alert } from "react-bootstrap"
 import '../css/Signup.css';
import { RocketTwoTone } from '@ant-design/icons';
import { Link } from "react-router-dom"
import Footer from '../components/footer/SignUp_footer'
import { useTranslation } from "react-i18next";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {/* {'Copyright © '}
      <Link color="inherit" to="/">
       Vendorsbrand
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'} */}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }
    setLoading(false)
  }


  return (
    <>
     <Container component="main" maxWidth="xs" style={{backgroundColor:'#fff', position: 'relative',top:"60px", padding:'30px'}}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
        {t("Sign Up")}
        </Typography>
        <br />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit} className={classes.form} noValidate>
         
          <Grid container spacing={2}>
          <Grid tem xs={12}>
       
              <Form.Label>{t("Email")}</Form.Label>
              <Form.Control type="email" 
              ref={emailRef} required 
               fullWidth
               variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
               />
            
           </Grid>
           <Grid tem xs={12}>
              <Form.Label>{t("Password")}</Form.Label>
              <Form.Control type="password" 
              ref={passwordRef} required  
              fullWidth 
              variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                
              />
            </Grid>
            <Grid item xs={12}>
              <Form.Label>{t("Password Confirmation")}</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required fullWidth  id="passwordConf"/>
            </Grid>
            <Button 
            disabled={loading} 
            className="w-100" 
            type="submit"
            fullWidth
            className={classes.submit}
            style={{background:'rgb(24, 144, 255)',
            color:'white'
            }}
            >
              {t("Sign Up")}
            </Button>
            </Grid>
          </Form>
    </div>
 
    <Grid item>
      <div className="w-100 text-center mt-2">
      {t("Already have an account?")}    <Link to="/login" variant="body2">{t("Sign In")}</Link>
      </div>
      </Grid>
      <Box mt={5}>
        <Copyright />
      </Box>
      </Container>
      <Footer /> 
    </>
  );
}

