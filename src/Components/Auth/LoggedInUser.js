import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Box, Alert } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { LogIn } from "../../actions/authActions";

import { getUserUrls,createUrl} from "../../actions/urlActions";
import { Redirect } from "react-router-dom";

const LoggedInUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);
    const dispatch = useDispatch();

    const authState = useSelector(state => state.auth)

    const errState = useSelector(state => state.err)

    useEffect(() => {
        if (errState.id === 'LOGIN_FAIL') {
            setMsg(errState.msg.msg)
        } else {
            setMsg(null)
        }

        if (authState.isAuthenticated) {
            console.log(authState.user.email)
            
            dispatch(getUserUrls(authState.user.email))
        }
    },[authState.isAuthenticated,errState.id])

    if (authState.isAuthenticated) {
        return <Redirect to="/" />
    }
    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    const onSubmit = e => {
        e.preventDefault();
        const user = { email, password }
        dispatch(LogIn(user))//attempt to login

    }

    // const onLogOut = e => {
    //     dispatch(logout())
    // }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                "& > :not(style)": {
                    m: 1,
                    width: 500,
                    height: 500,
                },
            }}
        >
            <Paper elevation={3}>
                {msg ? <Alert severity="warning">{msg}</Alert> : null}
                <form>

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
        </Box>
    );
}

export default LoggedInUser
