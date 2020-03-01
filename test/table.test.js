const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')
var db = require('../config/database');  


describe('POST GET DElETE /table' , ()=>{
    before((done)=>{
        db.authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
          done()
        })
        .catch(err => {
          console.error('Unable to connect to the database:', err);
          done(err)
        });
    })
    it('OK, Add a new table' , (done)=>{
        request(app).post('/table')
                    .send({"numberOfPeople":2})
                    .then((res) =>{
                        const body = res.body
                        expect(body).to.contain.property('id')
                        expect(body).to.contain.property('numberOfPeople')
                        expect(body).to.contain.property('deleted')
                        expect(body).to.contain.property('availability')
                        expect(body).to.contain.property('createdAt')
                        expect(body).to.contain.property('updatedAt')
                        done()
                        
                    })
                    .catch((err)=>done(err))
                
    })
    it('Fail, it requires numberOfPeople in body' , (done)=>{
        request(app).post('/table')
                    .send()
                    .then((res) =>{
                        const body = res.body
                        expect(body.errors[0].msg).to.equal('Enter number of people of the table')
                        done()  
                    })
                    .catch((err)=>done(err))
    })
    it('OK, getting tables has no tables' , (done)=>{
        request(app).get('/table')
                    .then((res) =>{
                        const body = res.body
                        
                        expect(body.length).to.equal(0)
                        done()  
                    })
                    .catch((err)=>done(err))
                
    })
    it('OK, getting tables has tables' , (done)=>{
        request(app).get('/table')
                    .then((res) =>{
                        const body = res.body
                        
                        expect(body.length).to.greaterThan(0)
                        done()  
                    })
                    .catch((err)=>done(err))
                
    })
    it('Fail, Deleting an existing table that has a reservation' , (done)=>{
        request(app).delete('/table/1')
                    .then((res) =>{
                        const body = res.body
                        expect(body.errors).to.equal("This table has a reservation, you cann't delete it")
                        done()  
                    })
                    .catch((err)=>done(err))
    })
    it('OK, Deleting an existing table that hasn\'t a reservation' , (done)=>{
        request(app).delete('/table/4')
                    .then((res) =>{
                        const body = res.body
                        expect(body.msg).to.equal("Deleted Successfully")
                        done()  
                    })
                    .catch((err)=>done(err))
    })
    it('Fail, Deleting a non existing table' , (done)=>{
        request(app).delete('/table/3')
                    .then((res) =>{
                        const body = res.body
                        expect(body.errors).to.equal("Table isn't found")
                        done()  
                    })
                    .catch((err)=>done(err))
    })
})
