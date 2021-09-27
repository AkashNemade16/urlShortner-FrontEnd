import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Box, Link, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUrl, getUserUrls } from "../../actions/urlActions";
import ShareComponents from "../Share/ShareComponents";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    paper: {
        borderRadius: "10px"
    },
    textField: {
        display: "block",
        height: "23px",
        width: "440px,",
        padding: "17px 14px 17px 14px",
        minHeight: "auto",
        border: "1px solid #bebcbc",
        borderRadius: "5px",
    },
    formContainer: {
        marginTop: "20px"
    },
});

const Form = () => {
    const classes = useStyles()
    const [postUrl, setPostUrl] = useState({
        full: "",
    });
    const urls = useSelector(state => state.ur.urls);//get url state
    const authState = useSelector(state => state.auth)
    const isAuthenticatedState = authState.isAuthenticated;
    const getUserUrlState = useSelector(state => state.userUrl.userUrls)
    const dispatch = useDispatch();

    const textOnChange = (e) => {
        isAuthenticatedState ? setPostUrl({ full: e.target.value, ownedBy: authState.user.email }) : setPostUrl({ full: e.target.value });
    };

    const onHit = (e) => {
        e.preventDefault();
        dispatch(createUrl(postUrl));
    };

// useEffect(()=>{
//     if(isAuthenticatedState&& postUrl){
//         dispatch(getUserUrls(postUrl))
//     }
// },[isAuthenticatedState])

    return (
        <Container className={classes.formContainer} maxWidth='sm'>
    
            <Paper className={classes.paper} elevation={3}>
                <form>
                    <Box p={2}>
                        <Typography align="center" variant="h6" >
                            Enter a long URL to make a TinyURL
                        </Typography>
                    </Box>

                    <Box p={2}>
                        <TextField
                            id="outlined-basic"
                            label='url'
                            type='text'
                            variant="outlined"
                            value={postUrl.full}
                            onChange={textOnChange}
                            fullWidth
                        />
                    </Box>
                    <Box p={2}>

                        <Typography variant="h6">
                            Tiny Url
                        </Typography>
                    </Box>
                    <Box p={2}>

                        <div className={classes.textField}>

                            <Typography variant='h8'>
                                {urls[0] ?
                                    <Link href={urls[0].shortenedUrl}>
                                        {urls[0].shortenedUrl}
                                    </Link> : null
                                }
                            </Typography>
                        </div>
                    </Box>

                    <Box p={2}>

                        <ShareComponents />
                    </Box>
                    <Box p={2}>
                        <Button variant="contained" onClick={onHit}>
                            Make TinyURL
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default Form;
