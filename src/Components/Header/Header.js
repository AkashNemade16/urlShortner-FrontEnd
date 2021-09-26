import * as React from 'react';
import { AppBar, Toolbar, Button, Box, Typography, Link } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/authActions';
import { useHistory } from "react-router-dom";


const Header = () => {
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    let history = useHistory();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout())
    }
    const handleMyurls = (e) => {
        e.preventDefault();
        history.push("/myurls")
    }

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/')
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position='static'>
                <Toolbar>

                    <Typography variant="h3" component="div" sx={{ flexGrow: 1 }} >
                        TinyUrl
                    </Typography >

                    <Button onClick={handleHome} color="inherit">Home</Button>  
                    <Button onClick={handleMyurls} color="inherit">MyUrls</Button>
                    
                    {authState.isAuthenticated ? (<Button onClick={handleLogout} color="inherit">Logout</Button>) : (<Button href="/login" color="inherit">SignIn</Button>)}


                    <Button href="/register" color="inherit">SignUp</Button>
                </Toolbar>
            </AppBar>
        </Box>

    )
}

export default Header
