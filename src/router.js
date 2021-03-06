import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from './Components/Login/Login'
import Profile from './Components/Profile/Profile';
import CreateBadge from './Components/CreateBadge/CreateBadge';
import PostPage from './Components/PostPage/PostPage';
import NotificationsView from './Components/NotificationsView/NotificationsView';
import EditProfile from './Components/Profile/EditProfile'
// import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import BadgeGroup from './Components/BadgeGroup/BadgeGroup';
import Search from './Components/Search/Search';


export default (
    <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/create" component={CreateBadge} />
        <Route path="/group/:id" component={BadgeGroup} />
        <Route path="/post" component={PostPage} />
        <Route path="/notifications" component={NotificationsView} />
        <Route path="/edit/:id" component={EditProfile} />
    </Switch>
  )