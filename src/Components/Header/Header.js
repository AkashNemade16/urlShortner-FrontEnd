import * as React from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Hidden,
    Container,
    List,
    ListItem,
    Link,
    Box
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import { useHistory } from "react-router-dom";
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles({

    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`,
        paddingTop: 20,
    },
    linkLogo: {
        paddingLeft: 10,
        paddingTop: 2,
    },
    buttonLarge: {
        marginTop: 3,
        marginBottom: 4,
        // marginLeft: 100,
        marginRight: 10,
        paddingTop: 8,
        fontSize: 16,
    },
    buttonSmall: {
        marginTop: 3,
        marginBottom: 4,
        // marginLeft: 10,
        marginRight: 0,
        paddingTop: 8,
        fontSize: 14,
    },
    btn: {
        // backgroundColor: "white !important",
        color: "white !important",
    },
});

const guestLinks = [
    { title: `home`, path: `/` },
    { title: `about us`, path: `/about us` },
    { title: `faq`, path: `/faq` },
    { title: `disputes`, path: `/disputes` },
];

const Header = () => {
    const classes = useStyles();
    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    let history = useHistory();
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    };
    const handleMyurls = (e) => {
        e.preventDefault();
        history.push("/myurls");
    };

    const handleHome = (e) => {
        history.push("/");
    };
    return (
        <AppBar position="sticky" color="transparent" elevation={0}>
            <Toolbar>
                <Container  maxWidth="lg"   >
                    <Hidden smDown>
                        {/* <List
                            component="nav"
                            aria-labelledby="main navigation"
                            
                        > */}
                        <Box display='flex' flexDirection='row' justifyContent='space-between'>
                            <Box>
                                <Link underline='none' href="/">
                                    <Typography color="white" variant="h3">
                                        TinyUrl
                                    </Typography>
                                </Link>
                            </Box>

                            <Box>
                                <Button
                                    className={classes.btn}
                                    onClick={handleHome}
                                    color="inherit"
                                >
                                    Home
                                </Button>
                                <Button
                                    className={classes.btn}
                                    onClick={handleMyurls}
                                    color="inherit"
                                >
                                    MyUrls
                                </Button>

                                {authState.isAuthenticated ? (
                                    <Button
                                        className={classes.btn}
                                        onClick={handleLogout}
                                        color="inherit"
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <Button className={classes.btn} href="/login" color="inherit">
                                        SignIn
                                    </Button>
                                )}

                                <Button className={classes.btn} href="/register" color="inherit">
                                    SignUp
                                </Button>
                            </Box>



                        </Box>
                        {/* </List> */}
                    </Hidden>
                    <Hidden smUp>
                        <List
                            component="nav"
                            aria-labelledby="main navigation"
                        >
                            <SideDrawer />
                        </List>
                    </Hidden>
                </Container>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
