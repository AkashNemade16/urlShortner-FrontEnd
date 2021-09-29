
import * as React from "react";
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    Hidden,
    Container,
    List,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import { useHistory } from "react-router-dom";
import SideDrawer from "./SideDrawer";

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
    },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`,
    },
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
        e.preventDefault();
        history.push("/");
    };
    return (
        <AppBar position="sticky">
            {/* #D0CCD0 */}
            <Toolbar>
                <Container maxWidth="lg" className={classes.navbarDisplayFlex}>
                    {/* </Link> */}

                    <Hidden smDown>
                        <List
                            component="nav"
                            aria-labelledby="main navigation"
                            className={classes.navDisplayFlex}
                        >
                            {/* <Link href="/"> */}
                            <Typography variant="h3">TinyUrl</Typography>
                            {/* </Link> */}
                            <Button onClick={handleHome} color="inherit">
                                Home
                            </Button>
                            <Button onClick={handleMyurls} color="inherit">
                                MyUrls
                            </Button>

                            {authState.isAuthenticated ? (
                                <Button onClick={handleLogout} color="inherit">
                                    Logout
                                </Button>
                            ) : (
                                <Button href="/login" color="inherit">
                                    SignIn
                                </Button>
                            )}

                            <Button href="/register" color="inherit">
                                SignUp
                            </Button>
                        </List>
                    </Hidden>
                    <Hidden mdUp>
                        <List
                            component="nav"
                            aria-labelledby="main navigation"
                            className={classes.navDisplayFlex}
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