import React from "react";
import {
  GRAY,
  TEXT_TITLE,
  HEADER_COLOR,
  MENU_GRAY,
} from "../../utils/webColors";
import { webConstants } from "../../utils/webConstants";
import { Avatar, Typography } from "@material-ui/core";
import { Search, AttachFile, MoreVert } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import chatImage from "../../assets/svg/chatImage.svg";

const WebChatRoomHeaderView = ({ item, isNewChat }) => {
  const [displayLastSeen] = React.useState("");
  let styles = useStyles();
  let data = item;

  return (
    <div className={styles.parentView} elevation={webConstants.PAPER_ELEVATION}>
      <div
        style={{
          marginLeft: "1%",
          alignSelf: "center",
          marginTop: "0.2%",
        }}
      >
        <Avatar src={chatImage} className={styles.profileIcon} />

      </div>
      <div
        style={{
          display: "flex",
          width: "76%",
          flexDirection: "column",
          marginLeft: "1%",
          alignSelf: "center",
        }}
      >
        <Typography className={styles.userName}>
          { data.name}-{data.jid.split("@")[0]}
        </Typography>
        <Typography className={styles.userMessage}>
          {displayLastSeen}
        </Typography>
      </div>
      <div
        style={{
          width: "19%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Search className={styles.menuIcons} />
        <AttachFile className={styles.menuIcons} />
        <MoreVert className={styles.menuIcons} />
      </div>
    </div>
  );
};

export default WebChatRoomHeaderView;

const useStyles = makeStyles((theme) => ({
  parentView: {
    backgroundColor: HEADER_COLOR,
    width: "100%",
    height: "8%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "1%",
    borderRadius: 0,
    marginLeft: 0.05,
  },
  backIcon: {
    justifyContent: "center",
    height: "100%",
    alignSelf: "center",
    color: TEXT_TITLE,
  },
  profileIcon: {
    alignSelf: "center",
    justifySelf: "center",
  },
  userName: {
    fontSize: 16,
    color: TEXT_TITLE,
  },
  userMessage: {
    fontSize: 12,
    color: GRAY,
  },
  menuIcons: {
    fontSize: 24,
    color: MENU_GRAY,
    marginLeft: 0,
    alignSelf: "center",
    cursor: "pointer",
  },
}));
