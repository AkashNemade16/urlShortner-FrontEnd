import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Box, Alert,Container,Grid } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { register } from "../../actions/authActions";
import { Redirect } from "react-router-dom";
import { getUserUrls } from "../../actions/urlActions";
import { makeStyles } from "@mui/styles";
import './auth.css'
const useStyles = makeStyles({
    paper: {
        borderRadius: "20px !important",
    },
    formContainer: {
        marginTop: "20px",
    }
})
const RegisterUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const authState = useSelector(state => state.auth)
    const errState = useSelector(state => state.err)

    useEffect(() => {
        if (errState.id === 'REGISTER_FAIL') {
            setMsg(errState.msg.msg)
        } else {
            setMsg(null)
            
        }
        if (authState.isAuthenticated && authState.user!==null) {
            console.log(authState.user.email)

            dispatch(getUserUrls(authState.user.email))
        }
        // }
    }, [authState.isAuthenticated,errState.id])
    if (authState.isAuthenticated) {
        dispatch(getUserUrls(authState.user.email))
        return <Redirect to="/" />
    }
    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    const onSubmit = e => {
        e.preventDefault();
        // Create user object
        const user = {
            name,
            email,
            password
        };
       
        // register
        dispatch(register(user));
        // dispatch(getUserUrls(authState.user.url))
        
        
    }

    return (
        <Container className={classes.formContainer} maxWidth="lg">
            <Grid container spacing={3}>
            <Grid item lg={6}>
                <Paper className={classes.paper}>
                    {msg ? <Alert severity="warning">{msg}</Alert> : null}
                        <form data-netlify="true" data-netlify-honeypot="bot-field">
                        <Box p={2}>
                            <Typography >
                                Name
                            </Typography>
                        </Box>
                        <Box p={2}>
                            <TextField
                                type='text'
                                id="outlined-basic"
                                label='Name'
                                variant="outlined"
                                onChange={handleChangeName}
                                fullWidth
                            />
                        </Box>
                        <Box p={2}>
                            <Typography >
                               Email
                            </Typography>
                        </Box>

                        <Box p={2}>

                            <TextField
                                type='text'
                                id="outlined-basic"
                                label='Email'
                                variant="outlined"
                                fullWidth
                                onChange={handleChangeEmail}
                            />
                        </Box>
                        <Box p={2}>
                            <Typography >
                              Password
                            </Typography>
                        </Box>

                        <Box p={2}>

                            <TextField
                                type='password'
                                id="outlined-basic"
                                label='password'
                                variant="outlined"
                                fullWidth
                                onChange={handleChangePassword}
                            />
                        </Box>

                        <Box p={2}>
                            <Button onClick={onSubmit} variant="contained" >
                                Log In
                            </Button>

                        </Box>
                    </form>
                </Paper>
            </Grid>
            </Grid>
          
                
            
        </Container>
        
    );
}

export default RegisterUser
