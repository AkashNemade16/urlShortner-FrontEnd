import React, { useEffect } from "react";
import Header from "../Header/Header";
import { getUrlPost } from "../../actions/urlActions";
import Form from "../Form/Form";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterUser from "../Auth/RegisterUser";
import LoggedInUser from "../Auth/LoggedInUser";
import MyUrls from "./../MyUrls/myUrls";
import { makeStyles } from "@material-ui/core/styles";
import background from "../../images/blob-bg.jpg";
import {Grid,Container} from '@mui/material';

const useStyles = makeStyles(theme => {
    return {
        bg: {
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition:'center',
            height: "100vh",
            [theme.breakpoints.down('md')]: {
                height: '110vh'
            },
            [theme.breakpoints.down('sm')]: {
                height: '170vh'
            },
            [theme.breakpoints.up('md')]: {
                height: '100vh'
            }
        },
    }
});

const Home = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getUrlPost);
    }, [dispatch]);
    return (
        <BrowserRouter>      
            <div className={classes.bg} >
                <Header /> 
                <Container>
                <Switch>
                    <Route exact path="/" component={Form} />
                    <Route path="/register" exact component={RegisterUser} />
                    <Route path="/login" exact component={LoggedInUser} />
                    <Route path="/myurls" exact component={MyUrls} />
                </Switch>
                </Container>
            </div>
        </BrowserRouter>
    );
};

export default Home;
