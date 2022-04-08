import React from "react";

import "./DevelopmentPlanCreate.sass";

import MyButton from "../../utils/MyButton";
import MyTextField from "../../utils/MyTextField";
import myFetch from "../../utils/myFetch";
import config from "../../config";
import CryptoJS from "crypto-js";
import MySelect from "../../utils/MySelect";
import MyDatePicker from "../../utils/MyDatePicker";
import CreatingTaskList from "../components/CreatingTaskList";

class DevelopmentPlanCreateClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      target: "",
      percent: 50,
      person: "",
      personsArray: [],
      mentor: "",
      mentorsArray: [],
      startDate: new Date(),
      endDate: new Date(),
      currentTask: "",
      taskList: [],
      description: "",
      hasError: false,
      username: JSON.parse(localStorage.getItem("user")),
      id: this.props.match.params.id,
      pageContent: {},
      usersArray: {},
      decisionArray: [],
    };
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      const articleId = CryptoJS.AES.decrypt(
        this.props.match.params.id.replace(/Por21Ld/g, "/"),
        "rak"
      ).toString(CryptoJS.enc.Utf8);
      myFetch(`${config.decisionGetOne}?id=${articleId}`, "GET").then((res) => {
        // console.log(res);
        this.setState({ pageContent: res[0] });
        // setTitle(res[0].name);
        // setDescription(res[0].description);
      });
    }
    this.getUsers(this.state.username.companyUid);
    this.getDecision(this.state.username.companyUid);
  }

  getUsersFetch = (companyUid) => {
    return myFetch(`${config.user}?companyUid=${companyUid}`, "GET");
  };

  getUsers = (companyUid) => {
    this.getUsersFetch(companyUid).then((res) => {
      let newRes = res;
      if (res.length) {
        newRes = res.sort((a, b) => a.companyUid - b.companyUid);
      }
      this.setState({
        usersArray: newRes,
        personsArray: newRes
          .filter((el) => el.role > 12)
          .map((el) => {
            return {
              id: el._id,
              title: `${el.lastName} ${el.firstName} ${el.patronymic}`,
            };
          }),
        mentorsArray: newRes
          .filter((el) => el.role === "12")
          .map((el) => {
            return {
              id: el._id,
              title: `${el.lastName} ${el.firstName} ${el.patronymic}`,
            };
          }),
      });
    });
  };

  getDecisionFetch = (companyUid) => {
    return myFetch(`${config.decision}?companyUid=${companyUid}`, "GET");
  };

  getDecision = (companyUid) => {
    this.getDecisionFetch(companyUid).then((res) => {
      console.log(res);
      let newRes = res;
      if (res.length) {
        newRes = res.sort((a, b) => a.companyUid - b.companyUid);
      }
      this.setState({
        decisionArray: newRes.map((el) => {
          return { id: el._id, title: el.name };
        }),
      });
    });
  };

  addFetch = () => {
    myFetch(config.developmentPlan, "POST", {
      target: this.state.target,
      percent: this.state.percent,
      person: this.state.personsArray.find(el => el.id === this.state.person).title,
      personId: this.state.person,
      mentor:  this.state.mentorsArray.find(el => el.id === this.state.mentor).title,
      mentorId: this.state.mentor,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      description: this.state.description,
      taskList: [...this.state.taskList],

      creator: `${this.state.username.lastName} ${this.state.username.firstName} ${this.state.username.patronymic}`,
      creatorId: this.state.username._id,
      creatingDate: new Date().toISOString(),
      companyUid: this.state.username.companyUid,
    }).then((res) => {
      if (res.n > 0) {
        console.log(res);
        // window.location.pathname = "/developmentPlan/search";
      } else {
        console.log(res);
        this.setState({ hasError: true });
      }
    });
  };

  updateFetch = () => {
    // const newPageContent = { ...pageContent };
    // delete newPageContent._id;
    // myFetch(config.decision, "PUT", {
    //   id: pageContent._id,
    //   new: {
    //     ...newPageContent,
    //     name: title,
    //     description,
    //     editing: `${username.lastName} ${username.firstName} ${username.patronymic}`,
    //     editingId: username._id,
    //     editingDate: new Date().toISOString(),
    //   },
    // }).then((res) => {
    //   if (res.n > 0) {
    //     console.log(res);
    //     window.location.pathname = "/knowledgeBase/search";
    //   } else {
    //     console.log(res);
    //     setHasError(true);
    //   }
    // });
  };

  addedTask = (type) => {
    const newTaskList = [...this.state.taskList];
    if (type === "text") {
      newTaskList.push({
        title: this.state.currentTask,
        id: newTaskList.length,
        type,
      });
    }
    if (type === "select") {
      const disision = this.state.decisionArray.find(
        (el) => el.id === this.state.currentTask
      );
      newTaskList.push({ title: disision.title, id: disision.id, type });
    }
    this.setState({ currentTask: "", taskList: newTaskList });
  };

  deleteTask = (id) => {
    const newTaskList = this.state.taskList.filter((el) => el.id !== id);
    this.setState({ taskList: newTaskList });
  };

  render() {
    return (
      <div className="developmentPlanCreate">
        <div className="developmentPlanCreate-content">
          <div className="developmentPlanCreate-content-form">
            <h3 className="developmentPlanCreate-content-form-title">
              Создание плана развития
            </h3>
            <div className="developmentPlanCreate-content-form-block">
              <div className="developmentPlanCreate-content-form-block-left">
                <MyTextField
                  label={"Цель"}
                  value={this.state.target}
                  change={(e) => {
                    this.setState({ target: e.target.value });
                  }}
                />
              </div>

              <MyTextField
                label={"Процент для успешного прохождения"}
                value={this.state.percent}
                change={(e) => {
                  this.setState({ percent: e.target.value });
                }}
              />
            </div>

            <div className="developmentPlanCreate-content-form-block">
              <div className="developmentPlanCreate-content-form-block-left">
                <MySelect
                  label={"План развития для"}
                  value={this.state.person}
                  valueList={this.state.personsArray}
                  change={(e) => {
                    this.setState({ person: e.target.value });
                  }}
                />
              </div>
              <MySelect
                label={"Наставник"}
                value={this.state.mentor}
                valueList={this.state.mentorsArray}
                change={(e) => {
                  this.setState({ mentor: e.target.value });
                }}
              />
            </div>

            <div className="developmentPlanCreate-content-form-block">
              <div className="developmentPlanCreate-content-form-block-left">
                <MyDatePicker
                  label="Дата начала"
                  value={this.state.startDate}
                  change={(value) => this.setState({ startDate: value })}
                  disablePast={true}
                />
              </div>

              <MyDatePicker
                style={{ color: "#fff" }}
                label="Дата окончания"
                value={this.state.endDate}
                change={(value) => this.setState({ endDate: value })}
                disablePast={true}
              />
            </div>

            <MyTextField
              label={"Описание"}
              value={this.state.description}
              change={(e) => {
                this.setState({ description: e.target.value });
              }}
              multiline={true}
              rows={6}
            />

            <CreatingTaskList
              task={this.state.currentTask}
              decisionArray={this.state.decisionArray.filter(
                (el) =>
                  !(
                    this.state.taskList.findIndex(
                      (item) => el.title === item.title
                    ) + 1
                  )
              )}
              setTask={(task) => this.setState({ currentTask: task })}
              addedTask={this.addedTask}
              list={this.state.taskList}
              onDeleteItem={this.deleteTask}
            />

            <div className="developmentPlanCreate-content-form-footer">
              <MyButton
                click={() => {
                  this.state.id ? this.updateFetch() : this.addFetch();
                }}
              >
                {this.state.id ? "Сохранить" : "Создать"}
              </MyButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DevelopmentPlanCreateClass;
