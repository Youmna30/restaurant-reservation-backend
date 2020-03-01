import Reservation from '../models/Reservation'
import Table from '../models/Table'
import { body } from 'express-validator'
import { checkValidations, apiError } from '../config/checkMethod'
import moment from 'moment'

export default {
    // View all Reservations
    async findAll(req, res, next) {
        try {
            let query = { deleted: false }

            //to view reservations of specific date
            let {date} = req.query
            if(date){
                query.date = date
            }

            let Reservations = await Reservation.findAll({ where: query });
            res.status(200).send(Reservations)
        } catch (error) {
            next(error)
        }
    },
    // Validate the data of reserving table
    validateBody() {
        let validations = [
            body('date').not().isEmpty().withMessage("Enter date of reservation")
                .custom(value => {
                    if (moment(value, "YYYY-MM-DD").format("YYYY-MM-DD") === value) {
                        return true
                    }
                    return false
                }).withMessage("Enter a valid date with formate YYYY-MM-DD "),
            body('time').not().isEmpty().withMessage("Enter time of reservation")
                .custom(value => {
                    if (moment(value, moment.HTML5_FMT.TIME).format(moment.HTML5_FMT.TIME) === value) {
                        return true
                    }
                    return false
                }).withMessage("Enter a valid time with formate hh:mm "),
            body('name').not().isEmpty().withMessage("Enter your name"),
            body('email').not().isEmpty().withMessage("Enter your email"),
            body('phone').not().isEmpty().withMessage("Enter your phone number")
            .matches(/^01[0-2 5]{1}[0-9]{8}$/).withMessage('Enter a Valid Mobile Number'),
            body('table_id').not().isEmpty().withMessage("Choose the table")

        ]
        return validations
    },

    // Add a new Table
    async create(req, res, next) {
        try {
            let data = checkValidations(req)
            let table = await Table.findOne({where:{id:data.table_id, deleted:false}})
            if(!table){
                return next(apiError(404,"Table isn't found"))
            }
            else if(table.availability == false){
                return next(apiError(400,"Table is already reserved"))
            }
            table.availability = false
            await table.save()
            
            let reservation = await Reservation.create(data)
            res.status(200).send(reservation)

        } catch (error) {
            next(error)
        }
    },
}