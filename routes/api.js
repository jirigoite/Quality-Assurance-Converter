'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get(function (req, res){
    let input = req.query.input;
    
    // 1. Obtenemos datos crudos
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);

    // 2. Manejo de Errores (Orden específico requerido por FCC)
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.send('invalid number and unit');
    }
    if (initNum === 'invalid number') {
      return res.send('invalid number');
    }
    if (initUnit === 'invalid unit') {
      return res.send('invalid unit');
    }

    // 3. Si todo está bien, calculamos
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    // 4. Respondemos JSON
    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: toString
    });
  });

};