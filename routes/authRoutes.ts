import {Router} from "express";
import { handleLogin, handleSignup } from "../controllers/authControllers";
import multer from 'multer';

const upload = multer({ dest: './uploads' });

const router = Router();

router.post('/signup',upload.any(), handleSignup);
router.post('/login',handleLogin)

export default router