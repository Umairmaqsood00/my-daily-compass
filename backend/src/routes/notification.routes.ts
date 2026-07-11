import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireActiveUser } from "../middleware/role.middleware";
import {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
} from "../controllers/notification.controller";

const router = Router();

router.get("/my", authenticate, requireActiveUser(), getMyNotifications);
router.put("/read-all", authenticate, requireActiveUser(), markAllAsRead);
router.put("/:id/read", authenticate, requireActiveUser(), markAsRead);

export default router;
