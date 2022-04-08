import React from "react";
import MyTextField from "../../utils/MyTextField";
import "./ChatsMenu.sass";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import MyIcons from "../../utils/MyIcons";
import MyBadge from "../../utils/MyBadge";
import { role } from "../../config";

function ChatsMenu(props) {
  const prepareId = (roomName, ind) => {
    if (roomName) return roomName.split(":")[ind];
    return false;
  };

  const username = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="chatsMenu">
      <div className="chatsMenu-content">
        <div className="chatsMenu-content-search">
          <MyTextField label="Search"></MyTextField>
          <MyIcons>
            <SearchRoundedIcon />
          </MyIcons>
        </div>
        <div className="chatsMenu-content-chats">
          {props.usersArray.map((item, index) => {
            const chatsEl = props.chatsArray?.find((el) => el.roomName === `${item._id}:${username?._id}` || el.roomName === `${username._id}:${item?._id}` )
            return <>
            {item._id === username._id ? ''
              :
              <div
              key={props.chatsArray[index]?.roomName + index}
              className={`chatsMenu-content-chats-item ${
                (item._id === prepareId(props.activeRoom, 0) ||  item._id === prepareId(props.activeRoom, 1)) &&
                "chatsMenu-content-chats-item-active"
              }`}
              onClick={() => props.selectedChat(item._id)}
            >
              <div className="chatsMenu-content-chats-item-main">
                <div className="chatsMenu-content-chats-item-main-avatar"></div>
                <div className="chatsMenu-content-chats-item-main-text">
                  <span className="chatsMenu-content-chats-item-main-text-name">
                    {item.lastName} {item.firstName}
                  </span>
                  <span className="chatsMenu-content-chats-item-main-text-role">{role[item.role].ru}</span>
                </div>
              </div>
                {chatsEl && chatsEl?.missMassage !== 0 && (
                <MyBadge messages={chatsEl?.missMassage} />
              )}
            </div>
            }
           
           </>
})}
        </div>
      </div>
    </div>
  );
}

export default ChatsMenu;
