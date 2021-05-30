import { webConstants } from "./webConstants";
import { getLocalData, getUserTypeChatRoom } from "./webHelperFunctions";
import moment from "moment";

export const getLoginModel = (userName, mobile) => {
  return {
    userId: "",
    userName: userName,
    phoneNumber: mobile,
    numberType: "MOBILE",
    country: ""
  };
};

export const getContactsChatModel = item => {
  let id = getLocalData(webConstants.USER_ID);
  return {
    roomId: "",
    userId: id,
    chatId: item.userId,
    chatUnreadCount: 0,
    chat: [
      {
        userId: id,
        userName: getLocalData(webConstants.USER_NAME),
        chatId: item.userId,
        chatName: item.userName,
        chatMessage: "",
        chatNumber: item.phoneNumber,
        chatNumberType: item.numberType,
        chatImage: "",
        chatTime: "",
        chatDelivery: 0,
      }
    ]
  };
};

export const getChatRoomChatModel = (chatItem, isNewChat, userId, text) => {
  const userType = getUserTypeChatRoom(chatItem, userId);
  const mChatId =
    userType === webConstants.OWNER ? chatItem.chatId : chatItem.userId;
  const mUserId =
    userType === webConstants.OWNER ? chatItem.userId : chatItem.chatId;

  const chatRequest = {
    isNewChat: isNewChat,
    roomId: chatItem.roomId,
    userId: chatItem.userId,
    chatId: chatItem.chatId,
    chatUnreadCount: 0,
    chat: {
      userId: mUserId,
      userName: chatItem.chat[0].userName,
      chatId: mChatId,
      chatName: chatItem.chat[0].chatName,
      chatMessage: text,
      chatNumber: chatItem.chat[0].chatNumber,
      chatImage: chatItem.chat[0].chatImage,
      chatTime: moment().format(),
      chatDelivery: 0,
    }
  };
  return chatRequest;
};

export const getChatListModel = (item, isNewChat, chatUnreadCount) => {
  return {
    isNewChat: isNewChat,
    roomId: item.roomId,
    userId: item.userId,
    chatId: item.chatId,
    chatUnreadCount: chatUnreadCount,
    chat: {
      userId: item.messages[0].userId,
      userName: item.messages[0].userName,
      chatId: item.messages[0].chatId,
      chatName: item.messages[0].chatName,
      chatMessage: item.messages[0].chatMessage,
      chatNumber: item.messages[0].chatNumber,
      chatNumberType: item.messages[0].chatNumberType,
      chatImage: item.messages[0].chatImage,
      chatTime: item.messages[0].chatTime,
      chatDelivery: item.messages[0].chatDelivery,
    },
  };
};
