import { Router } from "express";
import upload from "../middlewares/multer.js";
import  authMiddleware  from "../middlewares/authMiddleware.js";

import chatRouteController from "../controllers/chat/chatRouterController.js";

const router = Router();

router.get("/", chatRouteController.getChats);
router.get("/:id", chatRouteController.getChat);
router.post("/", chatRouteController.createChat);
router.post("/:id/users/add", chatRouteController.addUser);
router.post("/:id/users/remove", chatRouteController.removeUser);
router.post("/:id/messages",[authMiddleware , upload.single("image")], chatRouteController.addMessage);
router.patch("/:id", chatRouteController.rename);
router.patch("/:id/privacy", chatRouteController.setPrivacy);
router.delete("/:id", chatRouteController.deleteChat);

export default router;

