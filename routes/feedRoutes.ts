import {Router} from "express";
import { handleGetFeeds } from "../controllers/feedsControllers";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get('/',[authMiddleware], handleGetFeeds);
// router.post('/', addFeed);

export default router;