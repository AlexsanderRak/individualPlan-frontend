import React from "react";
import MyIcons from "../../utils/MyIcons";
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';

import './CreatingTaskListItem.sass'

export default function CreatingTaskListItem(props) {
  return (
    <div className="creatingTaskListItem">
      <span className="creatingTaskListItem-title"><span>{props.index +1} - </span>{props.title}</span>
      <MyIcons click={()=> props.delete(props.id)}>
         <DeleteOutlineRoundedIcon />
      </MyIcons>
    </div>
  );
}
