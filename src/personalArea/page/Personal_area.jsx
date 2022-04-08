import React, { useState } from "react";
import { Route } from "react-router-dom";

import "./Personal_area.sass";

import Staff_rights from "../components/Staff_rights";
import Skill_matrix from "../components/Skill_matrix";

function Personal_area(props) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Route path="/personal-area/rights" component={Staff_rights} />
      <Route path="/personal-area/skill-matrix:personId" component={Skill_matrix} />
      <Route path="/personal-area/skill-matrix" component={Skill_matrix} />
    </>
  );
}

export default Personal_area;
