const mocha = require('mocha');     
const chai = require('chai');      
const registerRouts = require('../routes/registers');
const registerModel = require('../models/registers')

const expect = chai.expect;

describe('Http Test', () => {
   it('resp with the object that was created', (done) => {
       const registerObj = {
           schedule: {},
           service: {},
           client: {
               email: 'test@email.com',
               phone:'1236473647',
               name: "Test"
           }
       }

       registerModel.createRegister(registerObj, (err, register)=>{

           expect(register.get('client')).to.equal(registerObj.client)
       })


   })
});