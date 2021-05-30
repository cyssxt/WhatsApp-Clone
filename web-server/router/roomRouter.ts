import {getQrCode} from "../controller/FileController";

export {};
import express from "express";
import {
  getUserChatRoom,
  createChatRoom,
  updateChatRoom,
} from "../controller/chatRoomController";
import { getUserLastSeen } from "../controller/lastSeenController";
import authUser from "../middleware/auth";

const router = express.Router();

router.post("/chatRoom", authUser, getUserChatRoom);
router.post("/createRoom", authUser, createChatRoom);
router.post("/updateRoom", authUser, updateChatRoom);
router.post("/lastSeen", authUser, getUserLastSeen);
router.get("/getQrCode", getQrCode);

export default router;
