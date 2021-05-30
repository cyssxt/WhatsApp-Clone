import React,{ useEffect,useState } from "react";
import ChatRoomView from "./WebChatRoomView";
import WebChatRoomHeaderView from "./WebChatRoomHeaderView";
import SimpleDialog from "../../components/SimpleDialog";
import {getSocket} from "../../api/socketApi";

const WebChatRoomScreen = ({ route }) => {
  console.log("ChatRoomScreen => ", JSON.stringify(route));
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setRefresh(!refresh)
  },[route]);

  return (
    <div style={styles.parentView}>
      <WebChatRoomHeaderView item={route} isNewChat={false} />
      <ChatRoomView chatItem={route} isNewChat={false} />


    </div>
  );
};

export default WebChatRoomScreen;

const styles = {
  parentView: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#E4DDD6"
  }
};
