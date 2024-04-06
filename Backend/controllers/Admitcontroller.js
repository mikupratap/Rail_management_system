import database from "../config/db.js"
export const AddStation = async (req, resp) => {

    try {
        const { stationName } = req.body;
        console.log(stationName)

        if (!stationName) {
            resp.status(200).send({
                success: false,
                message: "Please enter station name"
            })
            return;
        }

        const stationData = database.query("insert into stations (stationName) values(?)", [stationName], (err, result) => {
            if (err) {
                resp.status(200).send({
                    success: false,
                    message: "Station already exist"
                })

                return;
            }
            else {
                database.query("select stationName from stations", (err, result1) => {
                    let arr = [...result1];
                    arr = [...result1];
                    resp.status(200).send({
                        success: true,
                        result: [...arr]
                    })
                });

            }
        })
        return;

    }
    catch (e) {
        resp.status(402).send({
            success: false,
            message: "Something went wrong"
        })
    }
}
export const Addtrain = async (req, resp) => {

    try {
        const { trainNumber, trainName, fromStation, toStation, arivaltime, departuretime, seatAvl } = req.body;
        console.log(req.body);
        if (!trainName || !trainNumber || !fromStation || !toStation || !arivaltime || !departuretime) {
            resp.status(200).send({
                success: false,
                message: "Please provide all data"
            })
            return;
        }
        if (fromStation === "Select" || toStation === "Select") {
            resp.status(200).send({
                success: false,
                message: "Please select stations"
            })

            return;
        }
        if (fromStation === toStation) {
            resp.status(200).send({
                success: false,
                message: "Both stations should not be equal"
            })
            return;
        }
        //console.log("ho chuka");
        database.query("insert into trains (trainNumber,trainName,fromStation,toStation,departuretime,arivaltime,seatAvl) values(?,?,?,?,?,?,?)", [trainNumber, trainName, fromStation, toStation, departuretime, arivaltime, seatAvl], (err, result) => {
            if (err) {
                resp.status(200).send({
                    success: false,
                    err,
                    message: "Train already exist"
                })
                return;
            }
            else {
                database.query("select * from trains", (err, result1) => {
                    let arr = [];
                    arr = [...result1, req.body];
                    resp.status(200).send({
                        success: true,
                        result: arr
                    })
                })
            }
        })
        return;
    }
    catch (e) {
        resp.status(402).send({
            success: false,
            message: "Something went wrong"
        })
    }
}
export const Gettrains = async (req, resp) => {
    try {
        database.query("select * from trains", (err, result) => {
            resp.status(200).send({
                success: true,
                result
            })
        })
    }
    catch (e) {
        resp.status(402).send({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const Getstations = async (req, resp) => {
    try {
        const allStations = database.query("select stationName from stations", (err, result) => {
            resp.status(200).send({
                success: true,
                result
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
