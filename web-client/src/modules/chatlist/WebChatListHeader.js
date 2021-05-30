import React, { useState, useEffect } from "react";
import {
  APP_BG_COLOR,
  GREEN,
  INPUT_ORANGE,
  WHITE,
  GRAY,
  BLACK,
  TEXT_TITLE,
  HEADER_COLOR,
  MENU_GRAY
} from "../../utils/webColors";
import USER from "../../assets/images/profile2.jpg";
import {Avatar, Button, Menu, MenuItem} from "@material-ui/core";
import { MoreVert, Chat } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import STATUS from "../../assets/svg/statusHeader.svg";
import {getUserInfo, logout} from "../../api/webApiController";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";

const WebChatListHeader = ({ onChatClick, onStatusClick }) => {
  const styles = useStyles();
  const [user,setUser] = useState({});
  useEffect(()=>{
    getUserInfo().then((res)=>{
      setUser(res.data.data);
    })
  },[]);
  return (
    <div className={styles.parentView}>
      <div style={{ width: "20%", marginLeft: "4%", alignSelf: "center" }}>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
              <React.Fragment>
                <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                  <Avatar src={user?.extend?.imgUrl?user.extend.imgUrl:USER} className={styles.profileIcon} />
                  {user.extend?.name}
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={async ()=>{
                    await logout();
                    localStorage.removeItem("userId");
                    window.location.href="/"
                    popupState.close();
                  }}>退出</MenuItem>
                </Menu>
              </React.Fragment>
          )}
        </PopupState>
      </div>
      <div
        style={{
          width: "40%",
          flexDirection: "row",
          justifyContent: "space-evenly"
        }}
      />
      <div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "row"
        }}
      >
        <img onClick={onStatusClick} className={styles.menuIcons} src={STATUS} />
        <Chat onClick={onChatClick} className={styles.chatIcons} />
        {/* <img src={CHAT} className={styles.chatIcons} /> */}
        <MoreVert className={styles.menuIcons} />
      </div>
    </div>
  );
};

export default WebChatListHeader;

const useStyles = makeStyles(theme => ({
  parentView: {
    backgroundColor: HEADER_COLOR,
    width: "100%",
    height: "8%",
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    borderRadius: 0
  },
  backIcon: {
    justifyContent: "center",
    height: "100%",
    alignSelf: "center",
    color: TEXT_TITLE
  },
  profileIcon: {
    width: 40,
    height: 40,
    alignSelf: "center"
  },
  userName: {
    fontSize: 16,
    color: TEXT_TITLE
  },
  userMessage: {
    fontSize: 12,
    color: GRAY
  },
  menuIcons: {
    width: 24,
    height: 24,
    color: MENU_GRAY,
    marginLeft: "15%",
    alignSelf: "center",
    cursor:'pointer'
  },
  chatIcons: {
    width: 22,
    height: 22,
    color: MENU_GRAY,
    marginLeft: "15%",
    alignSelf: "center",
    cursor:'pointer'
  }
}));
