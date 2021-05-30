import axios from "axios";
import { webConstants } from "../utils/webConstants";
import { getLocalData } from "../utils/webHelperFunctions";

const api = axios.create({
  baseURL: webConstants.API.SERVER_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (request) => {
    const token = getLocalData(webConstants.ACCESS_TOKEN);
    request.headers = { Authorization: token };
    return request;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

export const getChatList = () => {
    let userId = localStorage.getItem("userId");
    return api.get(`${webConstants.API.CHAT_LIST}/${userId}`);
};
export const getChatRoom = (payload) => {
  return api.post(webConstants.API.CHAT_ROOM, payload);
};
export const createChatRoom = (payload) => {
  return api.post(webConstants.API.CREATE_CHAT_ROOM, payload);
};
export const updateChatRoom = (payload) => {
  return api.post(webConstants.API.UPDATE_CHAT_ROOM, payload);
};

export const loginUser = (payload) => {
  return api.post(webConstants.API.LOGIN_USER, payload);
};

export const getLoggedInUserList = (payload) => {
  return api.get(webConstants.API.USER_LIST, payload);
};

export const getLastSeenUser = (payload) => {
  return api.post(webConstants.API.LAST_SEEN, payload);
};

export const getUserId = ()=>{
    return api.get(webConstants.API.USER_ID);
}
export const getUserInfo = ()=>{
    let userId = localStorage.getItem("userId");
    return api.get(`${webConstants.API.USER_INFO}/${userId}`);
}
export const logout = ()=>{
    let userId = localStorage.getItem("userId");
    return api.get(`${webConstants.API.LOGOUT}/${userId}`);
}

export const getRecentMsg = (remoteJid)=>{
    let userId = localStorage.getItem("userId");
    return api.get(`${webConstants.API.GET_RECENT_MSG}/${userId}/${remoteJid}`);
}

export const createUserStatus = (payload) => {
  return api.post(webConstants.API.CREATE_USER_STATUS, payload);
};

export const getAllUserStatus = () => {
  return api.get(webConstants.API.GET_ALL_STATUS);
};

export const getContacts = () => {
    let userId = localStorage.getItem("userId");
  return api.get(`${webConstants.API.CONTACTS_LIST}/${userId}`);
};

export const setUserStatusViewedForID = (payload) => {
  return api.post(webConstants.API.SET_STATUS_VIEWED, payload);
};
