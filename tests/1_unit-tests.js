const chai = require('chai');
const assert = chai.assert;

const {puzzlesAndSolutions} = require('../controllers/puzzle-strings')
const Solver = require('../controllers/sudoku-solver.js');
let solver;
solver = new Solver();
let validString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let invalidString = '..9..5.1.85.4....2432..og0.1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let invalidString1 = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

let validString1 ="..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";


suite('Unit Tests', () => {
test("Logic handles a valid puzzle string of 81 characters", ()=>{
  assert.equal(solver.validate(validString), 'valid puzzle')
})

test("Logic handles a puzzle string with invalid characters ", ()=>{
  assert.equal(solver.validate(invalidString), 'Invalid characters in puzzle')
})


test("Logic handles a puzzle string that is not 81 characters in length ", ()=>{
  assert.equal(solver.validate('25323451'), 'Expected puzzle to be 81 characters long')
})  

  test("Logic handles a valid row placement ", ()=>{
    
  assert.isTrue(solver.checkRowPlacement(solver.groupEntries(validString), 0, 2,'9'), 'Expected true')
})  

test("Logic handles an invalid row placement ", ()=>{
    
  assert.isFalse(solver.checkRowPlacement(solver.groupEntries(validString), 0, 2,'5'), 'Expected false')
})  


test("Logic handles a valid column placement ", ()=>{
    
  assert.isTrue(solver.checkColPlacement(solver.groupEntries(validString), 0, 2,'9'), 'Expected true')
})  

test("Logic handles a invalid column placement ", ()=>{
    
  assert.isFalse(solver.checkColPlacement(solver.groupEntries(validString), 0, 2,'2'), 'Expected false')
})  

test("Logic handles a invalid column placement ", ()=>{
    
  assert.isTrue(solver.checkRegionPlacement(solver.groupEntries(validString), 3, 2,'3'), 'Expected true')
})  

test("Logic handles a invalid column placement ", ()=>{
    
  assert.isFalse(solver.checkRegionPlacement(solver.groupEntries(validString), 4, 2,'6'), 'Expected false')
})  
  
test("Valid puzzle strings pass the solver ", ()=>{
  
    puzzlesAndSolutions.forEach(item => {
      
  assert.equal(solver.solve(item[0]),item[1], 'Expected solved puzzle')
    })
})  

test("Invalid puzzle strings fail the solver ", ()=>{
    
  assert.include(solver.solve(invalidString1),'.', 'Expected output to include "." ')
})  

test("Solver returns the expected solution for an incomplete puzzle ", ()=>{
    puzzlesAndSolutions.forEach(item => {
      
  assert.equal(solver.solve(item[0]),item[1], 'Expected solved puzzle')
    })
})  
  

});
