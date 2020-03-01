const Sequelize = require('sequelize')
const db = require('../config/database')

const Table = db.define('Table',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    numberOfPeople:{
        type:Sequelize.INTEGER,
        allowNull: false
    },
    availability:{
        type:Sequelize.BOOLEAN,
        defaultValue: true
    },
    deleted:{
        type:Sequelize.BOOLEAN,
        defaultValue: false
    }
})
Table.sync()

module.exports = Table;