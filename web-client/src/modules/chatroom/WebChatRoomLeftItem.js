import React, { useState } from "react";
import {
  GRAY,
  TEXT_TITLE
} from "../../utils/webColors";
import {getContentInfo, getDateTimeInFormat} from "../../utils/webHelperFunctions";
import { Card, Typography } from "@material-ui/core";

const ChatRoomLeftItem = ({ item, styleList }) => {

  return (
    <div style={Object.assign({}, styles.parentView, styleList)}>
      {/* <Avatar style={styles.profileImage} src={PROFILE} /> */}
      <Card style={styles.cardView} variant={'elevation'} elevation={0.9}>
          <Typography style={styles.userMessage}>{
            getContentInfo(item)
          }</Typography>
          <Typography style={styles.userTime}>
            {getDateTimeInFormat(item.createdAt)}
          </Typography>
      </Card>
    </div>
  );
};

export default ChatRoomLeftItem;

const styles = {
  parentView: {
    marginLeft: "2%",
    maxWidth: "60%",
    justifyContent: "flex-start",
    flexDirection: "row",
    display: "flex"
  },
  profileImage: {
    width: 40,
    height: 40,
    marginRight: "2%",
    marginTop: '2%',
  },
  userName: {
    fontSize: 16,
    marginTop: 3
  },
  userMessage: {
    fontSize: 14,
    color: TEXT_TITLE,
    marginTop: 3,
    alignSelf: "flex-start"
  },
  userTime: {
    fontSize: 11,
    color: GRAY,
    alignSelf: "flex-end",
    textAlign: "right"
  },
  msgIcon: {
    fontSize: 26,
    color: GRAY,
    marginTop: 3,
    alignSelf: "flex-end",
    marginRight: -10
  },
  cardView: {
    backgroundColor: "#FFF",
    paddingTop: 5,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 3,
    marginTop: 2,
    marginBottom: 2,
  }
};
