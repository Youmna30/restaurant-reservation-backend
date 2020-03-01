var Table = require( '../models/Table');
var db = require('../config/database');  

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

let tables = [
        new Table({
            "numberOfPeople":2
        }),
        new Table({
            "numberOfPeople":2
        }),
        new Table({
            "numberOfPeople":2
        }),
        new Table({
            "numberOfPeople":2
        }),
        new Table({
            "numberOfPeople":5
        }),
        new Table({
            "numberOfPeople":5
        }),
        new Table({
            "numberOfPeople":5
        }),
        new Table({
            "numberOfPeople":5
        }),
        new Table({
            "numberOfPeople":5
        }),
        new Table({
            "numberOfPeople":5
        }),
        new Table({
            "numberOfPeople":5
        }),
        new Table({
            "numberOfPeople":10
        }),
        new Table({
            "numberOfPeople":10
        })
]
for (let index = 0; index < tables.length; index++) {
    tables[index].save()
    
}