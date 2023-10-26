import {Router} from "express";
import multer from "multer";
import { handleLikeFeed } from "../controllers/likeController";
import { handleCreateFeed, handleGetFeeds, handleGetSingleFeed } from "../controllers/feedsControllers";
import authMiddleware from "../middlewares/authMiddleware";
import { handleAddComment, handleGetComments } from "../controllers/commentsController";

const router = Router();
const upload = multer({ dest: './uploads' });

router.get('/', [authMiddleware], handleGetFeeds);
router.get('/:id', [authMiddleware], handleGetSingleFeed);
router.post('/',[upload.any(),authMiddleware],handleCreateFeed);
router.put('/like/:id', [authMiddleware], handleLikeFeed);
router.put('/comment/:id', [authMiddleware], handleAddComment)
router.get('/comment/:id', [authMiddleware], handleGetComments)

export default router;