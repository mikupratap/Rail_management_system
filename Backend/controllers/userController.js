import database from "../config/db.js";
import jwt from 'jsonwebtoken';
import { generatePassword, matchPass } from "../helper/HashPassWord.js";
import { genToken } from "../helper/genToken.js";
export const userLogin = async (req, resp) => {
    console.log(req.body);
    try {

        const { email, password, isadmin } = req.body;
        //console.log("user name and password");
        if (!email || !password) {
            resp.status(200).send({
                success: false,
                message: "Please enter the email or password"
            })
            return;
        }
        let ok = 0;
        if (isadmin == 'Admin') ok = 1;
        const data = database.query(`select * from userdata where email=? limit 1`, [email], (err, result) => {
            if (err || !result.length) {
                resp.status(200).send({
                    success: false,
                    message: "Something went wrong please check email and password"
                })
                return;
            }
            else {
                console.log(result, "resooooooooooooo");
                if (result[0].isAdmin == ok) {
                    const userEmail = result[0].email;
                    const jwttoken = async () => {
                        const token = await jwt.sign({ email: userEmail }, "thisisdevendraprajapati");
                        console.log(token)
                        await resp.status(200).send({
                            success: true,
                            result: { token, isAdmin: result[0].isAdmin }
                        })
                    }
                    jwttoken();
                    return;
                }
                else {
                    if (ok == 0) {
                        resp.status(200).send({
                            success: false,

                            message: "You are not a user , You are admin"
                        })
                    }

                    else {

                        resp.status(200).send({
                            success: false,

                            message: "You are not a admin , You are user"
                        })
                    }

                }

            }
        })

    }
    catch (e) {
        resp.status(402).send({
            success: false,
            message: "Something went wrong with login",
            e
        })
    }
}

export const userRegister = async (req, resp) => {
    try {
        console.log(req);
        const { email, password, isadmin } = req.body;
        let ok = 0;
        if (isadmin === 'Admin') ok = 1;
        console.log(email, password);
        if (!email || !password) {
            resp.status(200).send({
                success: false,
                message: "please enter email or passwprd"
            })
            return;
        }
        const isUserExist = database.query(`select * from userdata where email= (?) limit 1`, [email], (err, result) => {
            if (err) {
                resp.status(200).send({
                    success: false,
                    message: "something went wrong"
                })
                next();
            }
            else {
                if (result.affectedRows > 0) {
                    resp.status(200).send({
                        success: false,
                        message: "User already exist"
                    })
                    return;
                }
            }
        });

        const pass = await generatePassword(password);

        const datanew = database.query(`insert into userdata (email,password,isAdmin) values(?,?,?)`, [email, pass, ok], (err, result) => {
            if (err) {
                resp.status(400).send({
                    success: false,
                    message: "User already exist"
                })
                return;
            }
            // console.log(result);
            resp.status(201).send({
                success: true,
                email,
                isadmin: ok,
                message: "register successfully"
            })
        });

    }
    catch (e) {
        resp.status(402).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const findTrains = async (req, resp) => {
    console.log(req.body);
    try {
        const { fromStation, toStation } = req.body;
        if (!fromStation || !toStation || fromStation == "Select" || toStation == "Select") {
            resp.status(200).send({
                success: false,
                message: "Please select the statins",
            })
            next()
        }
        const trainsData = database.query("select * from trains where fromStation=? and toStation=?", [fromStation, toStation], (err, result) => {
            if (err) {
                resp.status(200).send({
                    success: false,
                    message: "Something went wrong",
                })

            }
            else {
                resp.status(200).send({
                    success: true,
                    result
                })

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
export const orders = async (req, resp) => {
    try {
        const email = req.email;
        console.log(email)
        database.query('select * from orders where useremail=?', [email], (err, result) => {
            if (err) {
                resp.status(200).send({
                    success: false,
                    err,
                    message: "Something went wrong ..."
                })
            }
            else {
                resp.status(200).send({
                    success: true,
                    result
                })
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
export const bookticket = async (req, resp) => {
    try {
        const { trainNumber, passengerName, passengerAge } = req.body;
        if (!passengerAge || !passengerName || !trainNumber) {
            resp.status(200).send({
                success: false,
                message: "Please enter all details"
            })
            return;
        }
        database.query('select * from trains where trainNumber=?', [trainNumber], (err, result) => {
            if (err) {
                resp.status(200).send({
                    success: false,
                    message: "Something went wrong with train"
                })
                return
            }
            else {
                const { trainNumber, trainName, fromStation, toStation, arivaltime, departuretime, seatAvl } = result[0];
                console.log(trainNumber, trainName, fromStation, toStation, arivaltime, departuretime, seatAvl);
                if (seatAvl == 0) {
                    resp.status(200).send({
                        success: false,
                        message: "Seats are full"
                    })
                    return;
                }
                const useremail = req.email;
                database.query("insert into orders (trainNumber,trainName,fromStation,toStation,arivaltime,departuretime,passengerName,passengerAge,useremail) values(?,?,?,?,?,?,?,?,?)", [trainNumber, trainName, fromStation, toStation, arivaltime, departuretime, passengerName, passengerAge, useremail], (err, result) => {
                    if (err) {
                        resp.status(200).send({
                            success: false,
                            err,
                            message: "Server not responding"
                        })
                        return;
                    }
                    else {
                        const rseat = seatAvl - 1;
                        database.query("update trains set seatAvl=? where trainNumber=?", [rseat, trainNumber.toString()], (err, result) => {
                            if (err) {
                                console.log(result, "result");
                                resp.status(200).send({
                                    success: true,
                                    err,
                                    message: "Ticket Booking successful"
                                })
                            }
                            else {
                                console.log(result, "result");
                                resp.status(200).send({
                                    success: true,
                                    result,
                                    message: "Ticket Booking successful"
                                })
                            }

                        });

                    }
                })
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

