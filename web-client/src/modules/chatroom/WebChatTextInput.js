import React, { useState } from "react";
import {
  WHITE,
  TEXT_TITLE,
  MENU_GRAY,
  HEADER_COLOR
} from "../../utils/webColors";
import {
  Avatar,
  TextareaAutosize
} from "@material-ui/core";
import { Mood, Mic } from "@material-ui/icons";
const ChatTextInput = ({ onSendMessage, onTyping,handleOpen }) => {
  const [message, setMessage] = useState("");

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      onSendMessage(message);
      setMessage("");
    }
  }
  return (
    <div style={styles.parentView}>
      <div style={styles.smileView}>
        <Mood style={styles.menuIcons} />
        <span onClick={handleOpen}  style={{display:"inline-block","height":"30px"}}>快捷语音</span>
      </div>
      {/* <div style={{ width: "90%", justifyContent: "center", maxHeight: 120 }}>  */}
      <TextareaAutosize
        style={styles.userMessage}
        placeholder="Type a message ..."
        value={message}
        onKeyPress={e => handleKeyDown(e)}
        onChange={event => {
          onTyping(event);
          setMessage(event.target.value);
        }}
      />
      {/* <TextareaAutosize  aria-label="empty textarea" placeholder="Empty" /> */}
      {/* </div> */}
      <div style={styles.sendIconView}>
        <Avatar
          style={{
            backgroundColor: HEADER_COLOR
          }}
        >
          <Mic style={styles.sendIcon} />
        </Avatar>
      </div>
    </div>
  );
};

export default ChatTextInput;

const styles = {
  parentView: {
    backgroundColor: HEADER_COLOR,
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row"
  },
  sendIcon: {
    color: MENU_GRAY,
    width: 30,
    height: 30,
    alignSelf: "center"
  },
  sendIconView: {
    flex: 1,
    paddingLeft: 10,
    backgroundColor: HEADER_COLOR,
    justifyContent: "center",
    alignSelf: "center"
  },
  userName: {
    fontSize: 16,
    color: WHITE,
    fontWeight: "bold"
  },
  userMessage: {
    fontSize: 16,
    flex: 0.9,
    color: TEXT_TITLE,
    justifyContent: "center",
    alignSelf: "center",
    textAlignVertical: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    marginBottom: 10,
    maxHeight: 120,
    resize: "vertical",
    backgroundColor: WHITE,
    borderRadius: 20,
    borderColor: HEADER_COLOR,
    outline: "none"
  },
  menuIcons: {
    width: 30,
    height: 30,
    color: MENU_GRAY,
    alignSelf: "center",
    verticalAlign: "middle"
  },
  smileView: {
    width:'120px',
    paddingLeft: '15px',
    alignSelf: "center",
    backgroundColor: HEADER_COLOR,
    justifyContent: "center",
    verticalAlign: 'middle'
  }
};
