import React, { useState } from "react";
import "./DevelopmentPlanSearch.sass";

import myFetch from "../../utils/myFetch";
import config from "../../config";
import MyTableContol from "../../utils/MyTableContol";
import MyTable from "../../utils/MyTable";


const getDevelopmentPlanFetch = (companyUid) => {
  return myFetch(`${config.developmentPlan}?companyUid=${companyUid}`, "GET");
};

const getDevelopmentPlanSearchFetch = (data) => {
  return myFetch(config.developmentPlanSearch, "POST", data);
};

function DevelopmentPlanSearch(props) {
  const [developmentPlan, setDevelopmentPlan] = useState([]);
  const [isSend, setIsSend] = useState(false);

  const [search, setSearch] = useState("");
  const username = JSON.parse(localStorage.getItem("user"));

  const getDevelopmentPlan = () => {
    setIsSend(true);
    getDevelopmentPlanFetch(username.companyUid).then((res) => {
      console.log(res);
      setDevelopmentPlan(res);
    });
  };

  const getDevelopmentPlanSearch = () => {
    getDevelopmentPlanSearchFetch({search, companyUid:username.companyUid}).then((res) => {
      console.log(res);
      setDevelopmentPlan(res);
    });
  };

  if (!isSend) {
    getDevelopmentPlan();
  }



  return (
    <div className="developmentPlan">
      <div className="developmentPlan-content">
        <div className="developmentPlan-content-header">
          <MyTableContol
            isSearchable={true}
            search={search}
            setSearch={setSearch}
            searchClick={getDevelopmentPlanSearch}
          >
          </MyTableContol>
        </div>
        <div className="developmentPlan-content-table">
          <MyTable
            isChecked={false}
            headersName={["План развития для", "Цель", "Процент для успешного прохождения", "Наставник", "Дата начала", "Дата окончания", "Создатель", "Дата", "Внёс изменения", "Дата изменений", "URL Плана развития"]}
            
             // type = [number, string, date, role, phone, link, array]
            headers={[
              {name: "person", type: "string"},
              {name: "target", type: "string"},
              {name: "percent", type: "string"},
              {name: "mentor", type: "string"},
              {name: "startDate", type: "date"},
              {name: "endDate", type: "date"},
              {name: "creator", type: "string"},
              {name: "creatingDate", type: "date"},
              {name: "editing", type: "string"},
              {name: "editingDate", type: "date"},
              {name: "developmentPlaUrl", type: "link"},
            ]}
            data={developmentPlan}
          ></MyTable>
        </div>
      </div>
    </div>
  );
}

export default DevelopmentPlanSearch;
