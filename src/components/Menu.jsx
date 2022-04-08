import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.sass";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import ForumRoundedIcon from "@material-ui/icons/ForumRounded";
import MenuBookRoundedIcon from "@material-ui/icons/MenuBookRounded";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import SettingsApplicationsRoundedIcon from "@material-ui/icons/SettingsApplicationsRounded";
import AssignmentIndRoundedIcon from "@material-ui/icons/AssignmentIndRounded";
import TuneRoundedIcon from "@material-ui/icons/TuneRounded";
import CodeRoundedIcon from "@material-ui/icons/CodeRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import FiberNewRoundedIcon from "@material-ui/icons/FiberNewRounded";
import AssessmentRoundedIcon from "@material-ui/icons/AssessmentRounded";
import TimelineRoundedIcon from "@material-ui/icons/TimelineRounded";
import PostAddIcon from '@material-ui/icons/PostAdd';
import HomeIcon from '@material-ui/icons/Home';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import LibraryAddRoundedIcon from '@material-ui/icons/LibraryAddRounded';

import MyIcons from "../utils/MyIcons";
import MyMenu from "../utils/MyMenu";

function Menu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const linkArray = [
    {
      url: "menu",
      guard: ["0", "12"],
      icon: SupervisorAccountRoundedIcon,
      title: "Администрирование",
      items: [
        // TODO { url: "/", icon: MenuBookRoundedIcon, title: "Роли" },
        { url: "/users", icon: GroupAddRoundedIcon, title: "Сотрудники" },
        {
          url: "/",
          icon: SettingsApplicationsRoundedIcon,
          title: "Настройки компании",
        },
        // { url: "/users", icon: GroupRoundedIcon, title: "Пользователи old" },
      ],
    },
    {
      url: "menu",
      guard: ["0", "12", "13"],
      icon: AssignmentIndRoundedIcon,
      title: "Личный кабинет",
      items: [
        {
          url: "/personal-area/skill-matrix",
          icon: AssignmentRoundedIcon,
          title: "Матрица навыков",
        },
        { url: "/", icon: SettingsApplicationsRoundedIcon, title: "Настройка" },
      ],
    },
    {
      url: "/chats",
      guard: ["0", "12", "13"],
      icon: ForumRoundedIcon,
      title: "Чаты old",
      items: [],
    },
    {
      url: "menu",
      guard: ["0", "12", "13"],
      icon: MenuBookRoundedIcon,
      title: "База знаний",
      items: [
        {
          url: "/knowledgeBase/create",
          icon: LibraryAddRoundedIcon,
          title: "Создание статьи",
        },
        { url: "/knowledgeBase/search", icon: SearchRoundedIcon, title: "Поиск" },
      ],
    },
    // TODO
    // {
    //   url: "/",
    //   guard: ["0", "1"],
    //   icon: MenuBookRoundedIcon,
    //   title: "Менторство",
    //   items: [],
    // },
    {
      url: "menu",
      guard: ["0", "12"],
      icon: CodeRoundedIcon,
      title: "План развития",
      items: [
        { url: "/developmentPlan/create", icon: SearchRoundedIcon, title: "Создание плана развития" },
        { url: "/developmentPlan/all", icon: SearchRoundedIcon, title: "Все планы развития" },
      ],
    },
    {
      url: "menu",
      guard: ["0", "13"],
      icon: CodeRoundedIcon,
      title: "План развития",
      items: [
        { url: "/developmentPlan/activePlan", icon: SearchRoundedIcon, title: "Активный план развития" },
        { url: "/developmentPlan/allPersonal", icon: SearchRoundedIcon, title: "Все личные планы развития" },
      ],
    },
     //TODO
    {
      url: "/analytics",
      guard: ["0", "12", "13"],
      icon: TimelineRoundedIcon,
      title: "Аналитика",
      items: [],
    },
    // TODO
    // {
    //   url: "/",
    //   guard: ["0", "1"],
    //   icon: FiberNewRoundedIcon,
    //   title: "Новости",
    //   items: [],
    // },
  ];

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("clientName");
    localStorage.removeItem("activeRoomName");
    window.location.pathname = '/';
  };

  return (
    <>
      {user?._id && (
        <div className={"menu " + (isOpen ? "menu-open" : "menu-close")}>
          <div className="menu-content">
            <div className="menu-content-links">
              {linkArray.map((el, index) => (
                <div key={index}>
                  {el.guard.findIndex((item) => item === user.role) + 1 ? (
                    <>
                      {el.url === "menu" && el.items.length ? (
                        <div key={index} className="menu-content-links-item">
                          <MyMenu items={el.items} icon={el.icon} />
                          <span className="menu-content-links-item-title">
                            {el.title}
                          </span>
                        </div>
                      ) : (
                        <div key={index} className="menu-content-links-item">
                          <Link to={el.url}>
                            <MyIcons>{React.createElement(el.icon)}</MyIcons>
                          </Link>
                          <span className="menu-content-links-item-title">
                            {el.title}
                          </span>
                        </div>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ))}
              <div className="menu-content-links-item">
                <MyIcons click={() => setIsOpen(!isOpen)}>
                  {isOpen ? (
                    <ArrowBackRoundedIcon />
                  ) : (
                    <ArrowForwardRoundedIcon />
                  )}
                </MyIcons>
              </div>
            </div>

            <div className="menu-content-collapse" style={{paddingBottom: '10px'}} onClick={logout}>
                <MyIcons >
                  <ExitToAppRoundedIcon />
                </MyIcons>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Menu;
