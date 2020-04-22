'use strict';

var mocha = require('mocha');
var chai = require('chai');
var registerRouts = require('../routes/registers');
var registerModel = require('../models/registers');

var expect = chai.expect;

describe('Http Test', function () {
    it('resp with the object that was created', function (done) {
        var registerObj = {
            schedule: {},
            service: {},
            client: {
                email: 'test@email.com',
                phone: '1236473647',
                name: "Test"
            }
        };

        registerModel.createRegister(registerObj, function (err, register) {

            expect(register.get('client')).to.equal(registerObj.client);
        });
    });
});