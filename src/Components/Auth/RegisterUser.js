import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Box, Alert } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux';
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { logout } from "../../actions/authActions";
import { Redirect } from "react-router-dom";
import { getUserUrls } from "../../actions/urlActions";
import { createUrl } from "../../actions/urlActions";


const RegisterUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);
    const [url,setUrl] = useState({
        full: "",
    })
    const dispatch = useDispatch();

    const authState = useSelector(state => state.auth)
    const errState = useSelector(state => state.err)

    useEffect(() => {
        if (errState.id === 'REGISTER_FAIL') {
            setMsg(errState.msg.msg)
        } else {
            setMsg(null)
        }

        if (authState.isAuthenticated) {
            console.log(authState.user.email);
            
            
        }
    }, [authState])
    if (authState.isAuthenticated) {
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

        // Attempt to login
        dispatch(register(user));
        if(authState.isAuthenticated){
            dispatch(getUserUrls(authState.user.email))
        }
    }

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
                            id="outlined-basic"
                            type='password'
                            label='password'
                            variant="outlined"
                            onChange={handleChangePassword}
                        />



                    </Box>

                    <Box p={2}>
                        <Button onClick={onSubmit} variant="contained" >
                            SignUp
                        </Button>
                        
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}

export default RegisterUser
