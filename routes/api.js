'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');
const {body, validationResult} = require('express-validator');
module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post(body('puzzle').trim()
          .isLength({ min: 1 })
          .escape(),
          body('coordinate').trim()
          .isLength({ min: 1 })
          .escape(),
          body('value').trim()
          .isLength({ min: 1 })
          .escape(),
      (req, res) => {

const error = validationResult(req);
        if(!error.isEmpty()){
          return res.json({ error: 'Required field(s) missing'           })
        }
      const {puzzle, coordinate, value} = req.body;
            
      let feed = solver.validate(puzzle)
      if(feed!='valid puzzle'){return res.json({error: feed})}
      
      if(value.length!==1){return res.json({ error: 'Invalid value' })}
        else if(!/[1-9]/.test(value)){
          return res.json({ error: 'Invalid value' })
        }
      
      let row = coordinate.split('')[0]
      const column = coordinate.split('')[1]
      if(!(coordinate.length===2 && /[a-i]/i.test(row)&&/[1-9]/.test(column))){return res.json({error: 'Invalid coordinate'})};
      
let output = {}
let stuff = solver.groupEntries(puzzle)
   row = row.toLowerCase()
   let rows ={a:0,b:1,c:2,d:3,e:4,f:5,g:6,h:7,i:8}
   row = rows[row]
   let col = Number(column) -1;
 
        if(solver.isSafe(stuff, row, col, value)){
          output.valid = true
        }else{output.valid = false
             output.conflict = []
             }
       
if(!solver.checkRowPlacement(stuff, row, col, value)){output.conflict.push('row') }
if(!solver.checkColPlacement(stuff, row, col, value)){output.conflict.push('column') }
if(!solver.checkRegionPlacement(stuff, row, col, value)){output.conflict.push('region') }

        
        return res.json(output)
    });
    
  app.route('/api/solve')
    .post(body('puzzle').trim()
          .isLength({min:1})
          .escape(),
      (req, res) => {
const error = validationResult(req);
        if(!error.isEmpty()){
          return res.json({ error: 'Required field missing'           })
        }
      const {puzzle} = req.body;
      
      let feed = solver.validate(puzzle)
      if(feed!='valid puzzle'){return res.json({error: feed})}

let result = solver.solve(puzzle)  
        
if(result.includes('.')){return res.json({ error: 'Puzzle cannot be solved' })}
       
      return res.json({solution:result})  
    });
};
