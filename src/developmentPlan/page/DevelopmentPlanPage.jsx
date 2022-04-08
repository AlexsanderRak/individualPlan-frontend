import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import "./DevelopmentPlanPage.sass";
import config from "../../config";
import CryptoJS from "crypto-js";

import myFetch from "../../utils/myFetch";
import EditIcon from "@material-ui/icons/Edit";
import MyIcons from "../../utils/MyIcons";
import MyCircularProgressWithLabel from "../../utils/MyCircularProgressWithLabel";
import Checkbox from "@material-ui/core/Checkbox";

function DevelopmentPlanPage(props) {
  const [isSending, setIsSending] = useState(false);
  const [pageContent, setPageContent] = useState({});

  const { id } = useParams();
  const username = JSON.parse(localStorage.getItem("user"));

  if (!isSending) {
    setIsSending(true);
    const articleId = CryptoJS.AES.decrypt(
      id.replace(/Por21Ld/g, "/"),
      "rak"
    ).toString(CryptoJS.enc.Utf8);
    myFetch(`${config.developmentPlanGetOne}?id=${articleId}`, "GET").then(
      (res) => {
        // console.log(res);
        setPageContent(res[0]);
      }
    );
  }

  const allDay =
    (new Date(pageContent?.endDate) - new Date(pageContent?.startDate)) /
    86400000;
  const daysLeft = (new Date(pageContent?.endDate) - new Date()) / 86400000;
  const isStartPlan = new Date() > new Date(pageContent?.startDate);
  let complitePercent = 0;
  if (pageContent.taskList) {
    pageContent.taskList.forEach((el) => {
      complitePercent = complitePercent + el.percentComplete;
    });
    complitePercent = complitePercent / pageContent?.taskList.length;
  }

  return (
    <div className="developmentPlanPage">
      <div className="developmentPlanPage-content">
        <div className="developmentPlanPage-content-form">
          <div className="developmentPlanPage-content-form-header">
            <span className="developmentPlanPage-content-form-header-title">
              Индивидуальный план развития для: {pageContent.person}
            </span>
            {/* <div style={{display: 'flex', alignItems: 'center'}}>
              <span className="developmentPlanPage-content-form-header-title" style={{marginRight: '20px'}}>{pageContent?.creatingDate && new Date(pageContent?.creatingDate).toLocaleString()}</span>
              {
                isShowEdit() ?
                <Link to={pageContent?.articleUrl && getUrl()}>
                  <MyIcons><EditIcon/></MyIcons>
                </Link>
                : ''
              }
            </div> */}
          </div>

          <div className="developmentPlanPage-content-form-middle">
            <div style={{ display: "flex" }}>
              <div className="developmentPlanPage-content-form-middle-left">
                <div className="developmentPlanPage-content-form-middle-block">
                  <span className="developmentPlanPage-content-form-middle-block-title">
                    Цель плана:
                  </span>
                  <span className="developmentPlanPage-content-form-middle-block-text">
                    {pageContent.target}
                  </span>
                </div>
                <div className="developmentPlanPage-content-form-middle-block">
                  <span className="developmentPlanPage-content-form-middle-block-title">
                    Описание плана:
                  </span>
                  <span className="developmentPlanPage-content-form-middle-block-text">
                    {pageContent.description}
                  </span>
                </div>

                <div className="developmentPlanPage-content-form-middle-block">
                  <span className="developmentPlanPage-content-form-middle-block-title">
                    Наставник:
                  </span>
                  <span className="developmentPlanPage-content-form-middle-block-text">
                    {pageContent.mentor}
                  </span>
                </div>
                <div className="developmentPlanPage-content-form-middle-block">
                  <span className="developmentPlanPage-content-form-middle-block-title">
                    Процент который необходимо достигнуть:
                  </span>
                  <span className="developmentPlanPage-content-form-middle-block-text">
                    {pageContent.percent}
                  </span>
                </div>
              </div>

              <div className="developmentPlanPage-content-form-middle-right">
                <div className="developmentPlanPage-content-form-middle-block">
                  <span className="developmentPlanPage-content-form-middle-block-title">
                    Сроки:
                  </span>
                </div>

                <div className="developmentPlanPage-content-form-middle-block">
                  <span className="developmentPlanPage-content-form-middle-block-title">
                    Начнёнётся
                  </span>
                  <span className="developmentPlanPage-content-form-middle-block-text">
                    с{"  "}
                    {pageContent?.startDate &&
                      new Date(
                        pageContent?.startDate
                      ).toLocaleDateString()}{" "}
                  </span>
                  <span className="developmentPlanPage-content-form-middle-block-text">
                    по{"  "}
                    {pageContent?.endDate &&
                      new Date(pageContent?.endDate).toLocaleDateString()}
                  </span>
                </div>

                <div className="developmentPlanPage-content-form-middle-block">
                  <span className="developmentPlanPage-content-form-middle-block-title">
                    Всего дней:
                  </span>
                  <span className="developmentPlanPage-content-form-middle-block-text">
                    {Math.round(allDay)}
                  </span>
                </div>

                <div className="developmentPlanPage-content-form-middle-block">
                  <span className="developmentPlanPage-content-form-middle-block-title">
                    Осталось дней:
                  </span>
                  <span className="developmentPlanPage-content-form-middle-block-text">
                    {isStartPlan
                      ? Math.round(daysLeft)
                      : "ещё не начал действовать"}
                  </span>
                </div>
              </div>
            </div>

            <div className="developmentPlanPage-content-form-middle-block developmentPlanPage-aligen-center">
              <span className="developmentPlanPage-content-form-middle-block-title">
                Общий процент выполненного:
              </span>
              <span className="developmentPlanPage-content-form-middle-block-text">
                <MyCircularProgressWithLabel value={complitePercent} />
              </span>
            </div>

            <div className="developmentPlanPage-content-form-middle-block">
              <span className="developmentPlanPage-content-form-middle-block-title">
                Необходимо выполнить следующие задачи:
              </span>
            </div>

            <div className="developmentPlanPage-content-form-middle-block">
              {pageContent?.taskList &&
                pageContent?.taskList.map((el, index) => (
                  <div>
                    {
                      {
                        text: (
                          <>
                            {" "}
                            <Checkbox
                              color="primery"
                              defaultChecked={el.isComplite}
                            />
                            {/* <MyCircularProgressWithLabel
                        value={(el.percentComplete + index) * index * 10}
                      /> */}
                            <span className="developmentPlanPage-content-form-middle-block-text">
                              {el?.title}
                            </span>
                          </>
                        ),
                        select: (
                          <>
                            <Checkbox
                              color="primery"
                              defaultChecked={el.isComplite}
                            />
                            <Link
                              to={el.articleUrl}
                              className="developmentPlanPage-content-form-middle-block-text"
                            >
                              {el?.title}
                            </Link>
                          </>
                        ),
                      }[el.type]
                    }
                  </div>
                ))}
            </div>
          </div>

          <div className="developmentPlanPage-content-form-footer"></div>
        </div>
      </div>
    </div>
  );
}

export default DevelopmentPlanPage;
