import jwt from 'jsonwebtoken'
import database from '../config/db.js';
const isUser = async (req, resp, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        if (!token) {
            resp.status(400).send({
                success: false
            })
        }
        const data = await jwt.verify(token, "thisisdevendraprajapati");
        database.query('select * from userdata where email =?', [data.email], (err, result) => {
            if (err) {
                resp.status(400).send({
                    success: false
                })
            }
            else if (!result) {
                resp.status(400).send({
                    success: false
                })
            }
            else {
                if (result.isAdmin == 1) {
                    resp.status(400).send({
                        success: false
                    })
                }
                else {
                    req.email = data.email;
                    next();
                }

            }
        })
    }
    catch (e) {
        resp.status(402).send({
            success: false,
            message: "Something went wrong"
        })
    }
}
export default isUser;