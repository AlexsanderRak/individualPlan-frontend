import React, { useState } from "react";
import { Route } from "react-router-dom";

import "./Staff.sass";

import Staff_rights from "../components/Staff_rights";
import Staff_position from "../components/Staff_position";

function Staff(props) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Route path="/staff/rights" component={Staff_rights} />
      <Route path="/staff/position" component={Staff_position} />
    </>
  );
}

export default Staff;
