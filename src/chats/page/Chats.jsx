import React from "react";
import "./Chats.sass";

import DragDropContext from "../components/DragDropContext";
import SendMessageForm from "../components/SendMessageForm";
import ChatsMenu from "../components/ChatsMenu";
import myFetch from "../../utils/myFetch";
import config from "../../config";

import {
  socketInitialization,
  socketEmit,
  socket,
  getAllUserChats_api,
  connectToRoom_api,
  updateData_api,
  deleteMessage_api,
  createMessage_api,
  clientSendingFirstMessage_api,
  addUser_api,
  userLeft_api,
  disconnect_api,
  reconnect_api,
  reconnect_error_api,
  userConnect_api,
} from "../components/api";

class ChatsClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      numberUsers: 0,
      chatsArray: [],
      usersArray: [],
      selectedChat: localStorage.getItem("activeRoomName"),
    };
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
     this.setState({usersArray: newRes});
    });
  };

  componentDidMount() {
    
    const username = JSON.parse(localStorage.getItem("user"));
    this.getUsers(username.companyUid);
    socketInitialization();

    if (username) {
      socketEmit(getAllUserChats_api, {companyId: username.companyUid});
    }

    if (this.state.selectedChat) {
      socketEmit(connectToRoom_api, this.state.selectedChat);
    }

    socket.on(getAllUserChats_api, (data) => {
      console.log('getAllUserChats_api', data);
      let newRes = data;
      if (data.length) {
        newRes = data.sort((a, b) => a.companyUid - b.companyUid);
      }
      this.setState({ chatsArray: newRes });
    });

    socket.on(updateData_api, (data) => {
      
      const roomName = localStorage.getItem("activeRoomName");
      if (roomName === data.roomName) {
        this.setState({
          messages: data.messages,
        });
      } else {
        let newChatsArray = [...this.state.chatsArray];
        let index = newChatsArray.findIndex(
          (el) => el.roomName === data.roomName
        );
        newChatsArray[index].missMassage++;
        this.setState({ chatsArray: newChatsArray });
      }
    });

    socket.on(userConnect_api, (data) => {
      this.setState({ numberUsers: data.numUsers });
    });

    socket.on(userLeft_api, (data) => {
      this.setState({ numberUsers: data.numUsers });
    });

    socket.on(disconnect_api, () => {
      console.log("you have been disconnected");
    });

    socket.on(reconnect_api, () => {
      console.log("you have been reconnected");
      if (username) {
        socketEmit(addUser_api, username._id);
      }
    });

    socket.on(reconnect_error_api, () => {
      console.log("attempt to reconnect has failed");
    });
  }

  deleteMessage = (id) => {
    const roomName = localStorage.getItem("activeRoomName");
    socketEmit(deleteMessage_api, { roomName, id });
  };

  selectedChat = (name) => {
    const username = JSON.parse(localStorage.getItem("user"));
    let newName = `${username?._id}:${name}`;
    
    let index = this.state.chatsArray.findIndex((el) => {
      if (el.roomName === newName) {
        return true
      }
      if (el.roomName === `${name}:${username?._id}`) {
        newName = `${name}:${username?._id}`;
        return true
      }
      return false
    });
    
    if (!(index + 1)) {
      this.setState({
        selectedChat: newName,
        messages: [],
      });
      localStorage.setItem("activeRoomName", newName);
    } else {
      socketEmit(connectToRoom_api, newName);
      let newChatsArray = [...this.state.chatsArray];
      localStorage.setItem("activeRoomName", newName);
      newChatsArray[index].missMassage = 0;
     
      this.setState({ 
        chatsArray: newChatsArray, 
        selectedChat: newName
      });
    }
   
  };

  sendMassage = (data) => {
    if (!(this.state.chatsArray.findIndex((item) => item.roomName === this.state.selectedChat) + 1)) {
      const username = JSON.parse(localStorage.getItem("user"));
      let secondUser = this.state.selectedChat;
      secondUser = secondUser.split(":")[1];
      socketEmit(clientSendingFirstMessage_api, {
        roomName: this.state.selectedChat,
        users: [username?._id, secondUser],
        messages: data,
        companyId: username?.companyUid,
       });
    } else {
      socketEmit(createMessage_api, {roomName: this.state.selectedChat, newMessage: data});
    }
  }

  render() {
    return (
      <div className="chats">
        <ChatsMenu
          usersArray={this.state.usersArray}
          chatsArray={this.state.chatsArray}
          selectedChat={this.selectedChat}
          activeRoom={this.state.selectedChat}
        ></ChatsMenu>
        <div className="chats-content">
          {this.state.selectedChat && (
            <>
              <div className="chats-content-messages">
                <DragDropContext
                  todoList={this.state.messages}
                  deleteMessage={this.deleteMessage}
                  numberUsers={this.state.numberUsers}
                />
              </div>
              <div className="chats-content-send">
                <SendMessageForm send={this.sendMassage} />
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default ChatsClass;
