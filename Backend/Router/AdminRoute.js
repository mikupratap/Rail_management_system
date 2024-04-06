import express from "express";
import { userLogin, userRegister } from "../controllers/userController.js";
import { generatePassword, matchPass } from "../helper/HashPassWord.js";
import { AddStation, Addtrain, Getstations, Gettrains } from "../controllers/Admitcontroller.js";
import isAdmin from "../middlewares/isAdmin.js";
const router = express.Router();
router.post('/', isAdmin, (req, resp) => {
    resp.status(200).send({
        success: true
    })
});
router.post('/addtrain', isAdmin, Addtrain);
router.post('/addstations', isAdmin, AddStation);
router.get('/getstations', isAdmin, Getstations);
router.get('/gettrains', isAdmin, Gettrains);
export default router;