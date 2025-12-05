function ConvertHandler() {
  
  // Función para obtener el número de la entrada
  this.getNum = function(input) {
    // Busca el primer carácter que sea una letra
    let result = input.match(/[a-z]+$/i);
    
    // Si no hay letras (solo números), el índice es la longitud total
    let index = result ? result.index : input.length;
    
    // Cortamos el string para obtener solo la parte numérica
    let numStr = input.slice(0, index);
    
    // Si la cadena numérica está vacía (ej: entrada "kg"), el defecto es 1
    if (numStr.length === 0) return 1;

    // Verificar si hay doble fracción (ej: 3/2/3) que es inválido
    if ((numStr.match(/\//g) || []).length > 1) {
      return 'invalid number';
    }

    // Si es una fracción (ej: 1/2)
    if (numStr.includes('/')) {
      let values = numStr.split('/');
      return parseFloat(values[0]) / parseFloat(values[1]);
    }

    // Si es un número normal o decimal
    if (isNaN(numStr)) return 'invalid number';
    
    return parseFloat(numStr);
  };
  
  // Función para obtener la unidad de la entrada
  this.getUnit = function(input) {
    let result = input.match(/[a-z]+$/i); // Busca letras al final
    if (!result) return 'invalid unit';
    
    let unit = result[0].toLowerCase();
    
    // Validamos que sea una de las unidades permitidas
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unit)) {
      return 'invalid unit';
    }
    
    // Excepción: Litros debe ser 'L' mayúscula, el resto minúscula
    return unit === 'l' ? 'L' : unit;
  };
  
  // Función para obtener la unidad de destino
  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    // Normalizamos a 'L' o minúsculas para buscar en el mapa
    let unitKey = initUnit === 'l' || initUnit === 'L' ? 'L' : initUnit.toLowerCase();
    return unitMap[unitKey] || 'invalid unit';
  };

  // Función para obtener el nombre completo de la unidad
  this.spellOutUnit = function(unit) {
    const unitMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    // Manejo especial para L mayúscula
    let unitKey = unit === 'l' || unit === 'L' ? 'L' : unit.toLowerCase();
    return unitMap[unitKey];
  };
  
  // Función principal de conversión matemática
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    // Normalizamos la unidad para el switch
    let unit = initUnit === 'l' || initUnit === 'L' ? 'L' : initUnit.toLowerCase();

    switch(unit) {
      case 'gal': result = initNum * galToL; break;
      case 'L':   result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg':  result = initNum / lbsToKg; break;
      case 'mi':  result = initNum * miToKm; break;
      case 'km':  result = initNum / miToKm; break;
      default: return undefined;
    }
    
    // Redondear a 5 decimales
    return parseFloat(result.toFixed(5));
  };
  
  // Generar la frase final
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;