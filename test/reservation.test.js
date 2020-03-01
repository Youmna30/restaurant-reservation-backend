const expect = require('chai').expect
const request = require('supertest')
const app = require('../app')
var db = require('../config/database');  


describe('POST GET /reservation' , ()=>{
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
    it('OK, Add a new reservation' , (done)=>{
        request(app).post('/reservation')
                    .send({
                        "date":"2020-02-29",
                        "time":"22:00",
                        "name":"Youmna Ashraf",
                        "email":"youmna@gmail.com",
                        "phone":"01112532532",
                        "table_id":1
                    })
                    .then((res) =>{
                        const body = res.body
                        expect(body).to.contain.property('date')
                        expect(body).to.contain.property('time')
                        expect(body).to.contain.property('deleted')
                        expect(body).to.contain.property('name')
                        expect(body).to.contain.property('email')
                        expect(body).to.contain.property('table_id')
                        expect(body).to.contain.property('createdAt')
                        expect(body).to.contain.property('updatedAt')
                        done()
                        
                    })
                    .catch((err)=>done(err))
                
    })
    it('Fail, it requires data in body' , (done)=>{
        request(app).post('/reservation')
                    .send()
                    .then((res) =>{
                        const body = res.body                        
                        expect(body.errors[0].msg).to.equal('Enter date of reservation')
                        expect(body.errors[1].msg).to.equal('Enter time of reservation')
                        expect(body.errors[2].msg).to.equal('Enter your name')
                        expect(body.errors[3].msg).to.equal('Enter your email')
                        expect(body.errors[4].msg).to.equal('Enter your phone number')
                        expect(body.errors[5].msg).to.equal('Choose the table')
                        
                        
                        
                        done()  
                    })
                    .catch((err)=>done(err))
    })
    it('OK, getting reservation has no reservation' , (done)=>{
        request(app).get('/reservation')
                    .then((res) =>{
                        const body = res.body
                        
                        expect(body.length).to.equal(0)
                        done()  
                    })
                    .catch((err)=>done(err))
                
    })
    it('OK, getting reservation has 1 reservation' , (done)=>{
        request(app).get('/reservation')
                    .then((res) =>{
                        const body = res.body
                        
                        expect(body.length).to.equal(1)
                        done()  
                    })
                    .catch((err)=>done(err))
                
    })
})
