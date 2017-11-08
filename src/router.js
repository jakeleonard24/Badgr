import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from './Components/Login/Login'
import Profile from './Components/Profile/Profile';
import CreateBadge from './Components/CreateBadge/CreateBadge';
import PostPage from './Components/PostPage/PostPage';
import NotificationsView from './Components/NotificationsView/NotificationsView';
// import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home'
import BadgeGroup from './Components/BadgeGroup/BadgeGroup'


export default (
    <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/create" component={CreateBadge} />
        <Route path="/group/:id" component={BadgeGroup} />
        <Route path="/post" component={PostPage} />
        <Route path="/notifications" component={NotificationsView} />
    </Switch>
  )