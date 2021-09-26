import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Box, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUrl } from "../../actions/urlActions";
import ShareComponents from "../Share/ShareComponents";
import './Form.css'

const Form = () => {
    const [postUrl, setPostUrl] = useState({
        full: "",
    });
    const urls = useSelector(state => state.ur.urls);//get url state
    const authState = useSelector(state => state.auth)
    const isAuthenticatedState = authState.isAuthenticated
    const dispatch = useDispatch();

    const textOnChange = (e) => {
        isAuthenticatedState ? setPostUrl({ full: e.target.value, ownedBy: authState.user.email }) : setPostUrl({ full: e.target.value });
    };

    const onHit = (e) => {
        e.preventDefault();
        dispatch(createUrl(postUrl));
    };



    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                "& > :not(style)": {
                    m: 1,
                    width: 500,
                    height: 550,
                },
            }}
        >
            <Paper elevation={3}>
                <form>
                    <Box p={2}>
                        <Typography variant="h6" >
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

                        <div className='textField'>

                            <Typography variant='h6'>
                                {urls[0] ?
                                    <Link href={urls[0].shortenedUrl}>
                                        {urls[0].shortenedUrl}
                                    </Link> : null
                                }
                            </Typography>
                        </div>
                    </Box>

                    <Box p={2}>
                        <Typography variant="h6">
                            Share
                        </Typography>
                        <ShareComponents />
                    </Box>
                    <Box p={2}>
                        <Button variant="contained" onClick={onHit}>
                            Make TinyURL
                        </Button>



                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default Form;
