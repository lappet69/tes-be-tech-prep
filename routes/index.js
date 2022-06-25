import express from "express";
import productRouter from './productRouter.js'
import userRouter from './userRouter.js'
const router = express.Router();



router.use('/product',productRouter)
router.use('/user',userRouter)


export default router;
