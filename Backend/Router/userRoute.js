import express from "express";
import { bookticket, findTrains, orders, userLogin, userRegister } from "../controllers/userController.js";
import { generatePassword, matchPass } from "../helper/HashPassWord.js";
import isUser from "../middlewares/isUser.js";
const router = express.Router();
router.get("/", isUser, (req, resp) => {
    resp.status(200).send({
        success: true
    })
})
router.post('/login', userLogin);
router.post('/register', userRegister);
router.post('/findtrains', isUser, findTrains);
router.post('/bookticket', isUser, bookticket);
router.get('/orders', isUser, orders);
export default router;