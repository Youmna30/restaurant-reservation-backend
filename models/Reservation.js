const Sequelize = require('sequelize')
const db = require('../config/database')

const Reservation = db.define('Reservation', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date:{
        type:Sequelize.DATEONLY,
        allowNull: false
    },
    time:{
        type: Sequelize.TIME ,
        allowNull: false    
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false  
    },
    email:{
        type:Sequelize.STRING,
        allowNull: false  
    },
    phone:{
        type:Sequelize.STRING,
        allowNull: false  
    },
    table_id:{
        type: Sequelize.INTEGER,
        references:{
            model: 'Tables',
            key:'id'
        },
        allowNull: false
    },
    done:{
        type:Sequelize.BOOLEAN,
        defaultValue: false
    },
    deleted:{
        type:Sequelize.BOOLEAN,
        defaultValue: false
    }
})
Reservation.sync()

module.exports = Reservation;