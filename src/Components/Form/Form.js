import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Typography,
    Paper,
    Box,
    Link,
    Container,
    Grid,
    MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUrl, getUserUrls } from "../../actions/urlActions";
import ShareComponents from "../Share/ShareComponents";
import { makeStyles } from "@mui/styles";
import { clearData } from "./../../actions/urlActions";
import validator from 'validator';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
    paper: {
        borderRadius: "20px !important",
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
        marginTop: "20px",
    },
    btn: {
        borderRadius: "10px !important",
        backgroundColor: "#22A975 !important",
        height: "60px",
        fontSize: "20px !important",
        textTransform: "capitalize !important",
        fontWeight: "600 !important",
        cursor: "pointer !important",
    },
    btnAccount: {
        backgroundColor: "#0B82A6 !important",
    }

});

const Form = () => {
    const classes = useStyles();
    const [postUrl, setPostUrl] = useState({
        full: "",
    });
    const history = useHistory()
    const [showUrl, setShowUrl] = useState(false);
    const urls = useSelector((state) => state.ur.urls); //get url state
    const authState = useSelector((state) => state.auth);
    const isAuthenticatedState = authState.isAuthenticated;
    const userUrls = useSelector((state) => state.userUrl);
    const dispatch = useDispatch();

    const createAccount = () => {
        history.push('/register')
    }

    const textOnChange = (e) => {
        isAuthenticatedState
            ? setPostUrl({ full: e.target.value, ownedBy: authState.user.email })
            : setPostUrl({ full: e.target.value });
    };

    const onHit = (e) => {
        e.preventDefault();
        setShowUrl(true);
        dispatch(createUrl(postUrl));
    };

    useEffect(() => {
        if (authState.isAuthenticated && authState.user !== null) {
            dispatch(getUserUrls(authState.user.email));
        } else {
            dispatch(clearData(userUrls));
        }
    }, [urls, authState.isAuthenticated, dispatch]);

    const aliases = [
        {
            value: "tinyUrl",
            label: "tinyurl.com",
        },
        {
            value: "random",
            label: "random.com",
        },
    ];
    console.log(postUrl);
    return (
        <Container className={classes.formContainer} maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item lg={6}>
                    <Paper className={classes.paper} elevation={3}>
                        <form data-netlify="true" data-netlify-honeypot="bot-field">
                            <Box p={3}>
                                <Typography variant="h6">
                                    Enter a long URL to make a TinyURL
                                </Typography>
                            </Box>

                            <Box pb={1} pl={3} pr={3}>
                                <TextField
                                    id="outlined-basic"
                                    label="url"
                                    type="text"
                                    variant="outlined"
                                    value={postUrl.full}
                                    onChange={textOnChange}
                                    fullWidth
                                />
                            </Box>

                            {
                                postUrl.full && !validator.isURL(postUrl.full) ?
                                    <Box pl={3} pr={3}>

                                        <Typography variant='h8' color='red'>
                                            URL is not valid
                                        </Typography>

                                    </Box> : null
                            }



                            {!showUrl && (
                                <>
                                    <Box p={3}>
                                        <Typography variant="h6">Customize your link</Typography>
                                    </Box>
                                    <Grid container spacing={0}>
                                        <Grid item>
                                            <Box p={3}>
                                                <TextField
                                                    id="outlined-basic"
                                                    select
                                                    variant="outlined"
                                                    value="tinyUrl"
                                                    disabled
                                                    fullWidth
                                                    placeholder="tiny"
                                                >
                                                    {aliases.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box p={3}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="alias"
                                                    type="text"
                                                    variant="outlined"
                                                    fullWidth
                                                    disabled
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>

                                   
                                </>
                            )}
                            {showUrl && (
                                <>
                                    <Box pb={0} pt={1} pl={3}>
                                        <Typography variant="h6">Tiny Url</Typography>
                                    </Box>
                                    <Box p={2}>
                                        <div className={classes.textField}>

                                            <Typography variant="h8">
                                                {urls[0] ? (
                                                    <Link href={urls[0].shortenedUrl}>
                                                        {urls[0].shortenedUrl}
                                                    </Link>
                                                ) : null}
                                            </Typography>
                                        </div>
                                    </Box>
                                </>
                            )}

                            {!showUrl?
                               <Box p={3}>
                                    <Button
                                        className={classes.btn}
                                        variant="contained"
                                        onClick={onHit}
                                        fullWidth
                                        disabled={!validator.isURL(postUrl.full)}
                                    //   color="#ffffff"
                                    >
                                        Make TinyURL
                                    </Button>
                                </Box>:<ShareComponents/>
                            }

                        </form>
                    </Paper>
                </Grid>
                <Grid item lg={6}>
                    <Box p={3}>
                        <Typography variant="h5" color="white">
                            Welcome to TinyURL!
                        </Typography>
                    </Box>
                    <Box p={3}>
                        <Typography variant="h6" color="white">
                            Create a free account today
                        </Typography>
                    </Box>
                    <Box p={3}>
                       
                        <Button onClick={createAccount} classes={classes.btnAccount} variant="contained">
                                Create Free Account
                            </Button>
                    
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Form;
