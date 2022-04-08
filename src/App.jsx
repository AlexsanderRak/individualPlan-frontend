import React from "react";

import "./App.sass";

import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";

import ChatsClass from './chats/page/Chats'
// import Client from "./page/Client";
// import Login from "./page/Login";
import Auth from "./auth/page/Auth";
import ActivateProfile from "./auth/page/ActivateProfile";
import Staff from "./staff/page/Staff";
import Personal_area from "./personalArea/page/Personal_area";
import DevelopmentPlanMain from "./developmentPlan/page/DevelopmentPlanMain";
import Users from "./administration/page/Users";
import KnowledgeBaseMain from "./knowlegeBase/page/KnowledgeBaseMain";
import AnalyticsMain from "./analytics/AnalyticsMain";
import Menu from "./components/Menu";

const requireLogin = (to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (to.meta.auth) {

    if (user?._id && user?.role < 20) {
      next();
    }

    if (!user?.role || user?.role < 20) {
      next.redirect("/auth");
    }
    // next.redirect('/client');
  } else {
    next();
  }
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <div className="app-menu">
          <Menu></Menu>
        </div>

        <div className="app-content">
          <GuardProvider guards={[requireLogin]} 
          // loading={Loading} // error={NotFound} 
          >
            <Switch>
              <GuardedRoute exact path="/chats" component={ChatsClass} meta={{ auth: true }} />
              {/* //old */}
              <GuardedRoute exact path="/users" component={Users} meta={{ auth: true }} />

              <GuardedRoute path="/knowledgeBase" component={KnowledgeBaseMain} meta={{ auth: true }} />
              {/* //old */}
              {/* <Route exact path="/login" component={Login} /> //old */}
              <Route exact path="/auth" component={Auth} />
              <Route exact path="/activateProfile:email-:pass" component={ActivateProfile} />
              <Route path="/staff" component={Staff} />
              <Route path="/analytics" component={AnalyticsMain} />
              <Route path="/personal-area" component={Personal_area} />
              <Route path="/developmentPlan" component={DevelopmentPlanMain} />
              {/* <Route path="/client" component={Client} /> //old */}
              <Redirect from="/" to="/auth" />
            </Switch>
          </GuardProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
