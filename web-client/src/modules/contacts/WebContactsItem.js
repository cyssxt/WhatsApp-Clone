import React from "react";
import {
  GRAY,
  WHITE,
  LIGHT_GREEN,
  INPUT_ORANGE,
  RED
} from "../../utils/webColors";
import USER from "../../assets/images/user.png";
import { Typography, Avatar } from "@material-ui/core";
import moment from "moment";

const WebContactsItem = ({ item, onItemClick }) => {
  return (
    <div
      onClick={() => onItemClick(item)}
      style={{
        display: "flex",
        padding: "1%",
        width: "28%",
        cursor:'pointer'
      }}
    >
      <Typography
        style={{
          display: "flex",
          flex: 0.2,
          marginTop: 5,
          justifyContent: "center"
        }}
      >
        {!item.thumbnailPath && <Avatar source={USER} />}
      </Typography>
      <div
        style={{
          flexDirection: "column",
          alignSelf: "flex-start",
          justifyContent: "flex-start",
          flex: 0.8,
          marginLeft: 10
        }}
      >
        <Typography  style={styles.userName}>
          {item.name}
        </Typography>
        <Typography style={styles.userMessage}>
          {item.jid.split("@")[0]}
        </Typography>
      </div>
      <div style={{ display: "flex", flex: 0.2, justifyContent: "center" }}>
        {/*<Typography style={styles.userTime}>{item.t}{moment(item.t*1000).format("MM:DD HH:mm A")}</Typography>*/}
        <Typography style={styles.textMsgCount}>
          {item.index}
        </Typography>
        {item.msgIcon != "" && (
          <Typography
            style={styles.msgIcon}
            name={item.msgIcon}
            type={item.msgIconType}
          />
        )}
      </div>
    </div>
  );
};

export default WebContactsItem;

const styles = {
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2
  },
  userName: {
    marginTop: 1,
    fontSize: 16
  },
  userMessage: {
    fontSize: 14,
    color: GRAY,
    marginTop: 3,
    alignSelf: "flex-start"
  },
  userTime: {
    fontSize: 12,
    color: GRAY,
    alignSelf: "flex-end"
  },
  msgIcon: {
    fontSize: 26,
    color: GRAY,
    marginTop: 3,
    alignSelf: "flex-end",
    marginRight: -10
  },
  textMsgCountView: {
    fontSize: 12,
    color: WHITE,
    backgroundColor: LIGHT_GREEN,
    justifyContent: "center",
    alignSelf: "flex-end",
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    marginTop: 10
  },
  textMsgCount: {
    fontSize: 12,
    color: GRAY,
    justifyContent: "center",
    alignSelf: "center"
  }
};
