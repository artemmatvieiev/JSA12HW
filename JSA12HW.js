// Задание: написать тесты для функций
const users = [{age: 15}, {age: 14}, {age: 28}, {age: 18}, {age: 45}, {age: 68}, 
  {age: 38}, {age: 22}, {age: 14}];

const testObj = {
  equal(result) {
    if (this.input === result) console.log('Success'); 
    else console.error(`${this.input} not equals to ${result}` );
  },
  defined() {
    if (this.input !== undefined) console.log('Success'); 
    else console.error(`${this.input} is not defined` );
  }
};

const test = (input) => {
  testObj.input = input;
  return testObj;
};

// 1
const getDay = () => {
  return new Date().getDay();
};
console.log('test getDay')

const originGetDay = Date.prototype.getDay;
Date.prototype.getDay = () => {
  Date.prototype.getDay.wasCalled = true;
};

const example = () => getDay();
example();

test(Date.prototype.getDay.wasCalled).equal(true);
Date.prototype.getDay = originGetDay;

// 2
const getAdultUsers = (users = []) => users.filter(user => user.age > 18);

console.log('test getAdultUsers')

test(Array.isArray(getAdultUsers())).equal(true);
test(getAdultUsers().length).equal(0);
test(Array.isArray( getAdultUsers(users) )).equal(true);
test(getAdultUsers(users).length).equal(5);

// 3
const getRandomUsers = (users) => {
  const numb = Math.random();
 
  if (!users) {
    return false;
  }
 
  const length = users.length;
  const middleUser = Math.round(length / 2);
 
  if (numb > 0.5) {
    return users.slice(0, middleUser);
  }
 
  return users.slice(middleUser, length);
};

console.log('test getRandomUsers without argument');
test(getRandomUsers()).equal(false);

const originMathRandom = Math.random;

console.log('test getRandomUsers when Math.random > 0.5');
Math.random = () => {
  return 0.9;
};
test(Array.isArray(getRandomUsers(users))).equal(true);
test(getRandomUsers(users).length).equal(5);

console.log('test getRandomUsers when Math.random <= 0.5');
Math.random = () => {
  return 0.1;
};
test(Array.isArray(getRandomUsers(users))).equal(true);
test(getRandomUsers(users).length).equal(4);

Math.random = originMathRandom;
