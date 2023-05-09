import React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";

import { SideBlock } from "./SideBlock";


export const CommentsBlock = ({comments, user}) => {
  return (
    <SideBlock title="Comments">
      <List>
        {comments.map((obj, index) => (
            <React.Fragment key={index}>
                <h1 style={{color:' slateblue' }}>{user.user.fullName}</h1>
                <h4> {obj.comment}</h4>
                <Divider variant="inset" component="li"/>
            </React.Fragment>
        ))}
      </List>
    </SideBlock>
  );
};
