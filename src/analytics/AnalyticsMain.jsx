import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";

import "./AnalyticsMain.sass";
import MyLineMarkSeries from "./MyLineMarkSeries";
import MyLabeledHeatmap from "./MyLabeledHeatmap";
import MyAnimatedRadarChart from "./MyAnimatedRadarChart";

import config from "../config";
import myFetch from "../utils/myFetch";
import MySelect from "../utils/MySelect";

function AnalyticsMain(props) {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const getUsersFetch = (companyUid) => {
    return myFetch(`${config.user}?companyUid=${companyUid}`, "GET");
  };

  const getUsers = (companyUid) => {
    getUsersFetch(companyUid).then((res) => {
      let newRes = res;
      if (res.length) {
        newRes = res.sort((a, b) => a.companyUid - b.companyUid);
      }
      setUsers(
        newRes.map((el) => {
          return {
            id: el._id,
            title: `${el.lastName} ${el.firstName} ${el.patronymic}`,
          };
        })
      );
    });
  };

  useEffect(() => {
    const username = JSON.parse(localStorage.getItem("user"));
    if (users.length === 0) {
      getUsers(username.companyUid);
    }
    
  });

  return (
    <>
      <div className="analyticsMain">
        <h2 className="analyticsMain-header-title">Аналитика</h2>
        <div className="analyticsMain-middle">
          <div className="analyticsMain-middle-header">
            <span className="analyticsMain-middle-header-title">
              Выбирите сотрудника
            </span>
            <MySelect
              label={"Сотрудники"}
              value={currentUser}
              valueList={users}
              change={(e) => {
                setCurrentUser(e.target.value);
                setActiveUser(users.findIndex((el) => el.id === e.target.value)+1)
              }}
            />
          </div>
          {activeUser && (
            <div className="analyticsMain-middle-content">
              <MyLabeledHeatmap activeUser={activeUser} />
              <MyLineMarkSeries activeUser={activeUser} />
              <MyAnimatedRadarChart activeUser={activeUser} />
            </div>
          )}
        </div>
      </div>

    </>
  );
}

export default AnalyticsMain;
