import React, { useState, useEffect, useReducer } from "react";
import WebChatListItem from "./WebChatListItem";
import { webConstants } from "../../utils/webConstants";
import EmptyComponent from "../../components/WebEmptyComponent";
import { getChatList } from "../../api/webApiController";
import { getLocalData
} from "../../utils/webHelperFunctions";
import { WHITE } from "../../utils/webColors";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import {
  initialChatListState,
  chatListReducer,
  CHAT_LIST,
  CHAT_ITEM,
  REFRESH,
} from "./WebChatListReducer";
import {getSocket} from "../../api/socketApi";
import EventConstant from "../../constants/EventConstant";
const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 60,
});

const WebChatListView = ({ onItemClick, userChatList }) => {
  const [state, dispatch] = useReducer(chatListReducer, initialChatListState);
  const [currentIndex,setCurrentIndex] = useState(-1);
  const { chatList, chatItem, refresh, userId } = state;

  useEffect(() => {
    listenSocket();
  }, []);

  useEffect(() => {
    if (refresh) {
      getLatestChats();
    }
  }, [refresh]);

  const getLatestChats = () => {
    getChatList()
      .then((res) => {
        // console.log("LIST RESPONSE => " + JSON.stringify(res.data.data));
        if (res.status === 200 && res.data.data) {
          userChatList(res.data.data.extend);
          dispatch({ type: CHAT_LIST, payload: res.data.data.extend });
        }
        dispatch({ type: REFRESH, payload: false });
      })
      .catch((error) => {
        console.log("ERROR ", error);
      });
  };

  function listenSocket() {
    let socket = getSocket();
    socket.removeListener(EventConstant.CHAT_LIST);
    socket.on(webConstants.CHAT_LIST, (chatItem) => {
      dispatch({ type: CHAT_ITEM, payload: chatItem });
    });
  }

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        borderRadius: 0,
        backgroundColor: WHITE,
      }}
    >
      {chatList.length === 0 && (
        <EmptyComponent message={"No chats, contacts or messages found"} />
      )}

      <List
        style={{
          height: "100%",
          width: "100%",
          outline: "none",
        }}
        rowCount={chatList.length}
        height={window.innerHeight}
        width={window.innerWidth - window.innerWidth / 3.2}
        rowHeight={cache.rowHeight}
        rowRenderer={({ index, parent, key, style }) => (
          <CellMeasurer
            key={key}
            cache={cache}
            parent={parent}
            columnIndex={0}
            rowIndex={index}
          >
            <WebChatListItem
              item={chatList[index]}
              position={index}
              currentIndex={currentIndex}
              onItemClick={(item)=>{
                onItemClick(item);
                setCurrentIndex(index)
                }
              }
            />
          </CellMeasurer>
        )}
        overscanRowCount={0}
        data={refresh}
      />
    </div>
  );
};

export default WebChatListView;

// const useStyles = makeStyles({
//   btnView: {
//     marginTop: 15,
//     marginRight: -5,
//     width: 65,
//     height: 65,
//     justifyContent: "center",
//     alignSelf: "center",
//     backgroundColor: LIGHT_GREEN,
//     position: "absolute",
//     bottom: 20,
//     right: 20
//   },
//   thumbView: {
//     width: 30,
//     height: 30,
//     justifyContent: "center",
//     tintColor: WHITE
//   }
// });
