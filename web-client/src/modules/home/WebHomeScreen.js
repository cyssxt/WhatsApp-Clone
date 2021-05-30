import React, { useState, useEffect } from "react";
import {
  APP_BG_COLOR,
  LIGHT_GREEN,
  GRAY,
} from "../../utils/webColors";
import WebChatListView from "../chatlist/WebChatListView";
import WebChatRoomScreen from "../chatroom/WebChatRoomScreen";
import { Divider, Card, Paper } from "@material-ui/core";
import WebEmptyRoomComponent from "../../components/WebEmptyRoomComponent";
import WebChatListHeader from "../chatlist/WebChatListHeader";
import { webConstants } from "../../utils/webConstants";
import WebChatSearchBox from "../chatlist/WebChatSearchBox";
import WebContactsView from "../contacts/WebContactsView";
import { Animated } from "react-animated-css";
import { getContactsChatModel } from "../../utils/webHelperModels";
import WebStatusView from "../status/WebStatusView";

const WebHomeScreen = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [contactsVisible, setContactsVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userChatList, setUserChatList] = useState([]);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
  }, []);

  function mainUserChatList(chatList) {
    setUserChatList(chatList);
  }

  function onListItemClick(data) {
    console.log(data);
    setSelectedItem(data);
    resetState();
  }

  function resetState() {
    setRefresh(!refresh);
    // setTimeout(() => {
    //   setSelectedItem('');
    // }, 1000);
  }

  function onContactItemClick(data) {
    toggleContacts();
    console.log(data);
    let isMatch = false;
    if (userChatList && userChatList.length > 0) {
      for (let index = 0; index < userChatList.length; index++) {
        const element = userChatList[index];
        if (
          element.userId === data.userId ||
          element.userId === data.chatId ||
          element.chatId === data.userId ||
          element.chatId === data.chatId
        ) {
          navigateChatRoom(element);
          isMatch = true;
          break;
        }
      }

      if (!isMatch) {
        let chatModel = getContactsChatModel(data);
        navigateChatRoom(chatModel);
      }
      isMatch = false;
    } else {
      let chatModel = getContactsChatModel(data);
      navigateChatRoom(chatModel);
    }
  }

  function navigateChatRoom(chatModel) {
    setSelectedItem(chatModel);
    resetState();
  }

  function toggleContacts() {
    setContactsVisible(!contactsVisible);
  }

  function toggleStatus() {
    setShowStatus(!showStatus);
  }

  return (
      <div style={styles.parentView}>
        <div style={styles.paperView} elevation={webConstants.PAPER_ELEVATION}>
          <div style={styles.leftDivStyle}>
            <WebChatListHeader
              onChatClick={toggleContacts}
              onStatusClick={toggleStatus}
            />
            <WebChatSearchBox />
            <Divider style={{ height: 0.6 }} />
            <WebChatListView
              onItemClick={onListItemClick}
              userChatList={mainUserChatList}
            />
          </div>
          <Divider style={styles.dividerStyle} />
          {
            contactsVisible &&
            <div
                style={{ width: "30%", position: "absolute", height: "100%" }}>
              <WebContactsView
                onChatCloseClick={toggleContacts}
                onItemClick={onContactItemClick}
                />
            </div>
          }
        </div>

        <div style={styles.roomDivStyle}>
          {selectedItem === "" && (
            <WebEmptyRoomComponent message={"Hello World"} />
          )}
          {selectedItem != "" && <WebChatRoomScreen route={selectedItem} />}
        </div>

        {/* {showStatus && ( */}
        <Animated
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationInDuration={400}
          animationOutDuration={200}
          isVisible={showStatus}
          animateOnMount={showStatus}
          style={{ width: "100%", position: "absolute", height: "100%",   zIndex: 500000 }}
        >
          <div style={styles.statusDiv}>
            <WebStatusView onCancelClick={toggleStatus} />
          </div>
        </Animated>
        {/* )} */}
      </div>
  );
};

export default WebHomeScreen;

const styles = {
  parentView: {
    backgroundColor: APP_BG_COLOR,
    height: window.innerHeight,
    width: window.innerWidth,
    flex: 1,
    display: "flex",
    overflow: "hidden",
    margin: -8
  },
  paperView: {
    flex: 0.3,
    display: "flex",
    flexDirection: "row",
    borderWidth: 0,
  },
  dividerStyle: {
    flex: 0.7,
    display: "flex",
    marginLeft: 0,
    backgroundColor: LIGHT_GREEN,
  },
  roomDivStyle: {
    flex: 0.7,
    display: "flex",
    marginLeft: 0,
    backgroundColor: LIGHT_GREEN,
  },
  leftDivStyle: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  statusDiv: {
    width: "100%",
    display: "flex",
    height: "100%",
    position: "absolute",
    zIndex: 20000,
  },
};
