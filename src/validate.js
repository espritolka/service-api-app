const { body } = require('express-validator')

exports.validate = (method) => {
  switch (method) {
    case 'createRegister': {
     return [ 
        body('client.name', "Поле обязательно к заполнению").notEmpty(),
        body('client.email', 'Не верный формат или поле не заполнено').notEmpty().isEmail(),
        body('client.phone', 'Не верный формат или поле не заполнено').optional().isInt(),
       // body('status').optional().isIn(['enabled', 'disabled'])
       body('schedule.master._id', "Поле обязательно к заполнению").notEmpty(),
       body('schedule.time._id', "Поле обязательно к заполнению").notEmpty(),
       body('schedule.date', "Поле обязательно к заполнению").notEmpty(),
       body('service._id', "Поле обязательно к заполнению").notEmpty(),

       ]   
    }
  }
}