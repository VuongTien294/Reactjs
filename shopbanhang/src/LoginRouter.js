import React from 'react';
import { BrowserRouter as Router, Link, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import AdminRouter from './component/admin/AdminRouter'
import LoginHook from './component/loginHook/LoginHook';

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/admin" render={() => {
                    return localStorage.getItem("accessToken") ? <AdminRouter /> : <Redirect to="/" />
                }}>

                </Route>
                <Route  path="/">
                    <LoginHook />
                </Route>
            </Switch>
        </Router>
    )
}