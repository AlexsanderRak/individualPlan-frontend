import React, { useState } from "react";
import { Route } from "react-router-dom";

import "./DevelopmentPlanMain.sass";

import DevelopmentPlanCreate from "./DevelopmentPlanCreate";
import DevelopmentPlanSearch from "./DevelopmentPlanSearch";
import DevelopmentPlanPage from "./DevelopmentPlanPage";
// import DevelopmentPlanAll from "./DevelopmentPlanAll";
// import DevelopmentPlanActivePlan from "./DevelopmentPlanActivePlan";
// import DevelopmentPlanAllPersonal from "./DevelopmentPlanAllPersonal";

function DevelopmentPlanMain(props) {
  return (
    <>
      <Route
        path="/developmentPlan/create"
        component={DevelopmentPlanCreate}
      />
       <Route
        path="/developmentPlan/all"
        component={DevelopmentPlanSearch}
      />
      <Route path="/developmentPlan/edit:id" component={DevelopmentPlanCreate} />
      <Route path="/developmentPlan/page:id" component={DevelopmentPlanPage} />
      {/* <Route path="/developmentPlan/activePlan" component={DevelopmentPlanActivePlan} />
      <Route path="/developmentPlan/allPersonal" component={DevelopmentPlanAllPersonal} /> */}
    </>
  );
}

export default DevelopmentPlanMain;
