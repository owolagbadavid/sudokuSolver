const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let validString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let validSol = '769235418851496372432178956174569283395842761628713549283657194516924837947381625'
let invalidString = '..9..5.1.85.4....2432..og0.1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let invalidString1 = '9.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';


suite('Functional Tests', () => {
suite('POST request to /api/solve', () => {
test('Solve a puzzle with valid puzzle string', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({puzzle:validString})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.solution, validSol);
          done();
        });
    });


test('Solve a puzzle with missing puzzle string', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Required field missing');
          done();
        });
    });

test('Solve a puzzle with invalid characters', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({puzzle:invalidString})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid characters in puzzle');
          done();
        });
    });

test('Solve a puzzle with incorrect length', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({puzzle:'..224'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
          done();
        });
    });

test('Solve a puzzle that cannot be solved', function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({puzzle:invalidString1})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Puzzle cannot be solved');
          done();
        });
    });
  
  })

suite('POST request to /api/check', () => {

test('Check a puzzle placement with all fields', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle:validString, coordinate:'a3', value:'9'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isTrue(res.body.valid);
          done();
        });
    });



test('Check a puzzle placement with single placement conflict', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle:validString, coordinate:'a4', value:'9'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isFalse(res.body.valid);
          assert.include(res.body.conflict, 'row')
          assert.isArray(res.body.conflict)
          assert.lengthOf(res.body.conflict, 1)
          done();
        });
    });


test('Check a puzzle placement with multiple placement conflicts', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle:validString, coordinate:'a3', value:'5'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isFalse(res.body.valid);
          assert.include(res.body.conflict, 'row')
          assert.include(res.body.conflict, 'region')
          assert.isArray(res.body.conflict)
          assert.lengthOf(res.body.conflict, 2)
          
          done();
        });
    });


test('Check a puzzle placement with all placement conflicts', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle:validString, coordinate:'a2', value:'9'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.isFalse(res.body.valid);
          assert.include(res.body.conflict, 'row')
          assert.include(res.body.conflict, 'column')
          assert.include(res.body.conflict, 'region')
          assert.isArray(res.body.conflict)
          assert.lengthOf(res.body.conflict, 3)
          done();
        });
    });
  
test('Check a puzzle placement with missing required fields', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle:validString, value:'9'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Required field(s) missing');
          done();
        });
    });

test('Check a puzzle placement with invalid characters', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle:invalidString, coordinate:'a3', value:'9'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid characters in puzzle');
          done();
        });
    });

test('Check a puzzle placement with incorrect length', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle:'...975..', coordinate:'a3', value:'9'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
          done();
        });
    });

test('Check a puzzle placement with invalid placement coordinate', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle:validString, coordinate:'n6', value:'9'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid coordinate');
          done();
        });
    });

test('Check a puzzle placement with invalid placement value', function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({puzzle:validString, coordinate:'a3', value:'10'})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid value');
          done();
        });
    });
  
  
})
  
});

