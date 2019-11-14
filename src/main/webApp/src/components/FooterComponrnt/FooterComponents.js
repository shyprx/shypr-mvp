import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import logoImg from '../../assets/images/test-logo-white.png'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        www.Shypr.net
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(16),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(8),
    marginTop: 'auto',
    background: 'linear-gradient(to bottom right, yellow,  orange)',
  },
}));

export default function FooterComponents() {
  const classes = useStyles();

  return (

      <footer className={classes.footer}>
        <Container maxWidth="sm">
        <div>
          <a className=' logo float-left' href='/'>
            <img src={logoImg} className='d-inline-block align-top mb-3' width={85} alt='true' />
          </a>
        </div>

          <Typography variant="body1">Shypr is your shipping partner, We care ❤ .. Ship now</Typography>
          <Copyright />
        </Container>
      </footer>

  );
}