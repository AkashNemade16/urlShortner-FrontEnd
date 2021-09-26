import React, { useEffect } from 'react';
import Header from '../Header/Header';
import { getUrlPost, getUserUrls } from '../../actions/urlActions'
import Form from '../Form/Form'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RegisterUser from '../Auth/RegisterUser';
import LoggedInUser from '../Auth/LoggedInUser';
import MyUrls from './../MyUrls/myUrls';

const Home = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth)
    const isAuthenticatedState = authState.isAuthenticated
    console.log({ isAuthenticatedState })

    useEffect(() => {
        dispatch(getUrlPost);

    }, [dispatch]);
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route exact path="/" component={Form} />
                <Route path='/register' exact component={RegisterUser} />
                <Route path='/login' exact component={LoggedInUser} />
                <Route path='/myurls' exact component={MyUrls} />
            </Switch>
        </BrowserRouter>



    )
}

export default Home
