import Table from '../models/Table'
import {body} from 'express-validator'
import {checkValidations , apiError} from '../config/checkMethod'
import Reservation from '../models/Reservation'

export default {
    // View all tables
    async findAll(req,res,next){
        try {            
            let query = {deleted:false}
            let tables = await Table.findAll({where:query});            
            res.status(200).send(tables)
        } catch (error) {            
            next(error)
        }
    },

    // Validate the data of add new table
    validateBody(){
        let validations =[
            body('numberOfPeople').not().isEmpty().withMessage("Enter number of people of the table")
                                  .isNumeric().withMessage("Enter numbers only")
            
            
        ]
        return validations
    },

    // Add a new Table
    async create(req,res,next){
        try {
            let data = checkValidations(req)
            const table = await Table.create(data);
            res.status(201).send(table)
            
        } catch (error) {
            next(error)
        }
    },

    // Delete an existing table
    async delete(req,res,next){
        try {
            let id = req.params.id;
            let table = await Table.findOne({where:{deleted:false, id:id}})
            
            if(!table){
                return next(apiError(404,"Table isn't found"))
            }
            if(table.availability == false){
                return next(apiError(400,"This table has a reservation, you cann't delete it"))
            }
            await Table.update({ deleted: true}, {
                where: {
                  id: id
                }
              });
            
            res.status(200).send({msg:"Deleted Successfully"})
            
        } catch (error) {
            next(error)
        }
    },
      // View all current available tables
      async currentAvailableTables(req,res,next){
        try {            
            let query = {deleted:false, availability:true}
            let tables = await Table.findAll({where:query});            
            res.status(200).send(tables)
        } catch (error) {            
            next(error)
        }
    },
      // Make the table available 
      async freeTable(req,res,next){
        try {            
            let id = req.params.id;
            let table = await Table.findOne({where:{deleted:false, id:id}})
            if(!table){
                return next(apiError(404,"Table isn't found"))
            }
            if(table.availability == true){
                return next(apiError(400,"Table is already available"))
            }
            table.availability = true
            await table.save()
            await Reservation.update({ done: true }, {
                where: {
                  table_id: id,
                  deleted:false
                }
              });
            res.status(200).send(table)
        } catch (error) {            
            next(error)
        }
    },
}