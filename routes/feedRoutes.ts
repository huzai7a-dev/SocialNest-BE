import {Router} from "express";
import multer from "multer";
import { handleCreateFeed, handleGetFeeds } from "../controllers/feedsControllers";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();
const upload = multer({ dest: './uploads' });

router.get('/',[authMiddleware], handleGetFeeds);
router.post('/',[upload.any(),authMiddleware],handleCreateFeed);

export default router;