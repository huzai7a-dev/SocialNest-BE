import {Router} from "express";
import { handleCreateFeed, handleGetFeeds } from "../controllers/feedsControllers";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/',[authMiddleware], handleGetFeeds);
router.post('/',[authMiddleware],handleCreateFeed);

export default router;