const {
  isNumber,
  castToNumber,
  isString, 
  castToString,
  isBoolean,
  castToBoolean,
  isObject,
  isArray,
  isFunction,
  castToArray,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('should tell if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('yoyo')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });
  });
  it('tells us if the value is a string', () => {
    expect(isString('yo')).toBeTruthy();
    expect(isString(69)).toBeFalsy();
    expect(isString([])).toBeFalsy(); 
    expect(isString({})).toBeFalsy();
    expect(isString(() => {})).toBeFalsy();
    expect(isString(true)).toBeFalsy();
  });
  it('this tells us if a value is a boolean', () => {
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean(false)).toBeTruthy();
    expect(isBoolean(6)).toBeFalsy();
    expect(isBoolean('yee')).toBeFalsy();
    expect(isBoolean([])).toBeFalsy();
    expect(isBoolean({})).toBeFalsy();
    expect(isBoolean(() => {})).toBeFalsy();
  });
  
  it('tells us if a value is an object', () => {
    expect(isObject({})).toBeTruthy();
    expect(isObject(1)).toBeFalsy();
    expect(isObject('yooo')).toBeFalsy();
    expect(isObject([])).toBeFalsy();
    expect(isObject(false)).toBeFalsy();
    expect(isObject(() => {})).toBeFalsy();
  });
  
  it('tells ya if a value is an array', () => {
    expect(isArray([])).toBeTruthy();
    expect(isArray({})).toBeFalsy();
    expect(isArray(3)).toBeFalsy();
    expect(isArray('who?')).toBeFalsy();
    expect(isArray(false)).toBeFalsy();
    expect(isArray(() => {})).toBeFalsy();
  });
  
  it('tells us if a value is a function', () => {
    expect(isFunction(() => {})).toBeTruthy();
    expect(isFunction([])).toBeFalsy();
    expect(isFunction({})).toBeFalsy();
    expect(isFunction(3)).toBeFalsy();
    expect(isFunction('sup')).toBeFalsy();
    expect(isFunction(false)).toBeFalsy();
  });
});


describe('casters', () => {
  it('can cast values to a number', () => {
    expect(castToNumber(3)).toEqual(3);
    expect(castToNumber('3')).toEqual(3);
    expect(castToNumber(true)).toEqual(1);
    expect(castToNumber(false)).toEqual(0);
  });

  it('throws if value is not castable to number', () => {
    expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
    expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
  });
});

it('can cast values to a boolean', () => {
  expect(castToBoolean(true)).toEqual(true);
  expect(castToBoolean(false)).toEqual(false);
  expect(castToBoolean(0)).toEqual(false);
  expect(castToBoolean(1)).toEqual(true);
});
  
it('throws if value is not castable to boolean', () => {
  expect(() => castToBoolean({})).toThrowErrorMatchingSnapshot();
  expect(() => castToBoolean(() => {})).toThrowErrorMatchingSnapshot();
});
  
it('can cast values to an array', () => {
  expect(castToArray(castToString)(['yo', 'sup', 33])).toEqual(['yo', 'sup', '33']);
});
  
it('throws if value is not castable to an array', () => {
  expect(() => castToArray(castToNumber)(['hellow'])).toThrowErrorMatchingSnapshot();
  expect(() => castToArray(castToNumber)(1)).toThrowErrorMatchingSnapshot();
});
   
it('can get the right caster', () => {
  expect(getCaster(Number)).toEqual(castToNumber);
  expect(getCaster(Promise)).toBeNull();
});

